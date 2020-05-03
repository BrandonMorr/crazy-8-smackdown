const path      = require('path');
const externals = require('webpack-node-externals');

const dist          = path.join(__dirname, 'dist');
const client        = path.join(__dirname, 'src/client');
const nodeModules   = path.join(__dirname, 'node_modules');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
  node: {
    __dirname: false
  },
  entry: './src/server/server.js',
  output: {
    path: path.join(dist),
    filename: 'server.bundle.js'
  },
  resolve: {
    extensions: [ '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ nodeModules,  ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: [ externals() ]
}
