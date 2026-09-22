import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site-instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Algemene instellingen',
    }),
    defineField({
      name: 'heroSlider',
      title: 'Hero fotocarrousel',
      type: 'array',
      description: 'Foto\'s voor de homepage hero-slider. Sleep om de volgorde te wijzigen.',
      of: [{ type: 'photo' }],
      options: { layout: 'grid' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
