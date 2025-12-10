"use client";
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import { getMinistries } from '../lib/data-fetchers';
import { addCacheVersion } from '../lib/cache-utils';

interface Ministry {
  id: number;
  title: string;
  desc: string;
  img: string;
  icon: string;
  fullDescription?: string;
  activities?: string[];
  schedule?: string;
  age?: string;
  leader?: string;
  contact?: string;
}

export default function MinistriesPage() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const data = await getMinistries();
        setMinistries(data);
      } catch (error) {
        console.error('Error fetching ministries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <NavigationBar currentPage="ministries" />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600">Loading ministries...</p>
          </div>
        </div>
      </div>
    );
  }

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
                key={ministry.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedMinistry(ministry)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={addCacheVersion(ministry.img)} 
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
                    {ministry.desc}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {ministry.schedule && <p className="font-medium">{ministry.schedule}</p>}
                      {ministry.age && <p>{ministry.age}</p>}
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
                src={addCacheVersion(selectedMinistry.img)} 
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
                    {selectedMinistry.leader && <p className="text-blue-200">{selectedMinistry.leader}</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Ministry</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedMinistry.fullDescription || selectedMinistry.desc}
                  </p>
                  
                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Schedule & Details</h4>
                    <div className="space-y-2 text-sm">
                      {selectedMinistry.schedule && <p><span className="font-medium text-gray-900">When:</span> {selectedMinistry.schedule}</p>}
                      {selectedMinistry.age && <p><span className="font-medium text-gray-900">Age Group:</span> {selectedMinistry.age}</p>}
                      {selectedMinistry.leader && <p><span className="font-medium text-gray-900">Leader:</span> {selectedMinistry.leader}</p>}
                      {selectedMinistry.contact && <p><span className="font-medium text-gray-900">Contact:</span> {selectedMinistry.contact}</p>}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Activities & Programs</h3>
                  <div className="space-y-3">
                    {selectedMinistry.activities && selectedMinistry.activities.length > 0 ? (
                      selectedMinistry.activities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{activity}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">Activities coming soon...</p>
                    )}
                  </div>
                  
                  <div className="mt-8 flex flex-col gap-4">
                    <a 
                      href="/contact" 
                      className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                    >
                      Join This Ministry
                    </a>
                    {selectedMinistry.contact && (
                      <a 
                        href={`tel:${selectedMinistry.contact}`} 
                        className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center"
                      >
                        Call Leader
                      </a>
                    )}
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
