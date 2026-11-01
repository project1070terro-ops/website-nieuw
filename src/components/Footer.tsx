import { Facebook, Instagram } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { subscribeEmail } from '../lib/subscribe';
import type { Language, Page, SponsorLogo, TranslationContent } from '../types';
import type { ReactNode } from 'react';

const SlashHeading = ({ text }: { text: string }) => {
  const i = text.indexOf('/');
  if (i === -1) return <>{text}</>;
  return <>{text.slice(0, i)}<span className="brand-slash">/</span>{text.slice(i + 1)}</>;
};

interface FooterProps {
  t: TranslationContent;
  language: Language;
  page: Page;
  navigate: (page: Page) => void;
  maintenance: boolean;
  sponsorLogos: SponsorLogo[];
  className?: string;
}

const footerLabels: Record<Language, { privacy: string; copyright: ReactNode; contact: string; general: string; sponsorship: string; partners: string; sponsorsGold: string; sponsorsSilver: string; sponsorsBronze: string }> = {
  nl: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website ontwikkeld door Terro.</>, contact: 'CONTACT', general: 'Algemeen:', sponsorship: 'Sponsoring & Diensten:', partners: 'PARTNERS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'SPONSORS ZILVER', sponsorsBronze: 'SPONSORS BRONS' },
  en: { privacy: 'Privacy & Disclaimer', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Website developed by Terro.</>, contact: 'CONTACT', general: 'General:', sponsorship: 'Sponsorship & Services:', partners: 'PARTNERS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'SPONSORS SILVER', sponsorsBronze: 'SPONSORS BRONZE' },
  es: { privacy: 'Privacidad y Aviso Legal', copyright: <>© 2026 - 2029 Project 15<span className="brand-slash">/</span>70. Sitio web desarrollado por Terro.</>, contact: 'CONTACTO', general: 'General:', sponsorship: 'Patrocinio & Servicios:', partners: 'SOCIOS', sponsorsGold: 'SPONSORS GOLD', sponsorsSilver: 'PATROCINADORES PLATA', sponsorsBronze: 'PATROCINADORES BRONCE' },
};

const STC_URL = 'https://www.savethechildren.org/';

interface SponsorTierProps {
  tier: 'Gold' | 'Silver' | 'Bronze';
  title: string;
  textColor: string;
  lineColor: string;
  logos: SponsorLogo[];
}

function SponsorTier({ tier, title, textColor, lineColor, logos }: SponsorTierProps) {
  const sizeClass =
    tier === 'Gold' ? 'w-44 h-20' : tier === 'Silver' ? 'w-36 h-16' : 'w-28 h-12';
  const paddingClass = tier === 'Bronze' ? 'p-2' : 'p-3';

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mt-3">
        <div className={`flex-1 h-px ${lineColor}`} />
        <span className={`text-[11px] uppercase tracking-wider whitespace-nowrap ${textColor}`}>{title}</span>
        <div className={`flex-1 h-px ${lineColor}`} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 py-3" aria-label={title}>
        {logos.map((sponsor) => {
          const isLink = tier === 'Gold' || tier === 'Silver';
          const Wrapper = isLink ? 'a' : 'div';
          const linkProps = isLink
            ? { href: sponsor.websiteUrl || '#', target: '_blank', rel: 'noreferrer' }
            : {};
          return (
            <Wrapper
              key={sponsor._id}
              {...linkProps}
              className={`${sizeClass} relative inline-flex items-center justify-center rounded-md bg-[#121212] border border-neutral-800 hover:border-neutral-700 transition duration-300 group`}
              aria-label={sponsor.company}
            >
              {sponsor.src ? (
                <img
                  className={`w-full h-full object-contain ${paddingClass} grayscale transition duration-300 group-hover:grayscale-0`}
                  src={sponsor.src}
                  alt={sponsor.company}
                />
              ) : (
                <span className="text-sm text-white/70 text-center px-2">{sponsor.company}</span>
              )}
              {sponsor.websiteUrl && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded bg-black/90 text-[10px] text-white/90 text-center break-all leading-tight max-w-[95%] opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                  {sponsor.websiteUrl}
                </div>
              )}
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}

export function Footer({ t, language, page, navigate, maintenance, sponsorLogos, className }: FooterProps) {
  const [footerEmail, setFooterEmail] = useState('');
  const [footerStatus, setFooterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [footerError, setFooterError] = useState<'duplicate' | 'other' | null>(null);

  async function handleFooterSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFooterStatus('idle');
    setFooterError(null);
    const formData = new FormData(event.currentTarget);
    const website = String(formData.get('website') || '');
    const { error, alreadySubscribed } = await subscribeEmail(footerEmail, 'footer', language, website);
    if (error) {
      setFooterStatus('error');
      setFooterError(alreadySubscribed ? 'duplicate' : 'other');
    } else {
      setFooterStatus('success');
      setFooterEmail('');
    }
  }

  return (
    <footer className={className}>
      <div className="footer-container">
        <div className="footer-flex">
          <div className="footer-module footer-brand-module">
            <div className="brand">
              <span>FORZA FORTUNA</span>
              <em>Financial Group</em>
            </div>
            <div className="footer-socials">
              <a href="https://www.facebook.com/share/14zSqaMQPTN/" target="_blank" rel="noopener noreferrer" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/project15_70?dlrf=MWlwYzlwdHNvZGJ1cA==" target="_blank" rel="noopener noreferrer" title="Instagram">
                <Instagram size={20} />
              </a>
            </div>
            <a className="footer-stc" href={STC_URL} target="_blank" rel="noreferrer">
              <img src="/images/sponsor/stc-embleem.png" alt="Save the Children" />
              <span>SAVE THE CHILDREN</span>
            </a>
          </div>

          {!maintenance && (
            <div className="footer-module footer-nav-module">
              <h3 className="footer-title">NAVIGATIE</h3>
              <div className="footer-nav-links">
                {(['home', 'story', 'cause', 'terro', 'route', 'blog', 'sponsoring'] as (keyof typeof t.nav)[]).map((key) => (
                  <button key={key} onClick={() => navigate(key as Page)}>
                    {t.nav[key]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="footer-module footer-contact-module">
            <h3 className="footer-title">{footerLabels[language].contact}</h3>
            <div className="footer-contact-line" style={{ display: 'block', marginBottom: '12px' }}>
              <span
                className="text-xs footer-contact-label"
                style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                {footerLabels[language].general}
              </span>
              {!maintenance ? (
                <button
                  className="text-xs text-[#99815e] hover:text-white transition-colors"
                  onClick={() => navigate('contact')}
                  style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  info@project1570.org
                </button>
              ) : (
                <a
                  className="text-xs text-[#99815e] hover:text-white transition-colors"
                  href="mailto:info@project1570.org"
                  style={{ display: 'block', textDecoration: 'underline' }}
                >
                  info@project1570.org
                </a>
              )}
            </div>
            <div className="footer-contact-line" style={{ display: 'block' }}>
              <span
                className="text-xs footer-contact-label"
                style={{ display: 'block', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2px' }}
              >
                {footerLabels[language].sponsorship}
              </span>
              {!maintenance ? (
                <button
                  className="text-xs text-[#99815e] hover:text-white transition-colors"
                  onClick={() => {
                    navigate('contact');
                    window.history.replaceState({ ...window.history.state, subject: 'sponsoring' }, '', window.location.href);
                  }}
                  style={{ display: 'block', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  sponsoring@project1570.org
                </button>
              ) : (
                <a
                  className="text-xs text-[#99815e] hover:text-white transition-colors"
                  href="mailto:sponsoring@project1570.org"
                  style={{ display: 'block', textDecoration: 'underline' }}
                >
                  sponsoring@project1570.org
                </a>
              )}
            </div>
          </div>
        </div>

        {!maintenance && page !== 'blog' && (
          <div className="footer-subscribe w-full max-w-3xl mx-auto px-4 py-6">
            <form onSubmit={handleFooterSubscribe} className="w-full rounded-lg border border-[#c05a28]/30 bg-zinc-900/60 p-5 space-y-3" noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden="true"
              />
              <h3 className="text-xl md:text-2xl font-semibold text-white !mt-0"><SlashHeading text={t.subscribeHeading} /></h3>
              <p className="text-sm text-white/70 leading-relaxed">{t.subscribeSubtext}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder={t.subscribePlaceholder}
                  className="flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#c05a28] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="rounded-md bg-[#c05a28] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a84d22] transition-colors"
                >
                  {t.subscribeButton}
                </button>
              </div>
              {footerStatus === 'success' && (
                <p className="text-sm text-green-400">{t.subscribeSuccess}</p>
              )}
              {footerStatus === 'error' && (
                <p className={`text-sm ${footerError === 'duplicate' ? 'text-red-500' : 'text-orange-500'}`}>
                  {footerError === 'duplicate' ? t.alreadySubscribed : t.subscribeError}
                </p>
              )}
            </form>
          </div>
        )}

        {!maintenance && (
          <div className="footer-partners gap-2 py-2">
            <div className="w-full max-w-4xl mx-auto flex items-center gap-4 mt-2">
              <div className="flex-1 h-[2px] bg-white/10" />
              <span className="text-[11px] uppercase tracking-wider whitespace-nowrap" style={{ color: 'var(--orange)' }}>{footerLabels[language].partners}</span>
              <div className="flex-1 h-[2px] bg-white/10" />
            </div>
            <div className="footer-partners-row flex-wrap justify-center gap-4" aria-label="Hoofdpartners">
              <a href="https://fortunafg.com" target="_blank" rel="noreferrer" className="footer-sponsor-link !w-[200px] !h-[100px] !bg-transparent">
                <img
                  className="w-full h-full object-contain p-1"
                  src="/images/hero/logo-fortuna-kleur.png"
                  alt="Fortuna Financial Group"
                />
              </a>
              <a href="https://forzafortuna.be" target="_blank" rel="noreferrer" className="footer-forza-link !mt-0 !w-[200px] !h-[100px]" title="Forza Fortuna">
                <img className="w-full h-full object-contain p-1" src="/forza-fortuna-logo.webp" alt="Forza Fortuna" />
              </a>
            </div>

            <SponsorTier
              tier="Gold"
              title={footerLabels[language].sponsorsGold}
              textColor="text-amber-400"
              lineColor="bg-amber-500/30"
              logos={sponsorLogos.filter((s) => s.tier === 'Gold')}
            />

            <SponsorTier
              tier="Silver"
              title={footerLabels[language].sponsorsSilver}
              textColor="text-slate-300"
              lineColor="bg-slate-400/30"
              logos={sponsorLogos.filter((s) => s.tier === 'Silver')}
            />

            <SponsorTier
              tier="Bronze"
              title={footerLabels[language].sponsorsBronze}
              textColor="text-orange-400"
              lineColor="bg-orange-400/30"
              logos={sponsorLogos.filter((s) => s.tier === 'Bronze')}
            />
          </div>
        )}

        <div className="footer-bottom">
          {!maintenance && (
            <div className="footer-legal">
              <button className="footer-privacy" onClick={() => navigate('privacy')}>
                {footerLabels[language].privacy}
              </button>
            </div>
          )}
          <div className="footer-copyright">
            {footerLabels[language].copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
