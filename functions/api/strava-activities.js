import { getSupabase } from '../_lib/supabase.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-sync-secret',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const expected = env.SYNC_SECRET || env.VITE_SYNC_SECRET;
  const provided = request.headers.get('x-sync-secret');
  if (expected && provided !== expected) {
    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '5', 10), 20);

  try {
    const supabase = getSupabase(env);
    const { data: activities, error, count } = await supabase
      .from('strava_activities')
      .select('id_str, type, distance_meters, elevation_meters, moving_time_seconds, start_date', { count: 'exact' })
      .order('start_date', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return jsonResponse({
      ok: true,
      total: count ?? 0,
      sample: activities || [],
      idStrSample: (activities || []).map((a) => a.id_str),
    });
  } catch (error) {
    console.error('[strava-activities] error:', error);
    return jsonResponse({ ok: false, error: error.message || 'Internal server error' }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
