"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  order: number;
  active: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    order: 1,
    active: true,
    ctaText: '',
    ctaLink: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/admin/hero-slides');
      const data = await response.json();
      if (data.success) {
        setSlides(data.data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
      }
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const action = editingSlide ? 'update' : 'add';
      const dataToSend = editingSlide 
        ? { ...formData, id: editingSlide.id }
        : { ...formData, order: slides.length + 1 };

      const response = await fetch('/api/admin/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: dataToSend }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSlides(result.data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
        resetForm();
        alert(`Slide ${action}d successfully!`);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Error saving slide');
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      image: slide.image,
      order: slide.order,
      active: slide.active,
      ctaText: slide.ctaText || '',
      ctaLink: slide.ctaLink || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (slide: HeroSlide) => {
    if (!confirm(`Are you sure you want to delete "${slide.title}"?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id: slide.id } }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSlides(result.data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
        alert('Slide deleted successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
      alert('Error deleting slide');
    }
  };

  const handleToggleActive = async (slide: HeroSlide) => {
    try {
      const updatedSlide = { ...slide, active: !slide.active };
      const response = await fetch('/api/admin/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', data: updatedSlide }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSlides(result.data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error toggling slide:', error);
      alert('Error updating slide');
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
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.data.url }));
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
      subtitle: '',
      image: '',
      order: slides.length + 1,
      active: true,
      ctaText: '',
      ctaLink: ''
    });
    setEditingSlide(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <AdminLayout title="Hero Slides">
        <div className="text-center">Loading slides...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Hero Slideshow Management">
      <div className="space-y-6">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingSlide ? 'Edit Slide' : 'Add New Slide'}
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
                  <label className="block text-sm font-medium text-gray-700">Order</label>
                  <input
                    type="number"
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <textarea
                  required
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">CTA Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g., Join Our Services"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CTA Link</label>
                  <input
                    type="text"
                    placeholder="e.g., #events or /contact"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Background Image</label>
                <div className="mt-1 space-y-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">📐 Recommended Image Specifications</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <strong>Size:</strong> 1920x1080 or 1920x800 pixels</li>
                      <li>• <strong>Format:</strong> JPG or WebP preferred</li>
                      <li>• <strong>File Size:</strong> Under 500KB for fast loading</li>
                      <li>• <strong>Quality:</strong> High resolution for hero background</li>
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
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                  Active (show in slideshow)
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingSlide ? 'Update Slide' : 'Add Slide'}
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
          <h2 className="text-xl font-semibold text-gray-900">Hero Slides</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Slide
            </button>
          )}
        </div>

        {/* Slides List */}
        <div className="space-y-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4">
                  {slide.image && (
                    <img src={slide.image} alt={slide.title} className="w-24 h-16 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{slide.title}</h3>
                      <span className="text-sm text-gray-500">Order: {slide.order}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        slide.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {slide.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{slide.subtitle}</p>
                    {slide.ctaText && (
                      <p className="text-xs text-blue-600">CTA: {slide.ctaText} → {slide.ctaLink}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleActive(slide)}
                    className={`px-3 py-1 rounded text-sm ${
                      slide.active 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {slide.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleEdit(slide)}
                    className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide)}
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