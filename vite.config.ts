import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
// Dummy change to force a fresh Cloudflare Pages production build.
export default defineConfig(({ mode }) => {
  const env = {
    ...loadEnv(mode, process.cwd(), 'VITE_'),
    ...loadEnv(mode, process.cwd(), 'SUPABASE_'),
  };

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

  // Allow Cloudflare Pages env vars without VITE_ prefix for Supabase
  const supabaseUrl = process.env.SUPABASE_URL ?? env.SUPABASE_URL;
  if (supabaseUrl !== undefined && !define['import.meta.env.VITE_SUPABASE_URL']) {
    define['import.meta.env.VITE_SUPABASE_URL'] = JSON.stringify(supabaseUrl);
  }
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? env.SUPABASE_ANON_KEY;
  if (supabaseAnonKey !== undefined && !define['import.meta.env.VITE_SUPABASE_ANON_KEY']) {
    define['import.meta.env.VITE_SUPABASE_ANON_KEY'] = JSON.stringify(supabaseAnonKey);
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
