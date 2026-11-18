/*
# Create public.strava_tokens for OAuth access/refresh token storage

- Service role only; public users never need to read or write tokens.
*/

CREATE TABLE IF NOT EXISTS public.strava_tokens (
  id integer PRIMARY KEY DEFAULT 1,
  access_token text,
  refresh_token text NOT NULL,
  expires_at timestamptz,
  scope text,
  athlete_id text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_strava_token CHECK (id = 1)
);

ALTER TABLE public.strava_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage strava tokens" ON public.strava_tokens;
CREATE POLICY "Service role can manage strava tokens"
ON public.strava_tokens
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON public.strava_tokens TO service_role;
