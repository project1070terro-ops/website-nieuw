const API_KEY = import.meta.env.VITE_INTERVALS_ICU_API_KEY;
const ATHLETE_ID = import.meta.env.VITE_INTERVALS_ATHLETE_ID;

export async function fetchIntervalsCTL(): Promise<number> {
  // Let op: deze fetcher is bewust nog NIET actief in de UI.
  // Hij is klaargezet voor toekomstige live-synchronisatie vanaf 2029.
  if (!API_KEY || !ATHLETE_ID) {
    return 0;
  }

  const res = await fetch(
    `https://intervals.icu/api/v1/athlete/${ATHLETE_ID}/wellness?key=${API_KEY}&limit=1`
  );

  if (!res.ok) {
    throw new Error(`Intervals.icu API error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as any;

  // Meest recente wellness-record bevat het actuele CTL-getal
  const latest = Array.isArray(data) ? data[0] : data;
  if (!latest) return 0;

  const ctl = latest.ctl ?? latest.fitness ?? latest.fitnessScore ?? 0;
  return typeof ctl === 'number' ? ctl : 0;
}
