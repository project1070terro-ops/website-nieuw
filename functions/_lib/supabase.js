import { createClient } from '@supabase/supabase-js';

export function getSupabase(env) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase not configured: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_ equivalents) are required');
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
