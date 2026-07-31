"use client";
import AdminLayout from '../components/AdminLayout';

export default function ImageGuidelines() {
  return (
    <AdminLayout title="Image Upload Guidelines">
      <div className="max-w-4xl space-y-8">
        
        {/* Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">📐 Image Upload Guidelines</h2>
          <p className="text-blue-800 mb-4">
            Follow these guidelines to ensure your images look great and load quickly across all devices.
          </p>
          <div className="bg-white rounded-md p-4">
            <h3 className="font-semibold text-blue-900 mb-2">General Best Practices:</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Use high-quality, clear images</li>
              <li>• Compress images to reduce file size without losing quality</li>
              <li>• Prefer JPG for photos, PNG for graphics with transparency</li>
              <li>• Ensure images are properly lit and in focus</li>
              <li>• Avoid copyrighted images - use your own or free stock photos</li>
            </ul>
          </div>
        </div>

        {/* Hero Slideshow */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              🖼️
            </div>
            <h3 className="text-xl font-bold text-gray-900">Hero Slideshow Images</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Size:</strong> 1920x1080 or 1920x800 pixels</li>
                <li>• <strong>Format:</strong> JPG or WebP</li>
                <li>• <strong>File Size:</strong> Under 500KB</li>
                <li>• <strong>Aspect Ratio:</strong> 16:9 (widescreen)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Use inspiring, high-impact images</li>
                <li>• Ensure good contrast for text overlay</li>
                <li>• Choose images that represent your ministry</li>
                <li>• Avoid cluttered or busy backgrounds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pastor Image */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              👤
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pastor Image</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Size:</strong> 500x500 pixels (square)</li>
                <li>• <strong>Format:</strong> JPG or PNG</li>
                <li>• <strong>File Size:</strong> Under 200KB</li>
                <li>• <strong>Aspect Ratio:</strong> 1:1 (square)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Use a professional headshot</li>
                <li>• Good lighting on the face</li>
                <li>• Clear, uncluttered background</li>
                <li>• Friendly, approachable expression</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ministry Images */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              🏛️
            </div>
            <h3 className="text-xl font-bold text-gray-900">Ministry Images</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Size:</strong> 600x400 pixels</li>
                <li>• <strong>Format:</strong> JPG or WebP</li>
                <li>• <strong>File Size:</strong> Under 300KB</li>
                <li>• <strong>Aspect Ratio:</strong> 3:2</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Show people engaged in ministry</li>
                <li>• Capture the essence of the ministry</li>
                <li>• Use natural, candid moments</li>
                <li>• Ensure faces are visible and happy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Event Images */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              📅
            </div>
            <h3 className="text-xl font-bold text-gray-900">Event Images</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Size:</strong> 1024x533 or 1170x450 pixels</li>
                <li>• <strong>Format:</strong> JPG or WebP</li>
                <li>• <strong>File Size:</strong> Under 400KB</li>
                <li>• <strong>Aspect Ratio:</strong> ~2:1</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Create eye-catching promotional images</li>
                <li>• Include event title or key information</li>
                <li>• Use vibrant, engaging colors</li>
                <li>• Consider creating custom graphics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Image */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              📱
            </div>
            <h3 className="text-xl font-bold text-gray-900">Social Media Images</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Size:</strong> 1200x630 pixels</li>
                <li>• <strong>Format:</strong> JPG or PNG</li>
                <li>• <strong>File Size:</strong> Under 300KB</li>
                <li>• <strong>Aspect Ratio:</strong> 1.91:1</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Shows when your site is shared online</li>
                <li>• Include church name or logo</li>
                <li>• Use brand colors and fonts</li>
                <li>• Keep text minimal and readable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tools & Resources */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🛠️ Helpful Tools & Resources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Free Image Sources:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• <a href="https://unsplash.com" target="_blank" className="text-blue-600 hover:underline">Unsplash.com</a> - High quality stock photos</li>
                <li>• <a href="https://pexels.com" target="_blank" className="text-blue-600 hover:underline">Pexels.com</a> - Free stock photography</li>
                <li>• <a href="https://pixabay.com" target="_blank" className="text-blue-600 hover:underline">Pixabay.com</a> - Free images and vectors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Image Editing Tools:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• <a href="https://canva.com" target="_blank" className="text-blue-600 hover:underline">Canva.com</a> - Easy graphic design</li>
                <li>• <a href="https://tinypng.com" target="_blank" className="text-blue-600 hover:underline">TinyPNG.com</a> - Compress images</li>
                <li>• <a href="https://photopea.com" target="_blank" className="text-blue-600 hover:underline">Photopea.com</a> - Free Photoshop alternative</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}