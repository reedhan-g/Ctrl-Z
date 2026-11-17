import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({mode}) => ({
  plugins: [react(), ...(mode === 'embarko' ? [{
    name: 'embarko-simulation-entry',
    transformIndexHtml: {
      order: 'pre' as const,
      handler(html: string) {
        return html.replace('src="/src/main.tsx"', 'src="/src/embarko-main.tsx"');
      },
    },
  }] : [])],
  base: mode === 'embarko' ? '/' : '/Ctrl-Z/',
  build: {
    rollupOptions: {
      input: { landing: 'index.html', simulation: 'simulation.html' },
    },
  },
}));
