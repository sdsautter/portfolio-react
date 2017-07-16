module.exports = {
  entry: [
    './app/app.js'
  ],
  output: {
    path: __dirname,
    publicPath: './public/',
    filename: 'public/assets/javascript/bundle.js'
  },
  module: {
    loaders: [{
    include: /app/, 
    //   exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
