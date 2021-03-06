/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
// import { dependencies } from '../package.json';

export default {
  // externals: [...Object.keys(dependencies || {})],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app')
    // https://github.com/webpack/webpack/issues/1114
    // libraryTarget: 'var'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin()
  ]
};
