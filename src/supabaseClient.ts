import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (supabaseUrl && !supabaseUrl.includes('supabase.co')) {
  console.error('[supabaseClient] VITE_SUPABASE_URL does not look like a Supabase URL:', supabaseUrl);
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
