const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/index.ts",
  output:{
    library: 'wc-qrcode',
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    // filename: '[name].min.js',
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? 'wc-qrcode.js' : 'wc-qrcode.[name].js';
    }
    // chunkFilename: "[id].js",
  },
  mode: "production",
  devServer: {
    compress: true,
    open: true,
  },
  devtool: "source-map",
  plugins: [],
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
        include: __dirname + '/src',
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
};
