import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {target: "https://web-chat-api-three.vercel.app",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      'react-icons': 'node_modules/react-icons',
    },
  },
})
