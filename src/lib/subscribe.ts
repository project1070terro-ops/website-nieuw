export async function subscribeEmail(
  email: string,
  source: string,
  language = 'nl',
  website = ''
): Promise<{ error: string | null; alreadySubscribed: boolean }> {
  try {
    const clean = email.trim().toLowerCase();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      return { error: 'Invalid email address', alreadySubscribed: false };
    }

    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: clean, source, language, website }),
    });

    const data = await response.json().catch(() => ({ error: 'Server error' }));

    if (response.status === 409 || data.already_subscribed) {
      return { error: data.error || 'Already subscribed', alreadySubscribed: true };
    }

    if (!response.ok) {
      return { error: data.error || 'Subscription failed', alreadySubscribed: false };
    }

    return { error: null, alreadySubscribed: false };
  } catch (err) {
    return { error: 'Subscription failed', alreadySubscribed: false };
  }
}
