"use client";
import AdminLayout from './components/AdminLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hero Slideshow Card */}
        <Link href="/admin/hero-slides" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center text-white text-lg">
                    🖼️
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Hero Slideshow
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage homepage slides
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Homepage Settings Card */}
        <Link href="/admin/homepage-settings" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center text-white text-lg">
                    🏠
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Homepage Settings
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage homepage content
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Content Management Card */}
        <Link href="/admin/content" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white text-lg">
                    📝
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Content Management
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage ministries, sermons & events
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Site Settings Card */}
        <Link href="/admin/site-settings" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center text-white text-lg">
                    ⚙️
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Site Settings
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage site-wide settings
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {/* Ministries Card */}
        <Link href="/admin/ministries" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white text-lg">
                    🏛️
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Ministries
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage ministry programs
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Events Card */}
        <Link href="/admin/events" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white text-lg">
                    📅
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Events
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage upcoming events
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Sermons Card */}
        <Link href="/admin/sermons" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center text-white text-lg">
                    📖
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Sermons
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage sermon library
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* YouTube Links Card */}
        <Link href="/admin/youtube-links" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center text-white text-lg">
                    🎥
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      YouTube Links
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage video channels
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Image Upload Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white text-lg">
                  🖼️
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Media Library
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    Upload and manage images
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image Guidelines Card */}
        <Link href="/admin/image-guidelines" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white text-lg">
                    📐
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Image Guidelines
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Upload best practices
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Quick Stats Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center text-white text-lg">
                  📊
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Quick Stats
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    View content overview
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Welcome to CRM Admin Dashboard
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Use the navigation above to manage different sections of your website</p>
              <p>• All changes are saved automatically</p>
              <p>• Images uploaded through the admin will be stored in the /uploads directory</p>
              <p>• Make sure to test changes on your live site after making updates</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}