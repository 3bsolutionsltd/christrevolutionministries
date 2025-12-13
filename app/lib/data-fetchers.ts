// This is a utility to fetch data for the public site
// Supports both development (admin API) and production (static files) modes
export async function getMinistries() {
  try {
    // Use static JSON files for all production deployments (staging and production)
    const response = await fetch('/api/ministries.json', {
      cache: 'no-store'
    });
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return [];
  }
}

export async function getEvents() {
  try {
    const response = await fetch('/api/events.json', {
      cache: 'no-store'
    });
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getSermons() {
  try {
    const response = await fetch('/api/sermons.json', {
      cache: 'no-store'
    });
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return [];
  }
}

export async function getYouTubeLinks() {
  try {
    const response = await fetch('/api/admin/youtube-links', {
      cache: 'no-store' // Ensure fresh data
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching YouTube links:', error);
    return [];
  }
}

export async function getHeroSlides() {
  try {
    // Use static JSON file for production deployment
    const response = await fetch('/api/hero-slides.json', {
      cache: 'no-store'
    });
    if (response.ok) {
      const slides = await response.json();
      return slides.filter((slide: any) => slide.active).sort((a: any, b: any) => a.order - b.order);
    }
    return [];
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}

export async function getHomepageSettings() {
  try {
    // Use static JSON file for production deployment
    const response = await fetch('/api/homepage-settings.json', {
      cache: 'no-store'
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching homepage settings:', error);
    return null;
  }
}

export async function getSiteSettings() {
  try {
    // Use static JSON file for production deployment
    const response = await fetch('/api/site-settings.json', {
      cache: 'no-store'
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}