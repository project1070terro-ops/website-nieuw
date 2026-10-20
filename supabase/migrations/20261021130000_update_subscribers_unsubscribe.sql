/*
# Update public.subscribers for unsubscribe tokens, language and webhook support
*/

ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'nl',
  ADD COLUMN IF NOT EXISTS unsubscribe_token uuid DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz NULL;

-- Ensure every subscriber has a unique token
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscribers_unsubscribe_token
  ON public.subscribers (unsubscribe_token);

CREATE INDEX IF NOT EXISTS idx_subscribers_language
  ON public.subscribers (language)
  WHERE is_active = true AND unsubscribed_at IS NULL;

-- Service role needs UPDATE for the unsubscribe endpoint
GRANT UPDATE ON public.subscribers TO service_role;
