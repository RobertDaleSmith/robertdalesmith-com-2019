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
      'dust-html-loader': path.resolve('./loaders/dust-html-loader.js'),
      'dust-loader-complete': path.resolve('./loaders/dust-loader-complete.js')
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
          // { loader: 'html-loader' },
          // {
          //   loader: path.resolve('./loaders/dust-html-loader.js'),
          //   options: {
          //     root: path.join(__dirname, 'src', 'views'),
          //   },
          // },
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
      },
      { test: /\.hbs$/, loader: "handlebars-loader" }
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
      template: './src/views/index.html',
      filename: 'index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/views/work/bouncingpixel.html',
    //   filename: 'work/bouncingpixel/index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/views/work/motelabs.html',
    //   filename: 'work/motelabs/index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/views/work/sumo.html',
    //   filename: 'work/sumo/index.html',
    // }),
    new HtmlWebpackPlugin({
      filename: 'dust_test3/index.html',
      template: '!!html-loader!dust-loader-complete?htmlOutput=string&root='+path.join(__dirname,'src/views')+'!src/views/test.dust',
    }),
    new HtmlWebpackPlugin({
      filename: 'dust_test2/index.html',
      template: '!!dust-loader-complete?htmlOutput=true&root='+path.join(__dirname,'src/views')+'!src/views/test.dust',
    }),
    new HtmlWebpackPlugin({
      filename: 'dust_test1/index.html',
      template: '!!dust-html-loader?root='+path.join(__dirname,'src/views')+'!src/views/test.dust',
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
