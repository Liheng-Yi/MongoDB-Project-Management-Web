const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  // Specify the entry point for your SCSS file
  entry: './public/stylesheets/personalLinks.scss',
  // Specify the output for your compiled CSS
  output: {
    path: path.resolve(__dirname, '../compiledCSS'),
    filename: 'bundle.js', // This is for JavaScript; for CSS, see the plugin below
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // This plugin extracts the CSS into a separate file
    new MiniCssExtractPlugin({
      filename: 'personalLinks.css', // The name of the output CSS file
    }),
  ],
};
