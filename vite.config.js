import {defineConfig} from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'
import {resolve} from 'path'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    createVuePlugin({
      vueTemplateOptions: {}
    }),
  ],
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      }
    ]
  },
})
