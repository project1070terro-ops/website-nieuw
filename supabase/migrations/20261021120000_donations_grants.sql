-- Future-proof public.donations for Supabase's Data API security policy
-- Ensures the anon, authenticated and service_role roles have the required grants.

-- Schema usage is required for the Data API to resolve the table
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Public roles: SELECT and INSERT only (matches the RLS policies)
GRANT SELECT, INSERT ON public.donations TO anon, authenticated;

-- Service role: full access for maintenance/migrations
GRANT ALL PRIVILEGES ON public.donations TO service_role;
