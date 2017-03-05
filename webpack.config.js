const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1, modules: false },
            },
            "postcss-loader"
          ]
        })
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    modules: [r(__dirname, './src'), 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin("styles.css")
  ]
};
