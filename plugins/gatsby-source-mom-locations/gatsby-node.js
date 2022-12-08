const fetch = require('isomorphic-fetch');
const crypto = require('crypto');
const { readFileSync, readdirSync } = require('fs');
const path = require('path');
const { slugify } = require('transliteration');

const locationsUrl = 'https://api.momentum.rent/admin/locations_detailed';

// TODO: should read this from localization/strings
const languages = ['en', 'hr', 'fr', 'es', 'de', 'it', 'nl'];

const getLocationSlugFromPath = source => {
  const regexMatch = source.match(/[a-zA-Z-]+(?:\.json)/);
  const fileName = regexMatch && regexMatch[0];

  return fileName ? fileName.split('.')[0] : null;
};

// make sure a coordinate (lat/lng) is a float, not a string
const safeCoordinate = coord => {
  const parsed = parseFloat(coord);
  return Number.isNaN(parsed) ? null : parsed;
};

exports.sourceNodes = async ({ boundActionCreators }, { path: dataPath }) => {
  const { createNode, createPage, createRedirect } = boundActionCreators;
  const locations = await fetch(locationsUrl, {
    headers: { Authorization: `Bearer ${process.env.MOM_BUILD_KEY}` },
  }).then(res => res.json());

  const descriptionFiles = readdirSync(dataPath).map(name => path.join(dataPath, name));

  const descriptions = descriptionFiles.reduce(
    (acc, file) =>
      Object.assign(acc, {
        [getLocationSlugFromPath(file)]: JSON.parse(readFileSync(file, 'utf8')),
      }),
    {}
  );

  try {
    locations.forEach(location => {
      const slug = slugify(location.name.en_EN);
      const description = descriptions[slug] || '';
      const allLocationData = {
        ...location,
        contact: {
          ...location.contact,
          lat: safeCoordinate(location.contact.lat),
          lng: safeCoordinate(location.contact.lng),
        },
        description,
        slug,
        keywords: location.slug,
      };
      const strLocation = JSON.stringify(allLocationData);
      const nodeHash = crypto
        .createHash('md5')
        .update(strLocation)
        .digest('hex');

      createNode({
        ...allLocationData,
        id: String(location.id),
        internal: { type: 'Locations', content: strLocation, contentDigest: nodeHash },
        parent: 'root',
        children: [],
      });

      languages.forEach(lang => {
        createPage({
          path: `/${lang}/locations/${slug}`,
          component: path.resolve('src/templates/Location/index.js'),
          layout: `layout-${lang}`,
          context: {
            ...allLocationData,
          },
        });
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`The gatsby-source-mom-locations plugin has failed:\n${error.message}`);

    process.exit(1);
  }
};
