import { getSupabase } from '../_lib/supabase.js';
import { fetchStravaActivities } from '../_lib/strava.js';

const RIDE_TYPES = ['Ride', 'VirtualRide', 'GravelRide', 'MountainBikeRide'];
const STRENGTH_TYPES = ['WeightTraining', 'Workout', 'Crossfit', 'FunctionalStrengthTraining', 'HIIT'];

function isRide(type) {
  return RIDE_TYPES.includes(type);
}

function isStrength(type) {
  return STRENGTH_TYPES.includes(type);
}

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

  const url = new URL(request.url);
  const startParam = url.searchParams.get('start');
  let afterTimestamp;
  if (startParam) {
    const parsed = Math.floor(new Date(startParam).getTime() / 1000);
    if (isNaN(parsed)) {
      return jsonResponse({ ok: false, error: 'Invalid ?start=YYYY-MM-DD' }, 400);
    }
    afterTimestamp = parsed;
  }

  try {
    const activities = await fetchStravaActivities(env, afterTimestamp);
    const supabase = getSupabase(env);

    // Store per-activity data with the future-proof string id_str.
    if (activities.length > 0) {
      const { error: upsertError } = await supabase
        .from('strava_activities')
        .upsert(activities, { onConflict: 'id_str' });

      if (upsertError) {
        console.error('[strava-sync] activities upsert error:', upsertError);
        throw upsertError;
      }
    }

    // Compute aggregate YTD statistics from the raw activity data.
    let totalKm = 0;
    let totalElev = 0;
    let strengthSeconds = 0;

    for (const a of activities) {
      if (isRide(a.type)) {
        totalKm += a.distance_meters / 1000;
        totalElev += a.elevation_meters;
      }
      if (isStrength(a.type)) {
        strengthSeconds += a.moving_time_seconds;
      }
    }

    const kilometers = Math.round(totalKm);
    const elevation = Math.round(totalElev);
    const strengthHours = +(strengthSeconds / 3600).toFixed(1);

    const { error } = await supabase.from('training_stats').upsert({
      id: 1,
      strava_kilometers_ytd: kilometers,
      strava_elevation_ytd: elevation,
      strength_training_hours: strengthHours,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    return jsonResponse({
      ok: true,
      stravaKilometersYTD: kilometers,
      stravaElevationYTD: elevation,
      activityCount: activities.length,
    });
  } catch (error) {
    console.error('[strava-sync] error:', error);
    return jsonResponse({ ok: false, error: error.message || 'Sync failed' }, 500);
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
