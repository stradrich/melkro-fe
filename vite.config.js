import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
// import Vuetify from 'vuetify';
import ViteVuetifyPlugin from 'vite-plugin-vuetify';
import path from 'path';



export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      '@mdi/font/css/materialdesignicons.css': path.resolve(__dirname, 'node_modules/@mdi/font/css/materialdesignicons.css'),
    },
  },
  plugins: [
    vue(),
    // Vuetify(),
    ViteVuetifyPlugin()
  ],
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
  },
  // build: {
  //   rollupOptions: {
  //     external: ['vuetify/lib'],
  //   },
  // }
});
