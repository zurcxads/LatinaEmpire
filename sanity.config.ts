import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemas } from './lib/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Latina Empire CMS',

  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',

  plugins: [
    deskTool(),
    visionTool(), // For GROQ query testing
  ],

  schema: {
    types: schemas,
  },

  document: {
    // Configure which fields appear in the document inspector
    actions: (prev, { schemaType }) => {
      // You can customize document actions here
      return prev
    },
  },
})