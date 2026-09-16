import { defineField, defineType } from 'sanity';

export const trainingStats = defineType({
  name: 'trainingStats',
  title: 'Tellers & Grafieken',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Interne naam voor dit document',
      initialValue: 'Live training statistieken',
    }),
    defineField({
      name: 'stravaKilometersYTD',
      title: 'Strava kilometers YTD',
      type: 'number',
      description: 'Totale gereden kilometers dit jaar volgens Strava',
    }),
    defineField({
      name: 'stravaElevationYTD',
      title: 'Strava hoogtemeters YTD',
      type: 'number',
      description: 'Totale overwonnen hoogtemeters dit jaar volgens Strava',
    }),
    defineField({
      name: 'intervalsFitnessCTL',
      title: 'Intervals.icu CTL',
      type: 'number',
      description: 'Actuele fitness/conditiescore uit Intervals.icu',
    }),
    defineField({
      name: 'targetAlbirElevation',
      title: 'Doel hoogtemeters Albir',
      type: 'number',
      description: 'Doelaantal hoogtemeters voor de Albir-uitdaging',
      initialValue: 17500,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Tellers & Grafieken',
      };
    },
  },
});
