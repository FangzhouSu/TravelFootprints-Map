const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    // 当遇到 import A from './A' 时，会先寻找 A.js、找不到就去找 A.jsx，按照规则找，最后还是找不到，就会报错。
    extensions: ['.js', '.jsx', '.ts', '.tsx'],

    // 添加别名
    alias: {
      '@src': path.join(__dirname, '../', 'app/renderer'),
      '@assets': path.join(__dirname, '../', 'assets'),
      '@common': path.join(__dirname, '../', 'app/renderer/common'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  // 目录在每次重新编译时自动清理输出目录(dist)中的文件。这可以确保每次编译时不会留下之前编译的文件。
  // 打包之后还需要保留之前的文件 所以停用这个插件
  // plugins: [new CleanWebpackPlugin()],
};
