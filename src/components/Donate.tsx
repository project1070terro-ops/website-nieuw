import { ArrowRight, Check, Mountain, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import type { Donation, Language, Page, TranslationContent } from '../types';
import { supabase } from '../supabaseClient';
import { subscribeEmail } from '../lib/subscribe';
import { checkMessage, checkName } from '../utils/messageFilter';
import { BrandText } from './BrandText';
import { PageIntro } from './PageIntro';

interface DonateProps {
  t: TranslationContent;
  language: Language;
  navigate: (page: Page) => void;
  donations: Donation[];
  totalDonated: number;
  onDonation: () => Promise<void>;
}

export function Donate({ t, language, navigate, donations, totalDonated, onDonation }: DonateProps) {
  const [amount, setAmount] = useState(25);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [messageBlocked, setMessageBlocked] = useState(false);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearFieldError(name: string) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  // Hoogtemeters-logica: 1 euro = 1 hoogtemeter
  const verticalMeters = Math.round(totalDonated);
  const progress = Math.min((verticalMeters / 17500) * 100, 100);
  const goalReached = verticalMeters >= 17500;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = t.required;
    if (amount < 1) nextErrors.amount = t.required;
    if (subscribe) {
      const emailValue = email.trim();
      if (!emailValue) {
        nextErrors.email = t.required;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        nextErrors.email = t.invalidEmail;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});

    const nameCheck = checkName(name);
    if (!nameCheck.ok) {
      setNameInvalid(true);
      return;
    }

    const check = checkMessage(message);
    if (!check.ok) {
      setMessageBlocked(true);
      return;
    }

    setSaving(true);

    try {
      const { error: insertError } = await supabase.from('donations').insert({
        name: name.trim(),
        amount_eur: amount,
        message: message.trim(),
      });

      if (insertError) {
        throw insertError;
      }

      if (subscribe && email) {
        await subscribeEmail(email, 'donation', language);
      }

      setName('');
      setEmail('');
      setSubscribe(false);
      setMessage('');
      setAmount(25);
      setShowPopup(true);
      await onDonation();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit donation');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageIntro title={t.donateTitle} lead="" className="donate-intro" />
      <section className="meter-section">
        <div className="meter-head">
          <div className="meter-head-left">
            <img
              className="stc-badge"
              src="/images/sponsor/stc-embleem.png"
              alt="Save the Children"
            />
            <h2>
              {t.donated} <strong>{verticalMeters.toLocaleString('nl-BE')}</strong> {t.sponsored}
            </h2>
          </div>
          <span className={goalReached ? 'goal-reached' : ''}>
            {goalReached ? `${t.goalReached} +${(verticalMeters - 17500).toLocaleString('nl-BE')} HM` : t.goal}
          </span>
        </div>
        <div className={`meter${goalReached ? ' meter-complete' : ''}`}>
          <div style={{ width: `${progress}%` }} />
        </div>
        <p>
          <BrandText text={t.donateIntro} />{' '}
          <button className="cause-teaser-link" onClick={() => navigate('cause')}>
            {t.donateCauseLink} <ArrowRight size={15} />
          </button>
        </p>
      </section>

      <section className="tier-grid">
        {t.tiers.map(([title, price, hm]) => {
          const priceAmount = Number(price.replace(/\D/g, ''));
          return (
            <button
              key={title}
              className={amount === priceAmount ? 'tier selected' : 'tier'}
              onClick={() => setAmount(priceAmount)}
            >
              <Mountain size={20} />
              <span>{title}</span>
              <strong>{price}</strong>
              <small>{hm}</small>
            </button>
          );
        })}
      </section>

      <section className="donate-lower">
        <form className="donation-form" onSubmit={submit} noValidate>
          <p className="eyebrow">{t.donationForm}</p>
          <h2>{t.choose}</h2>
          <div className="amount-input">
            <span>€</span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(event) => {
                setAmount(Number(event.target.value));
                clearFieldError('amount');
              }}
            />
          </div>
          {fieldErrors.amount && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.amount}</p>}
          <label>
            {t.name}
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (nameInvalid) setNameInvalid(false);
                clearFieldError('name');
              }}
            />
          </label>
          {fieldErrors.name && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.name}</p>}
          {nameInvalid && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{t.nameInvalid}</p>}
          <label>
            {t.email}
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError('email');
              }}
            />
            {fieldErrors.email && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.email}</p>}
          </label>
          <label className="flex items-start gap-3 text-sm text-white/80 cursor-pointer mt-2">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#c05a28] rounded border-zinc-600 bg-zinc-900"
              checked={subscribe}
              onChange={(event) => setSubscribe(event.target.checked)}
            />
            <span className="leading-snug">{t.subscribeLabel}</span>
          </label>
          <label>
            {t.message}
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                if (messageBlocked) setMessageBlocked(false);
              }}
              rows={4}
            />
          </label>
          {messageBlocked && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{t.messageBlocked}</p>}
          {error && <p className="error-message">{error}</p>}
          <button className="button button-primary" disabled={saving}>
            {saving ? 'Saving...' : t.donateNow} <Check size={17} />
          </button>
        </form>

        <div className="donor-feed">
          <p className="eyebrow">{t.recent}</p>
          {donations.length === 0 ? (
            <p className="empty-feed">{t.noDonors}</p>
          ) : (
            <>
              {donations.map((donation) => (
                <article key={donation.id}>
                  <div>
                    <strong>{donation.name}</strong>
                    <b>€{donation.amount_eur}</b>
                  </div>
                  {donation.message && <p>{donation.message}</p>}
                </article>
              ))}
            </>
          )}
        </div>
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
              aria-label="Sluiten"
            >
              <X size={20} />
            </button>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--orange)]/20 text-[var(--orange)]">
              <Check size={24} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">{t.donateNow}</h3>
            <p className="text-sm leading-relaxed text-white/80">{t.donationThanks}</p>
          </div>
        </div>
      )}

      <section className="home-cta"></section>
    </>
  );
}
