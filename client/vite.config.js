import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173, 
    proxy: {
      "/api/blogs": {
        target: "http://localhost:4000",
        secure: false,
      },
      "/api/upload": {
        target: "http://localhost:4000",
        secure: false,
      },    
      "/api/user": {
        target: "http://localhost:4000",
        secure: false,
      },    
      "/images": {
        target: "http://localhost:4000/assets/images/blogs",
        secure: false,
      },    
    },
  },
  plugins: [react()],
})
