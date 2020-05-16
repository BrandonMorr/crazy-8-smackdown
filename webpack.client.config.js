const path    = require('path');
const webpack = require('webpack');

const www         = path.join(__dirname, 'public');
const nodeModules = path.join(__dirname, 'node_modules');
const server      = path.join(__dirname, 'src/server');
const client      = path.join(__dirname, 'src/client/client');

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
    path: path.join(www, 'js'),
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
        exclude: [ nodeModules, server ],
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
