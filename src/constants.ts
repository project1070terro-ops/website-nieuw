import type { TranslationContent } from './types';
import { blogPosts } from './blogContent';

export const heroImages = [
  '/images/hero/l_albir_d2ae8820d05f96bc7f7d33001aaf5564.webp',
  '/images/hero/Cumbre-del-Sol-Calpe-Costa-Blanca-3-1920x1080.webp',
  '/images/hero/Cycling-calpe-and-costa-blanca-copyright-Sierras-Sports-Tours-3-1920x1080.webp',
];

export const copy: Record<'nl' | 'en' | 'es', TranslationContent> = {
  nl: {
    nav: { home: 'Home', story: 'Het Verhaal', route: 'De Route', terro: 'Project Terro', blog: 'Blog', cause: 'Het Goede Doel', donate: 'Doneren', contact: 'Contact' },
    support: 'Save the Children & doneer nu',
    heroEyebrow: ['NAJAAR 2029', '10 DAGEN NON-STOP VANAF HET STRAND VAN ALBIR'],
    heroTitle: 'PROJECT 15/70',
    heroText: 'Vijftien jaar passie. Zeventig jaar jong. Eén legendarische uitdaging voor Save the Children.',
    discover: 'Volg onze reis naar 2029',
    introOfficial: "In 2029 viert wielerteam Forza Fortuna Financial Group haar kristallen jubileum én ben ik exact 15 jaar verbonden aan dit geweldige team. Tegelijkertijd bereik ik de legendarische leeftijd van 70 jaar. Deze unieke mijlpalen smelten samen in één extreme uitdaging: Project 15/70. Zonder rustdagen kruip ik 10 dagen lang in het zadel voor het goede doel, met als ultiem doel +17.500 hoogtemeters in de Spaanse bergen rondom Albir. Om te bewijzen dat met karakter en passie alles haalbaar is.",
    stats: [['15', 'JAAR FORZA FORTUNA FINANCIAL GROUP', 'story'], ['+17.500', 'HGM | 10 DAGEN NON-STOP', 'route'], ['70', 'JAAR JONG VAN GEEST', 'terro']],
    sponsorText: 'Fortuna Financial Group is één van de belangrijkste vermogensbegeleiders op de Belgische markt. CEO Frank Peeraer is een ex-profvoetballer met een echt sporthart en net als diverse van zijn medewerkers, zelf fervent fietser. Fortuna ondersteunt als bedrijf dan ook voluit het fietstoerisme én met trots Project 15/70.',
    sponsorLink: 'Ga naar Fortuna Financial Group',
    sponsorCards: [['Persoonlijk', `Bij Fortuna heeft u een vaste contactpersoon die uw situatie kent en samen met u de langetermijnvisie bewaakt. Zo hoeft u uw verhaal niet telkens opnieuw te vertellen en kunt u rekenen op een betrokken begeleiding.`], ['Onafhankelijk', `We vertrekken niet vanuit één financiële instelling of één standaardoplossing. We bekijken welke aanpak objectief het best past bij uw vermogen, uw verwachtingen en uw toekomstplannen.`], ['Een familiebedrijf', `Fortuna is zelf als familiebedrijf opgebouwd. Daardoor begrijpen we dat vermogen niet alleen over cijfers gaat, maar ook over verantwoordelijkheid, continuïteit en de volgende generatie.`]],
    storyTitle: 'Van wielerpassie tot extreme uitdaging',
    storyLead: `In 2015 ontstond de officiële vzw van wielerteam Forza Fortuna Financial Group vanuit de pure wielerpassie op het kantoor van Fortuna Financial Group en binnen de community. Wat begon met de eerste plannen en vriendschappelijke ritten in 2014, groeide uit tot een hecht team met een gezamenlijke missie: passie, discipline en vriendschap verbinden op en naast de fiets.

Vijftien jaar na die allereerste ritten, in 2029, viert het team haar kristallen jubileum. Datzelfde jaar bereik ik, Roel — beter bekend als "Terro" — de legendarische leeftijd van 70 jaar. Twee unieke mijlpalen die samensmelten in één bijzonder verhaal.

Dat verhaal is Project 15/70: een extreme wieleruitdaging waarbij Terro 10 dagen lang non-stop in het zadel kruipt om meer dan 17.500 hoogtemeters te bedwingen in de Spaanse bergen rondom Albir. Geen toevallige keuze, want deze bergen vormen al vijftien jaar het decor van onze meest legendarische ritten en onvergetelijke vriendschappen.`,
    storyQuote: `Het doel? Bewijzen dat <span class="story-quote-highlight">leeftijd slechts een getal</span> is. Dat <span class="story-quote-highlight">passie geen grens</span> kent. En dat je met de juiste voorbereiding, de onverwoestbare mentaliteit en de juiste mensen om je heen elk lange-termijndoel kunt bereiken.`,
    storyOutro: `Maar dit project gaat niet alleen over fietsen. Het gaat over het goede doel. Elke meter die geklommen wordt, elke zweetdruppel die valt, draagt bij aan een missie die groter is dan de sport zelf. En daar kan jij deel van uitmaken.`,
    storySections: [['Van idee naar avontuur', 'Wat begon met de eerste plannen in 2014 groeide uit tot een grensverleggende uitdaging die vrienden, partners en een heel team samenbrengt.'], ['Twee mijlpalen, één extremum', 'Vijftien jaar passie en betrokkenheid bij Forza Fortuna Financial Group. Zeventig jaar jong van geest. Twee mijlpalen die de lat op +17.500 hoogtemeters leggen.'], ['Samen trappen', 'Elke kilometer krijgt meer betekenis als we hem delen. Met supporters langs de weg, donateurs op afstand en het goede doel als ons kompas.']],
    routeTitle: 'De route',
    routeLead: `Elke kilometer een stap dichterbij. Vanaf het strand van Albir trappen we 10 dagen lang door adembenemende landschappen en over pittige bergen. Meer dan 17.500 hoogtemeters, gedreven door pure motivatie: hoop en een betere toekomst voor kinderen die dit het hardste nodig hebben. Fiets virtueel mee en volg onze route van de branding tot de finish.`,
    stages: ['Coll de Rates Lus', 'La Vall d\'Ebo-pas & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'De laatste klim', 'De finishrit'],
    routePlaceholder: 'Etappeprofiel wordt live gegenereerd tijdens de uitdaging in Spanje.',
    routeViewer: {
      day: 'Dag', daysAria: 'Dagen', loadingRoute: 'Route data laden...', noRouteData: 'Geen routedata gevonden.',
      downloadGpx: 'Download GPX', distance: 'Afstand', elevationGain: 'Hoogtewinst', elevationLoss: 'Hoogteverlies',
      maxGradient: 'Max. helling', lowestPoint: 'Laagste punt', highestPoint: 'Hoogste punt', avgSpeed: 'Gem. snelheid',
      estTime: 'Geschatte tijd', ascent: 'Helling omhoog', descent: 'Helling omlaag', difficulty: 'Moeilijkheidsgraad',
      speed: 'Snelheid', avgLabel: 'Gemiddeld:', hard: 'Zwaar', moderate: 'Gemiddeld', easy: 'Licht',
      axisDistance: 'Afstand in km', axisElevation: 'Hoogte (m)', hoverHint: 'Beweeg over de grafiek voor live info',
      loadingGpx: 'GPX-profiel laden...', noGpx: 'Geen GPX-data gevonden.', elevation: 'Hoogte', gradient: 'Helling',
      location: 'Locatie', wayType: 'Wegtype', surface: 'Ondergrond', surfaceValue: 'Asfalt', wayTypeValue: 'Weg', hourAbbr: 'u',
      weatherTitle: 'Het weer', weatherToday: 'Vandaag', weatherTemp: 'Temp', weatherWind: 'Wind', weatherPrecip: 'Neerslag', weatherError: 'Weerdata niet beschikbaar',
      axisHint: 'beweeg voor info',
    },
    terroTitle: 'PROJECT TERRO: DE MAN ACHTER 15/70',
    terroSections: [['Wie is Terro?', `Achter de intense blik schuilt een man van principes, karakter en diepe discipline. Voor Terro zijn waarheid en correctheid de hoogste wetten. Het verleden heeft zijn geheimen, maar die liggen veilig opgeborgen waar ze horen — de focus ligt volledig op de weg die voor hem ligt.

Als wielrenner kent Terro geen half werk. Gedrevenheid is een understatement; fietsen is een levenswijze waarin altijd het uiterste werd gevraagd en gegeven. Zelfs op 60- tot 65-jarige leeftijd vertaalde die onuitputtelijke energie zich nog regelmatig in mooie prijzen en ereplaatsen in het competitiepeloton. En de naam TERRO? Die is niet verdiend met een sympathieke lach, maar op karakter, doorzettingsvermogen en keihard rijden op het moment dat anderen kraken.

De afgelopen twee jaar stonden volledig in het teken van de loodzware Gran Fondo's. De vorm was er, de focus was scherp, maar het lot besliste twee keer anders. Het ene jaar brutaal onderuit gekegeld net voor de start; het jaar daarna uitgeschakeld door ziekte op het moment van de waarheid. Waar een ander de handdoek in de ring gooit, zette Terro de knop om: 'Ik wacht tot mijn 70ste, en dan laat ik zien wat het écht wordt.' Dat moment is nu gekomen.`], ['Twee mijlpalen, één extremum', `Na vijftien jaar verbonden aan Forza Fortuna Financial Group staat Terro voor het meest uitdagende hoofdstuk tot nu toe. Voor sommigen is 70 de leeftijd van het rustiger aan doen, maar voor Terro is het de ultieme kans om te bewijzen wie hij is: een pure sportman die leeft voor de grens.

Dit project rust op twee onwrikbare pijlers. Aan de ene kant de magische kaap van de 70-jarige leeftijd. Aan de andere kant het getal 10: tien opeenvolgende, loodzware ritten die vanuit het Spaanse Albir worden gereden. Dag na dag in het zadel, dag na dag strijden tegen de elementen en de vermoeidheid.

Daarom heet dit project het absolute 'extremum': de ultieme piek waarin leeftijd en pure fysieke uitputting elkaar ontmoeten. Op je 70ste een dergelijke prestatie leveren is geen gewone fietstocht; het is een grensverleggend statement voor het goede doel dat bewijst dat passie en karakter onverwoestbaar zijn.`], ['Karakter tegen de elementen', `Op de fiets ben je uiteindelijk altijd alleen met je gedachten. Als de Spaanse zon brandt, de wind tegenzit en de stijgingspercentages in het binnenland rondom Albir in de dubbele cijfers schieten, komt het niet meer aan op de benen, maar op pure mentale veerkracht.

De filosofie van Terro in het zadel is even simpel als onbarmhartig: niet zeuren, maar trappen. Pijn is tijdelijk, maar het doel is blijvend. Elk zwaar moment en elke druppel zweet langs de route krijgt betekenis omdat het gekoppeld is aan het welzijn van kinderen die elke steun hard nodig hebben. Die wetenschap verhardt het karakter en zorgt ervoor dat de knop omgaat als het zwaar wordt. Opgeven is geen optie; het hoofd regeert over het lichaam.`], ['De voorbereiding', `Een extreme prestatie vraagt om een doordachte, professionele aanpak. Terro's voorbereiding is geen kwestie van blind kilometers vreten, maar van luisteren naar het lichaam en periodisering. De nazomer in september staat in het teken van rust, herstel en puur genieten van het fietsen zonder de druk van urenlange ritten. Pas als de winter zijn intrede doet, gaat de knop om.

Vanaf oktober verschuift de focus naar de basis: twee keer per week gerichte kracht- en core-stabiliteitstraining thuis, twee intensieve sessies op de virtuele wegen van Zwift, en in het weekend een stevige rit om de scherpte te behouden met het team. Zodra het voorjaar in maart aanbreekt, worden de trainingsuren en de kilometers gestaag opgebouwd, terwijl core- en krachttraining de onmisbare fundering blijven vormen. Richting 2027 en 2028 vindt de ultieme voorbereiding plaats in Spanje zelf, waarbij de specifieke etappes stilaan worden verkend vanuit Albir.

Qua materiaal laat Terro niets aan het toeval over, alles moet steeds tot in de puntjes in orde zijn. Voor de uitrusting en omkadering kan Terro rekenen op de onvoorwaardelijke steun van vriend en sponsor Frank Peeraer van Fortuna Financial Group, die ervoor zorgt dat Terro zo professioneel mogelijk aan de start verschijnt.`]],
    causeTitle: 'Het goede doel: Save the Children',
    causeLead: `Elke hoogtemeter van Project 15/70 staat in dienst van iets groters dan de sport. Daarom kiezen we bewust voor Save the Children, een wereldwijde organisatie die zich al meer dan honderd jaar inzet voor kinderen die het het hardst nodig hebben.`,
    causeSections: [
      ['Wie is Save the Children', `Save the Children werd in 1919 opgericht door de Britse Eglantyne Jebb en groeide uit tot één van de meest invloedrijke kinderrechtenorganisaties ter wereld. Met teams in meer dan honderd landen strijdt de organisatie elke dag voor een fundamentele overtuiging: elk kind heeft recht op overleving, bescherming, ontwikkeling en participatie — wie het ook is en waar het ook geboren wordt.`],
      ['Wat doen ze', `Het werk van Save the Children is breed en concreet. De organisatie levert noodhulp bij rampen en conflicten, zet zich in voor de bescherming van kinderen tegen geweld en uitbuiting, en investeert in gezondheid, voeding en onderwijs. Ook in Europa voert Save the Children campagne om de belangen van kinderen hoog op de agenda van beleidsmakers te zetten — want kinderrechten kennen geen grenzen.`],
      ['Waarom wij voor hen kiezen', `Kinderen kunnen niet zelf opkomen voor hun toekomst — dat doen wij voor hen. Voor Terro en het team van Forza Fortuna Financial Group voelde de keuze voor Save the Children vanzelfsprekend: dit project draait om verantwoordelijkheid voor de volgende generatie. Elke hoogtemeter die we afworstelen en elke euro die binnenkomt, vertaalt zich in steun voor kwetsbare kinderen. Dat is de kracht van samen trappen: onze inspanning wordt hun kans.`],
    ],
    causeLinkLabel: 'Ontdek meer op de officiële website',
    donateCauseTitle: 'Wij fietsen voor Save the Children',
    donateCauseText: 'Achter elke hoogtemeter schuilt een kind dat een eerlijke kans verdient. Save the Children zet zich wereldwijd in voor gezondheid, onderwijs en bescherming van kinderen — precies waar jouw donatie heen gaat.',
    donateCauseLink: 'Lees waarom we voor hen kiezen',
    messageBlocked: 'Je bericht bevat woorden of inhoud die we niet kunnen plaatsen. Pas het bericht aan en probeer het opnieuw.',
    nameInvalid: 'Gebruik enkel letters, spaties, koppeltekens, apostrofs of punten in je naam.',
    goalReached: 'Doel bereikt — fantastisch!',
    blogTitle: 'Nieuws uit het peloton',
    blogLead: 'Updates, verhalen en momenten onderweg naar Project 15/70.',
    blogCards: blogPosts.nl,
    donateTitle: 'Klim mee naar 17.500',
    donateLead: 'Elke euro is één hoogtemeter. Elke hoogtemeter brengt ons dichter bij een toekomst voor het goede doel.',
    donated: 'Al',
    sponsored: 'van de 17.500 hoogtemeters gesponsord!',
    goal: 'Doel: 17.500 hm',
    donateIntro: 'Elke donatie maakt het verschil. Help ons bewijzen dat leeftijd slechts een getal is! Achter elke hoogtemeter schuilt een kind dat een eerlijke kans verdient. Save the Children zet zich wereldwijd in voor gezondheid, onderwijs en bescherming van kinderen — precies waar jouw donatie heen gaat.',
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
    nav: { home: 'Home', story: 'The Story', route: 'The Route', terro: 'Project Terro', blog: 'Blog', cause: 'Our Cause', donate: 'Donate', contact: 'Contact' },
    support: 'Save the Children & donate now',
    heroEyebrow: ['AUTUMN 2029', '10 DAYS NON-STOP FROM THE BEACH OF ALBIR'],
    heroTitle: 'PROJECT 15/70',
    heroText: 'Fifteenth anniversary. Seventy years young. One legendary ride for Save the Children.',
    discover: 'Follow our journey to 2029',
    introOfficial: "In 2029, cycling team Forza Fortuna Financial Group celebrates its 15th anniversary and I reach the legendary age of 70. Two unique milestones, one extreme challenge. With Project 15/70 I will spend 10 days in the saddle for a good cause: +17,500 vertical meters in the Spanish mountains around L'Albir. Proving that age is just a number.",
    stats: [['15', 'YEARS FORZA FORTUNA FINANCIAL GROUP', 'story'], ['+17,500', 'HGM | 10 DAYS NON-STOP', 'route'], ['70', 'YEARS YOUNG AT HEART', 'terro']],
    sponsorText: 'Fortuna Financial Group is one of the leading wealth managers in the Belgian market. CEO Frank Peeraer is a former professional footballer with a true sporting heart and, like several of his colleagues, an avid cyclist. Fortuna fully supports cycling tourism and proudly supports Project 15/70.',
    sponsorLink: 'Visit Fortuna Financial Group',
    sponsorCards: [['Personal', `At Fortuna you have a fixed contact who knows your situation and helps you keep the long-term vision on track. That way, you don't have to retell your story every time and can rely on committed guidance.`], ['Independent', `We don't start from a single financial institution or one standard solution. We look at which approach objectively best fits your wealth, your expectations and your future plans.`], ['A family business', `Fortuna was built as a family business itself. That's why we understand that wealth is not just about numbers, but also about responsibility, continuity and the next generation.`]],
    storyTitle: 'The story behind the challenge',
    storyLead: `In 2015, the official non-profit organization of cycling team Forza Fortuna Financial Group was born out of pure cycling passion at the Fortuna Financial Group office and within the community. What started with the first plans and friendly rides back in 2014, grew into a tight-knit team with a shared mission: connecting passion, discipline, and friendship on and off the bike.

Fifteen years after those very first rides, in 2029, the team celebrates its crystal jubilee. That same year, I, Roel — better known as "Terro" — will reach the legendary age of 70. Two unique milestones melting together into one extraordinary story.

That story is Project 15/70: an extreme cycling challenge where Terro will spend 10 consecutive days in the saddle to conquer more than 17,500 meters of elevation gain in the Spanish mountains around Albir. Not a random choice, as these mountains have formed the backdrop for our most legendary rides and unforgettable friendships for fifteen years.`,
    storyQuote: `The goal? To prove that <span class="story-quote-highlight">age is just a number</span>. That <span class="story-quote-highlight">passion knows no bounds</span>. And that with the right preparation, an unbreakable mindset, and the right people around you, any long-term goal is within reach.`,
    storyOutro: `But this project is not just about cycling. It is about a good cause. Every meter climbed, every drop of sweat, contributes to a mission bigger than the sport itself. And you can be a part of it.`,
    storySections: [['From idea to adventure', 'What started with the first plans back in 2014 grew into a groundbreaking challenge that brings friends, partners, and an entire team together.'], ['Two milestones, one extremum', 'Fifteen years of passion and dedication to Forza Fortuna Financial Group. Seventy years young at heart. Two milestones raising the bar to +17,500 meters of elevation.'], ['Pedaling together', 'Every kilometer gains more meaning when shared. With supporters along the way, remote donors, and our chosen charity as a compass.']],
    routeTitle: 'The route',
    routeLead: `Every kilometer is a step closer. From the beach of Albir we pedal for 10 days through breathtaking landscapes and over tough mountain peaks. More than 17,500 vertical meters, driven by pure motivation: hope and a better future for children who need it most. Ride along virtually and follow our route from the shoreline to the finish.`,
    stages: ['Coll de Rates Loop', 'La Vall d\'Ebo-pass & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'The final climb', 'The finish stage'],
    routePlaceholder: 'Stage profile will be generated live during the challenge in Spain.',
    routeViewer: {
      day: 'Day', daysAria: 'Days', loadingRoute: 'Loading route data...', noRouteData: 'No route data found.',
      downloadGpx: 'Download GPX', distance: 'Distance', elevationGain: 'Elevation gain', elevationLoss: 'Elevation loss',
      maxGradient: 'Max. gradient', lowestPoint: 'Lowest point', highestPoint: 'Highest point', avgSpeed: 'Avg. speed',
      estTime: 'Estimated time', ascent: 'Ascent', descent: 'Descent', difficulty: 'Difficulty',
      speed: 'Speed', avgLabel: 'Average:', hard: 'Hard', moderate: 'Moderate', easy: 'Easy',
      axisDistance: 'Distance in km', axisElevation: 'Elevation (m)', hoverHint: 'Hover over the chart for live info',
      loadingGpx: 'Loading GPX profile...', noGpx: 'No GPX data found.', elevation: 'Elevation', gradient: 'Gradient',
      location: 'Location', wayType: 'Road type', surface: 'Surface', surfaceValue: 'Asphalt', wayTypeValue: 'Road', hourAbbr: 'h',
      weatherTitle: 'Weather', weatherToday: 'Today', weatherTemp: 'Temp', weatherWind: 'Wind', weatherPrecip: 'Precip', weatherError: 'Weather data not available',
      axisHint: 'hover for info',
    },
    terroTitle: 'PROJECT TERRO: THE MAN BEHIND 15/70',
    terroSections: [['Who is Terro?', `Behind the intense gaze lies a man of principles, character and deep discipline. For Terro, truth and correctness are the highest laws. The past has its secrets, but they are safely stored where they belong — the focus is entirely on the road ahead.

As a cyclist, Terro knows no half measures. Driven is an understatement; cycling is a way of life in which the utmost was always demanded and given. Even at 60 to 65 years of age, that inexhaustible energy still translated regularly into fine prizes and top placings in the competitive peloton. And the name TERRO? It was not earned with a friendly smile, but on character, perseverance and riding hard when others crack.

The past two years were all about the heavy Gran Fondos. The form was there, the focus was sharp, but fate decided otherwise twice. One year brutally knocked down just before the start; the next year taken out by illness at the moment of truth. Where another would throw in the towel, Terro switched gears: 'I\'ll wait until I\'m 70, and then I\'ll show what it really becomes.' That moment has now come.`], ['Two milestones, one extremum', `After fifteen years with Forza Fortuna Financial Group, Terro faces the most challenging chapter yet. For some, 70 is the age to slow down, but for Terro it is the ultimate chance to prove who he is: a pure sportsman who lives for the limit.

This achievement rests on two unshakable pillars. On one side the magical milestone of 70 years. On the other the number 10: ten consecutive, tough rides starting from the Spanish town of Albir. Day after day in the saddle, day after day battling the elements and fatigue.

That is why this project is called the absolute 'extremum': the ultimate peak where age and pure physical exhaustion meet. Achieving this at 70 is no ordinary bike ride; it is a boundary-pushing statement for charity that proves passion and character are indestructible.`], ['Character against the elements', `On the bike you are ultimately always alone with your thoughts. When the Spanish sun burns, the wind is against you and the gradients in the hinterland around Albir climb into double digits, it no longer comes down to the legs, but to pure mental resilience.

Terro's philosophy in the saddle is as simple as it is ruthless: don't complain, just pedal. Pain is temporary, but the goal is lasting. Every heavy moment and every drop of sweat along the route gains meaning because it is linked to the well-being of children who desperately need support. That knowledge hardens character and ensures the switch flips when it gets tough. Giving up is simply not an option; the head rules the body.`], ['The preparation', `An extreme performance requires a thoughtful, professional approach. Terro's preparation is not a matter of blindly devouring kilometers, but of listening to his body and periodization. The late summer in September is about recovery and simply enjoying cycling without the pressure of long rides. Only when winter sets in does the switch flip.

From October the focus shifts to the basics: twice a week targeted strength and core stability training at home, two intensive sessions on the virtual roads of Zwift, and a solid ride at the weekend to keep sharp with the team. As soon as spring arrives in March, training hours and kilometers are steadily built up, while core and strength training remain the indispensable foundation. Around 2027 and 2028 the ultimate preparation will take place in Spain itself, with the specific stages gradually being explored from Albir.

When it comes to equipment, Terro leaves nothing to chance — everything must always be perfect down to the smallest detail. For his kit and support crew, Terro can rely on the unconditional support of friend and sponsor Frank Peeraer of Fortuna Financial Group, who ensures Terro appears at the start looking as professional as possible.`]],
    causeTitle: 'Our cause: Save the Children',
    causeLead: `Every vertical meter of Project 15/70 serves something bigger than the sport itself. That is why we deliberately chose Save the Children, a global organisation that has been fighting for children who need it most for over a hundred years.`,
    causeSections: [
      ['Who is Save the Children', `Save the Children was founded in 1919 by the British activist Eglantyne Jebb and grew into one of the most influential children's rights organisations in the world. With teams in more than one hundred countries, the organisation fights every day for a fundamental conviction: every child has the right to survival, protection, development and participation — no matter who they are or where they are born.`],
      ['What they do', `Save the Children's work is broad and concrete. The organisation delivers emergency aid in disasters and conflicts, works to protect children from violence and exploitation, and invests in health, nutrition and education. In Europe too, Save the Children campaigns to put children's interests high on the agenda of policymakers — because children's rights know no borders.`],
      ['Why we chose them', `Children cannot stand up for their own future — we do it for them. For Terro and the Forza Fortuna Financial Group team, choosing Save the Children felt self-evident: this project is about responsibility for the next generation. Every vertical meter we conquer and every euro that comes in translates into support for vulnerable children. That is the power of riding together: our effort becomes their chance.`],
    ],
    causeLinkLabel: 'Discover more on the official website',
    donateCauseTitle: 'We ride for Save the Children',
    donateCauseText: 'Behind every vertical meter is a child who deserves a fair chance. Save the Children works worldwide for the health, education and protection of children — exactly where your donation goes.',
    donateCauseLink: 'Read why we chose them',
    messageBlocked: 'Your message contains words or content we cannot publish. Please adjust your message and try again.',
    nameInvalid: 'Please use only letters, spaces, hyphens, apostrophes or periods in your name.',
    goalReached: 'Goal reached — amazing!',
    blogTitle: 'News from the peloton',
    blogLead: 'Updates, stories and moments on the way to Project 15/70.',
    blogCards: blogPosts.en,
    donateTitle: 'Climb with us to 17,500',
    donateLead: 'Every euro is one vertical meter. Every vertical meter brings us closer to a future for the good cause.',
    donated: 'Already',
    sponsored: 'of the 17,500 vertical meters sponsored!',
    goal: 'Goal: 17,500 vm',
    donateIntro: 'Every donation makes a difference. Help us prove that age is just a number! Behind every vertical meter is a child who deserves a fair chance. Save the Children works worldwide for the health, education and protection of children — exactly where your donation goes.',
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
    nav: { home: 'Inicio', story: 'La historia', route: 'La ruta', terro: 'Proyecto Terro', blog: 'Blog', cause: 'Nuestra Causa', donate: 'Donar', contact: 'Contacto' },
    support: 'Save the Children y dona ahora',
    heroEyebrow: ['OTOÑO 2029', '10 DÍAS SIN PARAR DESDE LA PLAYA DE ALBIR'],
    heroTitle: 'PROJECT 15/70',
    heroText: 'Decimoquinto aniversario. Setenta años joven. Una ruta legendaria por Save the Children.',
    discover: 'Sigue nuestro viaje hacia 2029',
    introOfficial: "En 2029, el equipo ciclista Forza Fortuna Financial Group celebra su 15º aniversario y yo alcanzo la legendaria edad de 70 años. Dos hitos únicos, un reto extremo. Con el Proyecto 15/70 pasaré 10 días en el sillín por una buena causa: +17.500 metros de desnivel en las montañas españolas alrededor de L'Albir. Demostrando que la edad es solo un número.",
    stats: [['15', 'AÑOS FORZA FORTUNA FINANCIAL GROUP', 'story'], ['+17.500', 'HGM | 10 DÍAS SIN PARAR', 'route'], ['70', 'AÑOS JOVEN DE ESPÍRITU', 'terro']],
    sponsorText: 'Fortuna Financial Group es uno de los principales gestores patrimoniales del mercado belga. El CEO Frank Peeraer es un exfutbolista profesional con un gran corazón deportivo y, como varios de sus empleados, un ciclista apasionado. Fortuna apoya plenamente el cicloturismo y el Proyecto 15/70.',
    sponsorLink: 'Visita Fortuna Financial Group',
    sponsorCards: [['Personal', `En Fortuna tiene un contacto fijo que conoce su situación y que, junto con usted, mantiene la visión a largo plazo. Así no tiene que contar su historia una y otra vez y puede contar con una guía comprometida.`], ['Independiente', `No partimos de una única institución financiera ni de una solución estándar. Analizamos qué enfoque se ajusta objetivamente mejor a su patrimonio, sus expectativas y sus planes futuros.`], ['Una empresa familiar', `Fortuna se ha construido como empresa familiar. Por eso entendemos que el patrimonio no se trata solo de cifras, sino también de responsabilidad, continuidad y la próxima generación.`]],
    storyTitle: 'La historia detrás del reto',
    storyLead: `En 2015 nació la asociación oficial sin ánimo de lucro del equipo ciclista Forza Fortuna Financial Group, fruto de la pura pasión por el ciclismo en las oficinas de Fortuna Financial Group y dentro de la comunidad. Lo que comenzó con los primeros planes y salidas amistosas en 2014, se convirtió en un equipo muy unido con una misión compartida: conectar la pasión, la disciplina y la amistad tanto dentro como fuera de la bicicleta.

Quince años después de aquellas primeras salidas, en 2029, el equipo celebra su aniversario de cristal. Ese mismo año, yo, Roel —más conocido como "Terro"— alcanzaré la legendaria edad de 70 años. Dos hitos únicos que se funden en una historia extraordinaria.

Esa historia es el Proyecto 15/70: un desafío ciclista extremo en el que Terro pasará 10 días seguidos en el sillín para conquistar más de 17.500 metros de desnivel positivo en las montañas españolas que rodean Albir. No es una elección casual, ya que estas montañas han sido el escenario de nuestras rutas más legendarias y de amistades inolvidables durante quince años.`,
    storyQuote: `¿El objetivo? Demostrar que <span class="story-quote-highlight">la edad es solo un número</span>. Que <span class="story-quote-highlight">la pasión no conoce límites</span>. Y que, con la preparación adecuada, una mentalidad inquebrantable y las personas correctas a tu lado, cualquier meta a largo plazo está al alcance de la mano.`,
    storyOutro: `Pero este proyecto no es solo ciclismo. Se trata de una buena causa. Cada metro subido, cada gota de sudor, contribuye a una misión más grande que el propio deporte. Y tú puedes formar parte de ella.`,
    storySections: [['De la idea al aventura', 'Lo que comenzó con los primeros planes en 2014 se convirtió en un desafío innovador que une a amigos, socios y a todo un equipo.'], ['Dos hitos, un extremo', 'Quince años de pasión y dedicación a Forza Fortuna Financial Group. Setenta años joven de espíritu. Dos hitos que sitúan el listón en +17.500 metros de desnivel.'], ['Pedaleando juntos', 'Cada kilómetro cobra más sentido cuando se comparte. Con seguidores en el camino, donantes a distancia y la buena causa como brújula.']],
    routeTitle: 'La ruta',
    routeLead: `Cada kilómetro es un paso más cerca. Desde la playa de Albir pedaleamos durante 10 días a través de paisajes impresionantes y cumbres exigentes. Más de 17.500 metros de desnivel, impulsados por una motivación pura: esperanza y un futuro mejor para los niños que más lo necesitan. Pedalea con nosotros de forma virtual y sigue nuestra ruta desde la orilla hasta la meta.`,
    stages: ['Bucle Coll de Rates', 'La Vall d\'Ebo-paso & Coll de Rates', 'Altea — Guadalest', 'Cumbre del Sol', 'Vall de Gallinera', 'Bernia — Xaló', 'Sierra de Aitana', 'Parcent — Tarbena', 'La última subida', 'La etapa final'],
    routePlaceholder: 'El perfil de la etapa se generará en vivo durante el reto en España.',
    routeViewer: {
      day: 'Día', daysAria: 'Días', loadingRoute: 'Cargando datos de ruta...', noRouteData: 'No se encontraron datos de ruta.',
      downloadGpx: 'Descargar GPX', distance: 'Distancia', elevationGain: 'Desnivel positivo', elevationLoss: 'Desnivel negativo',
      maxGradient: 'Pendiente máx.', lowestPoint: 'Punto más bajo', highestPoint: 'Punto más alto', avgSpeed: 'Vel. media',
      estTime: 'Tiempo estimado', ascent: 'Ascenso', descent: 'Descenso', difficulty: 'Dificultad',
      speed: 'Velocidad', avgLabel: 'Media:', hard: 'Dura', moderate: 'Moderada', easy: 'Fácil',
      axisDistance: 'Distancia en km', axisElevation: 'Altitud (m)', hoverHint: 'Pasa el cursor sobre el gráfico para info en vivo',
      loadingGpx: 'Cargando perfil GPX...', noGpx: 'Sin datos GPX.', elevation: 'Altitud', gradient: 'Pendiente',
      location: 'Ubicación', wayType: 'Tipo de vía', surface: 'Superficie', surfaceValue: 'Asfalto', wayTypeValue: 'Carretera', hourAbbr: 'h',
      weatherTitle: 'El tiempo', weatherToday: 'Hoy', weatherTemp: 'Temp', weatherWind: 'Viento', weatherPrecip: 'Precip', weatherError: 'Datos meteorológicos no disponibles',
      axisHint: 'toca para info',
    },
    terroTitle: 'PROYECTO TERRO: EL HOMBRE DETRÁS DE 15/70',
    terroSections: [['¿Quién es Terro?', `Detrás de la mirada intensa se esconde un hombre de principios, carácter y profunda disciplina. Para Terro, la verdad y la corrección son las leyes supremas. El pasado tiene sus secretos, pero están guardados con seguridad donde corresponde: la atención se centra completamente en el camino que tiene por delante.

Como ciclista, Terro no conoce medias tintas. Decir que está motivado es quedarse corto; el ciclismo es una forma de vida en la que siempre se exigió y dio lo máximo. Incluso entre los 60 y 65 años, ese motor inagotable se tradujo a menudo en buenos premios y puestos de honor en el pelotón competitivo. Y el nombre TERRO? No se ganó con una sonrisa amable, sino a base de carácter, perseverancia y pedalear fuerte cuando otros se quiebran.

Los últimos dos años giraron en torno a las duras Gran Fondos. La forma estaba, la concentración era máxima, pero el destino decidió dos veces lo contrario. Un año, brutalmente derribado justo antes de la salida; al año siguiente, eliminado por enfermedad en el momento de la verdad. Donde otro tiraría la toalla, Terro cambió de chip: 'Esperaré hasta los 70, y entonces demostraré de lo que soy capaz.' Ese momento ha llegado.`], ['Dos hitos, un extremo', `Después de quince años vinculado a Forza Fortuna Financial Group, Terro afronta el capítulo más exigente hasta la fecha. Para algunos, los 70 son la edad de tomárselo con calma, pero para Terro es la oportunidad definitiva de demostrar quién es: un deportista puro que vive para el límite.

Este logro descansa sobre dos pilares inquebrantables. Por un lado, el mágico hito de los 70 años. Por otro, el número 10: diez jornadas consecutivas y durísimas que se pedalean desde el pueblo español de Albir. Día tras día en el sillín, día tras día luchando contra los elementos y la fatiga.

Por eso este proyecto se llama el 'extremum' absoluto: la cima definitiva donde la edad y la pura agotación física se encuentran. Conseguir esto a los 70 no es una salida en bici cualquiera; es una declaración que traspasa límites por una buena causa y demuestra que la pasión y el carácter son indestructibles.`], ['Carácter contra los elementos', `En la bici, al final, siempre estás solo con tus pensamientos. Cuando el sol español arde, el viento sopla de frente y los porcentajes de pendiente del interior alrededor de Albir alcanzan cifras de dos dígitos, ya no se trata de las piernas, sino de la pura resistencia mental.

La filosofía de Terro en el sillín es tan sencilla como despiadada: no quejarse, pedalear. El dolor es temporal, pero el objetivo es permanente. Cada momento duro y cada gota de sudor a lo largo de la ruta cobran sentido porque están vinculados al bienestar de niños que necesitan apoyo desesperadamente. Esa conciencia fortalece el carácter y hace que el interruptor salte cuando todo se pone difícil. Rendirse no es una opción; la cabeza manda sobre el cuerpo.`], ['La preparación', `Una proeza extrema exige un enfoque reflexivo y profesional. La preparación de Terro no consiste en devorar kilómetros a ciegas, sino en escuchar a su cuerpo y en periodización. El final del verano, en septiembre, se dedica a descansar, recuperar y disfrutar del ciclismo sin la presión de salidas largas. Solo cuando llega el invierno se cambia el chip.

A partir de octubre, el enfoque se traslada a lo básico: dos sesiones semanales de fuerza y estabilidad de core en casa, dos sesiones intensas en las carreteras virtuales de Zwift y una salida sólida el fin de semana para mantenerse en forma con el equipo. Cuando llega la primavera en marzo, las horas de entrenamiento y los kilómetros aumentan progresivamente, mientras que el trabajo de core y fuerza sigue siendo el cimiento indispensable. Hacia 2027 y 2028, la preparación definitiva tendrá lugar en la propia España, explorando gradualmente las etapas específicas desde Albir.

En cuanto al material, Terro no deja nada al azar: todo debe estar siempre perfecto hasta el último detalle. Para el equipamiento y la asistencia, Terro cuenta con el apoyo incondicional de su amigo y patrocinador Frank Peeraer de Fortuna Financial Group, quien se asegura de que Terro aparezca en la línea de salida lo más profesional posible.`]],
    causeTitle: 'Nuestra causa: Save the Children',
    causeLead: `Cada metro de desnivel del Proyecto 15/70 está al servicio de algo más grande que el deporte. Por eso elegimos conscientemente a Save the Children, una organización mundial que lleva más de cien años luchando por los niños que más lo necesitan.`,
    causeSections: [
      ['Quién es Save the Children', `Save the Children fue fundada en 1919 por la activista británica Eglantyne Jebb y se convirtió en una de las organizaciones de derechos de la infancia más influyentes del mundo. Con equipos en más de cien países, la organización lucha cada día por una convicción fundamental: todos los niños tienen derecho a sobrevivir, a la protección, al desarrollo y a la participación, sean quienes sean y dondequiera que nazcan.`],
      ['Qué hacen', `El trabajo de Save the Children es amplio y concreto. La organización ofrece ayuda de emergencia en catástrofes y conflictos, trabaja para proteger a los niños de la violencia y la explotación, e invierte en salud, nutrición y educación. También en Europa, Save the Children realiza campañas para situar los intereses de la infancia en lo alto de la agenda de los responsables políticos, porque los derechos de los niños no conocen fronteras.`],
      ['Por qué los elegimos', `Los niños no pueden defender su futuro por sí mismos; nosotros lo hacemos por ellos. Para Terro y el equipo de Forza Fortuna Financial Group, elegir a Save the Children fue una decisión natural: este proyecto gira en torno a la responsabilidad hacia la próxima generación. Cada metro de desnivel que superamos y cada euro que recaudamos se traduce en apoyo a niños vulnerables. Esa es la fuerza de pedalear juntos: nuestro esfuerzo se convierte en su oportunidad.`],
    ],
    causeLinkLabel: 'Descubre más en el sitio web oficial',
    donateCauseTitle: 'Pedaleamos por Save the Children',
    donateCauseText: 'Detrás de cada metro de desnivel hay un niño que merece una oportunidad justa. Save the Children trabaja en todo el mundo por la salud, la educación y la protección de los niños: exactamente adonde va tu donación.',
    donateCauseLink: 'Descubre por qué los elegimos',
    messageBlocked: 'Tu mensaje contiene palabras o contenido que no podemos publicar. Ajústalo e inténtalo de nuevo.',
    nameInvalid: 'Usa solo letras, espacios, guiones, apóstrofos o puntos en tu nombre.',
    goalReached: '¡Meta alcanzada — increíble!',
    blogTitle: 'Noticias del pelotón',
    blogLead: 'Actualizaciones, historias y momentos en el camino hacia el Proyecto 15/70.',
    blogCards: blogPosts.es,
    donateTitle: 'Sube con nosotros a 17.500',
    donateLead: 'Cada euro es un metro de desnivel. Cada metro de desnivel nos acerca a un futuro para la buena causa.',
    donated: 'Ya',
    sponsored: 'de los 17.500 metros de desnivel patrocinados!',
    goal: 'Meta: 17.500 md',
    donateIntro: 'Cada donación hace la diferencia. ¡Ayúdanos a demostrar que la edad es solo un número! Detrás de cada metro de desnivel hay un niño que merece una oportunidad justa. Save the Children trabaja en todo el mundo por la salud, la educación y la protección de los niños: exactamente adonde va tu donación.',
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
