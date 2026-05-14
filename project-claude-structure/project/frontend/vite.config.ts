import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Amauta - Simulacro de Admisión',
        short_name: 'Amauta',
        description: 'Plataforma de simulacros de examen de admisión',
        theme_color: '#6200EE',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8081,
    host: true,
    hmr: {
      host: 'localhost',
      port: 8082,
      protocol: 'ws'
    },
    proxy: {
      '/api': {
        target: 'https://backapi.simulacroadmision.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      }
    }
  }
})
