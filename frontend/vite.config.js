import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {target: "https://chat-application-api-backend.vercel.app",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@context': path.resolve(__dirname, 'src/Context'),
    },
  },
})




