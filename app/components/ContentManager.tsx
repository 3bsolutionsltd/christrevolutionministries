"use client"

import { useState, useEffect } from 'react'

interface ContentItem {
  id: number
  title: string
  [key: string]: any
}

interface ContentManagerProps {
  type: 'ministries' | 'sermons' | 'events'
  title: string
}

const contentFields = {
  ministries: [
    { name: 'title', label: 'Ministry Name', type: 'text', required: true },
    { name: 'desc', label: 'Description', type: 'textarea', required: true },
    { name: 'leader', label: 'Leader', type: 'text' },
    { name: 'schedule', label: 'Schedule', type: 'text' },
    { name: 'contact', label: 'Contact Info', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
  ],
  sermons: [
    { name: 'title', label: 'Sermon Title', type: 'text', required: true },
    { name: 'speaker', label: 'Speaker', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'series', label: 'Series', type: 'text' },
    { name: 'youtubeUrl', label: 'YouTube URL', type: 'url' },
    { name: 'audioUrl', label: 'Audio URL', type: 'url' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  events: [
    { name: 'title', label: 'Event Title', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'time', label: 'Time', type: 'time', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', options: ['Service', 'Conference', 'Outreach', 'Fellowship', 'Youth', 'Other'] },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
  ]
}

export default function ContentManager({ type, title }: ContentManagerProps) {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<ContentItem | null>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    fetchItems()
  }, [type])

  const fetchItems = async () => {
    try {
      const response = await fetch(`/api/content?type=${type}`)
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editing 
        ? `/api/content?type=${type}&id=${editing.id}`
        : `/api/content?type=${type}`
      
      const method = editing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await fetchItems()
        setEditing(null)
        setFormData({})
      }
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const handleEdit = (item: ContentItem) => {
    setEditing(item)
    setFormData(item)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/content?type=${type}&id=${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          await fetchItems()
        }
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  const fields = contentFields[type] || []

  if (loading) {
    return <div className="text-center py-8">Loading {title.toLowerCase()}...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={() => {
            setEditing(null)
            setFormData({})
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New
        </button>
      </div>

      {/* Form */}
      {(editing !== null || Object.keys(formData).length > 0) && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            {editing ? 'Edit' : 'Add New'} {title.slice(0, -1)}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                    required={field.required}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setFormData({})
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items List */}
      <div className="bg-white rounded-lg border">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No {title.toLowerCase()} found. Click "Add New" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Details</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{item.title}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {type === 'sermons' && (
                        <div>{item.speaker} • {item.date}</div>
                      )}
                      {type === 'events' && (
                        <div>{item.date} • {item.location}</div>
                      )}
                      {type === 'ministries' && (
                        <div>{item.leader ? `Led by ${item.leader}` : 'Ministry'}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}