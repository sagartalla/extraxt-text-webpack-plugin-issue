const path = require("path");

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const english_css = new ExtractTextWebpackPlugin("english.css");
const arabic_css = new ExtractTextWebpackPlugin("arabic.css");


module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(path.join(__dirname, "./dist")),
  },
  module: {
    rules: [
      {
        test: /\.styl/,
        exclude: /_ar/,
        use: english_css.extract({
          use: "css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!stylus-loader",
        })
      },
      {
        test: /\.styl/,
        use: arabic_css.extract({
          use: "css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!stylus-loader",
        })
      },
    ]
  },
  plugins: [
    english_css,
    arabic_css
  ]
}
