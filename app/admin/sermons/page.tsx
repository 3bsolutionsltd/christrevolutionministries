"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  series: string;
  youtubeUrl: string;
  audioUrl: string;
  description: string;
}

export default function SermonsManager() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    date: '',
    series: '',
    youtubeUrl: '',
    audioUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await fetch('/api/admin/sermons', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setSermons(data.data);
      }
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const action = editingSermon ? 'update' : 'add';
      const dataToSend = editingSermon 
        ? { ...formData, id: editingSermon.id }
        : formData;

      const response = await fetch('/api/admin/sermons', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: dataToSend }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSermons(result.data);
        resetForm();
        alert(`Sermon ${action}d successfully!`);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving sermon:', error);
      alert('Error saving sermon');
    }
  };

  const handleEdit = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setFormData({
      title: sermon.title,
      speaker: sermon.speaker,
      date: sermon.date,
      series: sermon.series,
      youtubeUrl: sermon.youtubeUrl,
      audioUrl: sermon.audioUrl,
      description: sermon.description
    });
    setShowForm(true);
  };

  const handleDelete = async (sermon: Sermon) => {
    if (!confirm(`Are you sure you want to delete "${sermon.title}"?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/sermons', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id: sermon.id } }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSermons(result.data);
        alert('Sermon deleted successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting sermon:', error);
      alert('Error deleting sermon');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      speaker: '',
      date: '',
      series: '',
      youtubeUrl: '',
      audioUrl: '',
      description: ''
    });
    setEditingSermon(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Sermons">
        <div className="text-center">Loading sermons...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Sermons Management">
      <div className="space-y-6">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
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
                  <label className="block text-sm font-medium text-gray-700">Speaker</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Series</label>
                  <input
                    type="text"
                    placeholder="e.g., Faith Series"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.series}
                    onChange={(e) => setFormData({ ...formData, series: e.target.value })}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Audio URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/audio.mp3"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingSermon ? 'Update Sermon' : 'Add Sermon'}
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
          <h2 className="text-xl font-semibold text-gray-900">Sermon Library</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Sermon
            </button>
          )}
        </div>

        {/* Sermons List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {sermons.map((sermon) => (
              <li key={sermon.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {sermon.title}
                      </h3>
                      <div className="ml-2 flex-shrink-0 flex">
                        <div className="flex space-x-2">
                          {sermon.youtubeUrl && (
                            <a
                              href={sermon.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold"
                            >
                              YouTube
                            </a>
                          )}
                          {sermon.audioUrl && (
                            <a
                              href={sermon.audioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold"
                            >
                              Audio
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{sermon.speaker}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(sermon.date)}</span>
                      {sermon.series && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                            {sermon.series}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{sermon.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(sermon)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sermon)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}