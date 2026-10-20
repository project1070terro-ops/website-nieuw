import { ArrowRight, Check } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { subscribeEmail } from '../lib/subscribe';
import type { Language, Page, TranslationContent } from '../types';
import { PageIntro } from './PageIntro';

interface ContactProps {
  t: TranslationContent;
  language: Language;
  navigate?: (page: Page) => void;
}

export function Contact({ t, language, navigate }: ContactProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState(t.contactSubjects.general);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearFieldError(name: string) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  useEffect(() => {
    const location = { state: window.history.state };
    const initialSubject = (location.state as { subject?: string } | null)?.subject;
    if (initialSubject === 'sponsoring') {
      setSubject(t.contactSubjects.products);
    }
  }, [t]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const selectedSubject = String(formData.get('subject') || '');
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const isUpdate = selectedSubject === t.subscribeSubject;

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = t.required;
    if (!email) nextErrors.email = t.required;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t.invalidEmail;
    }
    if (!selectedSubject) nextErrors.subject = t.required;
    if (!isUpdate && !message) nextErrors.message = t.required;

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});

    const to = isUpdate || selectedSubject === t.contactSubjects.general
      ? 'info@project1570.org'
      : 'sponsoring@project1570.org';
    const data = {
      name,
      email,
      subject: selectedSubject,
      message,
      to,
    };

    try {
      // Send to backend API (you'll need to implement this)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      if (isUpdate) {
        await subscribeEmail(email, 'contact', language);
      }

      setSent(true);
      (event.target as HTMLFormElement).reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  }

  return (
    <>
      <PageIntro title={t.contactTitle} lead={t.contactLead} />
      <section className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label>
            {t.name}
            <input name="name" onInput={() => clearFieldError('name')} />
            {fieldErrors.name && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.name}</p>}
          </label>
          <label>
            {t.email}
            <input name="email" type="email" onInput={() => clearFieldError('email')} />
            {fieldErrors.email && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.email}</p>}
          </label>
          <label>
            Onderwerp
            <select name="subject" value={subject} onChange={(e) => { setSubject(e.target.value); clearFieldError('subject'); }}>
              <option value={t.contactSubjects.general}>{t.contactSubjects.general}</option>
              <option value={t.contactSubjects.products}>{t.contactSubjects.products}</option>
              <option value={t.contactSubjects.financial}>{t.contactSubjects.financial}</option>
              <option value={t.subscribeSubject}>{t.subscribeSubject}</option>
            </select>
            {fieldErrors.subject && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.subject}</p>}
          </label>
          <label>
            Bericht
            <textarea name="message" rows={7} onInput={() => clearFieldError('message')} />
            {fieldErrors.message && <p className="text-xs font-normal text-orange-500 mt-1 block lowercase-reset">{fieldErrors.message}</p>}
          </label>
          {error && <p className="error-message">{error}</p>}
          <button className="button button-primary">
            {t.send} <ArrowRight size={17} />
          </button>
          {sent && (
            <p className="success">
              <Check size={16} /> {t.sent}
            </p>
          )}
        </form>
      </section>
      <section className="home-cta">
        <button className="button button-primary cta-large" onClick={() => navigate?.('donate')}>
          <img className="cta-stc" src="/images/sponsor/stc-embleem.png" alt="Save the Children" /> {t.support} <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}
