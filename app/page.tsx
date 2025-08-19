"use client";
import { useState, useEffect } from 'react';

const ministries = [
  { 
    title: 'Youth Ministry', 
    desc: 'Empowering the next generation through discipleship, evangelism, and transformative experiences.',
    img: '/youth-web-330x201.jpg',
    icon: '👥'
  },
  { 
    title: 'Evangelism', 
    desc: 'Spreading the Gospel and reaching communities with the love and message of Christ.',
    img: '/evangelism-web-330x290.jpg',
    icon: '📖'
  },
  { 
    title: 'Worship & Music', 
    desc: 'Deep worship experiences that connect hearts to God through powerful music and praise.',
    img: '/worship_deep-552x262.jpg',
    icon: '🎵'
  },
  { 
    title: 'Hope & Restoration', 
    desc: 'Bringing hope to the broken-hearted and restoration to those in need of healing.',
    img: '/hope-370x230.jpg',
    icon: '✨'
  },
];

const events = [
  { 
    title: 'Faith Conference 2025', 
    date: 'Sept 15-17, 2025', 
    time: '7:00 PM',
    location: 'Main Sanctuary',
    category: 'Conference',
    description: 'A powerful three-day conference focused on building unshakeable faith.',
    img: '/faith-1024x533.jpg'
  },
  { 
    title: 'Youth Outreach', 
    date: 'Sept 5, 2025', 
    time: '6:00 PM',
    location: 'Community Center',
    category: 'Youth',
    description: 'Reaching young hearts with the transformative message of Christ.',
    img: '/youth-web-330x201.jpg'
  },
  { 
    title: 'Deep Worship Night', 
    date: 'Aug 28, 2025', 
    time: '7:30 PM',
    location: 'Main Sanctuary',
    category: 'Worship',
    description: 'An evening of intimate worship and spiritual encounter.',
    img: '/deep-1536x800.jpg'
  },
];

const sermons = [
  { 
    title: 'Faith That Transforms', 
    speaker: 'Pastor Samuel Isiko', 
    date: 'Aug 18, 2025', 
    duration: '45 min',
    views: '2.1K',
    description: 'Discover how faith can completely transform your life and circumstances.',
    img: '/faith-1170x450.jpg'
  },
  { 
    title: 'Going Deeper with God', 
    speaker: 'Pastor Samuel Isiko', 
    date: 'Aug 11, 2025', 
    duration: '52 min',
    views: '1.8K',
    description: 'Learn how to develop a deeper, more intimate relationship with God.',
    img: '/deep-570x345.jpg'
  },
  { 
    title: 'The Power of Transformation', 
    speaker: 'Pastor Samuel Isiko', 
    date: 'Aug 4, 2025', 
    duration: '48 min',
    views: '2.5K',
    description: 'Understanding Gods power to transform lives and communities.',
    img: '/transform-954x520.jpg'
  },
];

export default function Page() {
  const [sermonIdx, setSermonIdx] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img src="/logo-100X100.png" alt="CRM Logo" className="relative w-12 h-12 rounded-full shadow-lg border-2 border-blue-200 group-hover:border-blue-300 transition-all duration-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`font-bold transition-all duration-300 bg-gradient-to-r bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-600 ${
                scrollY > 50 ? 'text-lg from-blue-900 to-purple-800' : 'text-xl from-white to-blue-100'
              }`}>
                Christ Revolution Ministries
              </h1>
              <p className={`text-xs transition-all duration-300 group-hover:text-blue-700 ${
                scrollY > 50 ? 'text-blue-600' : 'text-blue-200'
              }`}>
                Blessed to be a blessing
              </p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a 
                href="/" 
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  scrollY > 50 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  scrollY > 50 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/ministries" 
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  scrollY > 50 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Ministries
              </a>
            </li>
            <li>
              <a 
                href="/sermons" 
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  scrollY > 50 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Sermons
              </a>
            </li>
            <li>
              <a 
                href="/events" 
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  scrollY > 50 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Events
              </a>
            </li>
            <li>
              <a 
                href="/give" 
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  scrollY > 50 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Give
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  scrollY > 50 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white shadow-xl transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-6 py-4 space-y-4">
            <a 
              href="/"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/about"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/ministries"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Ministries
            </a>
            <a 
              href="/sermons"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Sermons
            </a>
            <a 
              href="/events"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </a>
            <a 
              href="/give"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Give
            </a>
            <a 
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Dramatic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ 
            backgroundImage: 'url(/home_page_one-1024x585.jpg)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-purple-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
          <div className="space-y-6">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                CHRIST
              </span>
              <span className="block text-white">
                REVOLUTION
              </span>
              <span className="block text-blue-200 text-2xl md:text-3xl lg:text-4xl font-light mt-2">
                Ministries
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 font-light max-w-4xl mx-auto leading-relaxed">
              Taking this generation back to God and making His voice heard in the nations
            </p>
            
            {/* Animated Quote */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 max-w-2xl mx-auto border border-white/20">
              <p className="text-base md:text-lg lg:text-xl text-yellow-200 italic font-medium">
                "Blessed to be a blessing"
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
              <a 
                href="#events" 
                className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Join Our Services</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="#sermons" 
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Watch Sermons</span>
              </a>
              
              <a 
                href="#give" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span>Give Today</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Pastor Image */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="/director_founder_sam_isiko-390x324.jpg" 
                  alt="Pastor Samuel Isiko" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black p-4 rounded-2xl shadow-xl">
                <div className="text-center">
                  <p className="font-bold text-lg">Pastor</p>
                  <p className="text-sm">Samuel Isiko</p>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  Who We Are
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Christ Revolution Ministry is a dynamic, life-transforming ministry with a vision of bringing God's Word and love to our community and beyond.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-gray-600">To take this generation back to God and make His voice heard in the nations.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-600">To multiply disciples through evangelism, discipleship, and prayer, bringing revival to individuals and families.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Ministries Section */}
      <section id="ministries" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our Ministries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming lives through diverse ministry programs designed to meet you where you are
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministries.map((ministry, index) => (
              <div 
                key={ministry.title} 
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={ministry.img} 
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
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {ministry.desc}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a 
                      href="#" 
                      className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>Learn More</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
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
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Ministries', 'Events', 'Sermons', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-300 hover:text-white transition-colors duration-200">
                      {link}
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
