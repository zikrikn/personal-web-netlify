import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/medium': {
        target: 'https://zikri.medium.com/feed', // Full URL with protocol and path
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/medium/, ''),
      },
      '/linkedin': {
        target: 'https://www.bing.com/search?q=site%3Alinkedin.com%2Fpulse%2F+%22zikri+kholifah+nur%22+intitle%3A%22zikri+kholifah+nur%22&format=rss', // Full URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/linkedin/, ''), 
      },
    },
  },
})
