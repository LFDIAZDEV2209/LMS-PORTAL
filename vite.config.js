import { defineConfig, loadEnv } from "vite";
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/js'),
        '@components': path.resolve(__dirname, './src/js/components'),
        '@pages': path.resolve(__dirname, './src/js/pages'),
        '@styles': path.resolve(__dirname, './src/css')
      }
    },
    build: {
      outDir: "./wwwroot/app/",
      sourcemap: mode !== 'production',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        }
      }
    },
    server: {
      host: env.VITE_HOST || 'localhost',
      port: parseInt(env.VITE_PORT) || 5173,
      open: true
    }
  };
});