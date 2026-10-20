function getClientIp(request) {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function checkRateLimits(kv, request, email) {
  if (!kv) {
    throw new Error('Rate limiting not configured: RATE_LIMITS KV binding is missing');
  }

  const ip = getClientIp(request);
  const cleanEmail = (email || '').toLowerCase().trim();

  const ipKey = `rate:ip:${ip}`;
  const emailKey = `rate:email:${cleanEmail}`;

  // Max 5 requests per minute per IP
  const ipCount = parseInt((await kv.get(ipKey)) || '0', 10);
  if (ipCount >= 5) {
    throw new Error('Too many requests. Please try again in a minute.');
  }
  await kv.put(ipKey, String(ipCount + 1), { expirationTtl: 60 });

  // Max 3 identical email addresses per hour
  const emailCount = parseInt((await kv.get(emailKey)) || '0', 10);
  if (emailCount >= 3) {
    throw new Error('This email has been used too often. Please try again later.');
  }
  await kv.put(emailKey, String(emailCount + 1), { expirationTtl: 3600 });
}
