const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const provide = new webpack.ProvidePlugin({
    $: 'jquery-easing',
    jQuery: 'jquery-easing',
    jquery: 'jquery-easing',
});

module.exports = {
     entry: './src/main.js',
     output: {
         path: __dirname + '/build',
         filename: 'main.bundle.js'
     },
     devServer: {
         inline: true,
         contentBase: __dirname + '/build',
         port: 3000
     },
    module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?importLoaders=1' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' }
    ],
  },

  plugins: [HtmlWebpackPluginConfig, provide]
};
