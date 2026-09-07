// Eenvoudige spam- en scheldwoordenfilter voor donatie-berichten.
// Meertalig (NL / EN / ES) en bewust puur gehouden zodat hij los testbaar blijft.

export type MessageCheckResult =
  | { ok: true }
  | { ok: false; reason: 'profanity' | 'spam' };

const PROFANITY: string[] = [
  // Nederlands
  'kanker', 'kut', 'hoer', 'lul', 'neuken', 'tyfus', 'tering', 'mongool',
  'slet', 'sukkel', 'klote', 'eikel', 'rotzak', 'teringlijer',
  // Engels
  'fuck', 'fucking', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy',
  'bastard', 'whore', 'slut', 'nigger', 'faggot', 'retard', 'dumbass',
  'motherfucker', 'cock', 'bollocks', 'wanker', 'arsehole',
  // Spaans
  'puta', 'puto', 'mierda', 'cabron', 'cono', 'joder', 'gilipollas',
  'maricon', 'hijo de puta', 'pendejo', 'idiota', 'imbecil', 'estupido',
  'culero', 'chingada', 'verga', 'zorra', 'cabrona',
];

const SPAM_PHRASES: string[] = [
  'click here', 'click now', 'free money', 'free gift', 'winner', 'lottery',
  'casino', 'bitcoin', 'crypto', 'investment opportunity', 'work from home',
  'earn money fast', 'viagra', 'cialis', 'porn', 'onlyfans', 'sexy',
  'whatsapp me', 'contact me privately', 'limited offer', 'act now',
  'no risk', 'guaranteed profit', 'make money online', 'buy followers',
  'cheap followers', 'loan offer', 'debt relief',
];

const URL_PATTERN = /https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|nl|be|es|info|xyz|top|click|shop|loan|online|site)\b/i;
const REPEATED_CHARS = /(.)\1{4,}/;
const CONSONANT_CLUSTER = /[bcdfghjklmnpqrstvwxz]{8,}/;

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    // eenvoudige leetspeak-normalisatie zodat "sh1t" e.d. ook gepakt worden
    .replace(/[013457$@!|]/g, (c) => {
      const map: Record<string, string> = {
        '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't',
        '$': 's', '@': 'a', '!': 'i', '|': 'i',
      };
      return map[c] ?? c;
    });
}

function wordInText(word: string, text: string) {
  if (word.includes(' ')) return text.includes(word);
  return new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text);
}

function isMostlyCaps(text: string) {
  const letters = text.replace(/[^a-z]/gi, '');
  if (letters.length < 12) return false;
  const upper = letters.replace(/[^A-Z]/g, '');
  return upper.length / letters.length > 0.85;
}

// Naamveld: enkel letters (ook accenten), spaties, koppelteken, apostrof en punt.
// Cijfers en overige speciale tekens worden geblokkeerd, plus dezelfde
// profanity/spam-check als het berichtveld.
export function checkName(raw: string): MessageCheckResult {
  const text = raw.trim();
  if (!text) return { ok: true };
  if (!/^[\p{L}][\p{L} .'-]*$/u.test(text)) {
    return { ok: false, reason: 'spam' };
  }
  if (text.length > 60) return { ok: false, reason: 'spam' };
  return checkMessage(text);
}

export function checkMessage(raw: string): MessageCheckResult {
  const text = raw.trim();
  if (!text) return { ok: true }; // veld is optioneel

  const normalized = normalize(text);

  if (PROFANITY.some((w) => wordInText(w, normalized))) {
    return { ok: false, reason: 'profanity' };
  }

  if (
    URL_PATTERN.test(text) ||
    REPEATED_CHARS.test(normalized) ||
    CONSONANT_CLUSTER.test(normalized) ||
    isMostlyCaps(text) ||
    SPAM_PHRASES.some((p) => normalized.includes(normalize(p)))
  ) {
    return { ok: false, reason: 'spam' };
  }

  return { ok: true };
}
