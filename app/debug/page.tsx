"use client";
import { useState } from 'react';

export default function TestPage() {
  const [apiTest, setApiTest] = useState('');
  const [loginTest, setLoginTest] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const apiUrl = 'http://localhost:3000/api/test';
      console.log('Testing API at:', apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApiTest(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiTest(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const loginUrl = 'http://localhost:3000/api/auth/login';
      console.log('Testing login at:', loginUrl);
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'crm2024!' }),
        credentials: 'include'
      });
      const data = await response.json();
      setLoginTest(JSON.stringify(data, null, 2));
    } catch (error) {
      setLoginTest(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin System Debug</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* API Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">API Test</h2>
            <button
              onClick={testAPI}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
            >
              Test API Connection
            </button>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
              {apiTest || 'Click button to test API'}
            </pre>
          </div>

          {/* Login Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Login Test</h2>
            <button
              onClick={testLogin}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 mb-4"
            >
              Test Login API
            </button>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
              {loginTest || 'Click button to test login'}
            </pre>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="space-x-4">
            <a href="/admin/login" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Go to Admin Login
            </a>
            <a href="/" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Go to Home Page
            </a>
          </div>
        </div>

        {/* Browser Info */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
          <div className="text-sm space-y-2">
            <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>Cookies Enabled:</strong> {typeof navigator !== 'undefined' ? navigator.cookieEnabled : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}