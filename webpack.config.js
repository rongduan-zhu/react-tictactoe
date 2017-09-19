var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  devtool: 'inline-source-map',
  devServer: {
      contentBase: './dist'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'Tic Tac Toe'
  })]
};

module.exports = config;
