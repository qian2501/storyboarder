const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/js/windows/language-preferences/window.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './../../src/build'),
    filename: 'language-preferences.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { electron: require('electron/package.json').version }
                }
              ],
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'THREE': 'three'
    })
  ],
  externals: {
    uws: "uws"
  }
}
