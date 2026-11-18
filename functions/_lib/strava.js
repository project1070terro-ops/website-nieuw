import { getSupabase } from './supabase.js';

const RIDE_TYPES = ['Ride', 'VirtualRide', 'GravelRide', 'MountainBikeRide'];
const STRENGTH_TYPES = ['WeightTraining', 'Workout', 'Crossfit', 'FunctionalStrengthTraining', 'HIIT'];
const DEFAULT_REDIRECT_URI = 'https://project1570.pages.dev/api/strava-callback';

function isRide(type) {
  return RIDE_TYPES.includes(type);
}

function isStrength(type) {
  return STRENGTH_TYPES.includes(type);
}

export function getStravaAuthorizeUrl(env) {
  const clientId = env.STRAVA_CLIENT_ID || '85976';
  const redirectUri = env.STRAVA_REDIRECT_URI || DEFAULT_REDIRECT_URI;
  const scope = 'activity:read_all';
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    approval_prompt: 'auto',
    scope,
  });
  return `https://www.strava.com/oauth/authorize?${params.toString()}`;
}

async function refreshStravaAccessToken(env, tokens) {
  const clientId = env.STRAVA_CLIENT_ID || '85976';
  const clientSecret = env.STRAVA_CLIENT_SECRET;

  if (!clientSecret) {
    throw new Error('STRAVA_CLIENT_SECRET is not configured');
  }

  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: tokens.refresh_token,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.message || JSON.stringify(data) || 'unknown error';
    throw new Error(`Strava refresh failed: ${res.status} ${msg}`);
  }

  const accessToken = data.access_token;
  const refreshToken = data.refresh_token || tokens.refresh_token;
  const expiresIn = typeof data.expires_in === 'number' ? data.expires_in : 21600;
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

  return { accessToken, refreshToken, expiresAt, scope: data.scope, athleteId: data.athlete?.id_str || String(data.athlete?.id || '') };
}

async function saveStravaTokens(supabase, tokenData) {
  const { error } = await supabase.from('strava_tokens').upsert({
    id: 1,
    access_token: tokenData.accessToken,
    refresh_token: tokenData.refreshToken,
    expires_at: tokenData.expiresAt,
    scope: tokenData.scope,
    athlete_id: tokenData.athleteId,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' });

  if (error) {
    console.error('[strava] save tokens error:', error);
    throw new Error('Could not save Strava tokens to database');
  }
}

export async function getStravaAccessToken(env) {
  const clientId = env.STRAVA_CLIENT_ID || '85976';
  const clientSecret = env.STRAVA_CLIENT_SECRET;

  if (!clientSecret) {
    throw new Error(
      `STRAVA_CLIENT_SECRET is not configured. ` +
      `Set STRAVA_CLIENT_ID (defaults to ${clientId}) and STRAVA_CLIENT_SECRET in Cloudflare Pages environment variables.`
    );
  }

  const supabase = getSupabase(env);
  const { data: tokens, error } = await supabase
    .from('strava_tokens')
    .select('access_token, refresh_token, expires_at')
    .eq('id', 1)
    .single();

  if (error || !tokens?.refresh_token) {
    throw new Error(
      'No Strava refresh token found. ' +
      `Authorize the application first: ${getStravaAuthorizeUrl(env)}`
    );
  }

  // Refresh 5 minutes before expiry to avoid race conditions.
  const expiresAt = tokens.expires_at ? new Date(tokens.expires_at).getTime() : 0;
  const needsRefresh = !tokens.access_token || Date.now() > expiresAt - 5 * 60 * 1000;

  if (!needsRefresh) {
    return tokens.access_token;
  }

  console.log('[strava] refreshing access token');

  const tokenData = await refreshStravaAccessToken(env, tokens);
  await saveStravaTokens(supabase, tokenData);

  return tokenData.accessToken;
}

export async function exchangeStravaCode(env, code) {
  const clientId = env.STRAVA_CLIENT_ID || '85976';
  const clientSecret = env.STRAVA_CLIENT_SECRET;
  const redirectUri = env.STRAVA_REDIRECT_URI || DEFAULT_REDIRECT_URI;

  if (!clientSecret) {
    throw new Error('STRAVA_CLIENT_SECRET is not configured');
  }

  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.message || JSON.stringify(data) || 'unknown error';
    throw new Error(`Strava code exchange failed: ${res.status} ${msg}`);
  }

  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;
  const expiresIn = typeof data.expires_in === 'number' ? data.expires_in : 21600;
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
  const athleteId = data.athlete?.id_str || String(data.athlete?.id || '');

  const supabase = getSupabase(env);
  await saveStravaTokens(supabase, {
    accessToken,
    refreshToken,
    expiresAt,
    scope: data.scope,
    athleteId,
  });

  return { accessToken, refreshToken, expiresAt, scope: data.scope, athleteId };
}

export async function fetchStravaActivities(env, afterTimestamp) {
  const token = await getStravaAccessToken(env);

  let startTimestamp;
  if (afterTimestamp != null && !isNaN(afterTimestamp)) {
    startTimestamp = Math.floor(afterTimestamp);
  } else {
    const startDate = env.TRAINING_START_DATE || env.VITE_TRAINING_START_DATE || '2027-01-01';
    startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
  }

  const perPage = 200;
  let page = 1;
  let fetched = [];
  const activities = [];

  do {
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${startTimestamp}&per_page=${perPage}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      const err = await res.text().catch(() => 'Unknown Strava error');
      throw new Error(`Strava API error: ${res.status} ${err}`);
    }

    fetched = await res.json();
    if (!Array.isArray(fetched) || fetched.length === 0) {
      break;
    }

    for (const a of fetched) {
      const type = a.type ?? '';
      if (!isRide(type) && !isStrength(type)) {
        continue;
      }

      // Use the future-proof id_str field instead of the numeric id.
      const id_str = a.id_str ?? (a.id != null ? String(a.id) : '');

      activities.push({
        id_str,
        type,
        distance_meters: a.distance ?? 0,
        elevation_meters: a.total_elevation_gain ?? 0,
        moving_time_seconds: a.moving_time ?? 0,
        start_date: a.start_date ? new Date(a.start_date).toISOString() : null,
      });
    }

    page++;
  } while (fetched.length === perPage);

  return activities;
}

export async function fetchStravaYTD(env) {
  const activities = await fetchStravaActivities(env);

  let totalKm = 0;
  let totalElev = 0;
  let strengthSeconds = 0;

  for (const a of activities) {
    if (isRide(a.type)) {
      totalKm += a.distance_meters / 1000; // meters -> kilometers
      totalElev += a.elevation_meters; // meters
    }
    if (isStrength(a.type)) {
      strengthSeconds += a.moving_time_seconds;
    }
  }

  return {
    kilometers: Math.round(totalKm),
    elevation: Math.round(totalElev),
    strengthHours: +(strengthSeconds / 3600).toFixed(1),
  };
}
