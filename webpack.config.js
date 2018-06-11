const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 源代码的根目录
const srcRootPath = path.join(__dirname, './business/local-server/ui/src');

// 编译后的根目录
const distRootPath = path.resolve(srcRootPath, '../public');

// index.html 模版的根目录
const appHtmlPath = path.join(distRootPath, 'index.html');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: `${srcRootPath}/index.js`,
    vendor: [
      'react',
      'react-dom',
      'classnames',
      'react-router'
    ]
  },
  output: {
    path: `${distRootPath}`,
    filename: 'js/[name].bundle.js', // TODO hash [contenthash:8]
    chunkFilename: 'js/[id].chunk.js',
    publicPath: `/`
  },
  externals: { jquery: 'jQuery' },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      common: `${srcRootPath}/common`,
      root: `${srcRootPath}`,
      admin: `${srcRootPath}/admin`
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-0'],
            plugins: [['import', [{
              'libraryName': 'antd',
              'style': 'css'
            }]]]
          }
        }
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader',
            options: {
              noIeCompat: true
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/common.js' }),
    //new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtmlPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
};
