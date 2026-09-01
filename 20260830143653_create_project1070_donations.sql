/*
# Create public donations for Project 10/70

1. New Tables
- `donations`
- `id` (uuid, primary key)
- `name` (text, public donor display name)
- `amount_eur` (numeric, donated euro amount)
- `message` (text, optional public encouragement)
- `created_at` (timestamptz, submission time)

2. Security
- Row-level security is enabled.
- Anonymous and authenticated visitors may submit donations and read recent public donations.
- The table is intentionally shared because this is a public campaign and no sign-in is required.

3. Important notes
- The frontend converts each euro into one sponsored height meter.
- Donor names and messages are shown publicly in the recent supporter feed.
*/

CREATE TABLE IF NOT EXISTS public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  amount_eur numeric(10, 2) NOT NULL CHECK (amount_eur >= 1 AND amount_eur <= 100000),
  message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 240),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read recent donations" ON public.donations;
CREATE POLICY "Public can read recent donations"
ON public.donations FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Public can submit donations" ON public.donations;
CREATE POLICY "Public can submit donations"
ON public.donations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "No public donation updates" ON public.donations;
CREATE POLICY "No public donation updates"
ON public.donations FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No public donation deletes" ON public.donations;
CREATE POLICY "No public donation deletes"
ON public.donations FOR DELETE
TO anon, authenticated
USING (false);

CREATE INDEX IF NOT EXISTS donations_created_at_idx ON public.donations (created_at DESC);
