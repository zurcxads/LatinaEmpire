import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

// Define the schema
const eventSchema = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'string',
    },
    {
      name: 'isPast',
      title: 'Is Past Event',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'ticketPrice',
      title: 'Ticket Price',
      type: 'string',
    },
    {
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
    },
    {
      name: 'locationAddress',
      title: 'Location Address',
      type: 'string',
    },
    {
      name: 'locationMapUrl',
      title: 'Location Map URL',
      type: 'url',
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'hostName',
      title: 'Host Name',
      type: 'string',
    },
    {
      name: 'hostTitle',
      title: 'Host Title',
      type: 'string',
    },
    {
      name: 'hostImage',
      title: 'Host Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      location: 'location',
      date: 'date',
    },
    prepare({title, media, location, date}: any) {
      return {
        title,
        subtitle: `${location} - ${date}`,
        media,
      }
    },
  },
}

const ambassadorSchema = {
  name: 'ambassador',
  title: 'Ambassador',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
    },
    {
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
    },
    {
      name: 'fullBio',
      title: 'Full Bio',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'string',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'string',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
      ],
    },
    {
      name: 'yearsInProgram',
      title: 'Years in Program',
      type: 'number',
    },
    {
      name: 'eventsHosted',
      title: 'Events Hosted',
      type: 'number',
    },
    {
      name: 'membersSince',
      title: 'Member Since',
      type: 'string',
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
}

const blogPostSchema = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Career', value: 'career'},
          {title: 'Leadership', value: 'leadership'},
          {title: 'Entrepreneurship', value: 'entrepreneurship'},
          {title: 'Health', value: 'health'},
          {title: 'Relationships', value: 'relationships'},
          {title: 'Finance', value: 'finance'},
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}

export default defineConfig({
  name: 'default',
  title: 'Latina Empire CMS',
  projectId: '3yaebsnk',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [eventSchema, ambassadorSchema, blogPostSchema],
  },
})