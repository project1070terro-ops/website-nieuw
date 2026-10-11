import { useState, FormEvent } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import type { Language, Page, TranslationContent } from '../types';
import { supabase } from '../supabaseClient';
import { PageIntro } from './PageIntro';

interface SponsoringProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
  onSponsoring: () => Promise<void>;
}

interface SponsoringCopy {
  title: string;
  lead: string;
  toast: string;
  close: string;
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
    toast: 'Bedankt voor uw aanvraag en uw steun! Wij hebben uw gegevens in goede orde ontvangen en de gereserveerde meters zijn alvast toegevoegd aan onze live-balk. Er is zojuist een automatische bevestiging naar uw e-mailadres verzonden. Samen verleggen we grenzen voor kinderen wereldwijd!',
    close: 'Sluiten',
    table: [
      { tier: '🥇 GOLD SPONSORS', features: [
        { label: 'Footer afmeting', value: '160x80px (Maximum impact)' },
        { label: 'Website hyperlink', value: 'Ja, directe link vanuit uw logo' },
        { label: 'Social media', value: 'Eigen social post' },
        { label: 'Investering', value: '€ 1000' },
      ]},
      { tier: '🥈 SILVER SPONSORS', features: [
        { label: 'Footer afmeting', value: '130x65px (Subtiel en elegant)' },
        { label: 'Website hyperlink', value: 'Ja, directe link vanuit uw logo' },
        { label: 'Social media', value: 'Opname in het collectieve sponsoroverzicht' },
        { label: 'Investering', value: '€ 500' },
      ]},
      { tier: '🥉 BRONZE SPONSORS', features: [
        { label: 'Footer afmeting', value: '100x50px (Compact en clean)' },
        { label: 'Website hyperlink', value: 'Nee, enkel logo-vermelding' },
        { label: 'Social media', value: 'Opname in het collectieve sponsoroverzicht' },
        { label: 'Investering', value: '€ 250' },
      ]},
    ],
    tableRows: [
      { label: 'Onderdeel', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Footer afmeting', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Website hyperlink', gold: 'Ja', silver: 'Ja', bronze: 'Nee' },
      { label: 'Social media', gold: 'Eigen social post', silver: 'In collectief overzicht', bronze: 'In collectief overzicht' },
      { label: 'Investering', gold: '€ 1000', silver: '€ 500', bronze: '€ 250' },
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
    toast: 'Thank you for your request and your support! We have successfully received your details, and the reserved meters have been added to our live progress bar. An automatic confirmation has just been sent to your email address. Together, we are pushing boundaries for children worldwide!',
    close: 'Close',
    table: [
      { tier: '🥇 GOLD SPONSORS', features: [
        { label: 'Footer size', value: '160x80px (Maximum impact)' },
        { label: 'Website hyperlink', value: 'Yes, direct link from your logo' },
        { label: 'Social media', value: 'Dedicated social post' },
        { label: 'Investment', value: '€ 1000' },
      ]},
      { tier: '🥈 SILVER SPONSORS', features: [
        { label: 'Footer size', value: '130x65px (Subtle and elegant)' },
        { label: 'Website hyperlink', value: 'Yes, direct link from your logo' },
        { label: 'Social media', value: 'Inclusion in the collective sponsor overview updates' },
        { label: 'Investment', value: '€ 500' },
      ]},
      { tier: '🥉 BRONZE SPONSORS', features: [
        { label: 'Footer size', value: '100x50px (Compact and clean)' },
        { label: 'Website hyperlink', value: 'No, logo listing only' },
        { label: 'Social media', value: 'Inclusion in the collective sponsor overview updates' },
        { label: 'Investment', value: '€ 250' },
      ]},
    ],
    tableRows: [
      { label: 'Component', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Footer size', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Website hyperlink', gold: 'Yes', silver: 'Yes', bronze: 'No' },
      { label: 'Social media', gold: 'Dedicated social post', silver: 'Collective overview', bronze: 'Collective overview' },
      { label: 'Investment', gold: '€ 1000', silver: '€ 500', bronze: '€ 250' },
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
    toast: '¡Gracias por su solicitud y por su apoyo! Hemos recibido sus datos correctamente y los metros reservados ya se han sumado a nuestra barra de progreso en vivo. Se acaba de enviar una confirmación automática a su correo electrónico. ¡Juntos, superamos límites por los niños de todo el mundo!',
    close: 'Cerrar',
    table: [
      { tier: '🥇 GOLD SPONSORS', features: [
        { label: 'Tamaño footer', value: '160x80px (Máximo impacto)' },
        { label: 'Hipervínculo web', value: 'Sí, enlace directo desde su logo' },
        { label: 'Redes sociales', value: 'Publicación dedicada' },
        { label: 'Inversión', value: '€ 1000' },
      ]},
      { tier: '🥈 SILVER SPONSORS', features: [
        { label: 'Tamaño footer', value: '130x65px (Sutil y elegante)' },
        { label: 'Hipervínculo web', value: 'Sí, enlace directo desde su logo' },
        { label: 'Redes sociales', value: 'Inclusión en el resumen colectivo de patrocinadores' },
        { label: 'Inversión', value: '€ 500' },
      ]},
      { tier: '🥉 BRONZE SPONSORS', features: [
        { label: 'Tamaño footer', value: '100x50px (Compacto y limpio)' },
        { label: 'Hipervínculo web', value: 'No, solo listado del logo' },
        { label: 'Redes sociales', value: 'Inclusión en el resumen colectivo de patrocinadores' },
        { label: 'Inversión', value: '€ 250' },
      ]},
    ],
    tableRows: [
      { label: 'Componente', gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
      { label: 'Tamaño footer', gold: '160x80px', silver: '130x65px', bronze: '100x50px' },
      { label: 'Hipervínculo web', gold: 'Sí', silver: 'Sí', bronze: 'No' },
      { label: 'Redes sociales', gold: 'Publicación dedicada', silver: 'Resumen colectivo', bronze: 'Resumen colectivo' },
      { label: 'Inversión', gold: '€ 1000', silver: '€ 500', bronze: '€ 250' },
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

const PACKAGE_METERS: Record<string, number> = {
  Gold: 1000,
  Silver: 500,
  Bronze: 250,
};

export function Sponsoring({ t, language, navigate, onSponsoring }: SponsoringProps) {
  const c = copy[language];
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tier, setTier] = useState(c.form.tierOptions[0]);
  const [showPopup, setShowPopup] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const company = String(formData.get('company') || '').trim();
    const person = String(formData.get('person') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const selectedTier = String(formData.get('tier') || tier);
    const message = String(formData.get('message') || '').trim();
    const meters = PACKAGE_METERS[selectedTier] ?? 0;

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error: insertError } = await supabase.from('donations').insert({
        name: company,
        amount_eur: meters,
        message: `Sponsoring: ${selectedTier}`,
      });

      if (insertError) {
        throw insertError;
      }

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
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }

      (event.target as HTMLFormElement).reset();
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
          <button className="button button-primary" type="submit" disabled={saving}>
            {saving ? '...' : t.send} <ArrowRight size={17} />
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

      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate('donate')}>
          {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
