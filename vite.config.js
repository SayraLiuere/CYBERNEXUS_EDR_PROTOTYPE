import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CYBERNEXUS_EDR_PROTOTYPE/',
  server: {
    port: 5174,
    host: true,
    strictPort: false,
  },
})
