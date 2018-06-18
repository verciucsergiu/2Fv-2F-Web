const path = require('path');
var glob = require("glob");

module.exports = {
  entry: {
    bundle: glob.sync("./src/**/*.js"),
    framework: glob.sync("./framework/**/*.js")
  },
  devtool: "source-map",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: "empty"
  },
  mode: "development"
};
