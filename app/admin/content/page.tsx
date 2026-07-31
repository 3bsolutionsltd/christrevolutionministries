"use client"

import { useState } from 'react'
import ContentManager from '../../components/ContentManager'
import AdminLayout from '../components/AdminLayout'

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState<'ministries' | 'sermons' | 'events'>('ministries')

  const tabs = [
    { id: 'ministries', label: 'Ministries', icon: '⛪' },
    { id: 'sermons', label: 'Sermons', icon: '📖' },
    { id: 'events', label: 'Events', icon: '📅' },
  ]

  return (
    <AdminLayout title="Content Management">
      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Manager */}
      <div className="space-y-6">
        {activeTab === 'ministries' && (
          <ContentManager type="ministries" title="Ministries" />
        )}
        {activeTab === 'sermons' && (
          <ContentManager type="sermons" title="Sermons" />
        )}
        {activeTab === 'events' && (
          <ContentManager type="events" title="Events" />
        )}
      </div>

      {/* Help Section */}
      <div className="mt-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📚 How to Use This Content Manager
          </h3>
          <div className="text-blue-800 space-y-2 text-sm">
            <p><strong>Add Content:</strong> Click "Add New" button to create new items</p>
            <p><strong>Edit Content:</strong> Click "Edit" button next to any item to modify it</p>
            <p><strong>Delete Content:</strong> Click "Delete" button to remove items (with confirmation)</p>
            <p><strong>View Changes:</strong> Changes appear on the website immediately after saving</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}