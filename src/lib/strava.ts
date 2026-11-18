export interface StravaYTD {
  kilometers: number;
  elevation: number;
}

const ACCESS_TOKEN = import.meta.env.VITE_STRAVA_ACCESS_TOKEN;
const START_DATE = import.meta.env.VITE_TRAINING_START_DATE ?? '2029-01-01';

const startTimestamp = Math.floor(new Date(START_DATE).getTime() / 1000);

export async function fetchStravaYTD(): Promise<StravaYTD> {
  // Let op: deze fetcher is bewust nog NIET actief in de UI.
  // Hij is klaargezet voor toekomstige live-synchronisatie vanaf 2029.
  if (!ACCESS_TOKEN) {
    return { kilometers: 0, elevation: 0 };
  }

  const perPage = 200;
  let page = 1;
  let totalKm = 0;
  let totalElev = 0;
  let fetched: any[] = [];
  const seenIds = new Set<string>();

  do {
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${startTimestamp}&per_page=${perPage}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    );

    if (!res.ok) {
      throw new Error(`Strava API error: ${res.status} ${res.statusText}`);
    }

    const activities = (await res.json()) as any[];
    if (!Array.isArray(activities) || activities.length === 0) {
      break;
    }

    fetched = activities;
    for (const a of activities) {
      // Prefer id_str to avoid 64-bit integer precision issues in JavaScript.
      const idStr = a.id_str ?? (a.id != null ? String(a.id) : null);
      if (idStr) {
        if (seenIds.has(idStr)) continue;
        seenIds.add(idStr);
      }
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
