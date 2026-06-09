const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

function findTestFiles (dir, pattern) {
  const files = []
  function walk (d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach(entry => {
      const full = path.join(d, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.isFile() && pattern.test(entry.name)) files.push(full)
    })
  }
  walk(dir)
  return files
}

const testDir = path.resolve(__dirname, '..', 'test')

const unitTests = findTestFiles(testDir, /(?<!\.renderer)(?<!\.main)\.test\.js$/)
if (unitTests.length) {
  console.log(`Running ${unitTests.length} unit test(s)...`)
  execSync(`npx mocha ${unitTests.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' })
}

const rendererTests = findTestFiles(testDir, /\.renderer\.test\.js$/)
if (rendererTests.length) {
  console.log(`Running ${rendererTests.length} renderer test(s)...`)
  execSync(`npx electron-mocha --renderer ${rendererTests.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' })
}

const mainTests = findTestFiles(testDir, /\.main\.test\.js$/)
if (mainTests.length) {
  console.log(`Running ${mainTests.length} main process test(s)...`)
  execSync(`npx electron-mocha ${mainTests.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' })
}

console.log('All tests complete.')
