import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './vite/plugins'
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE, VITE_PROXY } = env
  return defineConfig({
    base: VITE_APP_BASE,
    //打包index.umd.js的配置
    // build: {
    //   lib: {
    //     entry: resolve(__dirname, 'src/page/index.js'),
    //     name: 'AvueData',
    //     fileName: 'index',
    //     formats: ['umd']
    //   },
    //   rollupOptions: {
    //     external: ['vue', 'axios', 'AVUE'],
    //     output: {
    //       globals: {
    //         vue: 'Vue',
    //         AVUE: 'AVUE',
    //         axios: 'axios'
    //       },
    //     },
    //   },
    // },
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.esm-bundler.js',
        '~': resolve(__dirname, './'),
        "@": resolve(__dirname, "./src"),
        "components": resolve(__dirname, "./src/components"),
        "styles": resolve(__dirname, "./src/styles"),
        "utils": resolve(__dirname, "./src/utils"),
      }
    },
    plugins: createVitePlugins(env, command === 'build'),
    server: {
      https: false,
      host: true,
      port: 8100,
      proxy: {
        "/dev": {
          target: VITE_PROXY,//代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ""),
        },
      },
      open: true, //vite项目启动时自动打开浏览器
    },
  })
}
