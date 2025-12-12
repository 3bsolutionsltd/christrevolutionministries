"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;
      
      // Check if click is outside dropdown areas
      const isClickInsideDropdown = target.closest('[data-dropdown]');
      if (!isClickInsideDropdown) {
        setShowSettingsMenu(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const checkAuth = async () => {
    try {
      // Check if we're in development or on Vercel admin deployment
      const isDevelopment = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const isVercelAdmin = typeof window !== 'undefined' && 
        (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('admin.christrevolutionministries.org'));
      const isStaging = typeof window !== 'undefined' && 
        window.location.hostname.includes('dev.christrevolutionministries.org');
      
      // Only allow admin on: localhost, Vercel deployments, or staging
      if (!isDevelopment && !isVercelAdmin && !isStaging) {
        // Admin functionality is disabled on static hosting
        console.log('Admin functionality only available on Vercel or localhost');
        router.push('/admin/login?disabled=true');
        return;
      }
      
      // Get session ID from localStorage (if available)
      const sessionId = typeof window !== 'undefined' ? localStorage.getItem('admin-session') : null;
      
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      // Send Bearer token if we have a session ID, otherwise just send 'github-oauth-session' to indicate OAuth
      if (sessionId) {
        headers['Authorization'] = `Bearer ${sessionId}`;
      } else {
        // For OAuth sessions, the cookie is httpOnly, so we send a flag
        headers['Authorization'] = `Bearer github-oauth-session`;
      }
      
      const response = await fetch('/api/auth/check', {
        credentials: 'include',
        headers
      });
      const data = await response.json();
      
      if (data.authenticated) {
        setAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Close any open dropdowns
      setShowSettingsMenu(false);
      setShowUserMenu(false);
      
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });
      
      // Clear all localStorage sessions
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin-session');
        localStorage.removeItem('github-token');
        localStorage.removeItem('github-user');
      }
      
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still try to redirect even if API call fails
      router.push('/admin/login');
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-semibold text-gray-900">
                  CRM Admin
                </h1>
              </div>
              
              {/* Primary Navigation - Core items only */}
              <div className="hidden md:ml-8 md:flex md:space-x-6">
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/hero-slides"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Slideshow
                </Link>
                <Link
                  href="/admin/ministries"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Ministries
                </Link>
                <Link
                  href="/admin/events"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Events
                </Link>
                <Link
                  href="/admin/sermons"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Sermons
                </Link>
                
                {/* Settings Dropdown */}
                <div className="relative" data-dropdown>
                  <button 
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center"
                  >
                    Settings
                    <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {showSettingsMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <Link href="/admin/homepage-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Homepage Settings</Link>
                        <Link href="/admin/site-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Site Settings</Link>
                        <Link href="/admin/youtube-links" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">YouTube Links</Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <Link href="/admin/image-guidelines" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">📐 Image Guidelines</Link>
                        <Link href="/admin/publish" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">🚀 Publish Site</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center">
              <div className="relative" data-dropdown>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-sm rounded-full text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="hidden sm:block text-sm font-medium">Admin</span>
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                        Signed in via GitHub
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}