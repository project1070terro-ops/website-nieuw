/*
# Make is_active on public.subscribers NOT NULL with a default of true.
# This removes the NULL option from the Supabase dropdown.
*/

-- Treat any existing NULL as active (safe default for current subscribers).
UPDATE public.subscribers
SET is_active = true
WHERE is_active IS NULL;

ALTER TABLE public.subscribers
  ALTER COLUMN is_active SET DEFAULT true;

ALTER TABLE public.subscribers
  ALTER COLUMN is_active SET NOT NULL;
