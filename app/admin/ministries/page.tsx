"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface Ministry {
  id: number;
  title: string;
  desc: string;
  img: string;
  icon: string;
}

export default function MinistriesManager() {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    img: '',
    icon: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      const response = await fetch('/api/admin/ministries', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setMinistries(data.data);
      }
    } catch (error) {
      console.error('Error fetching ministries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const action = editingMinistry ? 'update' : 'add';
      const dataToSend = editingMinistry 
        ? { ...formData, id: editingMinistry.id }
        : formData;

      const response = await fetch('/api/admin/ministries', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: dataToSend }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMinistries(result.data);
        resetForm();
        alert(`Ministry ${action}d successfully!`);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving ministry:', error);
      alert('Error saving ministry');
    }
  };

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      title: ministry.title,
      desc: ministry.desc,
      img: ministry.img,
      icon: ministry.icon
    });
    setShowForm(true);
  };

  const handleDelete = async (ministry: Ministry) => {
    if (!confirm(`Are you sure you want to delete "${ministry.title}"?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/ministries', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id: ministry.id } }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMinistries(result.data);
        alert('Ministry deleted successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting ministry:', error);
      alert('Error deleting ministry');
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
    setFormData({ title: '', desc: '', img: '', icon: '' });
    setEditingMinistry(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout title="Ministries">
        <div className="text-center">Loading ministries...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Ministries Management">
      <div className="space-y-6">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingMinistry ? 'Edit Ministry' : 'Add New Ministry'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon (emoji)</label>
                <input
                  type="text"
                  placeholder="e.g., 👥"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 space-y-2">
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                    <h4 className="text-sm font-medium text-green-800 mb-1">📐 Ministry Image Specifications</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>Size:</strong> 600x400 pixels (3:2 aspect ratio)</li>
                      <li>• <strong>Format:</strong> JPG or WebP preferred</li>
                      <li>• <strong>File Size:</strong> Under 300KB</li>
                      <li>• <strong>Quality:</strong> Clear, representative ministry photo</li>
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
                  {editingMinistry ? 'Update Ministry' : 'Add Ministry'}
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
          <h2 className="text-xl font-semibold text-gray-900">Current Ministries</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Ministry
            </button>
          )}
        </div>

        {/* Ministries List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry) => (
            <div key={ministry.id} className="bg-white shadow rounded-lg overflow-hidden">
              {ministry.img && (
                <img src={ministry.img} alt={ministry.title} className="w-full h-32 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{ministry.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900">{ministry.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{ministry.desc}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(ministry)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ministry)}
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