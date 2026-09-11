import { defineField, defineType } from 'sanity';

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
      name: 'inleiding',
      title: 'Inleiding',
      type: 'localeText',
      description: 'Korte introductie tekst (max. 3-4 zinnen) boven de Strava-foto',
    }),
    defineField({
      name: 'strava',
      title: 'Strava Foto + Link',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Strava foto',
          type: 'image',
          description: 'Afbeelding die klikbaar wordt naar de Strava-activiteit',
        }),
        defineField({
          name: 'url',
          title: 'Strava URL',
          type: 'url',
          description: 'Link naar de Strava-activiteit (opent in nieuw tabblad)',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Hoofdtekst',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Fotoslider',
      type: 'array',
      of: [{ type: 'photo' }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-afbeelding',
      type: 'image',
      description: 'Afbeelding op de blog-kaart en bovenaan het artikel',
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
  ],
  preview: {
    select: {
      title: 'title.nl',
      subtitle: 'date',
      media: 'heroImage',
    },
  },
});
