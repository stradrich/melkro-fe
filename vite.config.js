import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default {
  plugins: [vue()],
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '@mdi/font/css/materialdesignicons.css': path.resolve(fileURLToPath(new URL('node_modules/@mdi/font/css/materialdesignicons.css', import.meta.url))),
    },
  },
  optimizeDeps: {
    exclude: ['src/assets/IMG_0912.JPG'],
  },
};
