import { client } from '../lib/sanity'

// Existing ministry data
const ministries = [
  {
    _type: 'ministry',
    title: 'Youth Ministry',
    description: 'Our Youth Ministry is a dynamic community where teenagers discover their identity in Christ, build lasting friendships, and develop leadership skills that will impact their generation and beyond.',
    leader: 'Youth Pastor',
    meetingTime: 'Sundays at 2:00 PM',
    location: 'Youth Hall',
    contact: {
      email: 'youth@christrevolutionministries.org',
      phone: '+256 700 000 000'
    },
    isActive: true,
    order: 1
  },
  {
    _type: 'ministry',
    title: 'Evangelism',
    description: 'Our Evangelism Ministry is passionate about reaching the lost and equipping believers to share the Good News of Jesus Christ with boldness, love, and authenticity.',
    leader: 'Evangelism Coordinator',
    meetingTime: 'Saturdays at 3:00 PM',
    location: 'Main Sanctuary',
    contact: {
      email: 'evangelism@christrevolutionministries.org',
      phone: '+256 700 000 001'
    },
    isActive: true,
    order: 2
  },
  {
    _type: 'ministry',
    title: 'Worship & Music',
    description: 'Our Worship & Music Ministry creates an atmosphere where hearts connect with God through powerful worship, inspiring music, and authentic praise that transforms lives.',
    leader: 'Worship Leader',
    meetingTime: 'Wednesdays at 6:00 PM',
    location: 'Worship Hall',
    contact: {
      email: 'worship@christrevolutionministries.org',
      phone: '+256 700 000 002'
    },
    isActive: true,
    order: 3
  },
  {
    _type: 'ministry',
    title: "Children's Ministry",
    description: "Our Children's Ministry is dedicated to creating a safe, fun, and engaging environment where children can discover God's love and grow in their faith journey. We believe that children are not just the church of tomorrow, but an important part of God's family today.",
    leader: "Children's Pastor",
    meetingTime: 'Sundays at 9:00 AM',
    location: "Children's Hall",
    contact: {
      email: 'children@christrevolutionministries.org',
      phone: '+256 700 000 003'
    },
    isActive: true,
    order: 4
  }
]

// Existing sermon data
const sermons = [
  {
    _type: 'sermon',
    title: 'Who Is Jesus?',
    preacher: 'Pastor Samuel Isiko',
    date: '2025-09-14',
    series: 'CRM Anniversary',
    videoUrl: 'https://www.youtube.com/watch?v=vRhPy_JrBtw',
    description: '3rd CRM anniversary preaching',
    featured: true,
    tags: ['identity', 'Jesus', 'anniversary']
  },
  {
    _type: 'sermon',
    title: 'ALL THINGS ARE YOURS',
    preacher: 'Pastor Samuel Isiko',
    date: '2025-11-02',
    series: 'Faith Series',
    videoUrl: 'https://www.youtube.com/watch?v=OSXuViRl8Ag',
    description: 'ALL THINGS ARE YOURS With Pastor Samuel Isiko at CHRIST REVOLUTION MINISTRIES',
    featured: false,
    tags: ['faith', 'blessing', 'inheritance']
  },
  {
    _type: 'sermon',
    title: 'The Kingdom of God',
    preacher: 'Pastor Samuel Isiko',
    date: '2025-11-09',
    series: 'The Kingdom of God',
    videoUrl: 'https://www.youtube.com/watch?v=HM0w_YeOc04',
    description: 'Have you ever wondered the dynamics of the Kingdom of God, how the spiritual dominion is set up and what goes on in the spiritual dominion? Pastor Sam, unveils the mysteries hidden in the dynamics in the spiritual domains.',
    scripture: 'Daniel 10:12-13',
    featured: true,
    tags: ['kingdom', 'spiritual warfare', 'dominion']
  }
]

// Existing events data
const events = [
  {
    _type: 'event',
    title: 'CRM 3rd Anniversary',
    description: 'Come join us as we celebrate 3 years of God\'s faithfulness.',
    startDate: '2025-09-14T07:00:00.000Z',
    location: {
      venue: 'Main Sanctuary',
      address: 'Bulaga, Nakabugo Zion Estate - Doctor\'s Drive',
      isOnline: false
    },
    category: 'special',
    organizer: {
      name: 'Anniversary Committee',
      contact: 'events@christrevolutionministries.org'
    },
    registrationRequired: false,
    cost: {
      isFree: true
    },
    featured: true,
    isRecurring: false
  },
  {
    _type: 'event',
    title: 'Christmas Extravaganza 2025',
    description: 'A magical Christmas celebration for the whole family! Join us for an evening of music, drama, gifts, and the joy of celebrating Christ\'s birth together.',
    startDate: '2025-12-13T09:00:00.000Z',
    location: {
      venue: 'Main Sanctuary',
      address: 'Bulaga, Nakabugo Zion Estate - Doctor\'s Drive',
      isOnline: false
    },
    category: 'special',
    organizer: {
      name: 'Events Team',
      contact: 'events@christrevolutionministries.org'
    },
    registrationRequired: false,
    cost: {
      isFree: true
    },
    featured: true,
    isRecurring: false
  },
  {
    _type: 'event',
    title: 'Love Campaign 2025',
    description: 'Our annual Love Campaign to bless 50+ families in our community with special Christmas gifts and the love of Christ. Join us in spreading hope and joy!',
    startDate: '2025-12-21T10:00:00.000Z',
    location: {
      venue: 'Community Outreach',
      address: 'Bulaga Area',
      isOnline: false
    },
    category: 'outreach',
    organizer: {
      name: 'Outreach Ministry',
      contact: 'outreach@christrevolutionministries.org'
    },
    registrationRequired: true,
    registrationUrl: '/contact',
    cost: {
      isFree: true
    },
    featured: true,
    isRecurring: false
  }
]

async function importData() {
  try {
    console.log('Starting data import...')
    
    // Import ministries
    console.log('Importing ministries...')
    for (const ministry of ministries) {
      const result = await client.create(ministry)
      console.log(`Created ministry: ${result.title}`)
    }
    
    // Import sermons
    console.log('Importing sermons...')
    for (const sermon of sermons) {
      const result = await client.create(sermon)
      console.log(`Created sermon: ${result.title}`)
    }
    
    // Import events
    console.log('Importing events...')
    for (const event of events) {
      const result = await client.create(event)
      console.log(`Created event: ${result.title}`)
    }
    
    console.log('Data import completed successfully!')
    
  } catch (error) {
    console.error('Import failed:', error)
  }
}

// Run the import
importData()