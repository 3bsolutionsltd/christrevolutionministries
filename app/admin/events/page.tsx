"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  img: string;
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    img: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const categories = ['Conference', 'Youth', 'Worship', 'Community', 'Prayer', 'Outreach', 'Other'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/events', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const action = editingEvent ? 'update' : 'add';
      const dataToSend = editingEvent 
        ? { ...formData, id: editingEvent.id }
        : formData;

      const response = await fetch('/api/admin/events', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: dataToSend }),
      });

      const result = await response.json();
      
      if (result.success) {
        setEvents(result.data);
        resetForm();
        alert(`Event ${action}d successfully!`);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event');
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
      img: event.img
    });
    setShowForm(true);
  };

  const handleDelete = async (event: Event) => {
    if (!confirm(`Are you sure you want to delete "${event.title}"?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id: event.id } }),
      });

      const result = await response.json();
      
      if (result.success) {
        setEvents(result.data);
        alert('Event deleted successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'include',

        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, img: result.data.url }));
      } else {
        alert(`Upload error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      category: '',
      description: '',
      img: ''
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout title="Events">
        <div className="text-center">Loading events...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Events Management">
      <div className="space-y-6">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sept 15-17, 2025"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 7:00 PM"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Main Sanctuary"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 space-y-2">
                  <div className="bg-orange-50 border border-orange-200 rounded-md p-3 mb-3">
                    <h4 className="text-sm font-medium text-orange-800 mb-1">📐 Event Image Specifications</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• <strong>Size:</strong> 1024x533 or 1170x450 pixels</li>
                      <li>• <strong>Format:</strong> JPG or WebP preferred</li>
                      <li>• <strong>File Size:</strong> Under 400KB</li>
                      <li>• <strong>Quality:</strong> Eye-catching event promotional image</li>
                    </ul>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {uploadingImage && <p className="text-sm text-gray-500">Uploading...</p>}
                  <input
                    type="text"
                    placeholder="Or enter image URL"
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                  />
                  {formData.img && (
                    <img src={formData.img} alt="Preview" className="w-32 h-20 object-cover rounded" />
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Current Events</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Event
            </button>
          )}
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow rounded-lg overflow-hidden">
              {event.img && (
                <img src={event.img} alt={event.title} className="w-full h-32 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {event.category}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <p><strong>Date:</strong> {event.date}</p>
                  {event.time && <p><strong>Time:</strong> {event.time}</p>}
                  {event.location && <p><strong>Location:</strong> {event.location}</p>}
                </div>
                <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}