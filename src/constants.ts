import type { TranslationContent } from './types';

export const heroImages = [
  '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
  '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-3-1920x1080.webp',
  '/images/hero/Cycling-calpe-and-costa-blanca-copyright-Sierras-Sports-Tours-3-1920x1080.webp',
];

export const copy: Record<'nl' | 'en' | 'es', TranslationContent> = {
  nl: {
    nav: { home: 'Home', story: 'Het Verhaal', route: 'De Route', terro: 'Project Terro', blog: 'Blog', donate: 'Doneren', contact: 'Contact' },
    support: 'STEUN HET GOEDE DOEL & DONEER NU',
    heroEyebrow: 'FIETSUITDAGING VOOR HET GOED DOEL',
    heroTitle: 'PROJECT 10/70',
    heroText: 'Tienjarig jubileum. Zeventig jaar jong. Eén uitdaging die alles verandert.',
    discover: 'Ontdek het project',
    introOfficial: "In 2029 viert wielerteam Forza Fortuna (vzw) haar 10-jarig jubileum en bereik ik de legendarische leeftijd van 70 jaar. Twee unieke mijlpalen, één extreme uitdaging. Met Project 10/70 kruip ik 10 dagen lang in het zadel voor het goede doel: +17.000 hoogtemeters in de Spaanse bergen rondom L'Albir. Bewijzen dat leeftijd slechts een getal is.",
    stats: [['10', 'DAGEN IN HET ZADEL', 'story'], ['+17.000', 'HOOGTEMETERS', 'route'], ['70', 'JAAR JONG VAN GEEST', 'terro']],
    sponsorText: 'Fortuna Financial Group is één van de belangrijkste vermogensbegeleiders op de Belgische markt. CEO Frank Peeraer is een ex-profvoetballer met een echt sporthart en net als diverse van zijn medewerkers, zelf fervent fietser. Fortuna ondersteunt als bedrijf dan ook voluit het fietstoerisme én met trots Project 10/70.',
    sponsorLink: 'Ga naar Fortuna Financial Group',
    sponsorCards: [['Persoonlijk', `Bij Fortuna heeft u een vaste contactpersoon die uw situatie kent en samen met u de langetermijnvisie bewaakt. Zo hoeft u uw verhaal niet telkens opnieuw te vertellen en kunt u rekenen op een betrokken begeleiding.`], ['Onafhankelijk', `We vertrekken niet vanuit één financiële instelling of één standaardoplossing. We bekijken welke aanpak objectief het best past bij uw vermogen, uw verwachtingen en uw toekomstplannen.`], ['Een familiebedrijf', `Fortuna is zelf als familiebedrijf opgebouwd. Daardoor begrijpen we dat vermogen niet alleen over cijfers gaat, maar ook over verantwoordelijkheid, continuïteit en de volgende generatie.`]],
    storyTitle: 'Van wielerpassie tot extreme uitdaging',
    storyLead: `In 2019 ontstond de vernieuwde vzw van wielerteam Forza Fortuna vanuit de pure wielerpassie op kantoor van Fortuna Financial Group en binnen de community. Wat begon als vriendschappelijke ritten op zondagochtend, groeide uit tot een hecht team met een gezamenlijke missie: passie, discipline en vriendschap verbinden op en naast de fiets.

Tien jaar later, in 2029, viert de vzw haar 10-jarig jubileum. Datzelfde jaar bereik ik Roel — beter bekend als "Terro" — de legendarische leeftijd van 70 jaar. Twee unieke mijlpalen die om een bijzonder verhaal vragen.

Dat verhaal werd Project 10/70: een extreme wieleruitdaging waarbij Terro 10 dagen lang in het zadel kruipt om meer dan 17.000 hoogtemeters te bedwingen in de Spaanse bergen rondom L'Albir. Geen toevallige keuze — de bergen die al meer dan 15 jaar het toneel vormen van legendarische ritten en onvergetelijke vriendschappen.`,
    storyQuote: `Het doel? Bewijzen dat <span class="story-quote-highlight">leeftijd slechts een getal</span> is. Dat <span class="story-quote-highlight">passie geen grens</span> kent. En dat je met de juiste voorbereiding, de onverwoestbare mentaliteit en de juiste mensen om je heen elk lange-termijndoel kunt bereiken.`,
    storyOutro: `Maar dit project gaat niet alleen over fietsen. Het gaat over het goede doel. Elke meter die geklommen wordt, elke zweetdruppel die valt, draagt bij aan een missie die groter is dan de sport zelf. En daar kan jij deel van uitmaken.`,
    storySections: [['Van idee naar avontuur', 'Wat begon als een idee aan de keukentafel groeide uit tot een uitdaging die vrienden, partners en een heel team samenbrengt.'], ['Twee mijlpalen, één extremum', 'Tien jaar Forza Fortuna vzw. Zeventig jaar jong van geest. Twee cijfers die samen de lat op 17.000 hoogtemeters leggen.'], ['Samen trappen', 'Elke kilometer krijgt meer betekenis als we hem delen. Met supporters langs de weg, donateurs op afstand en het goede doel als kompas.']],
    routeTitle: 'De route',
    routeLead: `Elke kilometer een stap dichterbij. Elke rit start en komt aan op het zonovergoten strand van Albir, vanwaar we de uitdaging aangaan en ons dwars door adembenemende landschappen en over pittige toppen trappen. Geen gemakkelijke reis, maar elke pedaalslag langs de Spaanse kust en het binnenland is gedreven door pure motivatie: hoop en een betere toekomst bieden aan kinderen die dit het hardste nodig hebben. Fiets virtueel met ons mee en volg de route vanaf de branding tot de finish.`,
    stages: ['Coll de Rates Lus', 'La Vall d\'Ebo-pas & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'De laatste klim', 'De finishrit'],
    routePlaceholder: 'Etappeprofiel wordt live gegenereerd tijdens de uitdaging in Spanje.',
    terroTitle: 'PROJECT 70: DE MAN ACHTER TERRO',
    terroSections: [['Wie is Terro?', `Achter de intense blik schuilt een man van principes, karakter en een diep gewortelde discipline. Terro is iemand voor wie waarheid en correctheid de hoogste wetten zijn. Het verleden heeft zijn geheimen, maar die liggen veilig opgeborgen waar ze horen — de focus ligt nu volledig op de weg die voor ons ligt.

Als sporter kent Terro geen halve maatregelen. Gedrevenheid is een understatement; wielrennen is een levenswijze waarin altijd het uiterste werd gevraagd en gegeven. Zelfs op 60- tot 65-jarige leeftijd vertaalde die onuitputtelijke motor zich nog constant in mooie prijzen en ereplaatsen in het competitiepeloton. En de naam TERRO? Die is niet verdiend met een sympathieke lach, maar verdiend op karakter, doorzetten en keihard rijden wanneer anderen kraken.

De afgelopen twee jaar stonden volledig in het teken van de loodzware Gran Fondo's. De vorm was er, de focus was scherp, maar het lot besliste twee keer anders. Het ene jaar brutaal onderuit gekegeld net voor de start, het jaar daarna knock-out geslagen door ziekte op het moment van de waarheid. Waar een ander de handdoek in de ring zou gooien, zette Terro de knop om: 'Ik wacht tot mijn 70ste, en dan laat ik zien wat het écht wordt.' Dat moment is nu gekomen.`], ['Twee mijlpalen, één extremum', `Het getal 70 is geen eindpunt, het is de startlijn van het meest uitdagende hoofdstuk tot nu toe. Voor sommigen is 70 de leeftijd van het rustiger aan doen, maar voor Terro is het de ultieme kans om te bewijzen wie hij werkelijk is: een pure sportman die leeft voor de grens en het uiterste opzoekt in extreme uitdagingen.

Deze prestatie is gebouwd op twee onwrikbare pijlers die elkaar versterken. Aan de ene kant de magische kaap van de 70-jarige leeftijd. Aan de andere kant het getal 10: de tien opeenvolgende, loodzware ritten die vanuit het Spaanse Albir worden gereden. Dag na dag in het zadel, dag na dag strijden tegen de elementen en de vermoeidheid.

Dat is waarom dit project het absolute 'extremum' wordt genoemd. Het is de ultieme piek, het sportieve hoogtepunt waarin leeftijd en pure fysieke uitputting elkaar ontmoeten. Dit op je 70ste presteren is geen gewone fietstocht; it is een grensverleggend statement voor het goede doel dat laat zien dat passie en karakter onverwoestbaar zijn.`], ['Karakter tegen de elementen', `Op de fiets ben je uiteindelijk altijd alleen met je gedachten. Als de Spaanse zon brandt, de wind tegenzit en de stijgingspercentages in het binnenland rondom Albir in de dubbele cijfers schieten, komt het niet meer aan op de benen, maar op pure mentale veerkracht.

De filosofie van Terro in het zadel is even simpel als onbarmhartig: niet zeuren, maar trappen. Pijn is tijdelijk, maar het doel is blijvend. Elk zwaar moment en elke druppel zweet langs de route krijgt betekenis omdat het gekoppeld is aan het welzijn van kinderen die elke steun hard nodig hebben. Die wetenschap verhardt het karakter en zorgt ervoor dat de knop omgaat als het zwaar wordt. Opgeven is simpelweg geen optie; het hoofd regeert over het lichaam.`], ['De voorbereiding', `Een extreme prestatie vraagt om een doordachte, professionele aanpak. De voorbereiding van Terro is geen kwestie van blind kilometers vreten, maar van luisteren naar het lichaam en periodisering. De nazomer in september staat in het teken van uitbollen, rusten en puur genieten van het fietsen zonder de druk van urenlange ritten. Pas als de winter zijn intrede doet, gaat de knop om.

Vanaf oktober verschuift de focus naar de basis: twee keer per week gerichte kracht- en core-stabiliteitstraining thuis, twee intensieve sessies op de virtuele wegen van Zwift, en in het weekend een stevige rit om de scherpte te behouden met het team. Zodra het voorjaar in maart aanbreekt, worden de trainingsuren en de kilometers gestaag opgebouwd, terwijl de core- en krachttraining de onmisbare fundering blijven vormen. Richting 2027 en 2028 zal de ultieme voorbereiding plaatsvinden in Spanje zelf, waarbij de specifieke etappes stilaan worden verkend vanuit L'Albir.

Qua materiaal laat Terro niets aan het toeval over en wordt alles in eigen beheer perfect afgesteld. Voor de uitrusting kan hij rekenen op de onvoorwaardelijke steun van kledingpartner Frank Peeraer van Forza Fortuna (Fortuna Group), die ervoor zorgt dat Terro in de perfecte, aerodynamische en professionele uitrusting aan de start verschijnt.`]],
    blogTitle: 'Nieuws uit het peloton',
    blogLead: 'Updates, verhalen en momenten onderweg naar Project 10/70.',
    blogCards: [['Aankondiging', 'De eerste hoogtemeters zijn gemaakt'], ['Training', 'Waarom elke klim begint met een keuze'], ['Team', 'Forza Fortuna maakt zich klaar voor Spanje']],
    donateTitle: 'Klim mee naar 17.000',
    donateLead: 'Elke euro is één hoogtemeter. Elke hoogtemeter brengt ons dichter bij een toekomst voor het goede doel.',
    donated: 'Al',
    sponsored: 'van de 17.000 hoogtemeters gesponsord!',
    goal: 'Doel: 17.000 hm',
    donateIntro: 'Elke donatie maakt het verschil. Help ons bewijzen dat leeftijd slechts een getal is! Ter ere van het 10-jarig jubileum van Forza Fortuna vzw en mijn 70e verjaardag overwinnen wij +17.000 Spaanse hoogtemeters voor de toekomst van het goede doel.',
    donationForm: 'Donatieformulier',
    choose: 'Kies je donatie',
    name: 'Naam',
    message: 'Bericht (optioneel)',
    donateNow: 'Doneer en koop hoogtemeters',
    recent: 'Recente donateurs',
    noDonors: 'Jouw naam kan hier straks tussen staan.',
    tiers: [['Berggeit', '€10', '10 hm'], ['Klimmer', '€25', '25 hm'], ['Koning van de Berg', '€50', '50 hm'], ['Legende', '€100+', '100+ hm']],
    contactTitle: 'Neem contact op',
    contactLead: `Een vraag, een briljant idee of gewoon zin om mee te trappen?\n\nLaat maar iets horen — we staan voor je klaar.`,
    send: 'Verstuur bericht',
    sent: 'Bedankt. We nemen zo snel mogelijk contact met je op.',
    email: 'Officieel e-mailadres'
  },
  en: {
    nav: { home: 'Home', story: 'The Story', route: 'The Route', terro: 'Project Terro', blog: 'Blog', donate: 'Donate', contact: 'Contact' },
    support: 'SUPPORT THE GOOD CAUSE & DONATE NOW',
    heroEyebrow: 'THE ULTIMATE CYCLING CHALLENGE',
    heroTitle: 'PROJECT 10/70',
    heroText: 'Tenth anniversary. Seventy years young. One ride that changes everything.',
    discover: 'Discover the project',
    introOfficial: "In 2029, cycling team Forza Fortuna (vzw) celebrates its 10th anniversary and I reach the legendary age of 70. Two unique milestones, one extreme challenge. With Project 10/70 I will spend 10 days in the saddle for a good cause: +17,000 vertical meters in the Spanish mountains around L'Albir. Proving that age is just a number.",
    stats: [['10', 'DAYS IN THE SADDLE', 'story'], ['+17,000', 'VERTICAL METERS', 'route'], ['70', 'YEARS YOUNG AT HEART', 'terro']],
    sponsorText: 'Fortuna Financial Group is one of the leading wealth managers in the Belgian market. CEO Frank Peeraer is a former professional footballer with a true sporting heart and, like several of his colleagues, an avid cyclist. Fortuna fully supports cycling tourism and proudly supports Project 10/70.',
    sponsorLink: 'Visit Fortuna Financial Group',
    sponsorCards: [['Personal', `At Fortuna you have a fixed contact who knows your situation and helps you keep the long-term vision on track. That way, you don't have to retell your story every time and can rely on committed guidance.`], ['Independent', `We don't start from a single financial institution or one standard solution. We look at which approach objectively best fits your wealth, your expectations and your future plans.`], ['A family business', `Fortuna was built as a family business itself. That's why we understand that wealth is not just about numbers, but also about responsibility, continuity and the next generation.`]],
    storyTitle: 'The story behind the challenge',
    storyLead: `In 2019, the Forza Fortuna cycling team was relaunched as a non-profit organization, born from a shared passion for cycling within the Fortuna Financial Group office and the wider community. What began as casual Sunday morning rides evolved into a close-knit team united by a common mission: combining passion, discipline, and friendship—both on and off the bike.

Ten years later, in 2029, the organization celebrates its 10th anniversary. That same year, I—Roel, better known as "Terro"—will reach the legendary age of 70. Two unique milestones that call for a special story.

That story became Project 10/70: an extreme cycling challenge in which Terro spends ten days in the saddle, conquering over 17,000 vertical meters in the Spanish mountains around L'Albir. It was no random choice; these mountains have been the backdrop for legendary rides and unforgettable friendships for over 15 years.`,
    storyQuote: `The goal? To prove that <span class="story-quote-highlight">age is just a number</span>. That <span class="story-quote-highlight">passion knows no bounds</span>. And that with the right preparation, an unbreakable mindset, and the right people around you, any long-term goal is within reach.`,
    storyOutro: `But this project is about more than just cycling; it is about a good cause. Every meter climbed and every drop of sweat shed contributes to a mission greater than the sport itself. And you can be a part of it.`,
    storySections: [['From idea to adventure', 'What started as a kitchen-table idea became a challenge that brings friends, partners and a whole team together.'], ['Two milestones, one extreme', 'Ten years of Forza Fortuna vzw. Seventy years young at heart. Two numbers that set the bar at 17,000 vertical meters.'], ['Pedal together', 'Every kilometer becomes more meaningful when we share it. With supporters along the way, with donors from a distance, and with the good cause as our compass.']],
    routeTitle: 'The route',
    routeLead: `Every kilometer a step closer. Every ride starts and finishes on the sun-drenched beach of Albir, from where we take on the challenge and pedal through breathtaking landscapes and tough peaks. No easy journey, but every pedal stroke along the Spanish coast and inland is driven by pure motivation: offering hope and a better future to children who need it most. Cycle virtually with us and follow the route from the surf to the finish.`,
    stages: ['Coll de Rates Loop', 'La Vall d\'Ebo-pass & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'The final climb', 'The finish stage'],
    routePlaceholder: 'Stage profile will be generated live during the challenge in Spain.',
    terroTitle: 'PROJECT 70: THE MAN BEHIND TERRO',
    terroSections: [['Who is Terro?', 'Behind every powerful challenge is a person with a story. Terro combines experience, humor and an irrepressible drive to keep moving.'], ['Two milestones, one extreme', 'The number 70 is not an endpoint. It is a starting line for a new chapter full of altitude, headwind and connection.'], ['The philosophy', 'Don\'t wait for the perfect moment. Just take the first pedal, find the peloton and keep going together.'], ['The preparation', 'With discipline, curiosity and a healthy respect for the mountains, every training becomes a piece of the route.']],
    blogTitle: 'News from the peloton',
    blogLead: 'Updates, stories and moments on the way to Project 10/70.',
    blogCards: [['Announcement', 'The first vertical meters are made'], ['Training', 'Why every climb starts with a choice'], ['Team', 'Forza Fortuna is preparing for Spain']],
    donateTitle: 'Climb with us to 17,000',
    donateLead: 'Every euro is one vertical meter. Every vertical meter brings us closer to a future for the good cause.',
    donated: 'Already',
    sponsored: 'of the 17,000 vertical meters sponsored!',
    goal: 'Goal: 17,000 vm',
    donateIntro: 'Every donation makes a difference. Help us prove that age is just a number! In honor of the 10th anniversary of Forza Fortuna vzw and my 70th birthday, we will overcome +17,000 Spanish vertical meters for the future of the good cause.',
    donationForm: 'Donation form',
    choose: 'Choose your donation',
    name: 'Name',
    message: 'Message (optional)',
    donateNow: 'Donate and buy vertical meters',
    recent: 'Recent donors',
    noDonors: 'Your name can be here soon.',
    tiers: [['Mountain Goat', '€10', '10 vm'], ['Climber', '€25', '25 vm'], ['King of the Mountain', '€50', '50 vm'], ['Legend', '€100+', '100+ vm']],
    contactTitle: 'Get in touch',
    contactLead: `A question, a brilliant idea or just feel like pedalling along?\n\nLet us know — we're here for you.`,
    send: 'Send message',
    sent: 'Thank you. We\'ll get back to you as soon as possible.',
    email: 'Official email address'
  },
  es: {
    nav: { home: 'Inicio', story: 'La historia', route: 'La ruta', terro: 'Proyecto Terro', blog: 'Blog', donate: 'Donar', contact: 'Contacto' },
    support: 'APOYA LA BUENA CAUSA & DONA AHORA',
    heroEyebrow: 'EL RETO CICLISTA DEFINITIVO',
    heroTitle: 'PROJECT 10/70',
    heroText: 'Décimo aniversario. Setenta años joven. Una ruta que lo cambia todo.',
    discover: 'Descubre el proyecto',
    introOfficial: "En 2029, el equipo ciclista Forza Fortuna (vzw) celebra su 10º aniversario y yo alcanzo la legendaria edad de 70 años. Dos hitos únicos, un reto extremo. Con el Proyecto 10/70 pasaré 10 días en el sillín por una buena causa: +17.000 metros de desnivel en las montañas españolas alrededor de L'Albir. Demostrando que la edad es solo un número.",
    stats: [['10', 'DÍAS EN EL SILLÍN', 'story'], ['+17.000', 'METROS DE DESNIVEL', 'route'], ['70', 'AÑOS JOVEN DE ESPÍRITU', 'terro']],
    sponsorText: 'Fortuna Financial Group es uno de los principales gestores patrimoniales del mercado belga. El CEO Frank Peeraer es un exfutbolista profesional con un gran corazón deportivo y, como varios de sus empleados, un ciclista apasionado. Fortuna apoya plenamente el cicloturismo y el Proyecto 10/70.',
    sponsorLink: 'Visita Fortuna Financial Group',
    sponsorCards: [['Personal', `En Fortuna tiene un contacto fijo que conoce su situación y que, junto con usted, mantiene la visión a largo plazo. Así no tiene que contar su historia una y otra vez y puede contar con una guía comprometida.`], ['Independiente', `No partimos de una única institución financiera ni de una solución estándar. Analizamos qué enfoque se ajusta objetivamente mejor a su patrimonio, sus expectativas y sus planes futuros.`], ['Una empresa familiar', `Fortuna se ha construido como empresa familiar. Por eso entendemos que el patrimonio no se trata solo de cifras, sino también de responsabilidad, continuidad y la próxima generación.`]],
    storyTitle: 'La historia detrás del reto',
    storyLead: `En 2019, el equipo ciclista Forza Fortuna se relanzó como una organización sin ánimo de lucro, nacida de una pasión compartida por el ciclismo tanto en la oficina de Fortuna Financial Group como en la comunidad en general. Lo que comenzó como salidas informales los domingos por la mañana evolucionó hasta convertirse en un equipo muy unido, impulsado por una misión común: combinar pasión, disciplina y amistad, tanto sobre la bicicleta como fuera de ella.

Diez años más tarde, en 2029, la organización celebra su décimo aniversario. Ese mismo año, yo —Roel, más conocido como "Terro"— alcanzaré la legendaria edad de 70 años. Dos hitos únicos que merecen una historia especial.

Esa historia se convirtió en el Proyecto 10/70: un desafío ciclista extremo en el que Terro pasa diez días sobre el sillín, superando más de 17.000 metros de desnivel acumulado en las montañas españolas de los alrededores de L'Albir. No fue una elección casual; estas montañas han sido el escenario de rutas legendarias y amistades inolvidables durante más de 15 años.`,
    storyQuote: `¿El objetivo? Demostrar que <span class="story-quote-highlight">la edad es solo un número</span>. Que <span class="story-quote-highlight">la pasión no conoce límites</span>. Y que, con la preparación adecuada, una mentalidad inquebrantable y las personas correctas a tu lado, cualquier meta a largo plazo está al alcance de la mano.`,
    storyOutro: `Pero este proyecto va más allá del ciclismo; se trata de una buena causa. Cada metro ascendido y cada gota de sudor derramada contribuyen a una misión mayor que el deporte en sí. Y tú puedes formar parte de ella.`,
    storySections: [['De la idea a la aventura', 'Lo que comenzó como una idea se convirtió en un reto que une a amigos, socios y todo un equipo.'], ['Dos hitos, un extremo', 'Diez años de Forza Fortuna vzw. Setenta años joven de espíritu. Dos números que marcan 17.000 metros de desnivel.'], ['Pedalear juntos', 'Cada kilómetro importa más cuando lo compartimos. Con seguidores en el camino, con donantes a distancia y con la buena causa como brújula.']],
    routeTitle: 'La ruta',
    routeLead: `Cada kilómetro un paso más cerca. Cada etapa comienza y termina en la playa bañada por el sol de Albir, desde donde afrontamos el reto y pedaleamos a través de paisajes de ensueño y cumbres exigentes. No es un viaje fácil, pero cada pedalada a lo largo de la costa y el interior español está movida por una motivación pura: ofrecer esperanza y un futuro mejor a los niños que más lo necesitan. Pedalea virtualmente con nosotros y sigue la ruta desde el oleaje hasta la meta.`,
    stages: ['Bucle Coll de Rates', 'La Vall d\'Ebo-paso & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'La última subida', 'La etapa final'],
    routePlaceholder: 'El perfil de la etapa se generará en vivo durante el reto en España.',
    terroTitle: 'PROYECTO 70: EL HOMBRE DETRÁS DE TERRO',
    terroSections: [['¿Quién es Terro?', 'Detrás de cada reto poderoso hay una persona con una historia. Terro combina experiencia, humor e un impulso irreprimible de seguir adelante.'], ['Dos hitos, un extremo', 'El número 70 no es un punto final. Es una línea de salida para un nuevo capítulo lleno de altitud, viento de frente y conexión.'], ['La filosofía', 'No esperes el momento perfecto. Solo toma el primer pedaleo, encuentra el pelotón y sigue adelante.'], ['La preparación', 'Con disciplina, curiosidad y un respeto saludable por las montañas, cada entrenamiento se convierte en una pieza de la ruta.']],
    blogTitle: 'Noticias del pelotón',
    blogLead: 'Actualizaciones, historias y momentos en el camino hacia el Proyecto 10/70.',
    blogCards: [['Anuncio', 'Los primeros metros de desnivel están hechos'], ['Entrenamiento', 'Por qué cada subida comienza con una elección'], ['Equipo', 'Forza Fortuna se prepara para España']],
    donateTitle: 'Sube con nosotros a 17.000',
    donateLead: 'Cada euro es un metro de desnivel. Cada metro de desnivel nos acerca a un futuro para la buena causa.',
    donated: 'Ya',
    sponsored: 'de los 17.000 metros de desnivel patrocinados!',
    goal: 'Meta: 17.000 md',
    donateIntro: 'Cada donación hace la diferencia. ¡Ayúdanos a demostrar que la edad es solo un número! En honor al 10º aniversario de Forza Fortuna vzw y mi 70º cumpleaños, superaremos +17.000 metros de desnivel españoles para el futuro de la buena causa.',
    donationForm: 'Formulario de donación',
    choose: 'Elige tu donación',
    name: 'Nombre',
    message: 'Mensaje (opcional)',
    donateNow: 'Dona y compra metros de desnivel',
    recent: 'Donantes recientes',
    noDonors: 'Tu nombre puede estar aquí pronto.',
    tiers: [['Cabra de montaña', '€10', '10 md'], ['Escalador', '€25', '25 md'], ['Rey de la montaña', '€50', '50 md'], ['Leyenda', '€100+', '100+ md']],
    contactTitle: 'Ponte en contacto',
    contactLead: `¿Una pregunta, una idea brillante o simplemente ganas de pedalear?\n\nCuéntanos — estamos aquí para ti.`,
    send: 'Enviar mensaje',
    sent: 'Gracias. Te responderemos lo antes posible.',
    email: 'Dirección de correo electrónico oficial'
  }
};
