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
    // 生成HTML文件，并将Webpack生成的文件自动注入到HTML文件中。它还可以配置HTML文件的模板和输出路径等选项。
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

      // 针对 antd@4 相关 css/less 包 设置的打包规则
      {
        test: /\.css$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
