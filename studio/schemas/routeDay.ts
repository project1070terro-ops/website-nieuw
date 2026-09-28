import { defineField, defineType } from 'sanity';

export const routeDay = defineType({
  name: 'routeDay',
  title: 'Route dag',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Dagnummer',
      type: 'number',
      description: 'Nummer van de dag, bijv. 1 t/m 10',
      validation: (Rule) => Rule.required().min(1).max(10).integer(),
    }),
    defineField({
      name: 'title',
      title: 'Titel van de rit',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gpx',
      title: 'GPX-bestand',
      type: 'file',
      description: 'Upload het GPX-bestand van de route',
      options: { accept: '.gpx' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'komootUrl',
      title: 'Komoot-link',
      type: 'url',
      description: 'Plak hier de openbare link naar de Komoot-tour for the route-preview',
    }),
    defineField({
      name: 'post',
      title: 'Gekoppelde blogpost',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Selecteer de blogpost (ritverslag / ritten-preview) voor deze dag',
    }),
  ],
  preview: {
    select: {
      title: 'title.nl',
      number: 'day',
    },
    prepare({ title, number }) {
      return {
        title: title || 'Route dag',
        subtitle: number ? `Dag ${number}` : '',
      };
    },
  },
});
