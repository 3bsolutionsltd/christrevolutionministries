"use client";
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    message: ''
  });
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      subject: '',
      message: ''
    });
  };

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'pastoral', label: 'Pastoral Care' },
    { value: 'youth', label: 'Youth Ministry' },
    { value: 'family', label: 'Family Ministry' },
    { value: 'outreach', label: 'Outreach & Missions' },
    { value: 'events', label: 'Events & Programs' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'prayer', label: 'Prayer Request' }
  ];

  const staff = [
    {
      name: 'Pastor Samuel Isiko',
      role: 'Senior Pastor',
      email: 'pastor@christrevolutionministries.org',
      phone: '+256-772-245292',
      image: '/logo-100X100.png',
      specialties: ['Pastoral Care', 'Biblical Counseling', 'Leadership', 'Evangelism']
    },
    {
      name: 'Ministry Team',
      role: 'Administration',
      email: 'info@christrevolutionministries.org',
      phone: '+256-772-245292',
      image: '/hope-370x230.jpg',
      specialties: ['General Inquiries', 'Event Planning', 'Volunteer Coordination']
    }
  ];

  const faqItems = [
    {
      question: 'What are your service times?',
      answer: 'We hold worship services every Sunday at 9:00 AM and 11:30 AM. We also have midweek prayer meetings on Wednesdays at 7:00 PM.'
    },
    {
      question: 'How can I become a member?',
      answer: 'We welcome new members! Please attend our New Members Class held monthly or speak with Pastor Samuel after any service. You can also contact us to schedule a meeting.'
    },
    {
      question: 'Do you have programs for children and youth?',
      answer: 'Yes! We have Sunday School for children during both services, Youth Ministry meetings every Friday at 6:00 PM, and special family events throughout the year.'
    },
    {
      question: 'How can I volunteer?',
      answer: 'There are many ways to serve! From worship team to outreach programs, we have opportunities for everyone. Contact our administration team to learn about current volunteer needs.'
    },
    {
      question: 'Do you offer counseling services?',
      answer: 'Pastor Samuel provides biblical counseling and pastoral care. Please contact us to schedule an appointment for confidential support and guidance.'
    },
    {
      question: 'How can I request prayer?',
      answer: 'You can submit prayer requests through our contact form, speak with Pastor Samuel directly, or join our Wednesday prayer meetings. All requests are kept confidential.'
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                href="/events" 
                className="font-medium transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
              >
                Events
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="font-medium transition-all duration-300 hover:scale-105 text-blue-600 border-b-2 border-blue-600"
              >
                Contact
              </a>
            </li>
            <li>
              <a 
                href="/give" 
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-105"
              >
                Give
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
              href="/events" 
              className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </a>
            <a 
              href="/contact"
              className="block text-blue-600 font-bold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a 
              href="/give" 
              className="block text-green-600 font-bold transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Give
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 pt-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-black mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              We'd love to hear from you. Reach out for prayer, questions, or to learn more about our ministry.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
            <p className="text-gray-600 leading-relaxed">
              Bulaga, Nakabugo Zion Estate<br />
              Doctor's Drive<br />
              Kampala, Uganda
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
            <p className="text-gray-600 leading-relaxed">
              <a href="tel:+256772245292" className="hover:text-green-600 transition-colors duration-200">
                +256-772-245292
              </a><br />
              <span className="text-sm">Available 9 AM - 6 PM</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
            <p className="text-gray-600 leading-relaxed">
              <a href="mailto:info@christrevolutionministries.org" className="hover:text-purple-600 transition-colors duration-200">
                info@christrevolutionministries.org
              </a><br />
              <span className="text-sm">We'll respond within 24 hours</span>
            </p>
          </div>
        </div>

        {/* Service Times */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Times</h2>
            <p className="text-xl text-gray-600">Join us for worship and fellowship</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-4">⛪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sunday Worship</h3>
              <p className="text-gray-600 mb-2">9:00 AM & 11:30 AM</p>
              <p className="text-sm text-gray-500">Main Sanctuary</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-4">🙏</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Midweek Prayer</h3>
              <p className="text-gray-600 mb-2">Wednesday 7:00 PM</p>
              <p className="text-sm text-gray-500">Prayer Hall</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Youth Meeting</h3>
              <p className="text-gray-600 mb-2">Friday 6:00 PM</p>
              <p className="text-sm text-gray-500">Youth Center</p>
            </div>
          </div>
        </div>

        {/* Tabs for Contact Form, Staff, and FAQ */}
        <div className="flex flex-wrap justify-center mb-8 bg-gray-100 rounded-2xl p-2">
          {[
            { id: 'contact', label: 'Contact Form', icon: '📝' },
            { id: 'staff', label: 'Staff Directory', icon: '👥' },
            { id: 'faq', label: 'FAQ', icon: '❓' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contact Form Tab */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-gray-600">We'd love to hear from you and will respond as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select a department</option>
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Staff Directory Tab */}
        {activeTab === 'staff' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-600">Meet the dedicated people who serve our ministry and community.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {staff.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-20 h-20 rounded-full mr-6 shadow-lg"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-green-600 transition-colors duration-200">
                        {member.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find answers to common questions about our ministry and services.</p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`px-8 transition-all duration-200 ${
                    openFaq === index ? 'pb-6' : 'max-h-0 overflow-hidden'
                  }`}>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-xl mb-8 opacity-90">
            We can't wait to meet you and welcome you into our church family.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="/events" 
              className="px-8 py-3 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              View Upcoming Events
            </a>
            <a 
              href="/about" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Learn About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
