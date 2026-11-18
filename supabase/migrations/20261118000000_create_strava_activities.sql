/*
# Create public.strava_activities for future-proof 64-bit Strava IDs

- Uses text `id_str` (recommended by Strava) instead of numeric `id`.
- Service role can upsert/read; public access is not required because aggregate stats live in training_stats.
*/

CREATE TABLE IF NOT EXISTS public.strava_activities (
  id_str text PRIMARY KEY,
  type text NOT NULL,
  distance_meters numeric(12,2) NOT NULL DEFAULT 0,
  elevation_meters numeric(12,2) NOT NULL DEFAULT 0,
  moving_time_seconds integer NOT NULL DEFAULT 0,
  start_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.strava_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage strava activities" ON public.strava_activities;
CREATE POLICY "Service role can manage strava activities"
ON public.strava_activities
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.strava_activities TO service_role;
