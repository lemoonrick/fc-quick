import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // All /api/wp calls in dev get proxied to the real site
      // This kills CORS completely during local development
      '/api/wp': {
        target: 'https://english.factcrescendo.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/wp/, '/wp-json/wp/v2'),
      },
      // Proxy for Anthropic API — keeps your key off the browser in network logs
      '/api/ai': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/ai/, ''),
      },
    },
  },
});
