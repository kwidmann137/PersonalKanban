const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true,
});

