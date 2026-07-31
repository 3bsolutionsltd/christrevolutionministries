// Sanity client temporarily disabled due to network issues
// Using local JSON-based content management instead

export const client = {
  fetch: async (query: string) => {
    // Placeholder for when Sanity is working
    console.warn('Sanity client disabled, using local data')
    return []
  }
}

// GROQ queries for fetching content
export const queries = {
  // Get all active ministries ordered by display order
  ministries: `*[_type == "ministry" && isActive == true] | order(order asc, title asc) {
    _id,
    title,
    description,
    fullDescription,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    leader,
    contact,
    meetingTime,
    location,
    order
  }`,

  // Get recent sermons (last 10)
  recentSermons: `*[_type == "sermon"] | order(date desc)[0...10] {
    _id,
    title,
    preacher,
    date,
    series,
    scripture,
    description,
    audioUrl,
    videoUrl,
    "thumbnailUrl": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt,
    tags,
    featured,
    downloadUrl
  }`,

  // Get all sermons ordered by date
  allSermons: `*[_type == "sermon"] | order(date desc) {
    _id,
    title,
    preacher,
    date,
    series,
    scripture,
    description,
    audioUrl,
    videoUrl,
    "thumbnailUrl": thumbnail.asset->url,
    "thumbnailAlt": thumbnail.alt,
    tags,
    featured,
    downloadUrl
  }`,

  // Get upcoming events (next 30 days)
  upcomingEvents: `*[_type == "event" && startDate >= now()] | order(startDate asc) {
    _id,
    title,
    description,
    fullDescription,
    startDate,
    endDate,
    location,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    category,
    organizer,
    registrationRequired,
    registrationUrl,
    capacity,
    cost,
    featured,
    isRecurring,
    recurrencePattern
  }`,

  // Get all events (past and future)
  allEvents: `*[_type == "event"] | order(startDate desc) {
    _id,
    title,
    description,
    fullDescription,
    startDate,
    endDate,
    location,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    category,
    organizer,
    registrationRequired,
    registrationUrl,
    capacity,
    cost,
    featured,
    isRecurring,
    recurrencePattern
  }`,

  // Get featured content for homepage
  featuredContent: `{
    "sermons": *[_type == "sermon" && featured == true] | order(date desc)[0...3] {
      _id,
      title,
      preacher,
      date,
      description,
      audioUrl,
      videoUrl,
      "thumbnailUrl": thumbnail.asset->url
    },
    "events": *[_type == "event" && featured == true && startDate >= now()] | order(startDate asc)[0...3] {
      _id,
      title,
      description,
      startDate,
      location,
      "imageUrl": image.asset->url,
      category
    }
  }`
}

// Helper function to get image URL with transformations
export function getImageUrl(imageRef: string, width?: number, height?: number) {
  if (!imageRef) return null
  
  const baseUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${imageRef}`
  
  if (width || height) {
    const params = new URLSearchParams()
    if (width) params.append('w', width.toString())
    if (height) params.append('h', height.toString())
    params.append('fit', 'crop')
    params.append('auto', 'format')
    return `${baseUrl}?${params.toString()}`
  }
  
  return `${baseUrl}?auto=format`
}

// Helper function to format dates
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(dateString)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options || defaultOptions)
}

// Helper function to format datetime
export function formatDateTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}