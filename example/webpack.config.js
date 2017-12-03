const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 3000,
  },
  entry: path.resolve(__dirname, './index.jsx'),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'img-preview': path.join(__dirname, '..', 'lib', 'index'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
  },
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
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
}
