const fs = require('fs')
const path = require('path')

exports.default = async function beforeBuild (context) {
  console.log('  + scripts/electron-builder-before-build.js')

  return true
}
