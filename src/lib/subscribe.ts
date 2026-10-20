export async function subscribeEmail(
  email: string,
  source: string,
  language = 'nl',
  website = ''
): Promise<{ error: string | null }> {
  try {
    const clean = email.trim().toLowerCase();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      return { error: 'Invalid email address' };
    }

    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: clean, source, language, website }),
    });

    const data = await response.json().catch(() => ({ error: 'Server error' }));
    if (!response.ok) {
      return { error: data.error || 'Subscription failed' };
    }
    return { error: null };
  } catch (err) {
    return { error: 'Subscription failed' };
  }
}
