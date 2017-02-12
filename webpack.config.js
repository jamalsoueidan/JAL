const path = require('path');
const webpack = require('webpack');

const r = path.resolve

module.exports = {
  context: r(__dirname, './src'),
  entry: r(__dirname, './src/index.js'),
  output: {
    path: r(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: r(__dirname),
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        },
        exclude: [/node_modules/]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    modules: ['src', 'node_modules']
  },
};
