const rules = require('./webpack.rules');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// define the asset directories
// by default "models" is added which contains weights
// for various TF.js models - feel free to add others
const assets = [ 'models' ];

const copyPlugin = new CopyWebpackPlugin(
  {
    patterns: assets.map(asset => ({
      from: path.resolve(__dirname, 'src', asset),
      to: path.resolve(__dirname, '.webpack/renderer', asset)
    }))
  }
);

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // put your normal webpack config below here
  module: {
    rules
  },
  plugins: [ copyPlugin ]
};
