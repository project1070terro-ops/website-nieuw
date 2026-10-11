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
    size: string;
    link: string;
    social: string;
    price: string;
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
    lead: 'Word deel van deze extreme sportieve uitdaging en steun rechtstreeks Save the Children. Dankzij de officiële samenwerking met het goede doel is uw zakelijke sponsoring 100% fiscaal aftrekbaar. Kies het pakket dat bij uw onderneming past en claim uw plek in de schijnwerpers.',
    table: [
      { tier: '🥇 GOLD SPONSORS', size: '160x80px (Maximum impact)', link: 'Ja, directe link vanuit uw logo', social: 'Premium standalone vermelding in alle officiële updates', price: '€ TBD' },
      { tier: '🥈 SILVER SPONSORS', size: '130x65px (Subtiel en elegant)', link: 'Ja, directe link vanuit uw logo', social: 'Opname in het collectieve sponsoroverzicht', price: '€ TBD' },
      { tier: '🥉 BRONZE SPONSORS', size: '100x50px (Compact en clean)', link: 'Nee, enkel logo-vermelding', social: 'Opname in het collectieve sponsoroverzicht', price: '€ TBD' },
    ],
    tableRows: [
      { label: 'Onderdeel', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Footer afmeting', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Website hyperlink', gold: 'Ja', silver: 'Ja', bronze: 'Nee' },
      { label: 'Social media', gold: 'Premium standalone tag', silver: 'In collectief overzicht', bronze: 'In collectief overzicht' },
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
    lead: 'Become part of this extreme sporting challenge and directly support Save the Children. Thanks to our official partnership with the charity, your corporate sponsorship is 100% tax-deductible. Choose the package that fits your company and claim your spot in the spotlight.',
    table: [
      { tier: '🥇 GOLD SPONSORS', size: '160x80px (Maximum impact)', link: 'Yes, direct link from your logo', social: 'Premium standalone tag in all official updates', price: '€ TBD' },
      { tier: '🥈 SILVER SPONSORS', size: '130x65px (Subtle and elegant)', link: 'Yes, direct link from your logo', social: 'Inclusion in the collective sponsor overview updates', price: '€ TBD' },
      { tier: '🥉 BRONZE SPONSORS', size: '100x50px (Compact and clean)', link: 'No, logo listing only', social: 'Inclusion in the collective sponsor overview updates', price: '€ TBD' },
    ],
    tableRows: [
      { label: 'Component', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Footer size', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Website hyperlink', gold: 'Yes', silver: 'Yes', bronze: 'No' },
      { label: 'Social media', gold: 'Premium standalone tag', silver: 'Collective overview', bronze: 'Collective overview' },
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
    lead: 'Forme parte de este desafío deportivo extremo y apoye directamente a Save the Children. Gracias a nuestra colaboración oficial con la organización benéfica, su patrocinio corporativo es 100% deducible de impuestos. Elija el paquete que mejor se adapte a su empresa y reclame su lugar en el centro de atención.',
    table: [
      { tier: '🥇 GOLD SPONSORS', size: '160x80px (Máximo impacto)', link: 'Sí, enlace directo desde su logo', social: 'Etiqueta premium destacada en todas las actualizaciones oficiales', price: '€ TBD' },
      { tier: '🥈 SILVER SPONSORS', size: '130x65px (Sutil y elegante)', link: 'Sí, enlace directo desde su logo', social: 'Inclusión en el resumen colectivo de patrocinadores', price: '€ TBD' },
      { tier: '🥉 BRONZE SPONSORS', size: '100x50px (Compacto y limpio)', link: 'No, solo listado del logo', social: 'Inclusión en el resumen colectivo de patrocinadores', price: '€ TBD' },
    ],
    tableRows: [
      { label: 'Componente', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Tamaño footer', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Hipervínculo web', gold: 'Sí', silver: 'Sí', bronze: 'No' },
      { label: 'Redes sociales', gold: 'Etiqueta premium destacada', silver: 'Resumen colectivo', bronze: 'Resumen colectivo' },
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
      <PageIntro title={c.title} lead={c.lead} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="overflow-x-auto">
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
