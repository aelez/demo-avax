const siteName = "Sample Blog";
const siteShortName = "Avax rent a car";
const siteUrl = "https://geek.sg/";
const siteDescription = "Test Avax rent a car";
const siteKeyword = "";
const siteLogo = "logo.png";
const siteLogoFolder = `static/${siteLogo}`;

module.exports = {
  siteMetadata: {
    title: siteName,
    siteUrl,
    description: siteDescription,
  },
  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-robots-txt",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
        name: "contents",
      },
    },
    {
      resolve: 'gatsby-source-mom-locations',
      options: {
        path: `${__dirname}/src/data/locationDescriptions`,
      },
    },
    {
      resolve: 'gatsby-source-locale',
      options: {
        pagesPath: `${__dirname}/src/localization/pages/`,
        stringsPath: `${__dirname}/src/localization/strings/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2048,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteName,
        short_name: siteShortName,
        description: siteDescription,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        lang: "en",
        start_url: "/",
        include_favicon: true,
        icon: siteLogoFolder, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-51015107-1',
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: "gatsby-plugin-seo",
      options: {
        siteName,
        defaultSiteImage: siteLogo,
        siteUrl,
        keywords: siteKeyword,
        globalSchema: `{
            "@type": "WebSite",
            "@id": "${siteUrl}",
            "url": "${siteUrl}",
            "name": "${siteName}",
            "publisher": {
              "@id": "${siteUrl}"
            },
            "image": {
              "@type": "ImageObject",
              "@id": "${siteUrl}${siteLogo}",
              "url": "${siteUrl}${siteLogo}",
              "caption": siteName
            }
          }`,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl,
        noTrailingSlash: true,
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
    },
    
    {
      resolve: `gatsby-plugin-slug`,
    },
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-sitemap',
  ],
};
