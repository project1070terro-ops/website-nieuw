import { useState } from 'react';
import { useDocumentOperation } from 'sanity';
import { useToast } from '@sanity/ui';
import { translatePortableText, translateText } from '../lib/translate';

export function translateDocumentAction(props: any) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const toast = useToast();
  const [isTranslating, setIsTranslating] = useState(false);

  const doc = props.draft || props.published;
  if (!doc) return null;

  const handleTranslate = async () => {
    setIsTranslating(true);
    const patchValues: Record<string, any> = {};

    try {
      // 1. Titel en volledige titel
      if (doc.title?.nl) {
        patchValues['title.en'] = await translateText(doc.title.nl, 'en');
        patchValues['title.es'] = await translateText(doc.title.nl, 'es');
      }

      if (doc.fullTitle?.nl) {
        patchValues['fullTitle.en'] = await translateText(doc.fullTitle.nl, 'en');
        patchValues['fullTitle.es'] = await translateText(doc.fullTitle.nl, 'es');
      }

      // 2. Samenvatting (excerpt) en body
      if (doc.excerpt?.nl && Array.isArray(doc.excerpt.nl)) {
        patchValues['excerpt.en'] = await translatePortableText(doc.excerpt.nl, 'en');
        patchValues['excerpt.es'] = await translatePortableText(doc.excerpt.nl, 'es');
      }

      if (doc.body?.nl && Array.isArray(doc.body.nl)) {
        patchValues['body.en'] = await translatePortableText(doc.body.nl, 'en');
        patchValues['body.es'] = await translatePortableText(doc.body.nl, 'es');
      }

      // 3. Fotobijschriften (per foto in de slider)
      if (Array.isArray(doc.photos)) {
        for (const photo of doc.photos) {
          const caption = photo?.caption;
          if (!caption?.nl || !photo._key) continue;
          const basePath = `photos[_key=="${photo._key}"].caption`;
          patchValues[`${basePath}.en`] = await translateText(caption.nl, 'en');
          patchValues[`${basePath}.es`] = await translateText(caption.nl, 'es');
        }
      }

      patch.execute([{ set: patchValues }]);

      toast.push({
        status: 'success',
        title: 'Vertaling voltooid',
        description: 'De Engelse en Spaanse velden zijn ingevuld.',
      });
      props.onComplete();
    } catch (error) {
      console.error('Translation failed:', error);
      toast.push({
        status: 'error',
        title: 'Vertaling mislukt',
        description: error instanceof Error ? error.message : 'Onbekende fout',
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return {
    label: isTranslating ? 'Bezig met vertalen...' : 'Vertaal naar EN & ES',
    onHandle: handleTranslate,
    disabled: isTranslating,
  };
}
