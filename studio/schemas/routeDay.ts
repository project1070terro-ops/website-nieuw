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
      name: 'stravaUrl',
      title: 'Strava-link',
      type: 'url',
      description: 'Optionele link naar de Strava-activiteit',
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
