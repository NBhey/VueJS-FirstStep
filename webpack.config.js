const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.js', // точка входа сборщика webpack
  output: {
    clean: true,
    path: path.resolve(__dirname, 'prod'),
    filename: 'index.[contenthash].js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      
      {
        test: /\.css$/i,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // HtmlWebpackPlugin создает index.html в директории с бандлом и автоматически добавляет в него ссылку на бандл.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,  'index.html'), // откуда брать шаблон
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'prod'),
    hot: true,
    port: 3000
  },
};
