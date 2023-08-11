import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  let env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue({
        reactivityTransform: true,
        script: {
          defineModel: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    define: {
      'process.env': env
    },
    base: env.VITE_APP_BASE
  };
});
