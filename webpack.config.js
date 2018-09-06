const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = [{
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(path.join(__dirname, "./dist")),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: false,
        commons: {
          name: 'commons',
          test: /.styl$/,
          chunks: 'all',
          enforce: true,
          minChunks: 1,
        },
        englishStyle: {
          name: 'styles_en',
          test: (c) => {
            return c.type.match(/mini-css-extract-plugin/) && c._identifier.indexOf('_ar') === -1;
          },
          chunks: 'all',
          priority: 1,
          enforce: true,
        },
        arabicStyles: {
          name: 'styles_ar',
          test: (c) => {
            return c.type.match(/mini-css-extract-plugin/) && c._identifier.indexOf('_ar') !== -1;
          },
          priority: 1,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader"
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ]
}]
