const path    = require('path');
const webpack = require('webpack');

const dist        = path.join(__dirname, 'dist/');
const nodeModules = path.join(__dirname, 'node_modules/');

const definePlugin = new webpack.DefinePlugin({
  CANVAS_RENDERER: JSON.stringify(true),
  WEBGL_RENDERER:  JSON.stringify(true)
});

module.exports = {
  mode: 'development',
  plugins: [definePlugin],
  entry: {
    app: [path.resolve(__dirname, 'src/index.js')],
    vendor: ['phaser']
  },
  output: {
    path: dist,
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
        exclude: [nodeModules],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|ico|svg|pvr|pkm|static|ogg|mp3|wav)$/,
        exclude: [nodeModules],
        use: ['file-loader']
      },
    ]
  },
  devServer: {
    publicPath: '/dist/',
    contentBase: path.resolve(__dirname),
    compress: true,
    port: 9000
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
