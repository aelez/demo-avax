/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const webpack = require('webpack');
const path = require('path');

exports.modifyWebpackConfig = ({ config, stage }) => {
  let { MOM_URL } = process.env;
  if (process.env.BRANCH === 'staging') MOM_URL = 'https://mom-staging.appac.us/mom.js';
  if (process.env.BRANCH === 'testing') MOM_URL = 'https://mom-testing.appac.us/mom.js';

  config.merge({
    plugins: [
      new webpack.DefinePlugin({
        _SSR_: stage === 'build-html',
        'process.env': {
          MOM_URL: JSON.stringify(MOM_URL),
          MOM_KEY: JSON.stringify(process.env.MOM_KEY),
        },
      }),
    ],
    resolve: {
      root: path.resolve(__dirname, './src'),
      extensions: ['', '.js', '.json', '.scss'],
    },
  });

  switch (stage) {
    case 'develop':
      config._config.entry.commons = [require.resolve('./polyfills.js')].concat(config._config.entry.commons);
      break;
    case 'build-javascript':
      config._config.entry.app = [require.resolve('./polyfills.js')].concat(config._config.entry.app);
      break;
    default:
      break;
  }

  return config;
};
