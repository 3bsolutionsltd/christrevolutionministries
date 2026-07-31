"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface HomepageSettings {
  pastorImage: string;
  pastorName: string;
  pastorTitle: string;
  churchName: string;
  tagline: string;
  mission: string;
  vision: string;
  aboutText: string;
  heroQuote: string;
  mainHeadline: {
    line1: string;
    line2: string;
    line3: string;
  };
  heroSubtitle: string;
}

export default function HomepageSettingsManager() {
  const [settings, setSettings] = useState<HomepageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/homepage-settings', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);

    try {
      const response = await fetch('/api/admin/homepage-settings', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Homepage settings saved successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

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
        setSettings({ ...settings, pastorImage: result.data.url });
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

  if (loading) {
    return (
      <AdminLayout title="Homepage Settings">
        <div className="text-center">Loading settings...</div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout title="Homepage Settings">
        <div className="text-center text-red-600">Failed to load settings</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Homepage Settings">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Church Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Church Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Church Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.churchName}
                onChange={(e) => setSettings({ ...settings, churchName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tagline</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Main Headline</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                <input
                  type="text"
                  placeholder="Line 1 (e.g., CHRIST)"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.mainHeadline.line1}
                  onChange={(e) => setSettings({
                    ...settings,
                    mainHeadline: { ...settings.mainHeadline, line1: e.target.value }
                  })}
                />
                <input
                  type="text"
                  placeholder="Line 2 (e.g., REVOLUTION)"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.mainHeadline.line2}
                  onChange={(e) => setSettings({
                    ...settings,
                    mainHeadline: { ...settings.mainHeadline, line2: e.target.value }
                  })}
                />
                <input
                  type="text"
                  placeholder="Line 3 (e.g., Ministries)"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.mainHeadline.line3}
                  onChange={(e) => setSettings({
                    ...settings,
                    mainHeadline: { ...settings.mainHeadline, line3: e.target.value }
                  })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
              <textarea
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Quote</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.heroQuote}
                onChange={(e) => setSettings({ ...settings, heroQuote: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Pastor Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pastor Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pastor Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.pastorName}
                  onChange={(e) => setSettings({ ...settings, pastorName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pastor Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.pastorTitle}
                  onChange={(e) => setSettings({ ...settings, pastorTitle: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pastor Image</label>
              <div className="mt-1 space-y-2">
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                  <h4 className="text-sm font-medium text-green-800 mb-1">📐 Pastor Image Specifications</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• <strong>Size:</strong> 500x500 pixels (square)</li>
                    <li>• <strong>Format:</strong> JPG or PNG preferred</li>
                    <li>• <strong>File Size:</strong> Under 200KB</li>
                    <li>• <strong>Quality:</strong> High resolution portrait photo</li>
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
                  value={settings.pastorImage}
                  onChange={(e) => setSettings({ ...settings, pastorImage: e.target.value })}
                />
                {settings.pastorImage && (
                  <img src={settings.pastorImage} alt="Pastor" className="w-32 h-32 object-cover rounded" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">About Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">About Text</label>
              <textarea
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.aboutText}
                onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mission Statement</label>
              <textarea
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.mission}
                onChange={(e) => setSettings({ ...settings, mission: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Vision Statement</label>
              <textarea
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.vision}
                onChange={(e) => setSettings({ ...settings, vision: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Homepage Settings'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}