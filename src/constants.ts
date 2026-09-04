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
    heroTitle: 'PROJECT 15/70',
    heroText: 'Vijftien jaar passie. Zeventig jaar jong. Eén legendarische uitdaging op karakter.',
    discover: 'Ontdek het project',
    introOfficial: "In 2029 viert wielerteam Forza Fortuna (GROUP) haar kristallen jubileum én ben ik exact 15 jaar verbonden aan dit geweldige team. Tegelijkertijd bereik ik de legendarische leeftijd van 70 jaar. Deze unieke mijlpalen smelten samen in één extreme uitdaging: Project 15/70. Zonder rustdagen kruip ik 10 dagen lang in het zadel voor het goede doel, met als ultiem doel +17.500 hoogtemeters in de Spaanse bergen rondom Albir. Om te bewijzen dat met karakter en passie alles haalbaar is.",
    stats: [['10', 'DAGEN IN HET ZADEL', 'story'], ['+17.500', 'HOOGTEMETERS', 'route'], ['70', 'JAAR JONG VAN GEEST', 'terro']],
    sponsorText: 'Fortuna Financial Group is één van de belangrijkste vermogensbegeleiders op de Belgische markt. CEO Frank Peeraer is een ex-profvoetballer met een echt sporthart en net als diverse van zijn medewerkers, zelf fervent fietser. Fortuna ondersteunt als bedrijf dan ook voluit het fietstoerisme én met trots Project 15/70.',
    sponsorLink: 'Ga naar Fortuna Financial Group',
    sponsorCards: [['Persoonlijk', `Bij Fortuna heeft u een vaste contactpersoon die uw situatie kent en samen met u de langetermijnvisie bewaakt. Zo hoeft u uw verhaal niet telkens opnieuw te vertellen en kunt u rekenen op een betrokken begeleiding.`], ['Onafhankelijk', `We vertrekken niet vanuit één financiële instelling of één standaardoplossing. We bekijken welke aanpak objectief het best past bij uw vermogen, uw verwachtingen en uw toekomstplannen.`], ['Een familiebedrijf', `Fortuna is zelf als familiebedrijf opgebouwd. Daardoor begrijpen we dat vermogen niet alleen over cijfers gaat, maar ook over verantwoordelijkheid, continuïteit en de volgende generatie.`]],
    storyTitle: 'Van wielerpassie tot extreme uitdaging',
    storyLead: `In 2015 ontstond de officiële vzw van wielerteam Forza Fortuna vanuit de pure wielerpassie op het kantoor van Fortuna Financial Group en binnen de community. Wat begon met de eerste plannen en vriendschappelijke ritten in 2014, groeide uit tot een hecht team met een gezamenlijke missie: passie, discipline en vriendschap verbinden op en naast de fiets.

Vijftien jaar na die allereerste ritten, in 2029, viert het team haar kristallen jubileum. Datzelfde jaar bereik ik, Roel — beter bekend als "Terro" — de legendarische leeftijd van 70 jaar. Twee unieke mijlpalen die samensmelten in één bijzonder verhaal.

Dat verhaal is Project 15/70: een extreme wieleruitdaging waarbij Terro 10 dagen lang non-stop in het zadel kruipt om meer dan 17.500 hoogtemeters te bedwingen in de Spaanse bergen rondom Albir. Geen toevallige keuze, want deze bergen vormen al vijftien jaar het decor van onze meest legendarische ritten en onvergetelijke vriendschappen.`,
    storyQuote: `Het doel? Bewijzen dat <span class="story-quote-highlight">leeftijd slechts een getal</span> is. Dat <span class="story-quote-highlight">passie geen grens</span> kent. En dat je met de juiste voorbereiding, de onverwoestbare mentaliteit en de juiste mensen om je heen elk lange-termijndoel kunt bereiken.`,
    storyOutro: `Maar dit project gaat niet alleen over fietsen. Het gaat over het goede doel. Elke meter die geklommen wordt, elke zweetdruppel die valt, draagt bij aan een missie die groter is dan de sport zelf. En daar kan jij deel van uitmaken.`,
    storySections: [['Van idee naar avontuur', 'Wat begon met de eerste plannen in 2014 groeide uit tot een grensverleggende uitdaging die vrienden, partners en een heel team samenbrengt.'], ['Twee mijlpalen, één extremum', 'Vijftien jaar passie en betrokkenheid bij Forza Fortuna. Zeventig jaar jong van geest. Twee mijlpalen die de lat op +17.500 hoogtemeters leggen.'], ['Samen trappen', 'Elke kilometer krijgt meer betekenis als we hem delen. Met supporters langs de weg, donateurs op afstand en het goede doel als ons kompas.']],
    routeTitle: 'De route',
    routeLead: `Elke kilometer een stap dichterbij. Elke rit start en komt aan op het zonovergoten strand van Albir, vanwaar we de uitdaging aangaan en ons 10 dagen lang non-stop dwars door adembenemende landschappen en over pittige bergen trappen.\n\nGeen gemakkelijke reis, maar elke pedaalslag langs de Spaanse kust en het ruige binnenland is gedreven door pure motivatie: het bedwingen van meer dan 17.500 hoogtemeters om zo hoop en een betere toekomst te bieden aan kinderen die dit het hardste nodig hebben. Fiets virtueel met ons mee en volg de route vanaf de branding tot de finish.`,
    stages: ['Coll de Rates Lus', 'La Vall d\'Ebo-pas & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'De laatste klim', 'De finishrit'],
    routePlaceholder: 'Etappeprofiel wordt live gegenereerd tijdens de uitdaging in Spanje.',
    terroTitle: 'PROJECT 70: DE MAN ACHTER TERRO',
    terroSections: [['Wie is Terro?', `Achter de intense blik schuilt een man van principes, karakter en een diep gewortelde discipline. Terro is iemand voor wie waarheid en correctheid de hoogste wetten zijn. Het verleden heeft zijn geheimen, maar die liggen veilig opgeborgen waar ze horen — de focus ligt nu volledig op de weg die voor ons ligt.

Als sporter kent Terro geen halve maatregelen. Gedrevenheid is een understatement; wielrennen is een levenswijze waarin altijd het uiterste werd gevraagd en gegeven. Zelfs op 60- tot 65-jarige leeftijd vertaalde die onuitputtelijke motor zich nog constant in mooie prijzen en ereplaatsen in het competitiepeloton. En de naam TERRO? Die is niet verdiend met een sympathieke lach, maar verdiend op karakter, doorzetten en keihard rijden wanneer anderen kraken.

De afgelopen twee jaar stonden volledig in het teken van de loodzware Gran Fondo\'s. De vorm was er, de focus was scherp, maar het lot besliste twee keer anders. Het ene jaar brutaal onderuit gekegeld net voor de start, het jaar daarna knock-out geslagen door ziekte op het moment van de waarheid. Waar een ander de handdoek in de ring zou gooien, zette Terro de knop om: \'Ik wacht tot mijn 70ste, en dan laat ik zien wat het écht wordt.\' Dat moment is nu gekomen.`], ['Twee mijlpalen, één extremum', `Het getal 70 is geen eindpunt, het is de startlijn van het meest uitdagende hoofdstuk tot nu toe. Voor sommigen is 70 de leeftijd van het rustiger aan doen, maar voor Terro is het de ultieme kans om te bewijzen wie hij werkelijk is: een pure sportman die leeft voor de grens en het uiterste opzoekt in extreme uitdagingen.

Deze prestatie is gebouwd op twee onwrikbare pijlers die elkaar versterken. Aan de ene kant de magische kaap van de 70-jarige leeftijd. Aan de andere kant het getal 10: de tien opeenvolgende, loodzware ritten die vanuit het Spaanse Albir worden gereden. Dag na dag in het zadel, dag na dag strijden tegen de elementen en de vermoeidheid.

Dat is waarom dit project het absolute \'extremum\' wordt genoemd. Het is de ultieme piek, het sportieve hoogtepunt waarin leeftijd en pure fysieke uitputting elkaar ontmoeten. Dit op je 70ste presteren is geen gewone fietstocht; it is een grensverleggend statement voor het goede doel dat laat zien dat passie en karakter onverwoestbaar zijn.`], ['Karakter tegen de elementen', `Op de fiets ben je uiteindelijk altijd alleen met je gedachten. Als de Spaanse zon brandt, de wind tegenzit en de stijgingspercentages in het binnenland rondom Albir in de dubbele cijfers schieten, komt het niet meer aan op de benen, maar op pure mentale veerkracht.

De filosofie van Terro in het zadel is even simpel als onbarmhartig: niet zeuren, maar trappen. Pijn is tijdelijk, maar het doel is blijvend. Elk zwaar moment en elke druppel zweet langs de route krijgt betekenis omdat het gekoppeld is aan het welzijn van kinderen die elke steun hard nodig hebben. Die wetenschap verhardt het karakter en zorgt ervoor dat de knop omgaat als het zwaar wordt. Opgeven is simpelweg geen optie; het hoofd regeert over het lichaam.`], ['De voorbereiding', `Een extreme prestatie vraagt om een doordachte, professionele aanpak. De voorbereiding van Terro is geen kwestie van blind kilometers vreten, maar van luisteren naar het lichaam en periodisering. De nazomer in september staat in het teken van uitbollen, rusten en puur genieten van het fietsen zonder de druk van urenlange ritten. Pas als de winter zijn intrede doet, gaat de knop om.

Vanaf oktober verschuift de focus naar de basis: twee keer per week gerichte kracht- en core-stabiliteitstraining thuis, twee intensieve sessies op de virtuele wegen van Zwift, en in het weekend een stevige rit om de scherpte te behouden met het team. Zodra het voorjaar in maart aanbreekt, worden de trainingsuren en de kilometers gestaag opgebouwd, terwijl de core- en krachttraining de onmisbare fundering blijven vormen. Richting 2027 en 2028 zal de ultieme voorbereiding plaatsvinden in Spanje zelf, waarbij de specifieke etappes stilaan worden verkend vanuit L\'Albir.

Qua materiaal laat Terro niets aan het toeval over en wordt alles in eigen beheer perfect afgesteld. Voor de uitrusting kan hij rekenen op de onvoorwaardelijke steun van vriend/sponsor Frank Peeraer van Forza Fortuna (Fortuna Group), die ervoor zorgt dat Terro in de perfecte, aerodynamische en professionele uitrusting aan de start verschijnt.`]],
    blogTitle: 'Nieuws uit het peloton',
    blogLead: 'Updates, verhalen en momenten onderweg naar Project 15/70.',
    blogCards: [['Aankondiging', 'De eerste hoogtemeters zijn gemaakt'], ['Training', 'Waarom elke klim begint met een keuze'], ['Team', 'Forza Fortuna maakt zich klaar voor Spanje']],
    donateTitle: 'Klim mee naar 17.500',
    donateLead: 'Elke euro is één hoogtemeter. Elke hoogtemeter brengt ons dichter bij een toekomst voor het goede doel.',
    donated: 'Al',
    sponsored: 'van de 17.500 hoogtemeters gesponsord!',
    goal: 'Doel: 17.500 hm',
    donateIntro: 'Elke donatie maakt het verschil. Help ons bewijzen dat leeftijd slechts een getal is! Ter ere van het 10-jarig jubileum van Forza Fortuna vzw en mijn 70e verjaardag overwinnen wij +17.500 Spaanse hoogtemeters voor de toekomst van het goede doel.',
    donationForm: 'Donatieformulier',
    choose: 'Kies je donatie',
    name: 'Naam',
    message: 'Bericht (optioneel)',
    donateNow: 'Doneer en koop hoogtemeters',
    recent: 'Recente donateurs',
    noDonors: 'Jouw naam kan hier straks tussen staan.',
    tiers: [['Berggeit', '€10', '10 hm'], ['Klimmer', '€25', '25 hm'], ['Koning van de Berg', '€50', '50 hm'], ['Legende', '€100+', '100+ hm']],
    contactTitle: 'Neem contact op',
    contactLead: `Een vraag, een briljant idee of gewoon zin om mee te trappen?

Laat maar iets horen — we staan voor je klaar.`,
    send: 'Verstuur bericht',
    sent: 'Bedankt. We nemen zo snel mogelijk contact met je op.',
    email: 'Officieel e-mailadres'
  },
  en: {
    nav: { home: 'Home', story: 'The Story', route: 'The Route', terro: 'Project Terro', blog: 'Blog', donate: 'Donate', contact: 'Contact' },
    support: 'SUPPORT THE GOOD CAUSE & DONATE NOW',
    heroEyebrow: 'THE ULTIMATE CYCLING CHALLENGE',
    heroTitle: 'PROJECT 15/70',
    heroText: 'Tenth anniversary. Seventy years young. One ride that changes everything.',
    discover: 'Discover the project',
    introOfficial: "In 2029, cycling team Forza Fortuna (vzw) celebrates its 10th anniversary and I reach the legendary age of 70. Two unique milestones, one extreme challenge. With Project 15/70 I will spend 10 days in the saddle for a good cause: +17,500 vertical meters in the Spanish mountains around L'Albir. Proving that age is just a number.",
    stats: [['10', 'DAYS IN THE SADDLE', 'story'], ['+17,500', 'VERTICAL METERS', 'route'], ['70', 'YEARS YOUNG AT HEART', 'terro']],
    sponsorText: 'Fortuna Financial Group is one of the leading wealth managers in the Belgian market. CEO Frank Peeraer is a former professional footballer with a true sporting heart and, like several of his colleagues, an avid cyclist. Fortuna fully supports cycling tourism and proudly supports Project 15/70.',
    sponsorLink: 'Visit Fortuna Financial Group',
    sponsorCards: [['Personal', `At Fortuna you have a fixed contact who knows your situation and helps you keep the long-term vision on track. That way, you don't have to retell your story every time and can rely on committed guidance.`], ['Independent', `We don't start from a single financial institution or one standard solution. We look at which approach objectively best fits your wealth, your expectations and your future plans.`], ['A family business', `Fortuna was built as a family business itself. That's why we understand that wealth is not just about numbers, but also about responsibility, continuity and the next generation.`]],
    storyTitle: 'The story behind the challenge',
    storyLead: `In 2015, the official non-profit organization of cycling team Forza Fortuna was born out of pure cycling passion at the Fortuna Financial Group office and within the community. What started with the first plans and friendly rides back in 2014, grew into a tight-knit team with a shared mission: connecting passion, discipline, and friendship on and off the bike.

Fifteen years after those very first rides, in 2029, the team celebrates its crystal jubilee. That same year, I, Roel — better known as "Terro" — will reach the legendary age of 70. Two unique milestones melting together into one extraordinary story.

That story is Project 15/70: an extreme cycling challenge where Terro will spend 10 consecutive days in the saddle to conquer more than 17,500 meters of elevation gain in the Spanish mountains around Albir. Not a random choice, as these mountains have formed the backdrop for our most legendary rides and unforgettable friendships for fifteen years.`,
    storyQuote: `The goal? To prove that <span class="story-quote-highlight">age is just a number</span>. That <span class="story-quote-highlight">passion knows no bounds</span>. And that with the right preparation, an unbreakable mindset, and the right people around you, any long-term goal is within reach.`,
    storyOutro: `But this project is not just about cycling. It is about a good cause. Every meter climbed, every drop of sweat, contributes to a mission bigger than the sport itself. And you can be a part of it.`,
    storySections: [['From idea to adventure', 'What started with the first plans back in 2014 grew into a groundbreaking challenge that brings friends, partners, and an entire team together.'], ['Two milestones, one extremum', 'Fifteen years of passion and dedication to Forza Fortuna. Seventy years young at heart. Two milestones raising the bar to +17,500 meters of elevation.'], ['Pedaling together', 'Every kilometer gains more meaning when shared. With supporters along the way, remote donors, and our chosen charity as a compass.']],
    routeTitle: 'The route',
    routeLead: `Every kilometer is a step closer. Each ride starts and finishes on the sun-drenched beach of Albir, from where we take on the challenge and pedal non-stop for 10 consecutive days through breathtaking landscapes and over tough mountain peaks.\n\nNot an easy journey, but every pedal stroke along the Spanish coast and the rugged interior is driven by pure motivation: conquering more than 17,500 meters of elevation gain to offer hope and a better future to children who need it most. Cycle with us virtually and follow the route from the shoreline to the finish.`,
    stages: ['Coll de Rates Loop', 'La Vall d\'Ebo-pass & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'The final climb', 'The finish stage'],
    routePlaceholder: 'Stage profile will be generated live during the challenge in Spain.',
    terroTitle: 'PROJECT 70: THE MAN BEHIND TERRO',
    terroSections: [['Who is Terro?', 'Behind every powerful challenge is a person with a story. Terro combines experience, humor and an irrepressible drive to keep moving.'], ['Two milestones, one extreme', 'The number 70 is not an endpoint. It is a starting line for a new chapter full of altitude, headwind and connection.'], ['The philosophy', 'Don\'t wait for the perfect moment. Just take the first pedal, find the peloton and keep going together.'], ['The preparation', 'With discipline, curiosity and a healthy respect for the mountains, every training becomes a piece of the route.']],
    blogTitle: 'News from the peloton',
    blogLead: 'Updates, stories and moments on the way to Project 15/70.',
    blogCards: [['Announcement', 'The first vertical meters are made'], ['Training', 'Why every climb starts with a choice'], ['Team', 'Forza Fortuna is preparing for Spain']],
    donateTitle: 'Climb with us to 17,500',
    donateLead: 'Every euro is one vertical meter. Every vertical meter brings us closer to a future for the good cause.',
    donated: 'Already',
    sponsored: 'of the 17,500 vertical meters sponsored!',
    goal: 'Goal: 17,500 vm',
    donateIntro: 'Every donation makes a difference. Help us prove that age is just a number! In honor of the 10th anniversary of Forza Fortuna vzw and my 70th birthday, we will overcome +17,500 Spanish vertical meters for the future of the good cause.',
    donationForm: 'Donation form',
    choose: 'Choose your donation',
    name: 'Name',
    message: 'Message (optional)',
    donateNow: 'Donate and buy vertical meters',
    recent: 'Recent donors',
    noDonors: 'Your name can be here soon.',
    tiers: [['Mountain Goat', '€10', '10 vm'], ['Climber', '€25', '25 vm'], ['King of the Mountain', '€50', '50 vm'], ['Legend', '€100+', '100+ vm']],
    contactTitle: 'Get in touch',
    contactLead: `A question, a brilliant idea or just feel like pedalling along?

Let us know — we're here for you.`,
    send: 'Send message',
    sent: 'Thank you. We\'ll get back to you as soon as possible.',
    email: 'Official email address'
  },
  es: {
    nav: { home: 'Inicio', story: 'La historia', route: 'La ruta', terro: 'Proyecto Terro', blog: 'Blog', donate: 'Donar', contact: 'Contacto' },
    support: 'APOYA LA BUENA CAUSA & DONA AHORA',
    heroEyebrow: 'EL RETO CICLISTA DEFINITIVO',
    heroTitle: 'PROJECT 15/70',
    heroText: 'Décimo aniversario. Setenta años joven. Una ruta que lo cambia todo.',
    discover: 'Descubre el proyecto',
    introOfficial: "En 2029, el equipo ciclista Forza Fortuna (vzw) celebra su 10º aniversario y yo alcanzo la legendaria edad de 70 años. Dos hitos únicos, un reto extremo. Con el Proyecto 15/70 pasaré 10 días en el sillín por una buena causa: +17.500 metros de desnivel en las montañas españolas alrededor de L'Albir. Demostrando que la edad es solo un número.",
    stats: [['10', 'DÍAS EN EL SILLÍN', 'story'], ['+17.500', 'METROS DE DESNIVEL', 'route'], ['70', 'AÑOS JOVEN DE ESPÍRITU', 'terro']],
    sponsorText: 'Fortuna Financial Group es uno de los principales gestores patrimoniales del mercado belga. El CEO Frank Peeraer es un exfutbolista profesional con un gran corazón deportivo y, como varios de sus empleados, un ciclista apasionado. Fortuna apoya plenamente el cicloturismo y el Proyecto 15/70.',
    sponsorLink: 'Visita Fortuna Financial Group',
    sponsorCards: [['Personal', `En Fortuna tiene un contacto fijo que conoce su situación y que, junto con usted, mantiene la visión a largo plazo. Así no tiene que contar su historia una y otra vez y puede contar con una guía comprometida.`], ['Independiente', `No partimos de una única institución financiera ni de una solución estándar. Analizamos qué enfoque se ajusta objetivamente mejor a su patrimonio, sus expectativas y sus planes futuros.`], ['Una empresa familiar', `Fortuna se ha construido como empresa familiar. Por eso entendemos que el patrimonio no se trata solo de cifras, sino también de responsabilidad, continuidad y la próxima generación.`]],
    storyTitle: 'La historia detrás del reto',
    storyLead: `En 2015 nació la asociación oficial sin ánimo de lucro del equipo ciclista Forza Fortuna, fruto de la pura pasión por el ciclismo en las oficinas de Fortuna Financial Group y dentro de la comunidad. Lo que comenzó con los primeros planes y salidas amistosas en 2014, se convirtió en un equipo muy unido con una misión compartida: conectar la pasión, la disciplina y la amistad tanto dentro como fuera de la bicicleta.

Quince años después de aquellas primeras salidas, en 2029, el equipo celebra su aniversario de cristal. Ese mismo año, yo, Roel —más conocido como "Terro"— alcanzaré la legendaria edad de 70 años. Dos hitos únicos que se funden en una historia extraordinaria.

Esa historia es el Proyecto 15/70: un desafío ciclista extremo en el que Terro pasará 10 días seguidos en el sillín para conquistar más de 17.500 metros de desnivel positivo en las montañas españolas que rodean Albir. No es una elección casual, ya que estas montañas han sido el escenario de nuestras rutas más legendarias y de amistades inolvidables durante quince años.`,
    storyQuote: `¿El objetivo? Demostrar que <span class="story-quote-highlight">la edad es solo un número</span>. Que <span class="story-quote-highlight">la pasión no conoce límites</span>. Y que, con la preparación adecuada, una mentalidad inquebrantable y las personas correctas a tu lado, cualquier meta a largo plazo está al alcance de la mano.`,
    storyOutro: `Pero este proyecto no es solo ciclismo. Se trata de una buena causa. Cada metro subido, cada gota de sudor, contribuye a una misión más grande que el propio deporte. Y tú puedes formar parte de ella.`,
    storySections: [['De la idea al aventura', 'Lo que comenzó con los primeros planes en 2014 se convirtió en un desafío innovador que une a amigos, socios y a todo un equipo.'], ['Dos hitos, un extremo', 'Quince años de pasión y dedicación a Forza Fortuna. Setenta años joven de espíritu. Dos hitos que sitúan el listón en +17.500 metros de desnivel.'], ['Pedaleando juntos', 'Cada kilómetro cobra más sentido cuando se comparte. Con seguidores en el camino, donantes a distancia y la buena causa como brújula.']],
    routeTitle: 'La ruta',
    routeLead: `Cada kilómetro es un paso más cerca. Cada ruta comienza y termina en la soleada playa de Albir, desde donde asumimos el desafío y pedaleamos sin parar durante 10 días seguidos a través de paisajes impresionantes y cumbres exigentes.\n\nNo es un viaje fácil, pero cada pedalada a lo largo de la costa española y el escarpado interior está impulsada por una motivación pura: conquistar más de 17.500 metros de desnivel positivo para ofrecer esperanza y un futuro mejor a los niños que más lo necesitan. Pedalea con nosotros de forma virtual y sigue la ruta desde la orilla del mar hasta la meta.`,
    stages: ['Bucle Coll de Rates', 'La Vall d\'Ebo-paso & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'La última subida', 'La etapa final'],
    routePlaceholder: 'El perfil de la etapa se generará en vivo durante el reto en España.',
    terroTitle: 'PROYECTO 70: EL HOMBRE DETRÁS DE TERRO',
    terroSections: [['¿Quién es Terro?', 'Detrás de cada reto poderoso hay una persona con una historia. Terro combina experiencia, humor e un impulso irreprimible de seguir adelante.'], ['Dos hitos, un extremo', 'El número 70 no es un punto final. Es una línea de salida para un nuevo capítulo lleno de altitud, viento de frente y conexión.'], ['La filosofía', 'No esperes el momento perfecto. Solo toma el primer pedaleo, encuentra el pelotón y sigue adelante.'], ['La preparación', 'Con disciplina, curiosidad y un respeto saludable por las montañas, cada entrenamiento se convierte en una pieza de la ruta.']],
    blogTitle: 'Noticias del pelotón',
    blogLead: 'Actualizaciones, historias y momentos en el camino hacia el Proyecto 15/70.',
    blogCards: [['Anuncio', 'Los primeros metros de desnivel están hechos'], ['Entrenamiento', 'Por qué cada subida comienza con una elección'], ['Equipo', 'Forza Fortuna se prepara para España']],
    donateTitle: 'Sube con nosotros a 17.500',
    donateLead: 'Cada euro es un metro de desnivel. Cada metro de desnivel nos acerca a un futuro para la buena causa.',
    donated: 'Ya',
    sponsored: 'de los 17.500 metros de desnivel patrocinados!',
    goal: 'Meta: 17.500 md',
    donateIntro: 'Cada donación hace la diferencia. ¡Ayúdanos a demostrar que la edad es solo un número! En honor al 10º aniversario de Forza Fortuna vzw y mi 70º cumpleaños, superaremos +17.500 metros de desnivel españoles para el futuro de la buena causa.',
    donationForm: 'Formulario de donación',
    choose: 'Elige tu donación',
    name: 'Nombre',
    message: 'Mensaje (opcional)',
    donateNow: 'Dona y compra metros de desnivel',
    recent: 'Donantes recientes',
    noDonors: 'Tu nombre puede estar aquí pronto.',
    tiers: [['Cabra de montaña', '€10', '10 md'], ['Escalador', '€25', '25 md'], ['Rey de la montaña', '€50', '50 md'], ['Leyenda', '€100+', '100+ md']],
    contactTitle: 'Ponte en contacto',
    contactLead: `¿Una pregunta, una idea brillante o simplemente ganas de pedalear?

Cuéntanos — estamos aquí para ti.`,
    send: 'Enviar mensaje',
    sent: 'Gracias. Te responderemos lo antes posible.',
    email: 'Dirección de correo electrónico oficial'
  }
};
