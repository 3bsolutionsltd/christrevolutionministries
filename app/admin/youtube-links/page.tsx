"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface YouTubeLink {
  id: number;
  title: string;
  url: string;
  category: string;
  description: string;
}

export default function YouTubeLinksManager() {
  const [links, setLinks] = useState<YouTubeLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<YouTubeLink | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: '',
    description: ''
  });

  const categories = ['main', 'youth', 'worship', 'sermons', 'events', 'other'];

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/admin/youtube-links');
      const data = await response.json();
      if (data.success) {
        setLinks(data.data);
      }
    } catch (error) {
      console.error('Error fetching YouTube links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate YouTube URL
    if (!isValidYouTubeUrl(formData.url)) {
      alert('Please enter a valid YouTube URL');
      return;
    }
    
    try {
      const action = editingLink ? 'update' : 'add';
      const dataToSend = editingLink 
        ? { ...formData, id: editingLink.id }
        : formData;

      const response = await fetch('/api/admin/youtube-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: dataToSend }),
      });

      const result = await response.json();
      
      if (result.success) {
        setLinks(result.data);
        resetForm();
        alert(`YouTube link ${action}d successfully!`);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving YouTube link:', error);
      alert('Error saving YouTube link');
    }
  };

  const handleEdit = (link: YouTubeLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      category: link.category,
      description: link.description
    });
    setShowForm(true);
  };

  const handleDelete = async (link: YouTubeLink) => {
    if (!confirm(`Are you sure you want to delete "${link.title}"?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/youtube-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id: link.id } }),
      });

      const result = await response.json();
      
      if (result.success) {
        setLinks(result.data);
        alert('YouTube link deleted successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting YouTube link:', error);
      alert('Error deleting YouTube link');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      category: '',
      description: ''
    });
    setEditingLink(null);
    setShowForm(false);
  };

  const isValidYouTubeUrl = (url: string) => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/channel\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/c\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/@[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      main: 'bg-blue-100 text-blue-800',
      youth: 'bg-green-100 text-green-800',
      worship: 'bg-purple-100 text-purple-800',
      sermons: 'bg-yellow-100 text-yellow-800',
      events: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <AdminLayout title="YouTube Links">
        <div className="text-center">Loading YouTube links...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="YouTube Links Management">
      <div className="space-y-6">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingLink ? 'Edit YouTube Link' : 'Add New YouTube Link'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Main Church Channel"
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
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://youtube.com/@christrevolutionministries"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a YouTube channel URL, video URL, or shortened youtu.be link
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of this YouTube link"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingLink ? 'Update Link' : 'Add Link'}
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
          <h2 className="text-xl font-semibold text-gray-900">YouTube Links</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Link
            </button>
          )}
        </div>

        {/* Links List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <div key={link.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">{link.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(link.category)}`}>
                    {link.category.charAt(0).toUpperCase() + link.category.slice(1)}
                  </span>
                </div>
                
                {link.description && (
                  <p className="text-sm text-gray-600 mb-4">{link.description}</p>
                )}
                
                <div className="mb-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 break-all"
                  >
                    {link.url}
                  </a>
                </div>
                
                {/* YouTube Preview for videos */}
                {getYouTubeVideoId(link.url) && (
                  <div className="mb-4">
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(link.url)}/mqdefault.jpg`}
                      alt={link.title}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(link)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(link)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 inline-block"
                  >
                    Visit
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {links.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-500">
              <p className="text-lg mb-2">No YouTube links yet</p>
              <p className="text-sm">Add your first YouTube channel or video link to get started</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}