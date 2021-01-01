const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
  context: `${__dirname}/src`,
  entry: {
    background: './background',
    'content-script': './content-script',
    options: './options',
    popup: './popup',
  },
  output: {
    path: `${__dirname}/app/`,
    filename: '[name].js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(css|jpg|gif|png|woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        'icon.png',
        {
          from: 'manifest.json',
          transform: (content) => {
            return Buffer.from(
              JSON.stringify({
                ...JSON.parse(content.toString()),
                name: process.env.npm_package_productName,
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
              })
            )
          },
        },
        'content-script.css',
      ],
    }),
    new HtmlWebpackPlugin({
      template: './options.html',
      filename: './options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: './popup.html',
      filename: './popup.html',
      chunks: ['popup'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '~~': `${__dirname}/`,
      '~': `${__dirname}/src/`,
    },
  },
}
