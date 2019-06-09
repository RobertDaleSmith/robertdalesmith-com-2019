const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
              preserveWhitespace: true,
              verbose: true,
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
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '!!dust-html-loader!src/views/index.dust',
      // template: '!!dust-html-loader?root='+path.join(__dirname,'src/views')+'!src/views/index.dust',
      // template: '!!dust-loader-complete?htmlOutput=true&root='+path.join(__dirname,'src/views')+'!src/views/index.dust',
    }),
    new HtmlWebpackPlugin({
      filename: 'work/sumo/index.html',
      template: '!!dust-html-loader!src/views/sumo.dust',
    }),
    new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true,
    }),
    new CopyWebpackPlugin([{
      from: 'src/public',
      to: ''
    }]),
  ]
};
