import { defineField, defineType } from 'sanity';

const RICH_TEXT_BLOCK = {
  type: 'block',
  styles: [
    { title: 'Normaal', value: 'normal' },
    { title: 'Kop 1', value: 'h1' },
    { title: 'Kop 2', value: 'h2' },
    { title: 'Kop 3', value: 'h3' },
  ],
  marks: {
    decorators: [
      { title: 'Vet', value: 'strong' },
      { title: 'Cursief', value: 'em' },
      { title: 'Onderstreept', value: 'underline' },
    ],
  },
};

export const localeText = defineType({
  name: 'localeText',
  title: 'Meertalige tekst',
  type: 'object',
  fields: [
    defineField({ name: 'nl', type: 'array', title: 'Nederlands', of: [RICH_TEXT_BLOCK] }),
    defineField({ name: 'en', type: 'array', title: 'English', of: [RICH_TEXT_BLOCK] }),
    defineField({ name: 'es', type: 'array', title: 'Español', of: [RICH_TEXT_BLOCK] }),
  ],
  preview: {
    select: { title: 'nl' },
  },
});
