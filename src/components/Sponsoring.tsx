import { useState, FormEvent } from 'react';
import { Check, X } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import { subscribeEmail } from '../lib/subscribe';
import { supabase } from '../supabaseClient';
import { PageIntro } from './PageIntro';
import { Meter } from './Meter';

interface SponsoringProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
  onSponsoring: () => Promise<void>;
  totalDonated: number;
}

interface SponsoringCopy {
  title: string;
  lead: string;
  toast: string;
  close: string;
  tierHeaders: [string, string, string];
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
    tierOptions: { key: string; label: string }[];
    submit: string;
    success: string;
  };
}

const copy: Record<Language, SponsoringCopy> = {
  nl: {
    title: 'Samen Grenzen Verleggen',
    lead: 'Met uw zakelijke sponsoring maakt uw bedrijf het verschil. Uw investering gaat integraal naar Save the Children en is fiscaal aftrekbaar binnen de vennootschapsbelasting.\n\nKies hieronder het sponsorpakket dat bij uw onderneming past, vul uw gegevens in en ontvang de officiële documentatie rechtstreeks van het goede doel. Steun dit cruciale werk vandaag nog!',
    toast: 'Bedankt voor uw aanvraag en uw steun! Wij hebben uw gegevens in goede orde ontvangen en de gereserveerde meters zijn alvast toegevoegd aan onze live-balk. Er is zojuist een automatische bevestiging naar uw e-mailadres verzonden. Samen verleggen we grenzen voor kinderen wereldwijd!',
    close: 'Sluiten',
    tierHeaders: ['GOUD', 'ZILVER', 'BRONS'],
    table: [
      { tier: '🥇 GOUD SPONSORS', features: [
        { label: 'Uw logo in footer', value: 'Prominente monochrome logovermelding in de footer van alle pagina\'s.' },
        { label: 'Website hyperlink', value: 'Directe hyperlink naar uw website voor maximale SEO-waarde.' },
        { label: 'Social media', value: 'Exclusieve, individuele feature post op onze officiële socialmediakanalen.' },
        { label: 'Mogelijke persvermelding', value: 'Officiële vermelding in mogelijke pers- en media-updates.' },
        { label: 'Investering', value: '€ 1000' },
      ]},
      { tier: '🥈 ZILVER SPONSORS', features: [
        { label: 'Uw logo in footer', value: 'Monochrome logovermelding in de footer van alle pagina\'s.' },
        { label: 'Website hyperlink', value: 'Directe hyperlink naar uw website.' },
        { label: 'Social media', value: 'Vermelding in ons collectieve sponsoroverzicht op social media.' },
        { label: 'Mogelijke persvermelding', value: '—' },
        { label: 'Investering', value: '€ 500' },
      ]},
      { tier: '🥉 BRONS SPONSORS', features: [
        { label: 'Uw logo in footer', value: 'Monochrome logovermelding in de footer van alle pagina\'s.' },
        { label: 'Website hyperlink', value: 'Tekst-hyperlink naar uw website.' },
        { label: 'Social media', value: 'Vermelding in ons collectieve sponsoroverzicht op social media.' },
        { label: 'Mogelijke persvermelding', value: '—' },
        { label: 'Investering', value: '€ 250' },
      ]},
    ],
    tableRows: [
      { label: 'Onderdeel', gold: 'GOUD', silver: 'ZILVER', bronze: 'BRONS' },
      { label: 'Uw logo in footer', gold: 'Prominente monochrome logovermelding in de footer van alle pagina\'s.', silver: 'Monochrome logovermelding in de footer van alle pagina\'s.', bronze: 'Monochrome logovermelding in de footer van alle pagina\'s.' },
      { label: 'Website hyperlink', gold: 'Directe hyperlink naar uw website voor maximale SEO-waarde.', silver: 'Directe hyperlink naar uw website.', bronze: 'Tekst-hyperlink naar uw website.' },
      { label: 'Social media', gold: 'Exclusieve, individuele feature post op onze officiële socialmediakanalen.', silver: 'Vermelding in ons collectieve sponsoroverzicht op social media.', bronze: 'Vermelding in ons collectieve sponsoroverzicht op social media.' },
      { label: 'Mogelijke persvermelding', gold: 'Officiële vermelding in mogelijke pers- en media-updates.', silver: '—', bronze: '—' },
      { label: 'Investering', gold: '€ 1000', silver: '€ 500', bronze: '€ 250' },
    ],
    form: {
      company: 'Naam Bedrijf',
      person: 'Contactpersoon',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      tier: 'Gewenst sponsorpakket',
      tierOptions: [
        { key: 'Gold', label: 'Goud' },
        { key: 'Silver', label: 'Zilver' },
        { key: 'Bronze', label: 'Brons' },
      ],
      submit: 'SPONSOR NU SAVE THE CHILDREN ➔',
      success: 'Bedankt voor uw interesse. We nemen zo snel mogelijk contact met u op.',
    },
  },
  en: {
    title: 'Pushing Borders Together',
    lead: 'With your corporate sponsorship, your company makes a difference. Your investment goes entirely to Save the Children and is tax-deductible within corporate income tax.\n\nChoose the sponsorship package below that fits your business, fill in your details, and receive the official documentation directly from the charity. Support this crucial work today!',
    toast: 'Thank you for your request and your support! We have successfully received your details, and the reserved meters have been added to our live progress bar. An automatic confirmation has just been sent to your email address. Together, we are pushing boundaries for children worldwide!',
    close: 'Close',
    tierHeaders: ['GOLD', 'SILVER', 'BRONZE'],
    table: [
      { tier: '🥇 GOLD SPONSORS', features: [
        { label: 'Your logo in footer', value: 'Prominent monochrome logo listing in the footer of all pages.' },
        { label: 'Website hyperlink', value: 'Direct hyperlink to your website for maximum SEO value.' },
        { label: 'Social media', value: 'Exclusive, individual feature post on our official social media channels.' },
        { label: 'Potential press mention', value: 'Official mention in potential press and media updates.' },
        { label: 'Investment', value: '€ 1000' },
      ]},
      { tier: '🥈 SILVER SPONSORS', features: [
        { label: 'Your logo in footer', value: 'Monochrome logo listing in the footer of all pages.' },
        { label: 'Website hyperlink', value: 'Direct hyperlink to your website.' },
        { label: 'Social media', value: 'Inclusion in our collective sponsor overview updates on social media.' },
        { label: 'Potential press mention', value: '—' },
        { label: 'Investment', value: '€ 500' },
      ]},
      { tier: '🥉 BRONZE SPONSORS', features: [
        { label: 'Your logo in footer', value: 'Monochrome logo listing in the footer of all pages.' },
        { label: 'Website hyperlink', value: 'Text hyperlink to your website.' },
        { label: 'Social media', value: 'Inclusion in our collective sponsor overview updates on social media.' },
        { label: 'Potential press mention', value: '—' },
        { label: 'Investment', value: '€ 250' },
      ]},
    ],
    tableRows: [
      { label: 'Component', gold: 'GOLD', silver: 'SILVER', bronze: 'BRONZE' },
      { label: 'Your logo in footer', gold: 'Prominent monochrome logo listing in the footer of all pages.', silver: 'Monochrome logo listing in the footer of all pages.', bronze: 'Monochrome logo listing in the footer of all pages.' },
      { label: 'Website hyperlink', gold: 'Direct hyperlink to your website for maximum SEO value.', silver: 'Direct hyperlink to your website.', bronze: 'Text hyperlink to your website.' },
      { label: 'Social media', gold: 'Exclusive, individual feature post on our official social media channels.', silver: 'Inclusion in our collective sponsor overview updates on social media.', bronze: 'Inclusion in our collective sponsor overview updates on social media.' },
      { label: 'Potential press mention', gold: 'Official mention in potential press and media updates.', silver: '—', bronze: '—' },
      { label: 'Investment', gold: '€ 1000', silver: '€ 500', bronze: '€ 250' },
    ],
    form: {
      company: 'Company Name',
      person: 'Contact Person',
      email: 'Email Address',
      phone: 'Phone Number',
      tier: 'Preferred Sponsorship Tier',
      tierOptions: [
        { key: 'Gold', label: 'Gold' },
        { key: 'Silver', label: 'Silver' },
        { key: 'Bronze', label: 'Bronze' },
      ],
      submit: 'SPONSOR SAVE THE CHILDREN NOW ➔',
      success: 'Thank you for your interest. We will get back to you as soon as possible.',
    },
  },
  es: {
    title: 'Superando Límites Juntos',
    lead: 'Con su patrocinio corporativo, su empresa marca la diferencia. Su inversión se destina íntegramente a Save the Children y es deducible de impuestos dentro del impuesto sobre sociedades.\n\nElija a continuación el paquete de patrocinio que mejor se adapte a su empresa, complete sus datos y reciba la documentación oficial directamente de la organización benéfica. ¡Apoye este trabajo crucial hoy mismo!',
    toast: '¡Gracias por su solicitud y por su apoyo! Hemos recibido sus datos correctamente y los metros reservados ya se han sumado a nuestra barra de progreso en vivo. Se acaba de enviar una confirmación automática a su correo electrónico. ¡Juntos, superamos límites por los niños de todo el mundo!',
    close: 'Cerrar',
    tierHeaders: ['ORO', 'PLATA', 'BRONCE'],
    table: [
      { tier: '🥇 ORO SPONSORS', features: [
        { label: 'Su logo en el pie de página', value: 'Mención destacada del logotipo monocromático en el pie de página de todas las páginas.' },
        { label: 'Hipervínculo web', value: 'Hipervínculo directo a su sitio web para obtener el máximo valor de SEO.' },
        { label: 'Redes sociales', value: 'Publicación destacada exclusiva e individual en nuestros canales oficiales de redes sociales.' },
        { label: 'Posible mención en prensa', value: 'Mención oficial en posibles actualizaciones de prensa y medios.' },
        { label: 'Inversión', value: '€ 1000' },
      ]},
      { tier: '🥈 PLATA SPONSORS', features: [
        { label: 'Su logo en el pie de página', value: 'Mención del logotipo monocromático en el pie de página de todas las páginas.' },
        { label: 'Hipervínculo web', value: 'Hipervínculo directo a su sitio web.' },
        { label: 'Redes sociales', value: 'Inclusión en nuestras actualizaciones colectivas de patrocinadores en las redes sociales.' },
        { label: 'Posible mención en prensa', value: '—' },
        { label: 'Inversión', value: '€ 500' },
      ]},
      { tier: '🥉 BRONCE SPONSORS', features: [
        { label: 'Su logo en el pie de página', value: 'Mención del logotipo monocromático en el pie de página de todas las páginas.' },
        { label: 'Hipervínculo web', value: 'Hipervínculo de texto a su sitio web.' },
        { label: 'Redes sociales', value: 'Inclusión en nuestras actualizaciones colectivas de patrocinadores en las redes sociales.' },
        { label: 'Posible mención en prensa', value: '—' },
        { label: 'Inversión', value: '€ 250' },
      ]},
    ],
    tableRows: [
      { label: 'Componente', gold: 'ORO', silver: 'PLATA', bronze: 'BRONCE' },
      { label: 'Su logo en el pie de página', gold: 'Mención destacada del logotipo monocromático en el pie de página de todas las páginas.', silver: 'Mención del logotipo monocromático en el pie de página de todas las páginas.', bronze: 'Mención del logotipo monocromático en el pie de página de todas las páginas.' },
      { label: 'Hipervínculo web', gold: 'Hipervínculo directo a su sitio web para obtener el máximo valor de SEO.', silver: 'Hipervínculo directo a su sitio web.', bronze: 'Hipervínculo de texto a su sitio web.' },
      { label: 'Redes sociales', gold: 'Publicación destacada exclusiva e individual en nuestros canales oficiales de redes sociales.', silver: 'Inclusión en nuestras actualizaciones colectivas de patrocinadores en las redes sociales.', bronze: 'Inclusión en nuestras actualizaciones colectivas de patrocinadores en las redes sociales.' },
      { label: 'Posible mención en prensa', gold: 'Mención oficial en posibles actualizaciones de prensa y medios.', silver: '—', bronze: '—' },
      { label: 'Inversión', gold: '€ 1000', silver: '€ 500', bronze: '€ 250' },
    ],
    form: {
      company: 'Nombre de la Empresa',
      person: 'Persona de Contacto',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      tier: 'Paquete de Patrocinio Deseado',
      tierOptions: [
        { key: 'Gold', label: 'Oro' },
        { key: 'Silver', label: 'Plata' },
        { key: 'Bronze', label: 'Bronce' },
      ],
      submit: 'PATROCINE A SAVE THE CHILDREN AHORA ➔',
      success: 'Gracias por su interés. Nos pondremos en contacto con usted lo antes posible.',
    },
  },
};

const PACKAGE_EUROS: Record<string, number> = {
  Gold: 1000,
  Silver: 500,
  Bronze: 250,
};

export function Sponsoring({ t, language, navigate, onSponsoring, totalDonated }: SponsoringProps) {
  const c = copy[language];
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tier, setTier] = useState(c.form.tierOptions[0].key);
  const [showPopup, setShowPopup] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearFieldError(name: string) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const company = String(formData.get('company') || '').trim();
    const person = String(formData.get('person') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const selectedTier = String(formData.get('tier') || tier);

    const nextErrors: Record<string, string> = {};
    if (!company) nextErrors.company = t.required;
    if (!person) nextErrors.person = t.required;
    if (!email) nextErrors.email = t.required;
    if (subscribe && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t.invalidEmail;
    }
    if (!phone) nextErrors.phone = t.required;

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setSaving(true);

    const euros = PACKAGE_EUROS[selectedTier] ?? 0;

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error: insertError } = await supabase.from('donations').insert({
        name: company,
        amount_eur: euros,
        message: `Sponsoring: ${selectedTier}`,
      });

      if (insertError) {
        throw insertError;
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'sponsoring',
            language,
            company,
            contact: person,
            email,
            phone,
            tier: selectedTier,
            message: '',
          }),
        });

        if (!response.ok && response.status !== 404) {
          console.warn('Email worker returned', response.status);
        }
      } catch (emailErr) {
        console.warn('Email worker unavailable:', emailErr);
      }

      if (subscribe && email) {
        await subscribeEmail(email, 'sponsor', language);
      }

      (event.target as HTMLFormElement).reset();
      setSubscribe(false);
      await onSponsoring();
      setShowPopup(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageIntro title={c.title} lead={c.lead} className="!pb-2" />

      <Meter totalDonated={totalDonated} t={t} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-xs uppercase tracking-wider text-white/40 border-b border-white/10"></th>
                <th className="p-3 text-xs uppercase tracking-wider text-amber-400 border-b border-white/10 w-1/4 bg-amber-600/10">🥇 {c.tierHeaders[0]}</th>
                <th className="p-3 text-xs uppercase tracking-wider text-slate-300 border-b border-white/10 w-1/4 bg-slate-500/10">🥈 {c.tierHeaders[1]}</th>
                <th className="p-3 text-xs uppercase tracking-wider text-orange-300 border-b border-white/10 w-1/4 bg-orange-800/10">🥉 {c.tierHeaders[2]}</th>
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
        <form className="contact-form !p-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              {c.form.company}
              <input name="company" onInput={() => clearFieldError('company')} />
              {fieldErrors.company && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.company}</p>}
            </label>
            <label>
              {c.form.person}
              <input name="person" onInput={() => clearFieldError('person')} />
              {fieldErrors.person && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.person}</p>}
            </label>
            <label>
              {c.form.email}
              <input name="email" type="email" onInput={() => clearFieldError('email')} />
              {fieldErrors.email && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.email}</p>}
            </label>
            <label>
              {c.form.phone}
              <input name="phone" type="tel" onInput={() => clearFieldError('phone')} />
              {fieldErrors.phone && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.phone}</p>}
            </label>
          </div>
          <label>
            {c.form.tier}
            <select name="tier" value={tier} onChange={(e) => { setTier(e.target.value); clearFieldError('tier'); }}>
              {c.form.tierOptions.map((option) => (
                <option key={option.key} value={option.key}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer">
            <input
              type="checkbox"
              name="subscribe"
              className="mt-1 h-4 w-4 accent-[#c05a28] rounded border-zinc-600 bg-zinc-900"
              checked={subscribe}
              onChange={(event) => setSubscribe(event.target.checked)}
            />
            <span className="leading-snug">{t.subscribeLabel}</span>
          </label>
          {error && <p className="error-message">{error}</p>}
          <button className="button button-primary cta-large" type="submit" disabled={saving}>
            {saving ? '...' : c.form.submit}
          </button>
        </form>
      </section>

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowPopup(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-md w-full rounded-xl border border-white/10 bg-[#18181b] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white/60 hover:text-white"
              onClick={() => setShowPopup(false)}
              aria-label={c.close}
            >
              <X size={20} />
            </button>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--orange)]/20 text-[var(--orange)]">
              <Check size={24} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">{c.form.success}</h3>
            <p className="text-sm leading-relaxed text-white/80">{c.toast}</p>
            <button
              className="button button-primary mt-6 w-full"
              onClick={() => setShowPopup(false)}
            >
              {c.close}
            </button>
          </div>
        </div>
      )}

      <section className="home-cta"></section>
    </>
  );
}
