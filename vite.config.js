import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/fallout-tbg-dices/',
  base: process.env.NODE_ENV === 'production' ? '/fallout-tbg-dices' : '',
})
