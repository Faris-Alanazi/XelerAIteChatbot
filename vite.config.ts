// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@/lib', replacement: resolve(__dirname, 'components/lib') },
      { find: '@', replacement: resolve(__dirname, '.') }
    ]
  },
  build: {
    lib: {
      entry: 'components/ui/XelerAIteChatbot.tsx',
      name: 'XelerAIteChatbot',
      fileName: (format) => `xeleraiTechatbot.${format}.js`,
      formats: ['umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  plugins: [react()]
});
