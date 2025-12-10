"use client";
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is disabled
    const urlParams = new URLSearchParams(window.location.search);
    const isStaticEnvironment = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const isStaging = window.location.hostname.includes('dev.christrevolutionministries.org');
    const testMode = urlParams.get('test') === 'true';
    
    // Allow admin on localhost (dev) and staging with test parameter, disable on production
    if (isStaticEnvironment && !isStaging && !testMode) {
      setIsDisabled(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (isDisabled) {
      setError('Admin functionality is only available in development environment');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { username: credentials.username, hasPassword: !!credentials.password });
      
      // Check if we're in development environment on localhost
      const isLocalDev = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      
      // Only show localhost warning in development
      if (isLocalDev && typeof window !== 'undefined' && window.location.protocol === 'https:') {
        setError('Development Notice: Please access the admin panel via HTTP: http://localhost:3000/admin/login');
        setLoading(false);
        return;
      }
      
      // Force HTTP protocol in development to avoid SSL errors
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? `http://${window.location.host}/api/auth/login`
        : '/api/auth/login';
      
      console.log('Using API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include' // Include cookies
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        // Store session ID in localStorage
        if (data.sessionId && typeof window !== 'undefined') {
          localStorage.setItem('admin-session', data.sessionId);
        }
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(`Network error: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Development Notice - Only show for localhost */}
        {typeof window !== 'undefined' && 
         (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
         window.location.protocol === 'https:' && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p className="text-sm">
              <strong>Development Notice:</strong> Please access the admin panel via HTTP: 
              <br />
              <a 
                href="http://localhost:3000/admin/login" 
                className="underline font-medium"
              >
                http://localhost:3000/admin/login
              </a>
            </p>
          </div>
        )}

        {/* Disabled Notice - Show for production environments */}
        {isDisabled && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="text-sm">
              <strong>Admin Unavailable:</strong> The admin panel is disabled in production for security.
              <br />
              <span className="text-xs">For content management, please use the development environment or staging site.</span>
            </p>
          </div>
        )}
        
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Christ Revolution Ministries Administration
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                disabled={loading || isDisabled}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                disabled={loading || isDisabled}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || isDisabled}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDisabled ? 'Admin Disabled' : (loading ? 'Signing in...' : 'Sign in')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}