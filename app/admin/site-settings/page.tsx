"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface SiteSettings {
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
    linkedin: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  services: {
    sundayService: {
      time: string;
      description: string;
    };
    wednesdayService: {
      time: string;
      description: string;
    };
    otherServices: string[];
  };
  footer: {
    copyright: string;
    additionalText: string;
  };
  giving: {
    heroTitle: string;
    heroSubtitle: string;
    mobileMoneyNumber: string;
    mobileMoneyName: string;
    airtelMoneyNumber: string;
    airtelMoneyName: string;
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
    bankBranch: string;
    referenceNote: string;
  };
}

const defaultSiteSettings: SiteSettings = {
  contact: {
    email: 'info@christrevolutionministries.org',
    phone: '+256-772-245292',
    address: {
      street: 'Bulaga, Nakabugo Zion Estate',
      city: 'Kampala, Uganda',
      state: 'Doctor\'s Drive',
      zip: ''
    }
  },
  socialLinks: {
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: '',
    linkedin: ''
  },
  seo: {
    title: 'Christ Revolution Ministries',
    description: '',
    keywords: '',
    ogImage: ''
  },
  services: {
    sundayService: {
      time: '',
      description: ''
    },
    wednesdayService: {
      time: '',
      description: ''
    },
    otherServices: []
  },
  footer: {
    copyright: '© 2025 Christ Revolution Ministries. All rights reserved.',
    additionalText: ''
  },
  giving: {
    heroTitle: 'Give with Purpose',
    heroSubtitle: 'Your generous giving helps us spread God\'s love, support our community, and advance His kingdom.',
    mobileMoneyNumber: '+256-772-245292',
    mobileMoneyName: 'Samuel Isiko',
    airtelMoneyNumber: '+256-701-234567',
    airtelMoneyName: 'Samuel Isiko',
    bankName: 'Stanbic Bank Uganda',
    bankAccountNumber: '9030006789123',
    bankAccountName: 'Christ Revolution Ministries',
    bankBranch: 'Kampala Main Branch',
    referenceNote: 'Please include your name and "CRM Giving" in the payment reference'
  }
};

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingOgImage, setUploadingOgImage] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/site-settings', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        const incoming = data.data || {};
        setSettings({
          ...defaultSiteSettings,
          ...incoming,
          contact: {
            ...defaultSiteSettings.contact,
            ...(incoming.contact || {}),
            address: {
              ...defaultSiteSettings.contact.address,
              ...((incoming.contact && incoming.contact.address) || {})
            }
          },
          socialLinks: {
            ...defaultSiteSettings.socialLinks,
            ...(incoming.socialLinks || {})
          },
          seo: {
            ...defaultSiteSettings.seo,
            ...(incoming.seo || {})
          },
          services: {
            ...defaultSiteSettings.services,
            ...(incoming.services || {}),
            sundayService: {
              ...defaultSiteSettings.services.sundayService,
              ...((incoming.services && incoming.services.sundayService) || {})
            },
            wednesdayService: {
              ...defaultSiteSettings.services.wednesdayService,
              ...((incoming.services && incoming.services.wednesdayService) || {})
            },
            otherServices: incoming.services?.otherServices || defaultSiteSettings.services.otherServices
          },
          footer: {
            ...defaultSiteSettings.footer,
            ...(incoming.footer || {})
          },
          giving: {
            ...defaultSiteSettings.giving,
            ...(incoming.giving || {})
          }
        });
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
      const response = await fetch('/api/admin/site-settings', {
        method: 'POST',
        credentials: 'include',

        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(settings),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Site settings saved successfully!');
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

  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    setUploadingOgImage(true);

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
        setSettings({
          ...settings,
          seo: { ...settings.seo, ogImage: result.data.url }
        });
      } else {
        alert(`Upload error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploadingOgImage(false);
    }
  };

  const addOtherService = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      services: {
        ...settings.services,
        otherServices: [...settings.services.otherServices, '']
      }
    });
  };

  const removeOtherService = (index: number) => {
    if (!settings) return;
    const newServices = settings.services.otherServices.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      services: {
        ...settings.services,
        otherServices: newServices
      }
    });
  };

  const updateOtherService = (index: number, value: string) => {
    if (!settings) return;
    const newServices = [...settings.services.otherServices];
    newServices[index] = value;
    setSettings({
      ...settings,
      services: {
        ...settings.services,
        otherServices: newServices
      }
    });
  };

  if (loading) {
    return (
      <AdminLayout title="Site Settings">
        <div className="text-center">Loading settings...</div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout title="Site Settings">
        <div className="text-center text-red-600">Failed to load settings</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Site Settings">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.contact.email}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.contact.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value }
                })}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Street Address"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.contact.address.street}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: {
                      ...settings.contact,
                      address: { ...settings.contact.address, street: e.target.value }
                    }
                  })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.contact.address.city}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: {
                      ...settings.contact,
                      address: { ...settings.contact.address, city: e.target.value }
                    }
                  })}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="State"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.contact.address.state}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: {
                      ...settings.contact,
                      address: { ...settings.contact.address, state: e.target.value }
                    }
                  })}
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.contact.address.zip}
                  onChange={(e) => setSettings({
                    ...settings,
                    contact: {
                      ...settings.contact,
                      address: { ...settings.contact.address, zip: e.target.value }
                    }
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook</label>
              <input
                type="url"
                placeholder="https://facebook.com/..."
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.socialLinks.facebook}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube</label>
              <input
                type="url"
                placeholder="https://youtube.com/..."
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.socialLinks.youtube}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <input
                type="url"
                placeholder="https://instagram.com/..."
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.socialLinks.instagram}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Twitter/X</label>
              <input
                type="url"
                placeholder="https://twitter.com/..."
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.socialLinks.twitter}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                type="url"
                placeholder="https://linkedin.com/..."
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.socialLinks.linkedin}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Service Times */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Service Times</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sunday Service</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Time (e.g., 10:00 AM)"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.services.sundayService.time}
                  onChange={(e) => setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      sundayService: { ...settings.services.sundayService, time: e.target.value }
                    }
                  })}
                />
                <input
                  type="text"
                  placeholder="Description (e.g., Worship Service)"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.services.sundayService.description}
                  onChange={(e) => setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      sundayService: { ...settings.services.sundayService, description: e.target.value }
                    }
                  })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wednesday Service</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Time (e.g., 7:00 PM)"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.services.wednesdayService.time}
                  onChange={(e) => setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      wednesdayService: { ...settings.services.wednesdayService, time: e.target.value }
                    }
                  })}
                />
                <input
                  type="text"
                  placeholder="Description (e.g., Bible Study)"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.services.wednesdayService.description}
                  onChange={(e) => setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      wednesdayService: { ...settings.services.wednesdayService, description: e.target.value }
                    }
                  })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Services</label>
              {settings.services.otherServices.map((service, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Service description"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={service}
                    onChange={(e) => updateOtherService(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeOtherService(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addOtherService}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Title</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.seo.title}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, title: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.seo.description}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, description: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Keywords (comma-separated)</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.seo.keywords}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, keywords: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Social Media Image (og:image)</label>
              <div className="mt-1 space-y-2">
                <div className="bg-purple-50 border border-purple-200 rounded-md p-3 mb-3">
                  <h4 className="text-sm font-medium text-purple-800 mb-1">📐 Social Media Image Specifications</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <strong>Size:</strong> 1200x630 pixels (Facebook/Twitter optimal)</li>
                    <li>• <strong>Format:</strong> JPG or PNG</li>
                    <li>• <strong>File Size:</strong> Under 300KB</li>
                    <li>• <strong>Usage:</strong> Shows when site is shared on social media</li>
                  </ul>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleOgImageUpload}
                  disabled={uploadingOgImage}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploadingOgImage && <p className="text-sm text-gray-500">Uploading...</p>}
                <input
                  type="url"
                  placeholder="Or enter image URL"
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.seo.ogImage}
                  onChange={(e) => setSettings({
                    ...settings,
                    seo: { ...settings.seo, ogImage: e.target.value }
                  })}
                />
                {settings.seo.ogImage && (
                  <img src={settings.seo.ogImage} alt="OG Image" className="w-64 h-32 object-cover rounded" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Footer Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Copyright Text</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.footer.copyright}
                onChange={(e) => setSettings({
                  ...settings,
                  footer: { ...settings.footer, copyright: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Footer Text</label>
              <textarea
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={settings.footer.additionalText}
                onChange={(e) => setSettings({
                  ...settings,
                  footer: { ...settings.footer, additionalText: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Giving Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Giving Settings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Giving Hero Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={settings.giving.heroTitle}
                    onChange={(e) => setSettings({
                      ...settings,
                      giving: { ...settings.giving, heroTitle: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Giving Reference Note</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={settings.giving.referenceNote}
                    onChange={(e) => setSettings({
                      ...settings,
                      giving: { ...settings.giving, referenceNote: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Giving Hero Subtitle</label>
                <textarea
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={settings.giving.heroSubtitle}
                  onChange={(e) => setSettings({
                    ...settings,
                    giving: { ...settings.giving, heroSubtitle: e.target.value }
                  })}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Mobile Money Accounts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">MTN Number</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.mobileMoneyNumber}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, mobileMoneyNumber: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">MTN Account Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.mobileMoneyName}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, mobileMoneyName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Airtel Number</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.airtelMoneyNumber}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, airtelMoneyNumber: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Airtel Account Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.airtelMoneyName}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, airtelMoneyName: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Bank Account</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.bankName}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, bankName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.bankBranch}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, bankBranch: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.bankAccountNumber}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, bankAccountNumber: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={settings.giving.bankAccountName}
                      onChange={(e) => setSettings({
                        ...settings,
                        giving: { ...settings.giving, bankAccountName: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
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
            {saving ? 'Saving...' : 'Save Site Settings'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}