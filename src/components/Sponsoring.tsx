import { useState, FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';

interface SponsoringProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
}

interface SponsoringCopy {
  title: string;
  lead: string;
  table: {
    tier: string;
    features: { label: string; value: string }[];
  }[];
  tableRows: {
    label: string;
    gold: string;
    silver: string;
    bronze: string;
  }[];
  form: {
    company: string;
    person: string;
    email: string;
    phone: string;
    tier: string;
    tierOptions: [string, string, string];
    message: string;
    success: string;
  };
}

const copy: Record<Language, SponsoringCopy> = {
  nl: {
    title: 'Samen Grenzen Verleggen',
    lead: 'Met uw zakelijke sponsoring maken we samen het verschil voor kinderen. Save the Children biedt o.a. voedsel, water, onderdak en medische zorg. Maar dat is niet alles: zij werken ook aan duurzame oplossingen en geven kinderen de kans om te leren. Voorkom nu dat kinderen hun leven en toekomst verliezen.\n\nKies hieronder het sponsorpakket dat bij uw bedrijf past en vul uw gegevens in. U ontvangt de officiële factuur/documentatie rechtstreeks van Save the Children. Uw investering gaat integraal naar het goede doel en is fiscaal aftrekbaar binnen de vennootschapsbelasting. Steun dit cruciale werk vandaag nog!',
    table: [
      { tier: '🥇 GOLD SPONSORS', features: [
        { label: 'Footer afmeting', value: '160x80px (Maximum impact)' },
        { label: 'Website hyperlink', value: 'Ja, directe link vanuit uw logo' },
        { label: 'Social media', value: 'Exclusieve individuele vermelding in alle officiële updates' },
        { label: 'Investering', value: '€ TBD' },
      ]},
      { tier: '🥈 SILVER SPONSORS', features: [
        { label: 'Footer afmeting', value: '130x65px (Subtiel en elegant)' },
        { label: 'Website hyperlink', value: 'Ja, directe link vanuit uw logo' },
        { label: 'Social media', value: 'Opname in het collectieve sponsoroverzicht' },
        { label: 'Investering', value: '€ TBD' },
      ]},
      { tier: '🥉 BRONZE SPONSORS', features: [
        { label: 'Footer afmeting', value: '100x50px (Compact en clean)' },
        { label: 'Website hyperlink', value: 'Nee, enkel logo-vermelding' },
        { label: 'Social media', value: 'Opname in het collectieve sponsoroverzicht' },
        { label: 'Investering', value: '€ TBD' },
      ]},
    ],
    tableRows: [
      { label: 'Onderdeel', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Footer afmeting', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Website hyperlink', gold: 'Ja', silver: 'Ja', bronze: 'Nee' },
      { label: 'Social media', gold: 'Exclusieve individuele vermelding', silver: 'In collectief overzicht', bronze: 'In collectief overzicht' },
      { label: 'Investering', gold: '€ TBD', silver: '€ TBD', bronze: '€ TBD' },
    ],
    form: {
      company: 'Naam Bedrijf',
      person: 'Contactpersoon',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      tier: 'Gewenst sponsorpakket',
      tierOptions: ['Gold', 'Silver', 'Bronze'],
      message: 'Bericht',
      success: 'Bedankt voor uw interesse. We nemen zo snel mogelijk contact met u op.',
    },
  },
  en: {
    title: 'Pushing Borders Together',
    lead: 'With your corporate sponsorship, we make a difference for children together. Save the Children provides food, water, shelter, and medical care. But that\'s not all: they also work on sustainable solutions and give children the opportunity to learn. Prevent children from losing their lives and futures now.\n\nChoose the sponsorship package below that fits your company and fill in your details. You will receive the official invoice/documentation directly from Save the Children. Your investment goes entirely to the charity and is tax-deductible within corporate income tax. Support this crucial work today!',
    table: [
      { tier: '🥇 GOLD SPONSORS', features: [
        { label: 'Footer size', value: '160x80px (Maximum impact)' },
        { label: 'Website hyperlink', value: 'Yes, direct link from your logo' },
        { label: 'Social media', value: 'Exclusive individual mention in all official updates' },
        { label: 'Investment', value: '€ TBD' },
      ]},
      { tier: '🥈 SILVER SPONSORS', features: [
        { label: 'Footer size', value: '130x65px (Subtle and elegant)' },
        { label: 'Website hyperlink', value: 'Yes, direct link from your logo' },
        { label: 'Social media', value: 'Inclusion in the collective sponsor overview updates' },
        { label: 'Investment', value: '€ TBD' },
      ]},
      { tier: '🥉 BRONZE SPONSORS', features: [
        { label: 'Footer size', value: '100x50px (Compact and clean)' },
        { label: 'Website hyperlink', value: 'No, logo listing only' },
        { label: 'Social media', value: 'Inclusion in the collective sponsor overview updates' },
        { label: 'Investment', value: '€ TBD' },
      ]},
    ],
    tableRows: [
      { label: 'Component', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Footer size', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Website hyperlink', gold: 'Yes', silver: 'Yes', bronze: 'No' },
      { label: 'Social media', gold: 'Exclusive individual mention', silver: 'Collective overview', bronze: 'Collective overview' },
      { label: 'Investment', gold: '€ TBD', silver: '€ TBD', bronze: '€ TBD' },
    ],
    form: {
      company: 'Company Name',
      person: 'Contact Person',
      email: 'Email Address',
      phone: 'Phone Number',
      tier: 'Preferred Sponsorship Tier',
      tierOptions: ['Gold', 'Silver', 'Bronze'],
      message: 'Message',
      success: 'Thank you for your interest. We will get back to you as soon as possible.',
    },
  },
  es: {
    title: 'Superando Límites Juntos',
    lead: 'Con su patrocinio corporativo, juntos marcamos la diferencia para los niños. Save the Children proporciona alimentos, agua, refugio y atención médica. Pero eso no es todo: también trabajan en soluciones sostenibles y brindan a los niños la oportunidad de aprender. Evite que los niños pierdan sus vidas y su futuro ahora.\n\nElija a continuación el paquete de patrocinio que mejor se adapte a su empresa y complete sus datos. Recibirá la factura/documentación oficial directamente de Save the Children. Su inversión va íntegramente a la organización benéfica y es deducible de impuestos dentro del impuesto sobre sociedades. ¡Apoye este trabajo crucial hoy mismo!',
    table: [
      { tier: '🥇 GOLD SPONSORS', features: [
        { label: 'Tamaño footer', value: '160x80px (Máximo impacto)' },
        { label: 'Hipervínculo web', value: 'Sí, enlace directo desde su logo' },
        { label: 'Redes sociales', value: 'Mención individual exclusiva en todas las actualizaciones oficiales' },
        { label: 'Inversión', value: '€ TBD' },
      ]},
      { tier: '🥈 SILVER SPONSORS', features: [
        { label: 'Tamaño footer', value: '130x65px (Sutil y elegante)' },
        { label: 'Hipervínculo web', value: 'Sí, enlace directo desde su logo' },
        { label: 'Redes sociales', value: 'Inclusión en el resumen colectivo de patrocinadores' },
        { label: 'Inversión', value: '€ TBD' },
      ]},
      { tier: '🥉 BRONZE SPONSORS', features: [
        { label: 'Tamaño footer', value: '100x50px (Compacto y limpio)' },
        { label: 'Hipervínculo web', value: 'No, solo listado del logo' },
        { label: 'Redes sociales', value: 'Inclusión en el resumen colectivo de patrocinadores' },
        { label: 'Inversión', value: '€ TBD' },
      ]},
    ],
    tableRows: [
      { label: 'Componente', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Tamaño footer', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Hipervínculo web', gold: 'Sí', silver: 'Sí', bronze: 'No' },
      { label: 'Redes sociales', gold: 'Mención individual exclusiva', silver: 'Resumen colectivo', bronze: 'Resumen colectivo' },
      { label: 'Inversión', gold: '€ TBD', silver: '€ TBD', bronze: '€ TBD' },
    ],
    form: {
      company: 'Nombre de la Empresa',
      person: 'Persona de Contacto',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      tier: 'Paquete de Patrocinio Deseado',
      tierOptions: ['Gold', 'Silver', 'Bronze'],
      message: 'Mensaje',
      success: 'Gracias por su interés. Nos pondremos en contacto con usted lo antes posible.',
    },
  },
};

export function Sponsoring({ t, language, navigate }: SponsoringProps) {
  const c = copy[language];
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tier, setTier] = useState(c.form.tierOptions[0]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('company'),
      contact: formData.get('person'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      tier: formData.get('tier'),
      message: formData.get('message'),
      to: 'sponsoring@project1570.org',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSent(true);
      (event.target as HTMLFormElement).reset();
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  }

  return (
    <>
      <PageIntro title={c.title} lead={c.lead} className="!pb-2" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-xs uppercase tracking-wider text-white/40 border-b border-white/10"></th>
                <th className="p-3 text-xs uppercase tracking-wider text-amber-400 border-b border-white/10 w-1/4 bg-amber-600/10">🥇 Gold</th>
                <th className="p-3 text-xs uppercase tracking-wider text-slate-300 border-b border-white/10 w-1/4 bg-slate-500/10">🥈 Silver</th>
                <th className="p-3 text-xs uppercase tracking-wider text-orange-300 border-b border-white/10 w-1/4 bg-orange-800/10">🥉 Bronze</th>
              </tr>
            </thead>
            <tbody>
              {c.tableRows.slice(1).map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="p-3 text-sm text-white/70">{row.label}</td>
                  <td className="p-3 text-sm text-white/90 bg-amber-600/5">{row.gold}</td>
                  <td className="p-3 text-sm text-white/90 bg-slate-500/5">{row.silver}</td>
                  <td className="p-3 text-sm text-white/90 bg-orange-800/5">{row.bronze}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {c.table.map((tier, i) => (
            <div
              key={i}
              className={`rounded-lg border border-white/10 p-4 ${i === 0 ? 'bg-amber-600/10' : i === 1 ? 'bg-slate-500/10' : 'bg-orange-800/10'}`}
            >
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${i === 0 ? 'text-amber-400' : 'text-white/90'}`}>
                {tier.tier}
              </h3>
              {tier.features.map((feature, fi) => (
                <div key={fi} className="mb-1">
                  <span className="text-xs font-semibold text-white/70 mr-1">{feature.label}:</span>
                  <span className="text-sm text-white/90">{feature.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="contact-layout !py-6">
        <form className="contact-form !p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              {c.form.company}
              <input name="company" required />
            </label>
            <label>
              {c.form.person}
              <input name="person" required />
            </label>
            <label>
              {c.form.email}
              <input name="email" required type="email" />
            </label>
            <label>
              {c.form.phone}
              <input name="phone" type="tel" />
            </label>
          </div>
          <label>
            {c.form.tier}
            <select name="tier" required value={tier} onChange={(e) => setTier(e.target.value)}>
              {c.form.tierOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            {c.form.message}
            <textarea name="message" required rows={3} />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button className="button button-primary" type="submit">
            {t.send} <ArrowRight size={17} />
          </button>
          {sent && (
            <p className="success">
              <Check size={16} /> {c.form.success}
            </p>
          )}
        </form>
      </section>

      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
