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

export const post = defineType({
  name: 'post',
  title: 'Blogpost',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'string',
      description: 'Bijv. "01 / 2027" of "09 / 2029"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.nl', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categorie / label',
      type: 'string',
      description: 'Bijv. "DAG 1", "Training" of "Update"',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullTitle',
      title: 'Volledige titel',
      type: 'localeString',
      description: 'Lange titel bovenaan de detailpagina',
    }),
    defineField({
      name: 'excerpt',
      title: 'Samenvatting',
      type: 'localeText',
      description: 'Korte introductie (als deze bestaat verschijnt er een "Lees meer"-knop)',
    }),
    defineField({
      name: 'body',
      title: 'Artikeltekst',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-afbeelding',
      type: 'image',
      description: 'Afbeelding op de blog-kaart en bovenaan het artikel',
    }),
    defineField({
      name: 'photos',
      title: 'Fotoslider',
      type: 'array',
      of: [{ type: 'photo' }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['published', 'upcoming'], layout: 'radio' },
      initialValue: 'published',
    }),
    defineField({
      name: 'expected',
      title: 'Verwachte publicatiedatum',
      type: 'string',
      description: 'Alleen zichtbaar bij status "upcoming"',
    }),
    defineField({
      name: 'stravaId',
      title: 'Strava activiteits-ID',
      type: 'string',
    }),
    defineField({
      name: 'stravaToken',
      title: 'Strava embed-token',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title.nl',
      subtitle: 'date',
      media: 'heroImage',
    },
  },
});
