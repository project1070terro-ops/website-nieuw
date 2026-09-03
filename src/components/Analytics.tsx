import { useEffect } from 'react';

interface AnalyticsProps {
  consent: 'accepted' | 'declined' | null;
}

export function Analytics({ consent }: AnalyticsProps) {
  useEffect(() => {
    if (consent !== 'accepted') return;

    const gaId = (import.meta.env.VITE_GA_ID as string | undefined)?.trim();
    if (!gaId) return;

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
