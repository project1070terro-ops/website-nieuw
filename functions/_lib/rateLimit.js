function getClientIp(request) {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function checkRateLimits(kv, request) {
  if (!kv) {
    throw new Error('Rate limiting not configured: RATE_LIMITS KV binding is missing');
  }

  const ip = getClientIp(request);
  const ipKey = `rate:ip:${ip}`;

  // Max 5 requests per minute per IP
  const ipCount = parseInt((await kv.get(ipKey)) || '0', 10);
  if (ipCount >= 5) {
    throw new Error('Too many requests. Please try again in a minute.');
  }
  await kv.put(ipKey, String(ipCount + 1), { expirationTtl: 60 });
}
