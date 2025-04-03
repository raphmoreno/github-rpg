import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup/index.html',
        background: 'src/background/index.js',
        content: 'src/content/index.js',
      },
    },
  },
}); 