// Tijdelijke (Unsplash) sfeerfoto's per blogpost — later vervangen door eigen beelden.
// De foto's verschijnen als compacte slider onder de Strava-kaart en openen in een lightbox.

// Tijdelijke (Unsplash) sfeerfoto's per blogpost — later vervangen door eigen beelden.
// De foto's verschijnen als compact grid onder de Strava-kaart en openen in een lightbox.
export interface BlogPhoto {
  src: string;
  alt: string;
  caption: Record<'nl' | 'en' | 'es', string>;
}

export const blogMedia: Record<string, { photos?: BlogPhoto[] }> = {
  '/blog/dag-1-coll-de-rates': {
    photos: [
      {
        src: 'https://images.unsplash.com/photo-1699389360830-30c43a34270c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Twee fietsers dalen af op een bergweg',
        caption: { nl: 'Afdalen op de Coll de Rates', en: 'Descending the Coll de Rates', es: 'Descenso del Coll de Rates' },
      },
      {
        src: 'https://images.unsplash.com/photo-1613935306629-5afdc132d84b?auto=format&fit=crop&w=1600&q=80',
        alt: 'Fietsers op een onverharde weg bij besneeuwde bergen',
        caption: { nl: 'Klimmen richting de top', en: 'Climbing towards the summit', es: 'Subiendo hacia la cima' },
      },
      {
        src: 'https://images.unsplash.com/photo-1750014725142-03e55e39b89f?auto=format&fit=crop&w=1600&q=80',
        alt: 'Brug over een vallei in het Spaanse bergland',
        caption: { nl: 'Het Spaanse binnenland in al zijn glorie', en: 'The Spanish interior in all its glory', es: 'El interior español en todo su esplendor' },
      },
      {
        src: 'https://images.unsplash.com/photo-1758604688154-b1f83bcac0b3?auto=format&fit=crop&w=1600&q=80',
        alt: 'Fietser in bloemenveld met berg op de achtergrond',
        caption: { nl: 'De top is in zicht', en: 'The summit is in sight', es: 'La cima está a la vista' },
      },
      {
        src: 'https://images.unsplash.com/photo-1768935452457-bee8051f8267?auto=format&fit=crop&w=1600&q=80',
        alt: 'Slingerende bergweg in gouden avondlicht',
        caption: { nl: 'Slingerend door de bergen in het avondlicht', en: 'Winding through the mountains at golden hour', es: 'Serpenteando por la montaña al atardecer' },
      },
    ],
  },
};
