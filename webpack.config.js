const path = require('path');
const webpack = require('webpack');

// https://github.com/philolo1/webpack-react-hot-reloading-sample
const r = path.resolve

module.exports = {
  devtool: 'eval',
  context: r(__dirname, './src'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    r(__dirname, './src/hot_reload.js')
  ],
  output: {
    path: r(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    inline: false,
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [["es2015", { "modules": false }], "stage-0", "react"],
          plugins: ["react-hot-loader/babel"]
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    modules: [r(__dirname, './src/components'), 'node_modules']
  }
};
