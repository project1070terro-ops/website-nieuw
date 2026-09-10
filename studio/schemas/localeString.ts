import { defineField, defineType } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Meertalige tekst',
  type: 'object',
  fields: [
    defineField({
      name: 'nl',
      type: 'string',
      title: 'Nederlands',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'en', type: 'string', title: 'English' }),
    defineField({ name: 'es', type: 'string', title: 'Español' }),
  ],
  preview: {
    select: { title: 'nl' },
  },
});
