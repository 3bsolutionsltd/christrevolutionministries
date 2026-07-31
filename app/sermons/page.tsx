"use client";
import { useState, useEffect } from 'react';
import { getSermons } from '../lib/data-fetchers';
import { addCacheVersion } from '../lib/cache-utils';
import NavigationBar from '../components/NavigationBar';

interface Sermon {
  id: number;
  title: string;
  speaker?: string;
  date: string;
  series?: string;
  duration?: string;
  description?: string;
  thumbnail?: string;
  videoUrl?: string;
  youtubeUrl?: string; // API uses this instead of videoUrl
  audioUrl?: string;
  scripture?: string;
  category?: string;
  featured?: boolean;
  views?: number;
  downloads?: number;
  tags?: string[];
}

export default function SermonsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const sermonsPerPage = 6;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await getSermons();
        setSermons(data);
      } catch (error) {
        console.error('Error fetching sermons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <NavigationBar currentPage="sermons" />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600">Loading sermons...</p>
          </div>
        </div>
      </div>
    );
  }

  const defaultSermons: Sermon[] = [
    {
      id: 1,
      title: 'Walking in God\'s Purpose',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-08-10',
      series: 'Destined for Greatness',
      duration: '45:32',
      description: 'Discover your divine calling and learn how to align your life with God\'s perfect plan. Pastor Samuel shares powerful insights on finding and fulfilling your purpose in Christ.',
      thumbnail: '/faith-1024x533.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: 'Jeremiah 29:11',
      category: 'Purpose',
      featured: true,
      views: 1247,
      downloads: 423,
      tags: ['Purpose', 'Calling', 'Direction', 'God\'s Plan']
    },
    {
      id: 2,
      title: 'The Power of Faith',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-08-03',
      series: 'Living by Faith',
      duration: '52:18',
      description: 'Explore how genuine faith can move mountains and transform impossible situations. Learn practical steps to strengthen your faith walk.',
      thumbnail: '/deep-1536x800.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: 'Hebrews 11:1',
      category: 'Faith',
      featured: true,
      views: 2156,
      downloads: 687,
      tags: ['Faith', 'Miracles', 'Trust', 'Breakthrough']
    },
    {
      id: 3,
      title: 'Love in Action',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-07-27',
      series: 'Christ\'s Love',
      duration: '38:45',
      description: 'Understanding how Christ\'s love transforms us and how we can demonstrate that love to others in practical ways.',
      thumbnail: '/hope-370x230.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: '1 John 4:19',
      category: 'Love',
      featured: false,
      views: 1823,
      downloads: 512,
      tags: ['Love', 'Service', 'Community', 'Transformation']
    },
    {
      id: 4,
      title: 'Overcoming Life\'s Challenges',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-07-20',
      series: 'Victory in Christ',
      duration: '47:22',
      description: 'Biblical strategies for conquering obstacles and emerging victorious through Christ\'s strength and wisdom.',
      thumbnail: '/worship_deep-552x262.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: 'Romans 8:37',
      category: 'Victory',
      featured: false,
      views: 1654,
      downloads: 445,
      tags: ['Victory', 'Challenges', 'Strength', 'Perseverance']
    },
    {
      id: 5,
      title: 'The Heart of Worship',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-07-13',
      series: 'True Worship',
      duration: '41:16',
      description: 'Discover what it means to worship God in spirit and truth, and how worship transforms our relationship with Him.',
      thumbnail: '/evangelism-web-330x290.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: 'John 4:24',
      category: 'Worship',
      featured: false,
      views: 1435,
      downloads: 378,
      tags: ['Worship', 'Spirit', 'Truth', 'Relationship']
    },
    {
      id: 6,
      title: 'Building Strong Families',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-07-06',
      series: 'Family Foundations',
      duration: '44:58',
      description: 'Biblical principles for creating godly families that honor Christ and impact their communities positively.',
      thumbnail: '/youth-web-330x201.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: 'Joshua 24:15',
      category: 'Family',
      featured: false,
      views: 1876,
      downloads: 623,
      tags: ['Family', 'Marriage', 'Parenting', 'Foundation']
    },
    {
      id: 7,
      title: 'The Great Commission',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-06-29',
      series: 'Called to Share',
      duration: '49:33',
      description: 'Understanding our calling to share the Gospel and practical ways to be effective witnesses in our communities.',
      thumbnail: '/faith-1024x533.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: 'Matthew 28:19-20',
      category: 'Evangelism',
      featured: false,
      views: 1298,
      downloads: 356,
      tags: ['Evangelism', 'Mission', 'Witness', 'Commission']
    },
    {
      id: 8,
      title: 'Prayer That Changes Things',
      speaker: 'Pastor Samuel Isiko',
      date: '2025-06-22',
      series: 'Power of Prayer',
      duration: '43:27',
      description: 'Learn the secrets of effective prayer and how to develop a prayer life that brings breakthrough and transformation.',
      thumbnail: '/deep-1536x800.jpg',
      videoUrl: '#',
      audioUrl: '#',
      scripture: 'James 5:16',
      category: 'Prayer',
      featured: false,
      views: 2034,
      downloads: 578,
      tags: ['Prayer', 'Breakthrough', 'Communication', 'Power']
    }
  ];

  const currentSermons = sermons.length > 0 ? sermons : defaultSermons;

  const categories = [
    { value: 'all', label: 'All Sermons', count: currentSermons.length },
    { value: 'Purpose', label: 'Purpose & Calling', count: currentSermons.filter(s => s.category === 'Purpose').length },
    { value: 'Faith', label: 'Faith & Trust', count: currentSermons.filter(s => s.category === 'Faith').length },
    { value: 'Love', label: 'Love & Service', count: currentSermons.filter(s => s.category === 'Love').length },
    { value: 'Victory', label: 'Victory & Strength', count: currentSermons.filter(s => s.category === 'Victory').length },
    { value: 'Worship', label: 'Worship & Praise', count: currentSermons.filter(s => s.category === 'Worship').length },
    { value: 'Family', label: 'Family & Marriage', count: currentSermons.filter(s => s.category === 'Family').length },
    { value: 'Evangelism', label: 'Evangelism & Mission', count: currentSermons.filter(s => s.category === 'Evangelism').length },
    { value: 'Prayer', label: 'Prayer & Communion', count: currentSermons.filter(s => s.category === 'Prayer').length }
  ];

  const filteredSermons = currentSermons.filter(sermon => {
    const matchesFilter = currentFilter === 'all' || sermon.category === currentFilter;
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sermon.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sermon.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage);
  const paginatedSermons = filteredSermons.slice(
    (currentPage - 1) * sermonsPerPage,
    currentPage * sermonsPerPage
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return 'N/A';
    const parts = duration.split(':');
    if (parts.length !== 2) return duration; // Return as-is if not in expected format
    const [minutes, seconds] = parts;
    return `${minutes}m ${seconds}s`;
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (youtubeUrl?: string) => {
    if (!youtubeUrl) return '/faith-1024x533.jpg'; // fallback image
    const videoId = getYouTubeVideoId(youtubeUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/faith-1024x533.jpg';
  };

  const getSermonThumbnail = (sermon: Sermon) => {
    // Use provided thumbnail first, then YouTube thumbnail, then fallback
    return sermon.thumbnail || getYouTubeThumbnail(sermon.youtubeUrl) || '/faith-1024x533.jpg';
  };

  const handleWatchVideo = (sermon: Sermon) => {
    const videoUrl = sermon.youtubeUrl || sermon.videoUrl;
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    } else {
      alert('Video not available for this sermon.');
    }
  };

  const handleDownloadAudio = (sermon: Sermon) => {
    if (sermon.audioUrl) {
      window.open(sermon.audioUrl, '_blank');
    } else {
      alert('Audio download not available for this sermon.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar currentPage="sermons" />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-20">






        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-black mb-4">Sermons Archive</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Discover life-transforming messages from Pastor Samuel Isiko
            </p>
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{currentSermons.length}</div>
                <div className="text-sm opacity-90">Total Sermons</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{currentSermons.reduce((acc, s) => acc + (s.views || 0), 0)}</div>
                <div className="text-sm opacity-90">Total Views</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{currentSermons.reduce((acc, s) => acc + (s.downloads || 0), 0)}</div>
                <div className="text-sm opacity-90">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              Showing {paginatedSermons.length} of {filteredSermons.length} sermons
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setCurrentFilter(category.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  currentFilter === category.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                <span>{category.label}</span>
                <span className="bg-black/20 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Sermons */}
        {currentFilter === 'all' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Messages</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {currentSermons.filter(sermon => sermon.featured === true).map((sermon) => (
                <div 
                  key={sermon.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSermon(sermon)}
                >
                  <div className="relative">
                    <img 
                      src={addCacheVersion(getSermonThumbnail(sermon))} 
                      alt={sermon.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                      {formatDuration(sermon.duration)}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {sermon.category || 'General'}
                      </span>
                      <span className="text-gray-500 text-sm">{formatDate(sermon.date)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {sermon.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {sermon.description || 'No description available.'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{sermon.speaker || 'Speaker not specified'}</p>
                        <p className="text-blue-600 text-sm">{sermon.series || 'General'}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{sermon.views || 0} views</p>
                        <p>{sermon.downloads || 0} downloads</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Sermons Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {currentFilter === 'all' ? 'All Sermons' : `${categories.find(c => c.value === currentFilter)?.label} Sermons`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedSermons.map((sermon) => (
              <div 
                key={sermon.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedSermon(sermon)}
              >
                <div className="relative">
                  <img 
                    src={addCacheVersion(getSermonThumbnail(sermon))} 
                    alt={sermon.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {sermon.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {formatDuration(sermon.duration)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {sermon.category || 'General'}
                    </span>
                    <span className="text-gray-500 text-xs">{formatDate(sermon.date)}</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {sermon.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {sermon.description || 'No description available.'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">{sermon.series || 'General'}</span>
                    <span className="text-gray-500">{sermon.views || 0} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to receive notifications when new sermons are available.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300">
              Subscribe to Updates
            </button>
            <a 
              href="/contact" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Request Prayer
            </a>
          </div>
        </div>
      </div>

      {/* Sermon Detail Modal */}
      {selectedSermon && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={addCacheVersion(getSermonThumbnail(selectedSermon))} 
                alt={selectedSermon.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedSermon(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                {formatDuration(selectedSermon.duration)}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {selectedSermon.category}
                </span>
                <span className="text-gray-500">{formatDate(selectedSermon.date)}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedSermon.title}</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sermon Details</h3>
                  <div className="space-y-3">
                    {selectedSermon.speaker && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <div>
                          <p className="font-medium">Speaker</p>
                          <p className="text-gray-600">{selectedSermon.speaker}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedSermon.series && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 5L8 11L18 1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div>
                          <p className="font-medium">Series</p>
                          <p className="text-gray-600">{selectedSermon.series}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedSermon.scripture && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">Scripture</p>
                          <p className="text-gray-600">{selectedSermon.scripture}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedSermon.duration && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-gray-600">{formatDuration(selectedSermon.duration)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Engagement</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Views</span>
                      <span className="font-bold text-blue-600">{(selectedSermon.views || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Downloads</span>
                      <span className="font-bold text-green-600">{(selectedSermon.downloads || 0).toLocaleString()}</span>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {(selectedSermon.tags || []).length > 0 ? (
                          selectedSermon.tags!.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 italic">No tags available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Message</h3>
                <p className="text-gray-700 leading-relaxed">{selectedSermon.description || 'No description available.'}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => handleWatchVideo(selectedSermon)}
                  className="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Watch Video</span>
                </button>
                <button 
                  onClick={() => handleDownloadAudio(selectedSermon)}
                  className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Download Audio</span>
                </button>
                <button className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
