export type Language = 'nl' | 'en' | 'es';
export type Page = 'home' | 'story' | 'route' | 'terro' | 'blog' | 'donate' | 'contact';

export interface Donation {
  id: string;
  name: string;
  amount_eur: number;
  message: string;
  created_at: string;
}

export interface TranslationContent {
  nav: Record<'home' | 'story' | 'route' | 'terro' | 'blog' | 'donate' | 'contact', string>;
  support: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  discover: string;
  introOfficial: string;
  stats: Array<[string, string, Page]>;
  sponsorText: string;
  sponsorLink: string;
  sponsorCards: Array<[string, string]>;
  storyTitle: string;
  storyLead: string;
  storySections: Array<[string, string]>;
  routeTitle: string;
  routeLead: string;
  stages: string[];
  routePlaceholder: string;
  terroTitle: string;
  terroSections: Array<[string, string]>;
  blogTitle: string;
  blogLead: string;
  blogCards: Array<[string, string]>;
  donateTitle: string;
  donateLead: string;
  donated: string;
  sponsored: string;
  goal: string;
  donateIntro: string;
  donationForm: string;
  choose: string;
  name: string;
  message: string;
  donateNow: string;
  recent: string;
  noDonors: string;
  tiers: Array<[string, string, string]>;
  contactTitle: string;
  contactLead: string;
  send: string;
  sent: string;
  email: string;
}
