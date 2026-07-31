"use client";
import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');

  const leadershipTeam = [
    {
      name: 'Pastor Samuel Isiko',
      role: 'Senior Pastor & Founder',
      description: 'Pastor Samuel Isiko is the visionary leader of Christ Revolution Ministries, called to transform lives through the power of Christ\'s love.',
      image: '/logo-100X100.png',
      qualifications: [
        'Bachelor of Theology',
        'Master of Divinity',
        '15+ years in ministry',
        'Community Leader'
      ]
    }
  ];

  const coreBeliefs = [
    {
      title: 'The Bible',
      description: 'We believe the Bible is the inspired, infallible Word of God and our ultimate authority for faith and practice.',
      scripture: '2 Timothy 3:16-17'
    },
    {
      title: 'The Trinity',
      description: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.',
      scripture: 'Matthew 28:19'
    },
    {
      title: 'Salvation',
      description: 'We believe salvation is by grace through faith in Jesus Christ alone, not by works.',
      scripture: 'Ephesians 2:8-9'
    },
    {
      title: 'The Church',
      description: 'We believe the church is the body of Christ, called to worship, fellowship, and evangelism.',
      scripture: '1 Corinthians 12:27'
    }
  ];

  const coreValues = [
    {
      title: 'Love',
      description: 'Demonstrating Christ\'s unconditional love in all we do',
      icon: '❤️',
      scripture: '1 John 4:19'
    },
    {
      title: 'Faith',
      description: 'Walking by faith and trusting in God\'s promises',
      icon: '🙏',
      scripture: 'Hebrews 11:1'
    },
    {
      title: 'Hope',
      description: 'Bringing hope to the hopeless through Christ',
      icon: '✨',
      scripture: 'Romans 15:13'
    },
    {
      title: 'Community',
      description: 'Building strong, supportive Christian community',
      icon: '🤝',
      scripture: 'Acts 2:42'
    },
    {
      title: 'Service',
      description: 'Serving others as Christ served us',
      icon: '🤲',
      scripture: 'Mark 10:43-44'
    },
    {
      title: 'Growth',
      description: 'Encouraging spiritual growth and discipleship',
      icon: '🌱',
      scripture: '2 Peter 3:18'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <NavigationBar currentPage="about" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <img 
            src="/worship_deep-552x262.jpg" 
            alt="About Us" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            About <span className="text-yellow-400">Our Ministry</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Called to transform lives through the revolutionary power of Christ's love
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              {['story', 'beliefs', 'values', 'leadership'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Story Tab */}
          {activeTab === 'story' && (
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
                <p className="mb-6">
                  Christ Revolution Ministries was founded with a divine vision to transform lives 
                  through the revolutionary power of Christ's love. Our journey began with a simple 
                  yet profound calling: to be a blessing to our community and beyond.
                </p>
                <p className="mb-6">
                  Under the leadership of Pastor Samuel Isiko, we have grown from a small gathering 
                  of believers to a thriving ministry that touches lives across Uganda and beyond. 
                  Our mission is rooted in the belief that every person deserves to experience 
                  God's transformative love.
                </p>
                <p>
                  We are committed to building a community where faith, hope, and love flourish, 
                  where broken lives are restored, and where God's kingdom is advanced through 
                  practical ministry and genuine relationships.
                </p>
              </div>
            </div>
          )}

          {/* Beliefs Tab */}
          {activeTab === 'beliefs' && (
            <div>
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Core Beliefs</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {coreBeliefs.map((belief, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">{belief.title}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">{belief.description}</p>
                    <p className="text-blue-600 font-medium italic">"{belief.scripture}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div>
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Core Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {coreValues.map((value, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">{value.title}</h3>
                    <p className="text-gray-700 mb-4">{value.description}</p>
                    <p className="text-blue-600 text-sm italic">"{value.scripture}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leadership Tab */}
          {activeTab === 'leadership' && (
            <div>
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Leadership</h2>
              <div className="max-w-4xl mx-auto">
                {leadershipTeam.map((leader, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-32 h-32 rounded-full object-cover shadow-lg"
                      />
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">{leader.name}</h3>
                        <p className="text-blue-600 font-medium mb-4">{leader.role}</p>
                        <p className="text-gray-700 mb-6 leading-relaxed">{leader.description}</p>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Qualifications:</h4>
                          <ul className="space-y-2">
                            {leader.qualifications.map((qual, qIndex) => (
                              <li key={qIndex} className="flex items-center space-x-2">
                                <span className="text-blue-600">✓</span>
                                <span className="text-gray-700">{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Ministry
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Be part of a community that's transforming lives through Christ's love. 
            Your journey of faith and purpose starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get in Touch
            </a>
            <a 
              href="/ministries" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Explore Ministries
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/logo-100X100.png" alt="CRM Logo" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-bold text-lg">Christ Revolution Ministries</h3>
                  <p className="text-gray-400 text-sm">Blessed to be a blessing</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming lives through the revolutionary power of Christ's love. 
                Join us in our mission to spread hope, faith, and love in our community.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="/ministries" className="text-gray-400 hover:text-white transition-colors">Ministries</a></li>
                <li><a href="/give" className="text-gray-400 hover:text-white transition-colors">Give</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📍 Kampala, Uganda</p>
                <p>📞 +256-772-245292</p>
                <p>✉️ info@crministries.org</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Christ Revolution Ministries. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
