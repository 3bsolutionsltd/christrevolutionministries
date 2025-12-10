import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const MINISTRIES_FILE = path.join(DATA_DIR, 'ministries.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const SERMONS_FILE = path.join(DATA_DIR, 'sermons.json');
const YOUTUBE_LINKS_FILE = path.join(DATA_DIR, 'youtube-links.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Generic file operations
export async function readDataFile(filePath: string, defaultData: any = []) {
  try {
    await ensureDataDir();
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist, return default data
    return defaultData;
  }
}

export async function writeDataFile(filePath: string, data: any) {
  try {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
}

// Ministries operations
export async function getMinistries() {
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
  return readDataFile(MINISTRIES_FILE, defaultMinistries);
}

export async function saveMinistries(ministries: any[]) {
  return writeDataFile(MINISTRIES_FILE, ministries);
}

// Events operations
export async function getEvents() {
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
  return readDataFile(EVENTS_FILE, defaultEvents);
}

export async function saveEvents(events: any[]) {
  return writeDataFile(EVENTS_FILE, events);
}

// Sermons operations
export async function getSermons() {
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
  return readDataFile(SERMONS_FILE, defaultSermons);
}

export async function saveSermons(sermons: any[]) {
  return writeDataFile(SERMONS_FILE, sermons);
}

// YouTube links operations
export async function getYouTubeLinks() {
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
  return readDataFile(YOUTUBE_LINKS_FILE, defaultLinks);
}

export async function saveYouTubeLinks(links: any[]) {
  return writeDataFile(YOUTUBE_LINKS_FILE, links);
}

// Hero slides operations
export async function getHeroSlides() {
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
  return readDataFile(path.join(process.cwd(), 'data', 'hero-slides.json'), defaultSlides);
}

export async function saveHeroSlides(slides: any[]) {
  return writeDataFile(path.join(process.cwd(), 'data', 'hero-slides.json'), slides);
}

// Homepage settings operations
export async function getHomepageSettings() {
  const defaultSettings = {
    welcomeMessage: 'Welcome to Christ Revolution Ministries',
    featuredMinistry: 1,
    showUpcomingEvents: true,
    maxEventsToShow: 3
  };
  return readDataFile(path.join(process.cwd(), 'data', 'homepage-settings.json'), defaultSettings);
}

export async function saveHomepageSettings(settings: any) {
  return writeDataFile(path.join(process.cwd(), 'data', 'homepage-settings.json'), settings);
}

// Site settings operations
export async function getSiteSettings() {
  const defaultSettings = {
    siteName: 'Christ Revolution Ministries',
    tagline: 'Transforming Lives Through God\'s Love',
    contactEmail: 'info@christrevolutionministries.org',
    phone: '+1-234-567-8900',
    address: '123 Faith Street, Hope City, HC 12345'
  };
  return readDataFile(path.join(process.cwd(), 'data', 'site-settings.json'), defaultSettings);
}

export async function saveSiteSettings(settings: any) {
  return writeDataFile(path.join(process.cwd(), 'data', 'site-settings.json'), settings);
}