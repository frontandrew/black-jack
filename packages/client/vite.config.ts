import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/assets/imgs/index'),
      sounds: path.resolve('src/assets/sounds/index'),
      features: path.resolve('src/features/'),
      pages: path.resolve('src/pages/index'),
      consts: path.resolve('src/shared/consts/index'),
      components: path.resolve('src/shared/components/index'),
      theme: path.resolve('src/shared/theme/index'),
    },
  },
})
