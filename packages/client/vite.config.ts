import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

// https://vitejs.dev/config/
// ToDo не работает <ThemeProvider> в entry-ssr при preview
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  plugins: [react()],
  build: {
    outDir: path.join(__dirname, 'dist/client'),
  },
  // ssr: {
  //   noExternal: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'] // Возможно пригодится для ThemeProvider
  // },
  resolve: {
    alias: {
      apis: path.resolve('src/shared/apis/index'),
      images: path.resolve(__dirname, 'src/assets/img/index'),
      sounds: path.resolve('src/assets/sounds/index'),
      features: path.resolve('src/features/'),
      pages: path.resolve('src/pages/index'),
      components: path.resolve('src/shared/components/index'),
      themes: path.resolve('src/shared/themes/index'),
      utils: path.resolve('src/shared/utils/index'),
      validators: path.resolve('src/shared/validation/index'),
      constant: path.resolve('src/shared/constant/index'),
      transport: path.resolve('src/shared/transport/index'),
      services: path.resolve('src/shared/services/index'),
    },
  },
  // optimizeDeps: {
  //   include: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'] // Возможно пригодится для ThemeProvider
  // }
})
