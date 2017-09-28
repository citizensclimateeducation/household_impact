const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const provide = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery'
});

module.exports = {
     entry: './src/main.js',
     output: {
         path: __dirname + '/build',
         filename: 'main.bundle.js'
     },
     devServer: {
         inline: true,
         contentBase: './build',
         port: 3000
     },
    module: {
    loaders: [
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
