import { createClient } from '@sanity/client'
import type { SanityClient } from '@sanity/client'

// Sanity client configuration
export const sanityClient: SanityClient | null = process.env.SANITY_PROJECT_ID ? createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_TOKEN,
}) : null

// Helper function to build image URLs
export const urlFor = (source: any) => {
  if (!source || !source.asset || !sanityClient) return ''
  
  const { projectId, dataset } = sanityClient.config()
  const { _ref } = source.asset
  
  // Extract image ID and format from reference
  const [id, dimensions, format] = _ref.replace('image-', '').split('-')
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
}

// Helper function to build image URLs with transformation options
export const buildImageUrl = (source: any, options: { width?: number; height?: number; quality?: number } = {}) => {
  const baseUrl = urlFor(source)
  if (!baseUrl) return ''
  
  const params = new URLSearchParams()
  
  if (options.width) params.append('w', options.width.toString())
  if (options.height) params.append('h', options.height.toString())
  if (options.quality) params.append('q', options.quality.toString())
  
  return params.toString() ? `${baseUrl}?${params}` : baseUrl
}