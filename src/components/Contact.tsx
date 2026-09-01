import { ArrowRight, Check, Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import type { TranslationContent } from '../types';
import { PageIntro } from './PageIntro';

interface ContactProps {
  t: TranslationContent;
}

export function Contact({ t }: ContactProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
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
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            {t.name}
            <input name="name" required />
          </label>
          <label>
            E-mail
            <input name="email" required type="email" />
          </label>
          <label>
            Bericht
            <textarea name="message" required rows={7} />
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
        <div className="contact-info">
          <Mail size={25} />
          <p>{t.email}</p>
          <a href="mailto:info@project1070.be">info@project1070.be</a>
        </div>
      </section>
    </>
  );
}
