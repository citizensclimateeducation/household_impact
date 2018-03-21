const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
 entry: ["babel-polyfill", "./src/main.js"],
 plugins: [
   new UglifyJSPlugin(),
   new webpack.DefinePlugin({
     'process.env' : {
       'SHOW_MENU' : false
     }
   })
 ]
});
