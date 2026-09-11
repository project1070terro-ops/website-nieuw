const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

// MyMemory anonieme requests hanteren ongeveer 500 tekens per call.
const MAX_CHUNK_LEN = 450;

interface MyMemoryResponse {
  responseData: { translatedText: string } | null;
  responseStatus: number;
  responseDetails?: string;
}

class TranslationError extends Error {
  constructor(message: string, public readonly sourceText?: string) {
    super(message);
  }
}

async function fetchMyMemory(text: string, targetLang: 'en' | 'es', sourceLang: 'nl' = 'nl'): Promise<string> {
  let response: Response;
  try {
    response = await fetch(
      `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    );
  } catch (networkError) {
    throw new TranslationError(
      `Netwerkfout bij vertalen: ${networkError instanceof Error ? networkError.message : String(networkError)}`,
      text
    );
  }

  let data: MyMemoryResponse | undefined;
  try {
    data = (await response.json()) as MyMemoryResponse;
  } catch {
    throw new TranslationError('Ongeldig antwoord van MyMemory.', text);
  }

  if (!response.ok || (data?.responseStatus ?? 0) >= 400) {
    throw new TranslationError(
      data?.responseDetails || `MyMemory API status ${data?.responseStatus || response.status}`,
      text
    );
  }

  if (!data?.responseData?.translatedText) {
    throw new TranslationError('MyMemory returned no translation.', text);
  }

  return data.responseData.translatedText;
}

function splitTextIntoChunks(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > maxLen) {
    let cut = remaining.lastIndexOf(' ', maxLen);
    if (cut <= 0) cut = Math.max(1, maxLen);
    chunks.push(remaining.slice(0, cut).trim());
    remaining = remaining.slice(cut).trimStart();
  }

  if (remaining) chunks.push(remaining);
  return chunks;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function translateText(text: string, targetLang: 'en' | 'es', sourceLang: 'nl' = 'nl'): Promise<string> {
  if (!text || !text.trim()) return '';
  if (text.length <= MAX_CHUNK_LEN) {
    return fetchMyMemory(text, targetLang, sourceLang);
  }

  const chunks = splitTextIntoChunks(text, MAX_CHUNK_LEN);
  const translated: string[] = [];

  for (const chunk of chunks) {
    translated.push(await fetchMyMemory(chunk, targetLang, sourceLang));
    await wait(150);
  }

  return translated.join(' ');
}

export interface TranslatePortableTextResult {
  blocks: any[] | undefined;
  warnings: string[];
}

export async function translatePortableText(
  blocks: any[] | undefined,
  targetLang: 'en' | 'es'
): Promise<TranslatePortableTextResult> {
  const warnings: string[] = [];
  if (!Array.isArray(blocks)) return { blocks: undefined, warnings };

  const translatedBlocks: any[] = [];

  for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
    const block = blocks[blockIndex];
    if (block?._type !== 'block') {
      translatedBlocks.push(block);
      continue;
    }

    const translatedChildren: any[] = [];

    for (let childIndex = 0; childIndex < (block.children || []).length; childIndex++) {
      const child = block.children[childIndex];
      if (child?._type !== 'span' || typeof child.text !== 'string') {
        translatedChildren.push(child);
        continue;
      }

      try {
        const translated = await translateText(child.text, targetLang);
        translatedChildren.push({ ...child, text: translated });
      } catch (error) {
        const message = error instanceof TranslationError ? error.message : String(error);
        warnings.push(`Blok ${blockIndex + 1}, stuk ${childIndex + 1}: ${message}`);
        translatedChildren.push(child);
      }
      await wait(80);
    }

    translatedBlocks.push({
      ...block,
      children: translatedChildren,
    });
  }

  return { blocks: translatedBlocks, warnings };
}
