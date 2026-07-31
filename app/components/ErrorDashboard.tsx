'use client';

import { useState, useEffect } from 'react';

interface ErrorLog {
  id: string;
  message: string;
  stack?: string;
  url: string;
  timestamp: string;
  environment: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type?: string;
  parsed: {
    browser: string;
    timestamp: string;
  };
}

export default function ErrorDashboard() {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchErrors();
  }, []);

  const fetchErrors = async () => {
    try {
      const response = await fetch('/api/get-errors');
      if (response.ok) {
        const data = await response.json();
        setErrors(data.errors || []);
      }
    } catch (error) {
      console.error('Failed to fetch errors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredErrors = errors.filter(error => {
    if (filter === 'all') return true;
    return error.severity === filter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading error logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Error Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor and analyze application errors</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
              <button
                key={severity}
                onClick={() => setFilter(severity)}
                className={`px-4 py-2 rounded-lg font-medium capitalize ${
                  filter === severity
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {severity} {severity !== 'all' && `(${errors.filter(e => e.severity === severity).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Error List */}
        <div className="space-y-4">
          {filteredErrors.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No errors found for the selected filter.</p>
            </div>
          ) : (
            filteredErrors.map((error) => (
              <div key={error.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(error.severity)}`}>
                        {error.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {error.parsed.timestamp}
                      </span>
                      <span className="text-sm text-gray-500">
                        {error.parsed.browser}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {error.message}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>URL:</strong> {error.url}
                    </p>
                    {error.stack && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                          View Stack Trace
                        </summary>
                        <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded overflow-auto max-h-40">
                          {error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
