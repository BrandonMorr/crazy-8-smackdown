const path    = require('path');
const webpack = require('webpack');

const public      = path.join(__dirname, 'public');
const nodeModules = path.join(__dirname, 'node_modules');
const server      = path.join(__dirname, 'src/client/server');
const client      = path.join(__dirname, 'src/client/index.js');

const definePlugin = new webpack.DefinePlugin({
  CANVAS_RENDERER: JSON.stringify(true),
  WEBGL_RENDERER:  JSON.stringify(true)
});

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [ definePlugin ],
  entry: {
    app: [ client ],
    vendor: [ 'phaser' ]
  },
  output: {
    path: public,
    filename: 'bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ nodeModules, server ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|ico|svg|pvr|pkm|static|ogg|mp3|wav)$/,
        exclude: [ nodeModules ],
        use: [ 'file-loader' ]
      },
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
