module.exports = function({ env }) {
  return {
    plugins: [
      {
        plugin: require('craco-alias'),
        options: {
          source: 'jsconfig',
          baseUrl: require('./jsconfig.json').compilerOptions.baseUrl,
        },
      },
      {
        plugin: sassResourceLoader(),
        options: {
          resources: [
            './src/assets/styles/prepend-resources.scss',
          ],
        },
      }
    ]
  };
}

/*
 * from https://github.com/tilap/craco-sass-resources-loader
 * to fix resolve dependencies error
 */

function sassResourceLoader() {
  return {
    overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
      // Check webpack config
      if (
        !webpackConfig ||
        !webpackConfig.module ||
        !webpackConfig.module.rules ||
        typeof webpackConfig.module.rules !== 'object'
      ) {
        throw new Error('craco-sass-resources-loader error: no valid webpackConfig.module.rules');
      }

      // Add the loader rule where needed
      const output = {...webpackConfig};
      Object.keys(output.module.rules).forEach((ruleKey, ruleIndex) => {
        const rule = output.module.rules[ruleKey];
        if (Object.prototype.hasOwnProperty.call(rule, 'oneOf')) {
          rule.oneOf.forEach((oneOf, oneOfIndex) => {
            if (
              oneOf.test && oneOf.use &&
              (`${oneOf.test}`.includes('scss') || `${oneOf.test}`.includes('sass'))
            ) {
              const options = pluginOptions && pluginOptions.resources ? {
                resources: pluginOptions.resources,
              } : {};

              output.module.rules[ruleIndex].oneOf[oneOfIndex].use.push({
                loader: 'sass-resources-loader',
                options,
              })
            }
          })
        }
      })
      return output;
    }
  }
}
