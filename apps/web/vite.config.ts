import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@rishabh-store/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
  optimizeDeps: {
    include: ['recharts', 'framer-motion', 'lucide-react', '@react-three/fiber', '@react-three/drei', 'three', 'lenis'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide-vendor': ['lucide-react'],
          'chart-vendor': ['recharts'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
