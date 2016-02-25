var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var options = require("./webpack.dev.config");

options.entry = options.entry[-1];

options.output.path = __dirname + '/dist';
options.output.publicPath = "/dist/";

options.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': false,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    },
    sourceMap: false
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
];

delete options.debug;
delete options.devtool;
