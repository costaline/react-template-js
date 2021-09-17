const cracoAlias = require('craco-alias');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cracoStyledJsx = require('craco-styled-jsx')
const sassResources = require('./src/assets/styles/resources');

const isTreemap = process.env.REACT_APP_BUNDLE_TREEMAP === 'true';

const getResources = (tail) => sassResources
  .reduce((all, resource, i, arr) => {
    const isLast = i === (arr.length - 1);

    return all + `@use '${resource}' as *` + tail + '\n' + (isLast ? '\n' : '');
  }, '');

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
    style: {
      sass: {
        loaderOptions: (sassLoaderOptions, { env, paths }) => {
          sassLoaderOptions.additionalData = (content, loaderContext) => {
            const { resourcePath, rootContext } = loaderContext;

            const tail = resourcePath.endsWith('.sass') ? '' : ';';

            return getResources(tail) + content;
          };

          return sassLoaderOptions;
        },
      },
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



