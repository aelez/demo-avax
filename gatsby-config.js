module.exports = {
  siteMetadata: {
    title: 'Avax Rent-a-Car',
    siteUrl: 'https://avaxrent.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    //'gatsby-plugin-offline',
    'gatsby-plugin-react-next',
    'gatsby-plugin-sass',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          // all statics but sw.js
          // '/sw.js': ['Cache-Control: public,max-age=0, must-revalidate'],
          // '/*.{js,jpg,png,ico,gif,css,woff,woff2}': ['Cache-Control: public, max-age=31536000'],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        // allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        // mergeSecurityHeaders: true, // boolean to turn off the default security headers
        // mergeLinkHeaders: false, // boolean to turn off the default gatsby js headers (disabled by default, until gzip is fixed for server push)
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        // transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Avax Rent-a-Car',
        short_name: 'Avax',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#E83542',
        display: 'minimal-ui',
        icon: 'src/manifest/icon.png',
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
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-sitemap',
  ],
};
