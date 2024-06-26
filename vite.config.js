import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {target:'https://api.keepincrm.com', ws: true, changeOrigin:true, secure: false}
    },
  }
})
