import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path'; // Add this import for path resolution

// https://vitejs.dev/config/
export default defineConfig({
    build: { outDir: 'build' },
    server: { port: 3000 },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Alias '@' to 'src/'
        },
    },
    plugins: [
        react(),
        tsconfigPaths(), // necessary to use absolute path imports
        svgr(), // necessary to import SVGs as React components
        checker({ typescript: true }), // necessary to check types during build
        VitePWA({ registerType: 'autoUpdate' }), // necessary to enable PWA
    ],
});
