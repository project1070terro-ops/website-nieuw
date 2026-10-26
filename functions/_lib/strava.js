export async function fetchStravaYTD(env) {
  const token = env.STRAVA_ACCESS_TOKEN || env.VITE_STRAVA_ACCESS_TOKEN;
  const startDate = env.TRAINING_START_DATE || env.VITE_TRAINING_START_DATE || '2027-01-01';

  if (!token) {
    throw new Error('Strava access token not configured: set STRAVA_ACCESS_TOKEN or VITE_STRAVA_ACCESS_TOKEN');
  }

  const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
  const perPage = 200;
  let page = 1;
  let totalKm = 0;
  let totalElev = 0;
  let fetched = [];

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

    const activities = await res.json();
    if (!Array.isArray(activities) || activities.length === 0) {
      break;
    }

    fetched = activities;
    for (const a of activities) {
      totalKm += (a.distance ?? 0) / 1000; // meters -> kilometers
      totalElev += a.total_elevation_gain ?? 0; // meters
    }

    page++;
  } while (fetched.length === perPage);

  return {
    kilometers: Math.round(totalKm),
    elevation: Math.round(totalElev),
  };
}
