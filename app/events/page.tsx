"use client";
import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import { getEvents } from '../lib/data-fetchers';
import { addCacheVersion } from '../lib/cache-utils';

interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  endTime?: string;
  location?: string;
  category?: string;
  description?: string;
  img?: string;
  featured?: boolean;
  capacity?: number | string;
  registered?: number;
  price?: string;
  speakers?: string[];
  agenda?: { time: string; activity: string; }[];
  youtubeUrl?: string;
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'calendar'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventStatus = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const timeDiff = eventDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return { status: 'Past', color: 'gray' };
    if (daysDiff === 0) return { status: 'Today', color: 'red' };
    if (daysDiff <= 7) return { status: 'This Week', color: 'orange' };
    if (daysDiff <= 30) return { status: 'This Month', color: 'blue' };
    return { status: 'Upcoming', color: 'green' };
  };

  const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      let videoId: string | null = null;
      if (parsed.hostname.includes('youtube.com')) {
        videoId = parsed.searchParams.get('v');
        if (!videoId && parsed.pathname.startsWith('/live/')) {
          videoId = parsed.pathname.split('/live/')[1]?.split('?')[0] || null;
        }
      } else if (parsed.hostname === 'youtu.be') {
        videoId = parsed.pathname.slice(1).split('?')[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavigationBar currentPage="events" />
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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Available</h3>
            <p className="text-gray-600">Check back later for upcoming events and announcements.</p>
          </div>
        ) : (
        <>
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
                      src={event.img ? addCacheVersion(event.img) : '/api/placeholder/400/250'} 
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
                        <span>{formatDate(event.date)}{event.time ? ` at ${event.time}` : ''}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{event.location || 'Location TBD'}</span>
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
                      src={event.img ? addCacheVersion(event.img) : '/api/placeholder/400/250'} 
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-${eventStatus.color}-600`}>
                        {eventStatus.status}
                      </span>
                    </div>
                    {event.youtubeUrl && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-red-600 flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>Watch</span>
                        </span>
                      </div>
                    )}
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
                      <div>{event.time || 'TBD'} - {event.endTime || ''}</div>
                      <div className="text-xs">{event.location || 'Location TBD'}</div>
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
        </>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedEvent.img ? addCacheVersion(selectedEvent.img) : '/api/placeholder/400/250'} 
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
                  {selectedEvent.category || 'Event'}
                </span>
                <span className="text-2xl font-bold text-green-600">{selectedEvent.price || 'Free'}</span>
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
                        <p className="text-gray-600">{selectedEvent.time || 'TBD'} - {selectedEvent.endTime || ''}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700">{selectedEvent.location || 'Location TBD'}</p>
                    </div>
                    
                    {selectedEvent.capacity && selectedEvent.registered && (
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <div>
                          <p className="font-medium">{selectedEvent.registered || 0}/{selectedEvent.capacity} Registered</p>
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
                        <p className="text-gray-600">{selectedEvent.speakers?.join(', ') || 'TBD'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Event Agenda</h3>
                  <div className="space-y-3">
                    {selectedEvent.agenda?.map((item, index) => (
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
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description || 'Event details coming soon...'}</p>
              </div>

              {selectedEvent.youtubeUrl && (() => {
                const embedUrl = getYouTubeEmbedUrl(selectedEvent.youtubeUrl);
                return (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Event Recording</span>
                    </h3>
                    {embedUrl ? (
                      <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={embedUrl}
                          title={`${selectedEvent.title} - YouTube`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <a
                        href={selectedEvent.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span>Watch on YouTube</span>
                      </a>
                    )}
                  </div>
                );
              })()}

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