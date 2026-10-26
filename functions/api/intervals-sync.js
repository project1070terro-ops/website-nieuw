import { getSupabase } from '../_lib/supabase.js';
import { fetchIntervalsCTL } from '../_lib/intervals.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-sync-secret',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const expected = env.SYNC_SECRET || env.VITE_SYNC_SECRET;
  const provided = request.headers.get('x-sync-secret');
  if (expected && provided !== expected) {
    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
  }

  try {
    const ctl = await fetchIntervalsCTL(env);
    const supabase = getSupabase(env);

    const { error } = await supabase.from('training_stats').upsert({
      id: 1,
      intervals_ctl: ctl,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    return jsonResponse({
      ok: true,
      intervalsCTL: ctl,
    });
  } catch (error) {
    console.error('[intervals-sync] error:', error);
    return jsonResponse({ ok: false, error: error.message || 'Sync failed' }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
