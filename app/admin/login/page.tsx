"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if already authenticated via any method
    const storedToken = localStorage.getItem('github-token');
    const adminSession = localStorage.getItem('admin-session');
    
    if (storedToken || adminSession) {
      // Check if authentication is still valid
      fetch('/api/auth/check', {
        headers: { 
          'Authorization': `Bearer ${adminSession || 'github-oauth-session'}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(response => response.json())
        .then(data => {
          if (data.authenticated) {
            router.push('/admin');
          }
        }).catch(() => {
          // Clear invalid sessions
          localStorage.removeItem('github-token');
          localStorage.removeItem('admin-session');
        });
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Christ Revolution Ministries - Content Management
          </p>
        </div>

        {/* GitHub OAuth Login */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Login</h3>
            <p className="text-sm text-gray-600">
              Sign in with your GitHub account to access the admin panel
            </p>
          </div>

          <a
            href="/admin-oauth-login.html"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
            </svg>
            Continue with GitHub
          </a>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">
              <strong>Requirements:</strong>
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• You must be added as a repository collaborator</p>
              <p>• Contact your developer to get access if needed</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
          <p><strong>Secure & Simple:</strong> No tokens to manage or share</p>
          <p>Changes are saved directly to the repository and deployed automatically</p>
        </div>
      </div>
    </div>
  );
}