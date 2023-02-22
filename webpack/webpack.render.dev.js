const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development',
  entry: {
    // 👇 对应渲染进程的 app.tsx 入口文件
    index: path.resolve(__dirname, '../app/renderer/app.tsx'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  target: 'electron-renderer',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 👇 以此文件为模版，自动生成 HTML
      template: path.resolve(__dirname, '../app/renderer/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['index'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/[\\/]node_modules[\\/].*antd/],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        exclude: [/[\\/]node_modules[\\/].*antd/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   // loaders: ['style-loader',
      //   //   {
      //   //     loader: 'css-loader',
      //   //     options: {
      //   //       modules: true,
      //   //       getLocalIdent: (loaderContext, localIdentName, localName, options) => {
      //   //         const fileName = path.basename(loaderContext.resourcePath)
      //   //         if (fileName.indexOf('global.scss') !== -1) {
      //   //           return localName
      //   //         } else {
      //   //           const name = fileName.replace(/\.[^/.]+$/, "")
      //   //           return `${name}__${localName}`
      //   //         }
      //   //       },
      //   //       // localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //   //     }
      //   //   }, 'css-loader'],
      //   use: [
      //     {
      //       loader: "style-loader"
      //     },
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         localIdentName: "[local]_[hash:base64:8]"
      //       }
      //     },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         // plugins: [
      //         //   autoprefixer({
      //         //     browsers: [
      //         //       '> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'
      //         //     ],
      //         //     remove: true
      //         //   })
      //         // ]
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "style-loader"
      //     },
      //     {
      //       loader: "less-loader",
      //       options: {
      //         modules: true,
      //         localIdentName: "[local]_[hash:base64:8]"
      //       }
      //     },
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         // plugins: [
      //         //   autoprefixer({
      //         //     browsers: [
      //         //       '> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'
      //         //     ],
      //         //     remove: true
      //         //   })
      //         // ]
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.css＄/,
      //   exclude: [/app/],
      //   use: [
      //     { Loader: "style-loader" },
      //     { 
      //       Loader: "css-Loader",
      //       options: {
      //         importLoaders: 1
      //       }
      //     },
      //   ]
      // },
      // {
      //   test: /\.less＄/,
      //   exclude: [/app/],
      //   use: [
      //     { Loader: "style-loader" },
      //     { 
      //       Loader: "less-Loader",
      //       options: {
      //         importLoaders: 1
      //       }
      //     },
      //   ]
      // },
      {
        test: /\.css$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.less$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: [
          {loader: 'style-loader'},
          {loader: 'less-loader'}
        ]
      },
    ],
  },
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
