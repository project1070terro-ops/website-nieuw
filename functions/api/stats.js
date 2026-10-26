import { getSupabase } from '../_lib/supabase.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const supabase = getSupabase(env);

    const [{ data: stats, error: statsError }, { data: donations, error: donationsError }] = await Promise.all([
      supabase.from('training_stats').select('*').eq('id', 1).single(),
      supabase.from('donations').select('amount_eur'),
    ]);

    if (statsError) throw statsError;
    if (donationsError) throw donationsError;

    const totalDonated = donations?.reduce((sum, d) => sum + Number(d.amount_eur), 0) ?? 0;
    const charityGoal = Number(env.CHARITY_GOAL_EUR || env.VITE_CHARITY_GOAL_EUR || 17500);

    return jsonResponse({
      ok: true,
      stats: stats || {
        strava_kilometers_ytd: 0,
        strava_elevation_ytd: 0,
        intervals_ctl: 0,
        updated_at: null,
      },
      totalDonated,
      charityGoal,
    });
  } catch (error) {
    console.error('[stats] error:', error);
    return jsonResponse({ ok: false, error: error.message || 'Internal server error' }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
