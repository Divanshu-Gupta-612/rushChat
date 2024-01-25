import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://rush-chat-site.onrender.com/',
        ws: true,
      },
    },
    watch: {
      usePolling: true,
    },
  },
})
