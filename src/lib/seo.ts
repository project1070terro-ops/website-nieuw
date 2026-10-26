import type { Language, Page } from '../types';

export interface SeoData {
  title: string;
  description: string;
  ogImage?: string;
}

const DEFAULT_OG_IMAGE = 'https://project1570.org/images/og-default.jpg';

export const seo: Record<Language, Record<Page, SeoData>> = {
  nl: {
    home: {
      title: 'Project 15/70 — Extreme wieleruitdaging voor Save the Children',
      description: 'Vijftien jaar passie, zeventig jaar jong. In 2029 fietsen we 10 dagen rondom Albir voor +17.500 hoogtemeters. Doneer en volg de voorbereiding.',
    },
    story: {
      title: 'Het Verhaal — Project 15/70',
      description: 'De wiskunde achter het project: 15 jaar Fortuna, 70 jaar jong van geest en een extreme uitdaging in de Spaanse bergen.',
    },
    route: {
      title: 'De Route — Project 15/70',
      description: 'Virtueel meefietsen door de 10 etappes rondom Albir. Meer dan 17.500 hoogtemeters, adembenemende beklimmingen en de weg naar de finish.',
    },
    terro: {
      title: 'Project Terro — De man achter 15/70',
      description: 'Wie is Terro? Een sportman op leeftijd met karakter, discipline en een missie: bewijzen dat leeftijd slechts een getal is.',
    },
    blog: {
      title: 'Nieuws uit het peloton — Project 15/70',
      description: 'Updates, verhalen en momenten onderweg naar Project 15/70. Volg de reis naar de ultieme wieleruitdaging.',
    },
    cause: {
      title: 'Het Goede Doel — Save the Children',
      description: 'Elke hoogtemeter staat in dienst van kwetsbare kinderen. Lees waarom Project 15/70 kiest voor Save the Children.',
    },
    donate: {
      title: 'Doneer — Klim mee naar 17.500 hoogtemeters',
      description: 'Elke euro is één hoogtemeter. Doneer aan Save the Children en draag bij aan de missie achter Project 15/70.',
    },
    contact: {
      title: 'Contact — Project 15/70',
      description: 'Vragen, ideeën of zin om mee te trappen? Neem contact op met het team van Project 15/70.',
    },
    privacy: {
      title: 'Privacyverklaring — Project 15/70',
      description: 'Lees hoe Project 15/70 omgaat met jouw gegevens en cookies.',
    },
    sponsoring: {
      title: 'Sponsoring — Project 15/70',
      description: 'Samen met partners als Fortuna Financial Group maken we Project 15/70 mogelijk. Ontdek de sponsormogelijkheden.',
    },
  },
  en: {
    home: {
      title: 'Project 15/70 — Extreme cycling challenge for Save the Children',
      description: 'Fifteen years of passion, seventy years young. In 2029 we ride 10 days around Albir for +17,500 vertical meters. Donate and follow the journey.',
    },
    story: {
      title: 'The Story — Project 15/70',
      description: 'The math behind the project: 15 years at Fortuna, 70 years young in spirit and an extreme challenge in the Spanish mountains.',
    },
    route: {
      title: 'The Route — Project 15/70',
      description: 'Ride virtually through the 10 stages around Albir. More than 17,500 meters of climbing, breathtaking ascents and the road to the finish.',
    },
    terro: {
      title: 'Project Terro — The man behind 15/70',
      description: 'Who is Terro? An older athlete with character, discipline and a mission: to prove that age is just a number.',
    },
    blog: {
      title: 'News from the Peloton — Project 15/70',
      description: 'Updates, stories and moments along the road to Project 15/70. Follow the journey to the ultimate cycling challenge.',
    },
    cause: {
      title: 'The Charity — Save the Children',
      description: 'Every meter of elevation serves vulnerable children. Read why Project 15/70 chose Save the Children.',
    },
    donate: {
      title: 'Donate — Climb along to 17,500 vertical meters',
      description: 'Every euro is one meter of elevation. Donate to Save the Children and support the mission behind Project 15/70.',
    },
    contact: {
      title: 'Contact — Project 15/70',
      description: 'Questions, ideas or want to ride along? Get in touch with the Project 15/70 team.',
    },
    privacy: {
      title: 'Privacy Policy — Project 15/70',
      description: 'Read how Project 15/70 handles your data and cookies.',
    },
    sponsoring: {
      title: 'Sponsorship — Project 15/70',
      description: 'Together with partners like Fortuna Financial Group we make Project 15/70 possible. Discover sponsorship opportunities.',
    },
  },
  es: {
    home: {
      title: 'Proyecto 15/70 — Reto ciclista extremo para Save the Children',
      description: 'Quince años de pasión, setenta años joven. En 2029 pedaleamos 10 días alrededor de Albir para +17.500 metros de desnivel. Dona y sigue el viaje.',
    },
    story: {
      title: 'La Historia — Proyecto 15/70',
      description: 'Las matemáticas detrás del proyecto: 15 años en Fortuna, 70 años joven de espíritu y un reto extremo en las montañas españolas.',
    },
    route: {
      title: 'La Ruta — Proyecto 15/70',
      description: 'Pedalea virtualmente por las 10 etapas alrededor de Albir. Más de 17.500 metros de desnivel, ascensos impresionantes y el camino a la meta.',
    },
    terro: {
      title: 'Proyecto Terro — El hombre detrás de 15/70',
      description: '¿Quién es Terro? Un deportista mayor con carácter, disciplina y una misión: demostrar que la edad es solo un número.',
    },
    blog: {
      title: 'Noticias del Pelotón — Proyecto 15/70',
      description: 'Actualizaciones, historias y momentos en el camino al Proyecto 15/70. Sigue el viaje al reto ciclista definitivo.',
    },
    cause: {
      title: 'La Causa — Save the Children',
      description: 'Cada metro de desnivel sirve a niños vulnerables. Lee por qué el Proyecto 15/70 eligió Save the Children.',
    },
    donate: {
      title: 'Donar — Sube con nosotros a 17.500 metros de desnivel',
      description: 'Cada euro es un metro de desnivel. Dona a Save the Children y apoya la misión del Proyecto 15/70.',
    },
    contact: {
      title: 'Contacto — Proyecto 15/70',
      description: '¿Preguntas, ideas o ganas de pedalear? Ponte en contacto con el equipo del Proyecto 15/70.',
    },
    privacy: {
      title: 'Política de Privacidad — Proyecto 15/70',
      description: 'Lee cómo el Proyecto 15/70 maneja tus datos y cookies.',
    },
    sponsoring: {
      title: 'Patrocinio — Proyecto 15/70',
      description: 'Junto con socios como Fortuna Financial Group hacemos posible el Proyecto 15/70. Descubre las oportunidades de patrocinio.',
    },
  },
};

export function getSeo(language: Language, page: Page, customTitle?: string, customDescription?: string): SeoData {
  const data = seo[language][page] ?? seo[language].home;
  return {
    title: customTitle ?? data.title,
    description: customDescription ?? data.description,
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export function getLocale(language: Language) {
  return language === 'en' ? 'en_US' : language === 'es' ? 'es_ES' : 'nl_NL';
}
