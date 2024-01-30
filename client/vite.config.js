import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        // target: 'https://as-b75n.onrender.com',
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true, // Add this line
      },
    },
    watch: {
      usePolling: true,
    },
  },
});
