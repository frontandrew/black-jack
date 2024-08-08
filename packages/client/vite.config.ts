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
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  // There is no ssr option like `format`: https://vitejs.dev/config/ssr-options
  // ssr: { format: 'cjs' },
  plugins: [react()],
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/assets/imgs/index'),
      sounds: path.resolve('src/assets/sounds/index'),
      features: path.resolve('src/features/'),
      pages: path.resolve('src/pages/index'),
      components: path.resolve('src/shared/components/index'),
      theme: path.resolve('src/shared/theme/index'),
      utils: path.resolve('src/shared/utils/index'),
      validators: path.resolve('src/shared/validation/index'),
    },
  },
})
