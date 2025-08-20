"use client";
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';

interface Ministry {
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  icon: string;
  activities: string[];
  schedule: string;
  age: string;
  leader: string;
  contact: string;
}

const ministries: Ministry[] = [
  {
    title: 'Youth Ministry',
    description: 'Empowering the next generation through discipleship, evangelism, and transformative experiences.',
    fullDescription: 'Our Youth Ministry is dedicated to nurturing young hearts and minds, providing them with the foundation they need to develop a lasting relationship with Christ. Through dynamic worship, engaging Bible studies, and community outreach, we create an environment where young people can grow spiritually, emotionally, and socially.',
    image: '/youth-web-330x201.jpg',
    icon: '👥',
    activities: ['Weekly Youth Services', 'Bible Study Groups', 'Youth Camps', 'Community Outreach', 'Mentorship Programs'],
    schedule: 'Saturdays 4:00 PM - 6:00 PM',
    age: '13-25 years',
    leader: 'Pastor John Mwesigwa',
    contact: '+256-772-123456'
  },
  {
    title: 'Evangelism Ministry',
    description: 'Spreading the Gospel and reaching communities with the love and message of Christ.',
    fullDescription: 'Our Evangelism Ministry is at the heart of our mission to take this generation back to God. We actively engage in street evangelism, door-to-door witnessing, crusades, and community outreach programs to share the Gospel with those who need to hear the good news of Jesus Christ.',
    image: '/evangelism-web-330x290.jpg',
    icon: '📖',
    activities: ['Street Evangelism', 'Door-to-Door Witnessing', 'Community Crusades', 'Prison Ministry', 'Hospital Visits'],
    schedule: 'Sundays 2:00 PM - 5:00 PM',
    age: 'All Ages',
    leader: 'Pastor Mary Nakato',
    contact: '+256-772-234567'
  },
  {
    title: 'Worship & Music Ministry',
    description: 'Deep worship experiences that connect hearts to God through powerful music and praise.',
    fullDescription: 'Our Worship & Music Ministry creates an atmosphere where believers can encounter God through powerful worship and praise. We believe that worship is not just about music, but about creating a space where God\'s presence can be felt and lives can be transformed.',
    image: '/worship_deep-552x262.jpg',
    icon: '🎵',
    activities: ['Worship Team', 'Choir Ministry', 'Instrumental Training', 'Songwriting Workshops', 'Special Events'],
    schedule: 'Wednesdays 6:00 PM - 8:00 PM',
    age: 'All Ages',
    leader: 'Pastor David Ssemwogerere',
    contact: '+256-772-345678'
  },
  {
    title: 'Hope & Restoration Ministry',
    description: 'Bringing hope to the broken-hearted and restoration to those in need of healing.',
    fullDescription: 'Our Hope & Restoration Ministry focuses on ministering to those who are hurting, broken, and in need of God\'s healing touch. We provide counseling, prayer support, and practical assistance to individuals and families facing difficult circumstances.',
    image: '/hope-370x230.jpg',
    icon: '✨',
    activities: ['Counseling Services', 'Prayer Ministry', 'Support Groups', 'Family Restoration', 'Addiction Recovery'],
    schedule: 'Tuesdays 7:00 PM - 9:00 PM',
    age: 'All Ages',
    leader: 'Pastor Grace Namutebi',
    contact: '+256-772-456789'
  },
  {
    title: 'Children\'s Ministry',
    description: 'Building strong foundations in young hearts through age-appropriate biblical teaching and fun activities.',
    fullDescription: 'Our Children\'s Ministry is designed to introduce children to Jesus Christ in a fun, engaging, and age-appropriate way. We believe that children are not just the church of tomorrow, but the church of today, and we invest in their spiritual development through creative teaching methods and activities.',
    image: '/youth-web-330x201.jpg',
    icon: '🧒',
    activities: ['Sunday School', 'Children\'s Church', 'Bible Story Time', 'Craft Activities', 'Children\'s Choir'],
    schedule: 'Sundays 9:00 AM - 11:00 AM',
    age: '3-12 years',
    leader: 'Teacher Sarah Nalubega',
    contact: '+256-772-567890'
  },
  {
    title: 'Women\'s Ministry',
    description: 'Empowering women to discover their purpose and calling in Christ through fellowship and discipleship.',
    fullDescription: 'Our Women\'s Ministry provides a safe space for women to grow in their faith, build meaningful relationships, and discover their God-given purpose. Through Bible studies, prayer meetings, and fellowship activities, we encourage women to become strong disciples of Christ.',
    image: '/hope-370x230.jpg',
    icon: '👩',
    activities: ['Women\'s Bible Study', 'Prayer Meetings', 'Mentorship Programs', 'Community Service', 'Women\'s Conferences'],
    schedule: 'Thursdays 6:00 PM - 8:00 PM',
    age: 'Adult Women',
    leader: 'Pastor Rebecca Namukwaya',
    contact: '+256-772-678901'
  }
];

export default function MinistriesPage() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <NavigationBar currentPage="ministries" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <img 
            src="/worship_deep-552x262.jpg" 
            alt="Ministries" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Our <span className="text-yellow-400">Ministries</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Transforming lives through diverse ministry programs designed to meet you where you are
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <div 
                key={ministry.title}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedMinistry(ministry)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={ministry.image} 
                    alt={ministry.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                    {ministry.icon}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {ministry.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {ministry.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p className="font-medium">{ministry.schedule}</p>
                      <p>{ministry.age}</p>
                    </div>
                    <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors duration-200 flex items-center space-x-2">
                      <span>Learn More</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Get <span className="text-yellow-400">Involved?</span>
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Find your place in God's kingdom through our diverse ministry opportunities. 
            Everyone has a role to play in advancing the Gospel.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href="/contact" 
              className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300"
            >
              Contact Ministry Leaders
            </a>
            <a 
              href="/events" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              View Upcoming Events
            </a>
          </div>
        </div>
      </section>

      {/* Ministry Detail Modal */}
      {selectedMinistry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedMinistry.image} 
                alt={selectedMinistry.title} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <button 
                onClick={() => setSelectedMinistry(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
                    {selectedMinistry.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedMinistry.title}</h2>
                    <p className="text-blue-200">{selectedMinistry.leader}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Ministry</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedMinistry.fullDescription}
                  </p>
                  
                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Schedule & Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-gray-900">When:</span> {selectedMinistry.schedule}</p>
                      <p><span className="font-medium text-gray-900">Age Group:</span> {selectedMinistry.age}</p>
                      <p><span className="font-medium text-gray-900">Leader:</span> {selectedMinistry.leader}</p>
                      <p><span className="font-medium text-gray-900">Contact:</span> {selectedMinistry.contact}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Activities & Programs</h3>
                  <div className="space-y-3">
                    {selectedMinistry.activities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex flex-col gap-4">
                    <a 
                      href="/contact" 
                      className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                    >
                      Join This Ministry
                    </a>
                    <a 
                      href={`tel:${selectedMinistry.contact}`} 
                      className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center"
                    >
                      Call Leader
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo & About */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/logo-100X100.png" alt="CRM Logo" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">Christ Revolution Ministries</h3>
                  <p className="text-blue-300 text-sm">Blessed to be a blessing</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                A dynamic, life-transforming ministry taking this generation back to God and making His voice heard in the nations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Ministries', href: '/ministries' },
                  { name: 'Events', href: '/events' },
                  { name: 'Sermons', href: '/sermons' },
                  { name: 'Contact', href: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start space-x-2">
                  <svg className="w-5 h-5 mt-0.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Bulaga, Nakabugo Zion Estate, Doctor's Drive, Kampala, Uganda</span>
                </p>
                <p className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm">+256-772-245292</span>
                </p>
                <p className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm">info@christrevolutionministries.org</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Christ Revolution Ministries. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
