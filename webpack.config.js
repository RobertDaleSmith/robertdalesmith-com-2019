const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  devServer: {
    contentBase: './build',
    compress: false,
    port: 3000,
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        } 
      },
      {
        test: /.(?:sass|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader', {
            loader: 'sass-loader',
            query: {
              includePaths: [path.resolve(__dirname, 'node_modules')]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style/[name].css",
      chunkFilename: 'style/[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/home.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/work/sumo.html',
      filename: 'work/sumo/index.html',
    }),
    new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true,
    }),
    new CopyWebpackPlugin([{
      from: 'src/public',
      to: ''
    }]),
  ],
  externals: [
    'foundation-sites',
  ]
};
