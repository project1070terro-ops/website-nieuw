import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { translateDocumentAction } from './documentActions/translate';

export default defineConfig({
  name: 'project1570-studio',
  title: 'Project 15/70',
  projectId: 'of8587ti',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev) => [...prev, translateDocumentAction],
  },
});
