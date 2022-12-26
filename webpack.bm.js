const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./tests/benchmark.ts",
  output:{
    library: 'qrcode',
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    filename: '[name].js',
    chunkFilename: "[id].js",
  },
  mode: "development",
  devServer: {
    compress: true,
    open: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [__dirname + '/src', __dirname + '/tests'],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/typescript', '@babel/preset-env'],
        }
      },
      {
          test: /\.wasm$/,
          type: "asset/inline",
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
