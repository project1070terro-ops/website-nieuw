import { createClient } from '@supabase/supabase-js';

export function getSupabase(env) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const key =
    env.SUPABASE_SERVICE_ROLE_KEY ||
    env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase not configured: SUPABASE_URL and a Supabase key (service role or anon) are required');
  }

  const keySource = env.SUPABASE_SERVICE_ROLE_KEY
    ? 'SUPABASE_SERVICE_ROLE_KEY'
    : env.VITE_SUPABASE_SERVICE_ROLE_KEY
      ? 'VITE_SUPABASE_SERVICE_ROLE_KEY'
      : 'VITE_SUPABASE_ANON_KEY';

  console.log('[getSupabase] URL:', url, '| key source:', keySource, '| key prefix:', key.slice(0, 6) + '...' + key.slice(-6));

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
