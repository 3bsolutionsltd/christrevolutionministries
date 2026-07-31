import fs from 'fs/promises';
import path from 'path';

const HERO_SLIDES_FILE = path.join(process.cwd(), 'data', 'hero-slides.json');
const HOMEPAGE_SETTINGS_FILE = path.join(process.cwd(), 'data', 'homepage-settings.json');
const SITE_SETTINGS_FILE = path.join(process.cwd(), 'data', 'site-settings.json');

// Hero slides operations
export async function getHeroSlides() {
  const defaultSlides = [
    {
      id: 1,
      title: 'Welcome to Christ Revolution Ministries',
      subtitle: 'Taking this generation back to God',
      image: '/home_page_one-1024x585.jpg',
      order: 1,
      active: true,
      ctaText: 'Join Our Services',
      ctaLink: '#events'
    }
  ];
  return readDataFile(HERO_SLIDES_FILE, defaultSlides);
}

export async function saveHeroSlides(slides: any[]) {
  return writeDataFile(HERO_SLIDES_FILE, slides);
}

// Homepage settings operations
export async function getHomepageSettings() {
  const defaultSettings = {
    pastorImage: '/director_founder_sam_isiko-390x324.jpg',
    pastorName: 'Pastor Samuel Isiko',
    pastorTitle: 'Senior Pastor & Founder',
    churchName: 'Christ Revolution Ministries',
    tagline: 'Blessed to be a blessing',
    mission: 'To multiply disciples through evangelism, discipleship, and prayer, bringing revival to individuals and families.',
    vision: 'To take this generation back to God and make His voice heard in the nations.',
    aboutText: 'Christ Revolution Ministry is a dynamic, life-transforming ministry with a vision of bringing God\'s Word and love to our community and beyond.',
    heroQuote: '"Blessed to be a blessing"',
    mainHeadline: {
      line1: 'CHRIST',
      line2: 'REVOLUTION', 
      line3: 'Ministries'
    },
    heroSubtitle: 'Taking this generation back to God and making His voice heard in the nations'
  };
  return readDataFile(HOMEPAGE_SETTINGS_FILE, defaultSettings);
}

export async function saveHomepageSettings(settings: any) {
  return writeDataFile(HOMEPAGE_SETTINGS_FILE, settings);
}

// Site settings operations  
export async function getSiteSettings() {
  const defaultSettings = {
    contactInfo: {
      address: 'Bulaga, Nakabugo Zion Estate, Doctor\'s Drive, Kampala, Uganda',
      phone: '+256-772-245292',
      email: 'info@christrevolutionministries.org'
    },
    socialLinks: {
      facebook: '#',
      twitter: '#', 
      youtube: '#',
      instagram: '#'
    },
    footerText: '© 2025 Christ Revolution Ministries. All rights reserved.',
    seoSettings: {
      siteName: 'Christ Revolution Ministries',
      siteDescription: 'Taking this generation back to God and making His voice heard in the nations',
      keywords: 'church, ministry, Uganda, Christian, faith, worship, sermons'
    }
  };
  return readDataFile(SITE_SETTINGS_FILE, defaultSettings);
}

export async function saveSiteSettings(settings: any) {
  return writeDataFile(SITE_SETTINGS_FILE, settings);
}

// Generic file operations (reuse from existing data-manager)
async function ensureDataDir() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
  }
}

async function readDataFile(filePath: string, defaultData: any = []) {
  try {
    await ensureDataDir();
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultData;
  }
}

async function writeDataFile(filePath: string, data: any) {
  try {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
}