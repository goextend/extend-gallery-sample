const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: '../src/index.js',
  output: {
    filename: 'GallerySample.js',
    path: path.join(__dirname, 'build'),
    publicPath: '',
    library: 'GallerySample',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [__dirname],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!svg-react-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  node: {
    fs: 'empty',
    Buffer: true
  },
  plugins: [
    new ExtractTextPlugin('extend-hub.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
