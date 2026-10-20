import { supabase } from '../supabaseClient';

export async function subscribeEmail(email: string, source: string): Promise<{ error: string | null }> {
  if (!supabase) {
    console.error('subscribeEmail: no Supabase client available');
    return { error: 'Database connection not available' };
  }
  const clean = email.trim().toLowerCase();
  if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return { error: 'Invalid email address' };
  }

  const { error } = await supabase.from('subscribers').insert({ email: clean, source });
  if (error) {
    console.error('subscribeEmail insert error:', error);
    if (error.code === '23505') {
      // duplicate email: treat as success to avoid leaking subscription status
      return { error: null };
    }
    return { error: error.message };
  }
  return { error: null };
}
