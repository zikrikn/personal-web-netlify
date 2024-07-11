import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/medium': {
        target: 'http://localhost:8888/.netlify/functions/medium',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.netlify\/functions\/medium/, ''),
      },
      '/linkedin': {
        target: 'http://localhost:8888/.netlify/functions/linkedin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.netlify\/functions\/linkedin/, ''),
      },
    },
  },
});
