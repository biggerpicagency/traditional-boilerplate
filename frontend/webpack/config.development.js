// You can add other webpack configuration (plugins, loaders, etc).
const entry = require('./entry');

module.exports = {
  entry,
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  output: {
    filename: '[name].js',
    pathinfo: false,
  },
  module: {
    rules: [{
        test: /\.js/,
        exclude: /(node_modules)/,
        use: [{
            loader: 'babel-loader'
        }]
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  }
};


