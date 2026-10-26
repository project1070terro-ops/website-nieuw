export async function fetchIntervalsCTL(env) {
  const apiKey = env.INTERVALS_ICU_API_KEY || env.VITE_INTERVALS_ICU_API_KEY;
  const athleteId = env.INTERVALS_ATHLETE_ID || env.VITE_INTERVALS_ATHLETE_ID;

  if (!apiKey || !athleteId) {
    throw new Error('Intervals.icu not configured: set INTERVALS_ICU_API_KEY and INTERVALS_ATHLETE_ID (or VITE_ variants)');
  }

  const res = await fetch(
    `https://intervals.icu/api/v1/athlete/${athleteId}/wellness?key=${apiKey}&limit=1`
  );

  if (!res.ok) {
    const err = await res.text().catch(() => 'Unknown Intervals.icu error');
    throw new Error(`Intervals.icu API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const latest = Array.isArray(data) ? data[0] : data;
  if (!latest) return 0;

  const ctl = latest.ctl ?? latest.fitness ?? latest.fitnessScore ?? 0;
  return typeof ctl === 'number' ? ctl : 0;
}
