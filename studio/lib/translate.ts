const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

interface MyMemoryResponse {
  responseData: { translatedText: string } | null;
  responseStatus: number;
  responseDetails?: string;
}

export async function translateText(text: string, targetLang: 'en' | 'es', sourceLang: 'nl' = 'nl'): Promise<string> {
  if (!text || !text.trim()) return '';

  try {
    const response = await fetch(
      `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    );
    const data = (await response.json()) as MyMemoryResponse;

    if (data.responseStatus >= 400 || !data.responseData) {
      console.error('MyMemory translation error:', data.responseDetails);
      return text;
    }

    return data.responseData.translatedText || text;
  } catch (error) {
    console.error('Translation fetch error:', error);
    return text;
  }
}

// Kleine vertraging om MyMemory rate-limits te ontwijken tussen opeenvolgende calls.
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function translatePortableText(blocks: any[] | undefined, targetLang: 'en' | 'es'): Promise<any[] | undefined> {
  if (!Array.isArray(blocks)) return undefined;

  const translatedBlocks: any[] = [];

  for (const block of blocks) {
    if (block?._type !== 'block') {
      translatedBlocks.push(block);
      continue;
    }

    const translatedChildren: any[] = [];

    for (const child of block.children || []) {
      if (child?._type !== 'span' || typeof child.text !== 'string') {
        translatedChildren.push(child);
        continue;
      }

      const translated = await translateText(child.text, targetLang);
      await wait(100);
      translatedChildren.push({ ...child, text: translated });
    }

    translatedBlocks.push({
      ...block,
      children: translatedChildren,
    });
  }

  return translatedBlocks;
}
