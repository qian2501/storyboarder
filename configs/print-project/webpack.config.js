const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    'print-project': './src/js/windows/print-project/window.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './../../src/build'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
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
  }
}
