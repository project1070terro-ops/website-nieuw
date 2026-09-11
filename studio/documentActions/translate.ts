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
    const warnings: string[] = [];

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

      // 2. Inleiding (voorrang op oude excerpt) en body
      const introSource = doc.inleiding?.nl ?? doc.excerpt?.nl;
      if (introSource && Array.isArray(introSource)) {
        const enIntro = await translatePortableText(introSource, 'en');
        const esIntro = await translatePortableText(introSource, 'es');
        patchValues['inleiding.en'] = enIntro.blocks;
        patchValues['inleiding.es'] = esIntro.blocks;
        warnings.push(...enIntro.warnings, ...esIntro.warnings);
      }

      if (doc.body?.nl && Array.isArray(doc.body.nl)) {
        const enBody = await translatePortableText(doc.body.nl, 'en');
        const esBody = await translatePortableText(doc.body.nl, 'es');
        patchValues['body.en'] = enBody.blocks;
        patchValues['body.es'] = esBody.blocks;
        warnings.push(...enBody.warnings, ...esBody.warnings);
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

      if (warnings.length > 0) {
        const detail = warnings.slice(0, 3).join('; ');
        const more = warnings.length > 3 ? ` (+ ${warnings.length - 3} andere)` : '';
        toast.push({
          status: 'warning',
          title: 'Vertaling deels gelukt',
          description: `Sommige stukken zijn niet vertaald (Nederlands behouden). ${detail}${more}`,
        });
      } else {
        toast.push({
          status: 'success',
          title: 'Vertaling voltooid',
          description: 'De Engelse en Spaanse velden zijn ingevuld.',
        });
      }
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
