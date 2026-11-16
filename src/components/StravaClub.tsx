import type { Language } from '../types';

type StravaVariant = 'blog' | 'sponsor';

interface StravaClubProps {
  language: Language;
  variant: StravaVariant;
  className?: string;
}

const copy: Record<
  Language,
  Record<
    StravaVariant,
    {
      tag: string;
      title: string;
      text: string;
      cta: string;
    }
  >
> = {
  nl: {
    blog: {
      tag: 'STRAVA COMMUNITY',
      title: 'Train mee op de Road to Albir',
      text: 'Laat je inspireren door de voorbereidingen op de 17.500 hoogtemeters. Sluit je gratis aan bij de officiële Project 15/70 Strava Club, deel je eigen kilometers en steun onze missie voor Save the Children vanuit het zadel.',
      cta: 'Sluit je aan op Strava',
    },
    sponsor: {
      tag: 'B2B COMMUNITY & TEAMBUILDING',
      title: 'Fiets met je team mee richting 2029',
      text: 'Verbind jouw onderneming niet alleen financieel, maar ook sportief aan Project 15/70. Nodig fietsende collega’s en relaties uit voor onze officiële Strava Club. Volg elkaars ritten, neem deel aan gezamenlijke maandelijkse hoogtemeter-challenges en fiets samen naar maximale impact voor Save the Children.',
      cta: 'Word lid van de Strava Club',
    },
  },
  en: {
    blog: {
      tag: 'STRAVA COMMUNITY',
      title: 'Train along on the Road to Albir',
      text: 'Get inspired by the preparations for the 17,500 altitude meters. Join the official Project 15/70 Strava Club for free, share your own kilometres and support our mission for Save the Children from the saddle.',
      cta: 'Join on Strava',
    },
    sponsor: {
      tag: 'B2B COMMUNITY & TEAMBUILDING',
      title: 'Cycle with your team towards 2029',
      text: 'Connect your company not only financially, but also physically to Project 15/70. Invite cycling colleagues and relations to our official Strava Club. Follow each other\'s rides, take part in joint monthly elevation challenges and cycle together towards maximum impact for Save the Children.',
      cta: 'Join the Strava Club',
    },
  },
  es: {
    blog: {
      tag: 'COMUNIDAD STRAVA',
      title: 'Entrena en el camino a Albir',
      text: 'Déjate inspirar por los preparativos para los 17.500 metros de desnivel. Únete gratis al Club Strava oficial del Proyecto 15/70, comparte tus propios kilómetros y apoya nuestra misión por Save the Children desde la bicicleta.',
      cta: 'Únete en Strava',
    },
    sponsor: {
      tag: 'COMUNIDAD B2B Y TEAM BUILDING',
      title: 'Pedalea con tu equipo hacia 2029',
      text: 'Conecta tu empresa no solo financieramente, sino también deportivamente con el Proyecto 15/70. Invita a colegas y relaciones ciclistas a nuestro Club Strava oficial. Sigan los entrenamientos de cada uno, participen en los desafíos mensuales de desnivel y pedaleen juntos hacia el máximo impacto para Save the Children.',
      cta: 'Únete al Club Strava',
    },
  },
};

function StravaIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L13.424 0 6.534 12.345h4.172" />
    </svg>
  );
}

export function StravaClub({ language, variant, className = '' }: StravaClubProps) {
  const c = copy[language][variant];

  return (
    <div
      className={`flex flex-col rounded-lg border border-white/5 bg-zinc-900/60 p-5 ${className}`}
    >
      <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#c05a28]">
        {c.tag}
      </span>
      <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">
        {c.title}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-white/70">
        {c.text}
      </p>
      <a
        href="https://strava.app.link/F9xPbt6t77b"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-md bg-[#c05a28] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#a84d22] hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
      >
        <StravaIcon className="h-4 w-4" />
        {c.cta}
      </a>
    </div>
  );
}
