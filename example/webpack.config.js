const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, './index.js'),
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'img-preview': path.join(__dirname, '..', 'src', 'index'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
}
