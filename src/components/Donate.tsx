import { Check, Mountain } from 'lucide-react';
import { FormEvent, useState } from 'react';
import type { Donation, TranslationContent } from '../types';
import { supabase } from '../supabaseClient';
import { PageIntro } from './PageIntro';

interface DonateProps {
  t: TranslationContent;
  donations: Donation[];
  totalDonated: number;
  onDonation: () => Promise<void>;
}

export function Donate({ t, donations, totalDonated, onDonation }: DonateProps) {
  const [amount, setAmount] = useState(25);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hoogtemeters-logica: 1 euro = 1 hoogtemeter
  const verticalMeters = Math.round(totalDonated);
  const progress = Math.min((verticalMeters / 17000) * 100, 100);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!name.trim() || amount < 1) {
      setError('Please fill in required fields');
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

      setName('');
      setMessage('');
      setAmount(25);
      await onDonation();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit donation');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageIntro title={t.donateTitle} lead={t.donateLead} />
      <section className="meter-section">
        <div className="meter-head">
          <h2>
            {t.donated} <strong>{verticalMeters.toLocaleString('nl-BE')}</strong> {t.sponsored}
          </h2>
          <span>{t.goal}</span>
        </div>
        <div className="meter">
          <div style={{ width: `${progress}%` }} />
        </div>
        <p>{t.donateIntro}</p>
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
        <form className="donation-form" onSubmit={submit}>
          <p className="eyebrow">{t.donationForm}</p>
          <h2>{t.choose}</h2>
          <div className="amount-input">
            <span>€</span>
            <input type="number" min="1" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
          </div>
          <label>
            {t.name}
            <input required value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            {t.message}
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} />
          </label>
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
    </>
  );
}
