import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const VITE_KEYS = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_SANITY_PROJECT_ID',
    'VITE_SANITY_DATASET',
    'VITE_SANITY_API_VERSION',
    'VITE_SANITY_USE_CDN',
    'VITE_TRAINING_START_DATE',
    'VITE_STRAVA_ACCESS_TOKEN',
    'VITE_INTERVALS_ICU_API_KEY',
    'VITE_INTERVALS_ATHLETE_ID',
  ];

  const define: Record<string, string> = {};
  for (const key of VITE_KEYS) {
    const value = process.env[key] ?? env[key];
    if (value !== undefined) {
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
