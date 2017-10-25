const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env' : {
        'SHOW_MENU' : false
      }
    })
  ]
});
