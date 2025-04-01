import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview:{
    port:5173,
    host:'0.0.0.0'
  },
  server:{
    port: 5173, // Explicit port declaration
    host: '0.0.0.0', // Crucial for Docker access
    strictPort: true, // Don't try other ports if 5173 is taken
    watch: {
      usePolling: true, // Needed for file watching in Docker
    }
  }
})
