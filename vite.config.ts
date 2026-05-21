import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    base: './',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: (moduleId) => {
            if (moduleId.includes('node_modules')) {
              if (moduleId.includes('lucide-react') || moduleId.includes('react')) {
                return 'vendor';
              }
              if (moduleId.includes('motion')) {
                return 'motion';
              }
              if (moduleId.includes('argdown')) {
                return 'argdown';
              }
            }
          },
        },
      },
    },
  };
});
