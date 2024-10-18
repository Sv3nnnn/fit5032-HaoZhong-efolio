import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 根据环境变量设置 base 路径
  base: process.env.NODE_ENV === 'production'
    ? '/fit5032-HaoZhong-efolio/'  // 生产环境下的基础路径（GitHub repository name）
    : '/'  // 开发环境的基础路径
})
