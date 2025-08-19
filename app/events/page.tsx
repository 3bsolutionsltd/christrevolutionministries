"use client";
import { useState, useEffect } from 'react';

export default function EventsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'calendar'
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const events = [
    {
      id: 1,
      title: 'Annual Anniversary 2025',
      date: '2025-09-15',
      time: '9:00 AM',
      endTime: '6:00 PM',
      location: 'Bulaga, Nakabugo Zion Estate - Doctor\'s Drive',
      category: 'Anniversary',
      description: 'Join us for our Annual Anniversary celebration as we reflect on God\'s faithfulness and look forward to His continued blessings. A day filled with worship, testimonies, and fellowship.',
      image: '/faith-1024x533.jpg',
      featured: true,
      capacity: 500,
      registered: 287,
      price: 'Free',
      speakers: ['Pastor Samuel Isiko'],
      agenda: [
        { time: '9:00 AM', activity: 'Registration & Welcome' },
        { time: '10:00 AM', activity: 'Opening Worship' },
        { time: '11:00 AM', activity: 'Testimonies & Reflection' },
        { time: '12:30 PM', activity: 'Fellowship Lunch' },
        { time: '2:00 PM', activity: 'Anniversary Message' },
        { time: '3:30 PM', activity: 'Vision for the Future' },
        { time: '5:00 PM', activity: 'Closing Prayer & Blessing' }
      ]
    },
    {
      id: 2,
      title: 'Christmas Extravaganza 2025',
      date: '2025-12-16',
      time: '4:00 PM',
      endTime: '9:00 PM',
      location: 'Bulaga, Nakabugo Zion Estate - Doctor\'s Drive',
      category: 'Holiday',
      description: 'A magical Christmas celebration for the whole family! Join us for an evening of music, drama, gifts, and the joy of celebrating Christ\'s birth together.',
      image: '/hope-370x230.jpg',
      featured: true,
      capacity: 300,
      registered: 156,
      price: 'Free',
      speakers: ['Pastor Samuel Isiko', 'Youth Ministry Team'],
      agenda: [
        { time: '4:00 PM', activity: 'Christmas Carol Welcome' },
        { time: '4:30 PM', activity: 'Children\'s Christmas Play' },
        { time: '5:30 PM', activity: 'Christmas Feast' },
        { time: '6:30 PM', activity: 'Gift Distribution' },
        { time: '7:30 PM', activity: 'Christmas Message' },
        { time: '8:30 PM', activity: 'Community Carol Singing' }
      ]
    },
    {
      id: 3,
      title: 'Love Campaign 2025',
      date: '2025-12-24',
      time: '10:00 AM',
      endTime: '4:00 PM',
      location: 'Community Outreach - Bulaga Area',
      category: 'Outreach',
      description: 'Our annual Love Campaign to bless 50+ families in our community with special Christmas gifts and the love of Christ. Join us in spreading hope and joy!',
      image: '/evangelism-web-330x290.jpg',
      featured: true,
      capacity: 100,
      registered: 67,
      price: 'Volunteer',
      speakers: ['Pastor Samuel Isiko', 'Outreach Team'],
      agenda: [
        { time: '10:00 AM', activity: 'Volunteer Briefing' },
        { time: '10:30 AM', activity: 'Prayer & Blessing' },
        { time: '11:00 AM', activity: 'Community Visits Begin' },
        { time: '1:00 PM', activity: 'Lunch Break' },
        { time: '2:00 PM', activity: 'Continue Distribution' },
        { time: '3:30 PM', activity: 'Closing & Testimonies' }
      ]
    },
    {
      id: 4,
      title: 'Youth Worship Night',
      date: '2025-08-30',
      time: '7:00 PM',
      endTime: '9:30 PM',
      location: 'Main Sanctuary',
      category: 'Youth',
      description: 'An powerful evening of worship designed specifically for our young people. Experience God in a fresh way through contemporary music and relevant teaching.',
      image: '/youth-web-330x201.jpg',
      featured: false,
      capacity: 150,
      registered: 89,
      price: 'Free',
      speakers: ['Youth Pastor', 'Worship Team'],
      agenda: [
        { time: '7:00 PM', activity: 'Welcome & Icebreakers' },
        { time: '7:30 PM', activity: 'Contemporary Worship' },
        { time: '8:15 PM', activity: 'Youth Message' },
        { time: '8:45 PM', activity: 'Prayer & Ministry Time' },
        { time: '9:15 PM', activity: 'Fellowship & Snacks' }
      ]
    },
    {
      id: 5,
      title: 'Family Fun Day',
      date: '2025-09-07',
      time: '10:00 AM',
      endTime: '4:00 PM',
      location: 'Church Grounds',
      category: 'Family',
      description: 'A day of fun activities for the whole family! Games, food, fellowship, and building stronger family bonds in Christ.',
      image: '/worship_deep-552x262.jpg',
      featured: false,
      capacity: 200,
      registered: 134,
      price: 'UGX 10,000 per family',
      speakers: ['Family Ministry Team'],
      agenda: [
        { time: '10:00 AM', activity: 'Registration & Welcome' },
        { time: '10:30 AM', activity: 'Family Games Begin' },
        { time: '12:00 PM', activity: 'Family Lunch' },
        { time: '1:30 PM', activity: 'Children\'s Activities' },
        { time: '2:30 PM', activity: 'Parent Workshop' },
        { time: '3:30 PM', activity: 'Closing Circle' }
      ]
    },
    {
      id: 6,
      title: 'Prayer & Fasting Week',
      date: '2025-09-21',
      time: '6:00 AM',
      endTime: '7:00 PM',
      location: 'Multiple Locations',
      category: 'Prayer',
      description: 'Join us for a week of intensive prayer and fasting as we seek God\'s face for breakthrough and revival in our community and nation.',
      image: '/deep-1536x800.jpg',
      featured: false,
      capacity: 'Unlimited',
      registered: 178,
      price: 'Free',
      speakers: ['Pastor Samuel Isiko', 'Prayer Team Leaders'],
      agenda: [
        { time: '6:00 AM', activity: 'Morning Prayer (Mon-Fri)' },
        { time: '12:00 PM', activity: 'Midday Prayer (Daily)' },
        { time: '6:00 PM', activity: 'Evening Prayer (Daily)' },
        { time: 'Saturday', activity: 'All-Day Prayer & Worship' },
        { time: 'Sunday', activity: 'Breaking Fast Celebration' }
      ]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Events', icon: '📅' },
    { value: 'Anniversary', label: 'Anniversary', icon: '🎉' },
    { value: 'Holiday', label: 'Holiday', icon: '🎄' },
    { value: 'Outreach', label: 'Outreach', icon: '❤️' },
    { value: 'Youth', label: 'Youth', icon: '👥' },
    { value: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'Prayer', label: 'Prayer', icon: '🙏' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const timeDiff = eventDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return { status: 'Past', color: 'gray' };
    if (daysDiff === 0) return { status: 'Today', color: 'red' };
    if (daysDiff <= 7) return { status: 'This Week', color: 'orange' };
    if (daysDiff <= 30) return { status: 'This Month', color: 'blue' };
    return { status: 'Upcoming', color: 'green' };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white/90 backdrop-blur-md shadow-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo-100X100.png" alt="CRM Logo" className="w-12 h-12 rounded-full shadow-lg" />
            <div>
              <h1 className="font-bold text-lg text-blue-900">
                Christ Revolution Ministries
              </h1>
              <p className="text-xs text-blue-600">
                Blessed to be a blessing
              </p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a 
                href="/" 
                className="font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/ministries" 
                className="font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
              >
                Ministries
              </a>
            </li>
            <li>
              <a 
                href="/sermons" 
                className="font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
              >
                Sermons
              </a>
            </li>
            <li>
              <a 
                href="/give" 
                className="font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
              >
                Give
              </a>
            </li>
            <li>
              <a 
                href="/events" 
                className="font-medium transition-all duration-300 hover:scale-105 text-blue-600 border-b-2 border-blue-600"
              >
                Events
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 bg-blue-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block h-0.5 bg-blue-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-blue-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
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
              href="/give"
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Give
            </a>
            <a 
              href="/events"
              className="block text-blue-600 font-bold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
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

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 pt-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-black mb-4">Our Events</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Join us for life-changing events, worship experiences, and community fellowship
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter and View Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setCurrentView('grid')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                currentView === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                currentView === 'calendar'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        {/* Featured Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {filteredEvents.filter(event => event.featured).map((event) => {
              const eventStatus = getEventStatus(event.date);
              return (
                <div 
                  key={event.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-${eventStatus.color}-600`}>
                        {eventStatus.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      <span className="text-green-600 font-medium">{event.price}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{formatDate(event.date)} at {event.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      
                      {typeof event.capacity === 'number' && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                          <span>{event.registered}/{event.capacity} registered</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        View Details & Register
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Events Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const eventStatus = getEventStatus(event.date);
              return (
                <div 
                  key={event.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-${eventStatus.color}-600`}>
                        {eventStatus.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {event.category}
                      </span>
                      <span className="text-sm font-medium text-green-600">{event.price}</span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                    
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>{formatDate(event.date)}</div>
                      <div>{event.time} - {event.endTime}</div>
                      <div className="text-xs">{event.location}</div>
                    </div>
                    
                    <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-xl mb-8 opacity-90">
            Stay connected with all our upcoming events and be part of our growing community.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Get Event Updates
            </a>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
              Plan Your Visit
            </button>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {selectedEvent.category}
                </span>
                <span className="text-2xl font-bold text-green-600">{selectedEvent.price}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">{formatDate(selectedEvent.date)}</p>
                        <p className="text-gray-600">{selectedEvent.time} - {selectedEvent.endTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700">{selectedEvent.location}</p>
                    </div>
                    
                    {typeof selectedEvent.capacity === 'number' && (
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <div>
                          <p className="font-medium">{selectedEvent.registered}/{selectedEvent.capacity} Registered</p>
                          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      <div>
                        <p className="font-medium">Speakers</p>
                        <p className="text-gray-600">{selectedEvent.speakers.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Event Agenda</h3>
                  <div className="space-y-3">
                    {selectedEvent.agenda.map((item, index) => (
                      <div key={index} className="flex space-x-3">
                        <div className="flex-shrink-0 w-16 text-sm font-medium text-blue-600">
                          {item.time}
                        </div>
                        <div className="text-gray-700">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Event</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Register for Event
                </button>
                <button className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300">
                  Add to Calendar
                </button>
                <button className="px-8 py-4 bg-green-100 text-green-700 font-bold rounded-lg hover:bg-green-200 transition-colors duration-300">
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
