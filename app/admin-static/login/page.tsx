"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStaticContentManager } from '../../../lib/static-content-manager';

export default function StaticAdminLogin() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { authenticate, isAuthenticated } = useStaticContentManager();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin-static');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await authenticate(token);
      if (success) {
        router.push('/admin-static');
      } else {
        setError('Invalid GitHub token. Please check your token and try again.');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Static Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Christ Revolution Ministries - Static Content Management
          </p>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">GitHub Token Required</h3>
          <p className="text-xs text-blue-600 mb-2">
            This static admin uses GitHub API to manage content. You need a GitHub Personal Access Token.
          </p>
          <div className="text-xs text-blue-600 space-y-1">
            <p><strong>To create a token:</strong></p>
            <p>1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens</p>
            <p>2. Generate new token (classic)</p>
            <p>3. Select scopes: <code>repo</code> (full repository access)</p>
            <p>4. Copy the token and paste it below</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700">
              GitHub Personal Access Token
            </label>
            <input
              id="token"
              name="token"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !token}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-6 text-xs text-gray-500">
          <p><strong>Note:</strong> This admin interface works entirely through GitHub API.</p>
          <p>Changes are saved directly to the repository and can trigger deployments.</p>
        </div>
      </div>
    </div>
  );
}