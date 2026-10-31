/*
# Sponsors table + donation status

1. Adds `status` to `public.donations` so the meter only counts confirmed entries.
2. Creates `public.sponsors` to store sponsor lead details separately from one-off donations.
3. Existing donations are marked `confirmed` so the current meter value is preserved.
*/

-- 1. Add status column to donations
ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
  CHECK (status IN ('pending', 'confirmed', 'cancelled'));

-- Mark existing donations as already confirmed (they were already counting in the meter)
UPDATE public.donations
  SET status = 'confirmed'
  WHERE status = 'pending';

-- 2. Create sponsors table
CREATE TABLE IF NOT EXISTS public.sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL CHECK (char_length(company) BETWEEN 1 AND 80),
  contact_person text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text,
  tier text NOT NULL CHECK (tier IN ('Gold', 'Silver', 'Bronze')),
  amount_eur numeric(10, 2) NOT NULL CHECK (amount_eur >= 1 AND amount_eur <= 100000),
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS sponsors_status_idx ON public.sponsors (status);
CREATE INDEX IF NOT EXISTS sponsors_tier_idx ON public.sponsors (tier);

-- 3. Row Level Security
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read confirmed sponsors" ON public.sponsors;
CREATE POLICY "Public can read confirmed sponsors"
ON public.sponsors FOR SELECT
TO anon, authenticated
USING (status = 'confirmed');

DROP POLICY IF EXISTS "Public can submit sponsors" ON public.sponsors;
CREATE POLICY "Public can submit sponsors"
ON public.sponsors FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "No public sponsor updates" ON public.sponsors;
CREATE POLICY "No public sponsor updates"
ON public.sponsors FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No public sponsor deletes" ON public.sponsors;
CREATE POLICY "No public sponsor deletes"
ON public.sponsors FOR DELETE
TO anon, authenticated
USING (false);
