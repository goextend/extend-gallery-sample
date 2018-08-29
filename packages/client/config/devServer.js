const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const wpConfig = require('./webpack.dev.config.js');

const options = {
  publicPath: 'http://localhost:3001/',
  hot: true,
  inline: true,
  historyApiFallback: true,
  proxy: {
    '*': 'http://localhost:3000',
  },
  quiet: false,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },

  stats: { colors: true },
  headers: { 'Access-Control-Allow-Origin': '*' },
};

new WebpackDevServer(webpack(wpConfig), options).listen(
  3001,
  'localhost',
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Webpack proxy listening on: http://localhost:3001');
      // Start the actual webserver.
      // require('../../../packages/cyclops-server/src/serve.js');
      require('@extend/gallery-sample-server');
    }
  },
);
