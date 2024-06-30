import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import builtins from 'rollup-plugin-node-builtins'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
        '__dirname': '"/"',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        builtins(),
        rollupNodePolyFill(),
        commonjs({
          include: /node_modules/,
          extensions: ['.js', '.cjs'],
          requireReturnsDefault: "auto"
        }),
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
          presets: ['@babel/preset-env']
        })
      ]
    }
  },
  resolve: {
    alias: {
      'path': 'path-browserify',
      'util': 'util',
      'buffer': 'buffer',
    },
  },
})