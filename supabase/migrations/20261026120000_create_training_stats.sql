/*
# Create public.training_stats table for live Strava/Intervals.icu data

1. New Table
- `training_stats`
- `id` (integer, primary key, fixed at 1 for a single dashboard row)
- `strava_kilometers_ytd` (numeric, cumulative training kilometers since the start date)
- `strava_elevation_ytd` (numeric, cumulative training elevation meters since the start date)
- `intervals_ctl` (numeric, latest Fitness/CTL score from Intervals.icu)
- `updated_at` (timestamptz, last sync timestamp)

2. Security
- Row-level security is enabled.
- Anonymous and authenticated visitors may read the single public dashboard row.
- The service role (used by Cloudflare Workers) may update the row.
*/

CREATE TABLE IF NOT EXISTS public.training_stats (
  id integer PRIMARY KEY DEFAULT 1,
  strava_kilometers_ytd numeric(12,2) NOT NULL DEFAULT 0,
  strava_elevation_ytd numeric(12,2) NOT NULL DEFAULT 0,
  strength_training_hours numeric(10,2) NOT NULL DEFAULT 0,
  intervals_ctl numeric(8,2) NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.training_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read training stats" ON public.training_stats;
CREATE POLICY "Public can read training stats"
ON public.training_stats FOR SELECT
TO anon, authenticated
USING (true);

INSERT INTO public.training_stats (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;
