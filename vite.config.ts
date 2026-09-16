import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const define: Record<string, string> = {};

  for (const [key, value] of Object.entries(env)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith('VITE_') && !(key in env)) {
      define[`import.meta.env.${key}`] = JSON.stringify(value);
    }
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: 5173,
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define,
  };
});
