const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')
const commonjs = require('@rollup/plugin-commonjs')
const path = require('path')
const pkg = require('../../package.json')

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...require('module').builtinModules
]

module.exports = defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  esbuild: {
    loader: 'jsx',
    include: /\.js$/,
    exclude: []
  },
  build: {
    outDir: path.resolve(__dirname, '../../src/build'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, '../../src/js/windows/print-project/window.js'),
      formats: ['cjs'],
      fileName: () => 'print-project.js'
    },
    rollupOptions: {
      plugins: [commonjs()],
      external: externals
    }
  }
})
