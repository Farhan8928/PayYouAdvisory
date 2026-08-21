import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5175, open: true },
  build: {
    // Every page is prerendered to static HTML, so the JS bundle only has to
    // hydrate. Keeping it in one chunk beats code-splitting here: the whole
    // client bundle is smaller than a single stock photograph would be, and a
    // second round-trip costs more than the bytes saved.
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
})
