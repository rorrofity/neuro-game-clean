const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Remove any existing CSS rules
  config.module.rules = config.module.rules.filter(rule => rule && rule.test && rule.test.toString() !== '/\\.css$/');

  // Add a new rule for CSS files
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    sideEffects: true,
  });

  // Add a new rule for JS files
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }
    }
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
  };

  // Set the correct public path for GitHub Pages
  if (env.mode === 'production') {
    config.output.publicPath = '/juego-flechas/';
  }

  // Add CopyWebpackPlugin to copy static assets
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
        { from: 'web-build/static', to: 'static' },
        { from: 'web-build/manifest.json', to: 'manifest.json' },
      ],
    })
  );

  return config;
};
