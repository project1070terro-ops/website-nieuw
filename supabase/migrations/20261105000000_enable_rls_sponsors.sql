/*
# Critical RLS fix for public.sponsors

Run this in the Supabase SQL Editor if the sponsors table is reported as
publicly accessible (RLS disabled in public).

This migration ensures:
- RLS is enabled on public.sponsors.
- Public users can only read confirmed sponsors.
- Public users can only insert new sponsors as 'pending'.
- Public updates and deletes are blocked.
*/

ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to sponsors" ON public.sponsors;
CREATE POLICY "Allow public read access to sponsors"
ON public.sponsors FOR SELECT
TO anon, authenticated
USING (status = 'confirmed');

DROP POLICY IF EXISTS "Public can submit sponsors" ON public.sponsors;
CREATE POLICY "Public can submit sponsors"
ON public.sponsors FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending');

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
