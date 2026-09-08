import type { TranslationContent } from './types';

// Strava-embeds per blogpost — geldt automatisch voor alle talen.
// Sleutel = de slug van de post, waarde = de officiële embed-code van Strava.
export const stravaEmbeds: Record<string, string> = {
  '/blog/dag-1-coll-de-rates': 'https://strava.com',
};

// Link naar de Strava-activiteit zelf per blogpost — de hele kaart is hiermee klikbaar.
export const stravaLinks: Record<string, string> = {
  '/blog/dag-1-coll-de-rates': 'https://www.strava.com/activities/882717467',
};

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

export const blogPosts: Record<'nl' | 'en' | 'es', TranslationContent['blogCards']> = {
  nl: [
    {
      date: '01 / 2027',
      slug: '/blog/de-officiele-aftrap',
      label: 'AANKONDIGING',
      title: 'De Aftrap: Op weg naar 2029',
      fullTitle: 'De Officiële Aftrap van PROJECT 15/70: Op Weg Naar een Loodzware Uitdaging',
      image: '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
      body: `De lancering van Project 15/70 is een feit. Wat ooit begon als een wilde droom op de fiets, groeit uit tot een van de meest uitdagende wieleravonturen die ik ooit ben aangegaan. In 2029 bestaat Forza Fortuna Financial Group vijftien jaar en is Terro al even lang onlosmakelijk verbonden aan dit team. Bovendien wordt hij dat jaar zeventig jaar jong. Drie redenen om het voor een goed doel op te nemen tegen de Spaanse bergen.

Tien dagen lang zal Terro non-stop in het zadel kruipen om meer dan 17.500 hoogtemeters te bedwingen in de heuvels rondom Albir. Dat is niet zomaar een rondje fietsen; het is een grensverleggend statement dat laat zien dat leeftijd slechts een getal is. Met de juiste voorbereiding, een onbreekbare mindset en een team dat als één man achter je staat, is het onmogelijke bespreekbaar.

Elke meter die wordt gereden, draagt bij aan een hoger doel. Steun ons en volg het avontuur van de eerste training tot de laatste afdaling. Samen maken we van Project 15/70 een verhaal dat blijft hangen.`,
    },
    {
      date: '01 / 2027',
      slug: '/blog/de-rekensom-hoogtemeters',
      label: 'STATISTIEKEN',
      title: 'De Rekensom: 17.500 hoogtemeters',
      fullTitle: 'De Rekensom: De Slopende Cijfers Achter 17.500 Hoogtemeters',
      image: '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-3-1920x1080.webp',
      body: `Achter de indrukwekkende 17.500 hoogtemeters gaat een pijnlijke rekensom schuil. Verdeeld over tien dagen komt dat neer op gemiddeld 1.750 hoogtemeters per dag. Om dat in perspectief te plaatsen: dat is elke dag opnieuw een beklimming die menig getrainde wielrenner al zwaar zou noemen.

De route rondom Albir en de Costa Blanca is niet willekeurig gekozen. Deze streek kent lange, verraderlijke stijgingen, scherpe haarspeldbochten en soms verzengende hitte. Tel daar het tegenwindaanvalsgebied in het binnenland bij op en je begrijpt waarom dit project het ‘extremum’ wordt genoemd: het punt waar ervaring, leeftijd en fysieke uitputting elkaar raken.

Toch is het niet alleen getallen kijken. De voorbereiding van Terro is doordacht en opgebouwd: van core-training en krachtwerk in de winter tot de specifieke etappetraining in Spanje zelf. Met die aanpak is 17.500 geen willekeurig cijfer, maar een haalbaar doel.`,
    },
    {
      date: '01 / 2027',
      slug: '/blog/waarom-save-the-children',
      label: 'GOEDE DOEL',
      title: 'Goede Doel: Save the Children',
      fullTitle: 'Fietsen voor de Toekomst: Waarom Wij Kiezen voor Save the Children',
      image: '/images/hero/stc-banner.webp',
      body: `Wielrennen is meer dan snelheid en afstand. Bij Project 15/70 staat het collectieve doel centraal: kinderen een betere toekomst bieden. Daarom kiezen wij bewust voor Save the Children. Hun werk komt terecht waar de hulp het hardst nodig is: bij kwetsbare kinderen die niet zelf voor zichzelf kunnen opkomen.

Elke donatie is een hoogtemeter. Elke hoogtemeter brengt ons dichter bij een wereld waarin elk kind kansen krijgt, ongeacht de omstandigheden waarin het geboren wordt. Terro fietst niet alleen voor zichzelf, maar voor alle kinderen die een duwtje in de rug verdienen.

Doneer mee en laat zien dat de fietscommunity een verschil maakt. Samen zetten we ons in voor de generatie van morgen.`,
    },
    {
      date: '09 / 2026',
      slug: '/blog/dag-1-coll-de-rates',
      label: 'DAG 1',
      title: 'Dag 1: Coll de Rates Lus',
      fullTitle: 'Dag 1: De Coll de Rates Lus — De Eerste Beklimming',
      image: '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
      body: `De eerste rit van Project 15/70 voert over de legendarische Coll de Rates, de beklimming die al vijftien jaar het decor vormt van onze mooiste ritten rondom Albir. Een lus die meteen de toon zet: lange klimmen, verraderlijke percentages en adembenemende uitzichten.`,
      postBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Na de rit delen we hier het volledige verslag van de dag: hoe de benen voelden op de lange klim, welke momenten eruit sprongen en wat deze eerste etappe betekende voor het team.

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus, nec sagittis lectus posuere vel. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.

Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla, tot slot van deze eerste etappe.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.

Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.

Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.`,
    },
  ],
  en: [
    {
      date: '01 / 2027',
      slug: '/blog/de-officiele-aftrap',
      label: 'ANNOUNCEMENT',
      title: 'The Kick-off: On the road to 2029',
      fullTitle: 'The Official Kick-off of PROJECT 15/70: On the Road to a Grueling Challenge',
      image: '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
      body: `The launch of Project 15/70 is official. What started as a wild dream on a bike is growing into one of the most challenging cycling adventures that I have ever undertaken. In 2029, Forza Fortuna Financial Group will have existed for fifteen years, and Terro will have been part of the team for just as long. On top of that, he turns seventy years young. Three reasons to take on the Spanish mountains for charity.

For ten consecutive days, Terro will be in the saddle non-stop to conquer more than 17,500 vertical meters in the hills around Albir. This is not just a casual ride; it is a boundary-pushing statement that age is just a number. With the right preparation, an unbreakable mindset and a team that stands behind you as one, the impossible becomes negotiable.

Every meter ridden contributes to a greater cause. Support us and follow the adventure from the first training session to the final descent. Together we will make Project 15/70 a story that lasts.`,
    },
    {
      date: '01 / 2027',
      slug: '/blog/de-rekensom-hoogtemeters',
      label: 'STATISTICS',
      title: 'The Math: 17,500 vertical meters',
      fullTitle: 'The Math: The Grueling Numbers Behind 17,500 Vertical Meters',
      image: '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-3-1920x1080.webp',
      body: `Behind the impressive 17,500 vertical meters hides a painful calculation. Spread over ten days, that comes down to an average of 1,750 vertical meters per day. To put that in perspective: every single day that is a climb many trained cyclists would already call tough.

The route around Albir and the Costa Blanca was not chosen at random. This region has long, treacherous climbs, sharp hairpin bends and sometimes scorching heat. Add the wind-exposed inland area and you understand why this project is called the ‘extremum’: the point where experience, age and physical exhaustion meet.

Yet it is not just about numbers. Terro's preparation is thoughtful and structured: from core training and strength work in winter to specific stage training in Spain itself. With that approach, 17,500 is not a random figure, but an achievable goal.`,
    },
    {
      date: '01 / 2027',
      slug: '/blog/waarom-save-the-children',
      label: 'CHARITY',
      title: 'Charity: Save the Children',
      fullTitle: 'Riding for the Future: Why We Support Save the Children',
      image: '/images/hero/stc-banner.webp',
      body: `Cycling is more than speed and distance. With Project 15/70 the collective goal comes first: giving children a better future. That is why we consciously choose Save the Children. Their work reaches those who need help the most: vulnerable children who cannot speak up for themselves.

Every donation is a vertical meter. Every vertical meter brings us closer to a world where every child gets chances, regardless of the circumstances they are born into. Terro is not just cycling for himself, but for all children who deserve a helping hand.

Donate and show that the cycling community makes a difference. Together we stand up for the next generation.`,
    },
    {
      date: '09 / 2026',
      slug: '/blog/dag-1-coll-de-rates',
      label: 'DAY 1',
      title: 'Day 1: Coll de Rates Loop',
      fullTitle: 'Day 1: The Coll de Rates Loop — The First Climb',
      image: '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
      body: `The first ride of Project 15/70 takes on the legendary Coll de Rates, the climb that has been the backdrop of our most beautiful rides around Albir for fifteen years. A loop that immediately sets the tone: long climbs, treacherous gradients and breathtaking views.`,
      postBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. After the ride we will share the full report of the day here: how the legs felt on the long climb, which moments stood out and what this first stage meant for the team.

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus, nec sagittis lectus posuere vel. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.

Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla, closing this first stage.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.

Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.

Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.`,
    },
  ],
  es: [
    {
      date: '01 / 2027',
      slug: '/blog/de-officiele-aftrap',
      label: 'ANUNCIO',
      title: 'El Lanzamiento: Camino a 2029',
      fullTitle: 'El Lanzamiento Oficial de PROJECT 15/70: Camino a un Desafío Monumental',
      image: '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
      body: `El lanzamiento del Proyecto 15/70 es una realidad. Lo que comenzó como un sueño loco sobre una bicicleta se convierte en una de las aventuras ciclistas más exigentes que yo haya emprendido. En 2029, Forza Fortuna Financial Group cumplirá quince años y Terro estará vinculado al equipo desde hace el mismo tiempo. Además, cumplirá setenta años joven. Tres razones para enfrentarse a las montañas españolas por una buena causa.

Durante diez días seguidos, Terro estará en el sillín sin parar para conquistar más de 17.500 metros de desnivel en las colinas alrededor de Albir. No se trata solo de una salida cualquiera; es una declaración que traspasa límites y demuestra que la edad es solo un número. Con la preparación adecuada, una mentalidad inquebrantable y un equipo que te apoya como uno solo, lo imposible se vuelve alcanzable.

Cada metro pedaleado contribuye a un objetivo mayor. Apóyanos y sigue la aventura desde el primer entrenamiento hasta el último descenso. Juntos haremos del Proyecto 15/70 una historia que perdura.`,
    },
    {
      date: '01 / 2027',
      slug: '/blog/de-rekensom-hoogtemeters',
      label: 'ESTADÍSTICAS',
      title: 'Los Números: 17.500 metros de desnivel',
      fullTitle: 'Los Números: Las Cifras Detrás de los 17.500 Metros de Desnivel',
      image: '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-3-1920x1080.webp',
      body: `Detrás de los impresionantes 17.500 metros de desnivel se esconde un cálculo doloroso. Repartidos en diez días, eso supone una media de 1.750 metros de desnivel por día. Para ponerlo en perspectiva: cada día es una ascensión que muchos ciclistas entrenados ya considerarían dura.

La ruta alrededor de Albir y la Costa Blanca no se eligió al azar. Esta región tiene ascensos largos y traicioneros, curvas cerradas y a veces un calor abrasador. Añade la zona interior expuesta al viento y entenderás por qué este proyecto se llama el ‘extremum’: el punto donde se encuentran la experiencia, la edad y el agotamiento físico.

Aun así, no se trata solo de números. La preparación de Terro es reflexiva y estructurada: desde el entrenamiento de core y fuerza en invierno hasta los entrenamientos específicos de etapa en la propia España. Con ese enfoque, 17.500 no es una cifra aleatoria, sino un objetivo alcanzable.`,
    },
    {
      date: '01 / 2027',
      slug: '/blog/waarom-save-the-children',
      label: 'CAUSA BENÉFICA',
      title: 'Causa Benéfica: Save the Children',
      fullTitle: 'Pedaleando por el Futuro: Por Qué Elegimos Save the Children',
      image: '/images/hero/stc-banner.webp',
      body: `El ciclismo es más que velocidad y distancia. Con el Proyecto 15/70, el objetivo colectivo es lo primero: ofrecer un futuro mejor a los niños. Por eso elegimos conscientemente Save the Children. Su trabajo llega a quienes más necesitan ayuda: niños vulnerables que no pueden defenderse por sí mismos.

Cada donación es un metro de desnivel. Cada metro de desnivel nos acerca a un mundo donde cada niño tenga oportunidades, independientemente de las circunstancias en las que nazca. Terro no pedalea solo por sí mismo, sino por todos los niños que merecen un empujón.

Dona y demuestra que la comunidad ciclista marca la diferencia. Juntos nos comprometemos con la próxima generación.`,
    },
    {
      date: '09 / 2026',
      slug: '/blog/dag-1-coll-de-rates',
      label: 'DÍA 1',
      title: 'Día 1: Bucle Coll de Rates',
      fullTitle: 'Día 1: El Bucle Coll de Rates — La Primera Ascensión',
      image: '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
      body: `La primera ruta del Proyecto 15/70 afronta el legendario Coll de Rates, la ascensión que lleva quince años siendo el escenario de nuestras salidas más bonitas alrededor de Albir. Un bucle que marca el tono desde el primer momento: ascensos largos, pendientes traicioneras y vistas impresionantes.`,
      postBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Después de la ruta compartiremos aquí la crónica completa del día: cómo respondieron las piernas en la larga ascensión, qué momentos destacaron y qué significó esta primera etapa para el equipo.

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus, nec sagittis lectus posuere vel. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.

Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla, cerrando esta primera etapa.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.

Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.

Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.`,
    },
  ],
};
