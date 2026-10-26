export interface DashboardStats {
  ok: boolean;
  stats: {
    strava_kilometers_ytd: number;
    strava_elevation_ytd: number;
    strength_training_hours: number;
    intervals_ctl: number;
    updated_at: string | null;
  };
  error?: string;
}

export async function loadDashboardStats(): Promise<DashboardStats | null> {
  try {
    const res = await fetch('/api/stats');
    const data = (await res.json()) as DashboardStats;
    if (!res.ok || !data.ok) {
      console.error('[stats] load failed:', data.error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('[stats] load error:', err);
    return null;
  }
}
