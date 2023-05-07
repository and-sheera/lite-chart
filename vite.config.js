import path, { resolve } from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vite'
import viteBabel from 'vite-plugin-babel'
import viteMultipage from 'vite-plugin-multipage'
import vitePug from 'vite-plugin-pug-transformer'
import viteEslint from 'vite-plugin-eslint'
import viteStylelint from 'vite-plugin-stylelint'
import viteSassGlob from 'vite-plugin-sass-glob-import'

const root = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'src')
const outDir = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'dist')

export default defineConfig({
  root,
  base: './',
  clearScreen: false,
  build: {
    outDir,
    emptyOutDir: true,
    chunkSizeWarningLimit: '1024',
    lib: {
      entry: resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'src/js/index.js'),
      name: 'lite-chart',
      fileName: 'lite-chart'
    },
    // rollupOptions: {
    //   output: {
    //     assetFileNames: (assetInfo) => {
    //       let extType = assetInfo.name.split('.')[1]
    //       if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
    //         extType = 'images'
    //       } else if (extType === 'css') {
    //         extType = 'styles'
    //       }
    //       return `${extType}/[name][extname]`
    //     },
    //     chunkFileNames: 'scripts/scripts.js'
    //   }
    // }
  },
  plugins: [
    viteBabel({
      presets: ['@babel/preset-env']
    }),
    // viteMultipage({
    //   mimeCheck: true,
    //   open: '/',
    //   pageDir: 'pages',
    //   purgeDir: 'pages',
    //   removePageDirs: true,
    //   rootPage: 'index.html'
    // }),
    vitePug({
      pugOptions: {
        pretty: true
      }
    }),
    viteEslint({
      failOnError: false
    }),
    viteStylelint(),
    viteSassGlob()
  ]
})