import { readDataFile as readFromGitHub, writeDataFile as writeToGitHub } from './github-storage';

// File paths in the repository
const MINISTRIES_FILE = 'data/ministries.json';
const EVENTS_FILE = 'data/events.json';
const SERMONS_FILE = 'data/sermons.json';
const YOUTUBE_LINKS_FILE = 'data/youtube-links.json';
const HERO_SLIDES_FILE = 'data/hero-slides.json';
const HOMEPAGE_SETTINGS_FILE = 'data/homepage-settings.json';
const SITE_SETTINGS_FILE = 'data/site-settings.json';

/**
 * Helper to extract token from request headers
 */
export function extractTokenFromHeaders(headers: Headers): string | undefined {
  const authHeader = headers.get('Authorization');
  if (!authHeader) return undefined;
  
  // Handle "Bearer token" or "Bearer github-oauth-session"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return undefined;
  
  return parts[1];
}

/**
 * Helper to get token from OAuth session cookie
 */
export function extractTokenFromCookie(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith('admin-session='));
  
  if (!sessionCookie) return undefined;
  
  const value = sessionCookie.split('=')[1];
  const parts = value.split(':');
  
  // Format: github-oauth:username:token:timestamp
  if (parts.length === 4) {
    return parts[2]; // Return the token
  }
  
  return undefined;
}

// Ministries operations
export async function getMinistries(token?: string) {
  const defaultMinistries = [
    { 
      id: 1,
      title: 'Youth Ministry', 
      desc: 'Empowering the next generation through discipleship, evangelism, and transformative experiences.',
      img: '/youth-web-330x201.jpg',
      icon: '👥'
    },
    { 
      id: 2,
      title: 'Evangelism', 
      desc: 'Spreading the Gospel and reaching communities with the love and message of Christ.',
      img: '/evangelism-web-330x290.jpg',
      icon: '📖'
    },
    { 
      id: 3,
      title: 'Worship & Music', 
      desc: 'Deep worship experiences that connect hearts to God through powerful music and praise.',
      img: '/worship_deep-552x262.jpg',
      icon: '🎵'
    },
    { 
      id: 4,
      title: 'Hope & Restoration', 
      desc: 'Bringing hope to the broken-hearted and restoration to those in need of healing.',
      img: '/hope-370x230.jpg',
      icon: '✨'
    },
  ];
  const result = await readFromGitHub(MINISTRIES_FILE, defaultMinistries, token);
  return result.content;
}

export async function saveMinistries(ministries: any[], token?: string) {
  // First read to get the current SHA
  const result = await readFromGitHub(MINISTRIES_FILE, [], token);
  return writeToGitHub(
    MINISTRIES_FILE, 
    ministries, 
    'Update ministries content via admin panel',
    token,
    result.sha
  );
}

// Events operations
export async function getEvents(token?: string) {
  const defaultEvents = [
    { 
      id: 1,
      title: 'Faith Conference 2025', 
      date: 'Sept 15-17, 2025', 
      time: '7:00 PM',
      location: 'Main Sanctuary',
      category: 'Conference',
      description: 'A powerful three-day conference focused on building unshakeable faith.',
      img: '/faith-1024x533.jpg'
    },
    { 
      id: 2,
      title: 'Youth Outreach', 
      date: 'Sept 5, 2025', 
      time: '6:00 PM',
      location: 'Community Center',
      category: 'Youth',
      description: 'Reaching young hearts with the transformative message of Christ.',
      img: '/youth-web-330x201.jpg'
    },
  ];
  const result = await readFromGitHub(EVENTS_FILE, defaultEvents, token);
  return result.content;
}

export async function saveEvents(events: any[], token?: string) {
  const result = await readFromGitHub(EVENTS_FILE, [], token);
  return writeToGitHub(
    EVENTS_FILE, 
    events, 
    'Update events content via admin panel',
    token,
    result.sha
  );
}

// Sermons operations
export async function getSermons(token?: string) {
  const defaultSermons = [
    {
      id: 1,
      title: 'Walking in Faith',
      speaker: 'Pastor John',
      date: '2024-12-01',
      series: 'Faith Series',
      youtubeUrl: '',
      audioUrl: '',
      description: 'A powerful message about walking by faith and not by sight.'
    },
    {
      id: 2,
      title: 'The Power of Prayer',
      speaker: 'Pastor Sarah',
      date: '2024-11-24',
      series: 'Prayer Series',
      youtubeUrl: '',
      audioUrl: '',
      description: 'Understanding the transformative power of prayer in our daily lives.'
    }
  ];
  const result = await readFromGitHub(SERMONS_FILE, defaultSermons, token);
  return result.content;
}

export async function saveSermons(sermons: any[], token?: string) {
  const result = await readFromGitHub(SERMONS_FILE, [], token);
  return writeToGitHub(
    SERMONS_FILE, 
    sermons, 
    'Update sermons content via admin panel',
    token,
    result.sha
  );
}

// YouTube links operations
export async function getYouTubeLinks(token?: string) {
  const defaultLinks = [
    {
      id: 1,
      title: 'Main Church Channel',
      url: 'https://youtube.com/@christrevolutionministries',
      category: 'main',
      description: 'Our primary YouTube channel'
    },
    {
      id: 2,
      title: 'Youth Ministry',
      url: 'https://youtube.com/@crmyouth',
      category: 'youth',
      description: 'Youth ministry content'
    }
  ];
  const result = await readFromGitHub(YOUTUBE_LINKS_FILE, defaultLinks, token);
  return result.content;
}

export async function saveYouTubeLinks(links: any[], token?: string) {
  const result = await readFromGitHub(YOUTUBE_LINKS_FILE, [], token);
  return writeToGitHub(
    YOUTUBE_LINKS_FILE, 
    links, 
    'Update YouTube links via admin panel',
    token,
    result.sha
  );
}

// Hero slides operations
export async function getHeroSlides(token?: string) {
  const defaultSlides = [
    {
      id: 1,
      title: 'Welcome to Christ Revolution Ministries',
      subtitle: 'Transforming Lives Through God\'s Love',
      image: '/hero-slide-1.jpg',
      buttonText: 'Join Us',
      buttonLink: '/contact'
    }
  ];
  const result = await readFromGitHub(HERO_SLIDES_FILE, defaultSlides, token);
  return result.content;
}

export async function saveHeroSlides(slides: any[], token?: string) {
  const result = await readFromGitHub(HERO_SLIDES_FILE, [], token);
  return writeToGitHub(
    HERO_SLIDES_FILE, 
    slides, 
    'Update hero slides via admin panel',
    token,
    result.sha
  );
}

// Homepage settings operations
export async function getHomepageSettings(token?: string) {
  const defaultSettings = {
    welcomeMessage: 'Welcome to Christ Revolution Ministries',
    featuredMinistry: 1,
    showUpcomingEvents: true,
    maxEventsToShow: 3
  };
  const result = await readFromGitHub(HOMEPAGE_SETTINGS_FILE, defaultSettings, token);
  return result.content;
}

export async function saveHomepageSettings(settings: any, token?: string) {
  const result = await readFromGitHub(HOMEPAGE_SETTINGS_FILE, {}, token);
  return writeToGitHub(
    HOMEPAGE_SETTINGS_FILE, 
    settings, 
    'Update homepage settings via admin panel',
    token,
    result.sha
  );
}

// Site settings operations
export async function getSiteSettings(token?: string) {
  const defaultSettings = {
    siteName: 'Christ Revolution Ministries',
    tagline: 'Transforming Lives Through God\'s Love',
    contactEmail: 'info@christrevolutionministries.org',
    phone: '+1-234-567-8900',
    address: '123 Faith Street, Hope City, HC 12345'
  };
  const result = await readFromGitHub(SITE_SETTINGS_FILE, defaultSettings, token);
  return result.content;
}

export async function saveSiteSettings(settings: any, token?: string) {
  const result = await readFromGitHub(SITE_SETTINGS_FILE, {}, token);
  return writeToGitHub(
    SITE_SETTINGS_FILE, 
    settings, 
    'Update site settings via admin panel',
    token,
    result.sha
  );
}