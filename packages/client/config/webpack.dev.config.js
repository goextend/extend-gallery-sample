const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: {
    'gallery-sample': [
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/dev-server',
      path.join(__dirname, '../src/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: '/dev',
    publicPath: 'http://localhost:3001/',
    library: 'GallerySample',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
