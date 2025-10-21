import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/EnglishReminderClient/',
server: {
    allowedHosts: ['4ea2a1878e51.ngrok-free.app'],
    port: 5173
  }
})
