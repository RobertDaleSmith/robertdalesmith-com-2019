const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

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
    filename: devMode ? 'js/[name].js' : 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/'
  },
  watch: true,
  resolveLoader: {
    alias: {
      'dust-loader-complete': path.resolve('./libs/dust-loader-complete.js')
    }
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src/views')],
    extensions: ['.js','.dust'],
  },
  module: {
    rules: [
      {
        test: /\.dust$/,
        use: [
          {
            loader: 'dust-loader-complete',
            options: {
              root: path.join(__dirname, 'src', 'views'),
              ignoreImages: true,
              preserveWhitespace: false,
              wrapOutput: false,
              htmlOutput: false,
            }
          },
        ]
      },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          }, 'css-loader', {
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
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      dust: 'dustjs-linkedin'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '!!dust-html-loader!src/views/home.dust',
    }),
    new HtmlWebpackPlugin({
      filename: 'work/sumo/index.html',
      template: '!!dust-html-loader?base=../../!src/views/work-sumo.dust',
    }),
    new HtmlWebpackPlugin({
      filename: 'work/bouncing-pixel/index.html',
      template: '!!dust-html-loader?base=../../!src/views/work-bouncingpixel.dust',
    }),
    new HtmlWebpackPlugin({
      filename: 'work/mote-labs/index.html',
      template: '!!dust-html-loader?base=../../!src/views/work-motelabs.dust',
    }),
    new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'style/[name].css' : 'style/[name].[hash].css',
      chunkFilename: devMode ? 'style/[id].css' : 'style/[id].[hash].css',
    }),
    new CopyWebpackPlugin([{
      from: 'src/public',
      to: ''
    }]),
  ]
};
