"use client";
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

interface PublishStatus {
  action: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function PublishPage() {
  const [publishStatus, setPublishStatus] = useState<PublishStatus>({
    action: '',
    status: 'idle',
    message: ''
  });

  const handleAction = async (action: string, target?: string) => {
    setPublishStatus({
      action,
      status: 'loading',
      message: `${action === 'sync' ? 'Syncing' : 'Publishing'} content...`
    });

    try {
      const sessionId = localStorage.getItem('admin-session');
      const response = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`
        },
        body: JSON.stringify({ action, target })
      });

      const data = await response.json();

      if (data.success) {
        setPublishStatus({
          action,
          status: 'success',
          message: data.message
        });
      } else {
        throw new Error(data.error || 'Action failed');
      }
    } catch (error) {
      setPublishStatus({
        action,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'loading': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <AdminLayout title="Publish Content">
      <div className="max-w-4xl mx-auto">
        {/* Status Display */}
        {publishStatus.message && (
          <div className={`mb-6 p-4 rounded-lg ${
            publishStatus.status === 'success' ? 'bg-green-50 border border-green-200' :
            publishStatus.status === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <p className={getStatusColor(publishStatus.status)}>
              {publishStatus.status === 'loading' && (
                <span className="inline-block animate-spin mr-2">⏳</span>
              )}
              {publishStatus.message}
            </p>
          </div>
        )}

        {/* Publishing Workflow */}
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          
          {/* Step 1: Sync Content */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Step 1: Sync Content to Repository
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Save your current content changes to the GitHub repository. This doesn't deploy yet.
            </p>
            <button
              onClick={() => handleAction('sync')}
              disabled={publishStatus.status === 'loading'}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {publishStatus.status === 'loading' && publishStatus.action === 'sync' 
                ? 'Syncing...' 
                : 'Sync to Repository'
              }
            </button>
          </div>

          {/* Step 2: Publish to Staging */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Step 2: Publish to Staging
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Deploy your changes to the staging website for testing: <br />
              <code className="bg-gray-100 px-2 py-1 rounded">dev.christrevolutionministries.org</code>
            </p>
            <button
              onClick={() => handleAction('publish', 'staging')}
              disabled={publishStatus.status === 'loading'}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {publishStatus.status === 'loading' && publishStatus.action === 'publish' 
                ? 'Publishing to Staging...' 
                : 'Publish to Staging'
              }
            </button>
          </div>

          {/* Step 3: Publish to Production */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Step 3: Publish to Production
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Deploy your changes to the live website: <br />
              <code className="bg-gray-100 px-2 py-1 rounded">christrevolutionministries.org</code>
            </p>
            <p className="text-xs text-red-600 mb-4">
              ⚠️ Warning: This will update the live website immediately.
            </p>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to publish to the live website?')) {
                  handleAction('publish', 'production');
                }
              }}
              disabled={publishStatus.status === 'loading'}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {publishStatus.status === 'loading' && publishStatus.action === 'publish' 
                ? 'Publishing to Production...' 
                : 'Publish to Production'
              }
            </button>
          </div>
        </div>

        {/* Information Panel */}
        <div className="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Publishing Workflow</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Admin Server:</strong> Make content changes here</p>
            <p><strong>Sync:</strong> Save changes to GitHub repository</p>
            <p><strong>Staging:</strong> Test changes on dev.christrevolutionministries.org</p>
            <p><strong>Production:</strong> Deploy to live site christrevolutionministries.org</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}