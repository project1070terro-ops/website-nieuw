import { getSupabase } from '../_lib/supabase.js';

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
    const supabase = getSupabase(env);

    // Remove all imported Strava activities.
    const { error: deleteError } = await supabase
      .from('strava_activities')
      .delete()
      .neq('id_str', '');

    if (deleteError) {
      console.error('[strava-reset] delete error:', deleteError);
      throw deleteError;
    }

    // Reset the aggregate training counters to zero.
    const { error: updateError } = await supabase
      .from('training_stats')
      .update({
        strava_kilometers_ytd: 0,
        strava_elevation_ytd: 0,
        strength_training_hours: 0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    if (updateError) {
      console.error('[strava-reset] update error:', updateError);
      throw updateError;
    }

    return jsonResponse({
      ok: true,
      message: 'Strava activities and training stats counters have been reset.',
    });
  } catch (error) {
    console.error('[strava-reset] error:', error);
    return jsonResponse({ ok: false, error: error.message || 'Reset failed' }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
