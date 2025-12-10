// This is a utility to fetch data for the public site
// Supports both development (admin API) and production (static files) modes
export async function getMinistries() {
  try {
    // Check if we're in development mode with admin API available
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // Development: Use admin API routes
      const response = await fetch('/api/admin/ministries', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
    } else {
      // Production: Use static API files
      const response = await fetch('/api/ministries.json', {
        cache: 'no-store'
      });
      if (response.ok) {
        return await response.json();
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching ministries:', error);
    return [];
  }
}

export async function getEvents() {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // Development: Use admin API routes
      const response = await fetch('/api/admin/events', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
    } else {
      // Production: Use static API files
      const response = await fetch('/api/events.json', {
        cache: 'no-store'
      });
      if (response.ok) {
        return await response.json();
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getSermons() {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // Development: Use admin API routes
      const response = await fetch('/api/admin/sermons', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
    } else {
      // Production: Use static API files
      const response = await fetch('/api/sermons.json', {
        cache: 'no-store'
      });
      if (response.ok) {
        return await response.json();
      }
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
    const response = await fetch('/api/admin/hero-slides', {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    const data = await response.json();
    if (data.success) {
      return data.data.filter((slide: any) => slide.active).sort((a: any, b: any) => a.order - b.order);
    }
    return [];
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}

export async function getHomepageSettings() {
  try {
    const response = await fetch('/api/admin/homepage-settings', {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching homepage settings:', error);
    return null;
  }
}

export async function getSiteSettings() {
  try {
    const response = await fetch('/api/admin/site-settings', {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}