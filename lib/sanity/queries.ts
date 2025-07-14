// GROQ queries for Sanity content

// Event queries
export const eventsQuery = `
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    shortDescription,
    location,
    date,
    startTime,
    endTime,
    isPast,
    ticketPrice,
    ticketLink,
    locationAddress,
    locationMapUrl,
    image,
    bannerImage,
    host->{
      name,
      title,
      image
    },
    createdAt
  }
`

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    location,
    date,
    startTime,
    endTime,
    isPast,
    ticketPrice,
    ticketLink,
    locationAddress,
    locationMapUrl,
    image,
    bannerImage,
    host->{
      name,
      title,
      image
    },
    createdAt
  }
`

// Ambassador queries
export const ambassadorsQuery = `
  *[_type == "ambassador"] | order(name asc) {
    _id,
    name,
    slug,
    title,
    location,
    country,
    quote,
    shortBio,
    fullBio,
    image,
    bannerImage,
    socialMedia,
    yearsInProgram,
    eventsHosted,
    membersSince,
    languages,
    expertise,
    createdAt
  }
`

export const ambassadorBySlugQuery = `
  *[_type == "ambassador" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    title,
    location,
    country,
    quote,
    shortBio,
    fullBio,
    image,
    bannerImage,
    socialMedia,
    yearsInProgram,
    eventsHosted,
    membersSince,
    languages,
    expertise,
    createdAt
  }
`

// Blog post queries
export const blogPostsQuery = `
  *[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    author,
    authorTitle,
    date,
    readTime,
    category,
    tags,
    image,
    featured,
    createdAt
  }
`

export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    author,
    authorTitle,
    date,
    readTime,
    category,
    tags,
    image,
    featured,
    createdAt
  }
`

export const featuredBlogPostsQuery = `
  *[_type == "blogPost" && featured == true] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    author,
    authorTitle,
    date,
    readTime,
    category,
    tags,
    image,
    featured,
    createdAt
  }
`

export const blogPostsByCategoryQuery = `
  *[_type == "blogPost" && category == $category] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    author,
    authorTitle,
    date,
    readTime,
    category,
    tags,
    image,
    featured,
    createdAt
  }
`