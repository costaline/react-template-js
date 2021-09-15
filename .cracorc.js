const cracoAlias = require('craco-alias');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cracoStyledJsx = require('craco-styled-jsx')
const sassResourcesLoader = require('./.craco/sassResourcesLoader');

const isTreemap = process.env.REACT_APP_BUNDLE_TREEMAP === 'true';

module.exports = function({ env }) {
  const plugins = [];

  if (isTreemap) plugins.push(new BundleAnalyzerPlugin());

  return {
    webpack: {
      plugins: [...plugins],
    },
    babel: {
      presets: ["@emotion/babel-preset-css-prop"],
    },
    plugins: [
      {
        plugin: cracoAlias,
        options: {
          source: 'jsconfig',
          baseUrl: require('./jsconfig.json').compilerOptions.baseUrl,
        },
      },
      {
        plugin: sassResourcesLoader,
        options: {
          resources: ['./src/assets/styles/prepend-resources.scss'],
          hoistUseStatements: true,
        },
      },
      {
        plugin: cracoStyledJsx,
        options: {
          sass: true,
          cssFileSupport: true,
          cssFileTest: /\.styled\.(css|sass|scss)$/,
        }
      },
    ]
  };
}


