const path = require('path');

module.exports = {
  // entry: './src/App.js',
  entry: './src/js/App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: [
        /\.js/
      ],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
      }
      }
    }]
  }
};