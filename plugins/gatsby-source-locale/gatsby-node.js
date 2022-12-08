/* eslint-disable no-restricted-syntax */
const { readFileSync, lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const path = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => !isDirectory(source);

const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const getFiles = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isFile);

const getString = source => readFileSync(source, 'utf8');
const getJson = source => JSON.parse(getString(source));

const splitFilePath = source => source.match(/\/(\w*)\.json/);

const getResourceType = source => splitFilePath(source)[1];
const getLocaleFromDir = source => source.match(/\/(\w*)$/)[1];

function generatePage(filePath, locale, createPage, singleLocale = false) {
  // resource is file name without extension. We will use it for route and to match template
  const resource = getResourceType(filePath);
  // get the data from the file and convert to JSON
  const data = getJson(filePath);

  const pagePath = resource.toLowerCase();

  // default path to create is locale + pagePath (e.g. /en/Faq)
  let newPath = `/${locale}/${pagePath}`;
  if (pagePath === 'home') newPath = `/${locale}`;
  if (singleLocale === true) newPath = `${pagePath}.html`;

  createPage({
    // route
    path: newPath,
    // template
    component: path.resolve(`src/templates/${resource}/index.js`),
    layout: `layout-${locale}`,
    context: {
      data,
      locale,
    },
  });
}

function generatePages(pagesPath, createPage) {
  const directories = getDirectories(pagesPath);

  try {
    // walk all directories
    directories.forEach(dirPath => {
      // figure out locale based on folder name. This will be in the path too
      const locale = getLocaleFromDir(dirPath);

      // get all files in this folder. Files should match tempate and shoud being with capital letter
      getFiles(dirPath).forEach(filePath => generatePage(filePath, locale, createPage));
    });

    // all files without folders are just EN
    getFiles(pagesPath).forEach(filePath => generatePage(filePath, 'en', createPage, true));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`The gatsby-source-locale plugin has failed:\n${error.message}`);

    process.exit(1);
  }
}

/**
 * Generate strings for consumption in any component via context
 */
function generateLayouts(stringsPath, createLayout) {
  const directories = getDirectories(stringsPath);

  try {
    // walk all directories
    directories.forEach(dirPath => {
      // figure out locale based on folder name. This will be in the path too
      const locale = getLocaleFromDir(dirPath);
      const files = getFiles(dirPath);

      const data = {};

      // get all files in this folder. Files should match tempate and shoud being with capital letter
      files.forEach(filePath => {
        // resource is file name without extension. We will use it for route and to match template
        const resource = getResourceType(filePath);
        // get the data from the file and convert to JSON
        const strings = getJson(filePath);
        // GQL internals

        data[resource] = strings;
      });

      createLayout({
        component: path.resolve('./src/layouts/index.js'),
        id: `layout-${locale}`, // If no id is provided, the filename will be used as id.
        context: {
          i18n: data,
          lang: locale,
        },
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`The gatsby-source-locale plugin has failed:\n${error.message}`);

    process.exit(1);
  }
}

exports.sourceNodes = ({ boundActionCreators }, { pagesPath, stringsPath }) => {
  const { createPage, createLayout, createRedirect } = boundActionCreators;
  generateLayouts(stringsPath, createLayout);
  generatePages(pagesPath, createPage);

  createRedirect({
    fromPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/en/',
  });
};
