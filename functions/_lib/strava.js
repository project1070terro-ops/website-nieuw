const RIDE_TYPES = ['Ride', 'VirtualRide', 'GravelRide', 'MountainBikeRide'];
const STRENGTH_TYPES = ['WeightTraining', 'Workout', 'Crossfit', 'FunctionalStrengthTraining', 'HIIT'];

function isRide(type) {
  return RIDE_TYPES.includes(type);
}

function isStrength(type) {
  return STRENGTH_TYPES.includes(type);
}

export async function fetchStravaActivities(env) {
  const token = env.STRAVA_ACCESS_TOKEN || env.VITE_STRAVA_ACCESS_TOKEN;
  const startDate = env.TRAINING_START_DATE || env.VITE_TRAINING_START_DATE || '2027-01-01';

  if (!token) {
    throw new Error('Strava access token not configured: set STRAVA_ACCESS_TOKEN or VITE_STRAVA_ACCESS_TOKEN');
  }

  const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
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
