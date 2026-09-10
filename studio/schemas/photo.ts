import { defineField, defineType } from 'sanity';

export const photo = defineType({
  name: 'photo',
  title: 'Foto',
  type: 'image',
  fields: [
    defineField({ name: 'alt', type: 'string', title: 'Alt-tekst' }),
    defineField({ name: 'caption', type: 'localeString', title: 'Bijschrift' }),
  ],
});
