import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/ARCarpet/',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                detail: resolve(__dirname, 'detail.html')
            }
        },
        sourcemap: false,
        minify: true,
        emptyOutDir: true
    },
    server: {
        port: 5173,
        host: true
    }
});
