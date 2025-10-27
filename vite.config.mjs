import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Nokia WiFi App',
        short_name: 'WiFiApp',
        description: 'Mobile-style WiFi manager',
        theme_color: '#0078D7',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/home',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,  // ✅ allows access from your phone
    port: 5173,
  },
  preview: {
    host: true,  // ✅ allows PWA testing on phone
    port: 4173,
  },
});
