import { defineField, defineType } from 'sanity';

export const sponsor = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Bedrijfsnaam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'company', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Sponsorpakket',
      type: 'string',
      options: {
        list: [
          { title: 'Goud', value: 'Gold' },
          { title: 'Zilver', value: 'Silver' },
          { title: 'Brons', value: 'Bronze' },
        ],
        layout: 'radio',
      },
      initialValue: 'Bronze',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Upload het logo. Liefst een wit of licht logo op transparante achtergrond voor de footer.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'De hyperlink die op het logo in de footer komt te staan.',
    }),
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      initialValue: 0,
      description: 'Lagere nummers komen eerst.',
    }),
    defineField({
      name: 'active',
      title: 'Actief',
      type: 'boolean',
      initialValue: true,
      description: 'Alleen actieve sponsors worden in de footer getoond.',
    }),
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'tier',
      media: 'logo',
    },
  },
});
