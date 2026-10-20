/*
# Create public subscribers for Project 15/70

1. New Tables
- `subscribers`
- `id` (uuid, primary key)
- `email` (text, unique, not null)
- `source` (text, default 'footer')
- `is_active` (boolean, default true)
- `created_at` (timestamptz, not null)

2. Security
- Row-level security is enabled.
- Anonymous and authenticated visitors may subscribe (INSERT).
- SELECT is restricted to the service_role (admin only).
*/

CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text NOT NULL DEFAULT 'footer',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can subscribe" ON public.subscribers;
CREATE POLICY "Public can subscribe"
ON public.subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can view subscribers" ON public.subscribers;
CREATE POLICY "Service role can view subscribers"
ON public.subscribers FOR SELECT
TO service_role
USING (true);

DROP POLICY IF EXISTS "No public subscriber updates" ON public.subscribers;
CREATE POLICY "No public subscriber updates"
ON public.subscribers FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No public subscriber deletes" ON public.subscribers;
CREATE POLICY "No public subscriber deletes"
ON public.subscribers FOR DELETE
TO anon, authenticated
USING (false);

CREATE INDEX IF NOT EXISTS subscribers_created_at_idx ON public.subscribers (created_at DESC);

-- Grants for the Data API
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT INSERT ON public.subscribers TO anon, authenticated;
GRANT SELECT ON public.subscribers TO service_role;
