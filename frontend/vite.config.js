import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ⚠️  CRITICAL FIX: was 'https://gamegrid-00vg.onrender.com' (friend's server)
//    Now points to YOUR local backend on port 5000

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});
