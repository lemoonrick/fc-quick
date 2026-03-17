import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'logo.png'],
      // REMOVED THE COMMENTS HERE - This is why your PWA wasn't showing up!
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: 'FC Quick',
        short_name: 'FC Quick',
        description: 'Fact-checks in seconds by Fact Crescendo.',
        theme_color: '#ffffff',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api/wp': {
        target: 'https://english.factcrescendo.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/wp/, '/wp-json/wp/v2'),
      },
      // Ensure NO /api/ai proxy exists here so Gemini can hit the direct URL
    },
  },
});
