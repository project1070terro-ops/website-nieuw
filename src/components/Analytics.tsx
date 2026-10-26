import { useEffect } from 'react';

interface AnalyticsProps {
  consent: 'accepted' | 'declined' | null;
}

function isLocalhost() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.');
}

export function Analytics({ consent }: AnalyticsProps) {
  useEffect(() => {
    if (consent !== 'accepted') return;
    if (isLocalhost()) return;

    const gaId = (
      (import.meta.env.VITE_GA_TRACKING_ID as string | undefined) ||
      (import.meta.env.VITE_GA_ID as string | undefined)
    )?.trim();
    if (!gaId) return;

    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) return;

    const externalScript = document.createElement('script');
    externalScript.async = true;
    externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(externalScript);

    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    `;
    document.head.appendChild(inlineScript);
  }, [consent]);

  return null;
}
