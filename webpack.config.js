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
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  require('postcss-import')(),
                  require('postcss-nested')(),
                  require('postcss-simple-vars')(),
                  require('autoprefixer')(),
                ];
              },
              syntax: 'postcss-scss'
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
  })]
};

module.exports = config;
