const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { fetchShifts, fetchEmployees, updateShifts } = require('./api');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  devServer: {
    historyApiFallback: true,
    // noInfo: true,
    // overlay: true,
    before:(app) => {
      var bodyParser = require('body-parser');    
      app.use(bodyParser.json());
      console.log('before hi');
      app.get('/api/shifts', fetchShifts);
      app.get('/api/employees', fetchEmployees);
      app.put('/api/shifts/update', bodyParser.json(), updateShifts);
    }
  },
  output: {
    publicPath: './dist/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: './template/index.html',
      filename: '../index.html',
    }),
  ].filter((plugin) => !!plugin)
};
