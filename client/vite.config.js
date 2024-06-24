import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/blogs": {
        target: "http://localhost:4000",
        secure: false,
      },
      "/api/user": {
        target: "http://localhost:4000",
        secure: false,
      },
    },
  },
  plugins: [react()],
})
