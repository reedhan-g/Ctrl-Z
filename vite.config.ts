import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: '/Ctrl-Z/',
  build: {
    rollupOptions: {
      input: { landing: 'index.html', simulation: 'simulation.html' },
    },
  },
});
