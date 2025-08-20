'use client';

import { useState } from 'react';

interface NavigationBarProps {
  currentPage?: string;
}

export default function NavigationBar({ currentPage = '' }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: 'ℹ️' },
    { href: '/ministries', label: 'Ministries', icon: '⛪' },
    { href: '/sermons', label: 'Sermons', icon: '📖' },
    { href: '/events', label: 'Events', icon: '📅' },
    { href: '/give', label: 'Give', icon: '💝' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ];

  const isCurrentPage = (href: string) => {
    if (href === '/' && currentPage === '') return true;
    return currentPage === href.substring(1);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand Section - Fixed for mobile */}
          <div className="flex items-center group cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <span className="text-white text-xl font-bold">CR</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 group-hover:to-purple-600 transition-all duration-300">
                  Christ Revolution Ministries
                </h1>
                <p className="text-xs text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                  Blessed to be a blessing
                </p>
              </div>
              {/* Mobile-friendly shorter title */}
              <div className="block sm:hidden">
                <h1 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CR Ministries
                </h1>
                <p className="text-xs text-blue-600">
                  Blessed to be a blessing
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 group ${
                    isCurrentPage(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {!isCurrentPage(item.href) && (
                    <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col space-y-1.5">
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden border-t border-blue-100`}>
          <div className="px-6 py-6 space-y-3">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 font-medium transition-all duration-300 hover:translate-x-2 group ${
                  isCurrentPage(item.href)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-lg shadow-md'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={isCurrentPage(item.href) ? 'text-white' : 'text-blue-500 group-hover:text-blue-600 transition-colors duration-300'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
