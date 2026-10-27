import { useEffect, useState } from 'react';
import { loadDashboardStats, type DashboardStats } from '../lib/stats';
import type { Language } from '../types';
import { BlogStats } from './BlogStats';

interface HomeStatsProps {
  language: Language;
}

export function HomeStats({ language }: HomeStatsProps) {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadDashboardStats().then(setDashboard).catch(() => setDashboard(null));
  }, []);

  return <BlogStats language={language} stats={dashboard?.stats ?? null} className="my-8" />;
}
