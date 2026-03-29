
import React from 'react';
import { User, MapPin, Bell, Shield, Settings } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">John Doe</h3>
                <p className="text-gray-600">john.doe@email.com</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="text-gray-500" size={20} />
                  <span className="text-gray-700">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bell className="text-gray-500" size={20} />
                  <span className="text-gray-700">Notifications: On</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="text-gray-500" size={20} />
                  <span className="text-gray-700">Premium Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center mb-6">
                <Settings className="mr-2 text-rose-500" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">Account Settings</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Preferences</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3 text-rose-500" />
                      <span className="text-gray-700">AQI alerts when levels are unhealthy</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3 text-rose-500" />
                      <span className="text-gray-700">Daily air quality summary</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3 text-rose-500" />
                      <span className="text-gray-700">Community report notifications</span>
                    </label>
                  </div>
                </div>

                <button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:from-rose-600 hover:to-purple-600 transition-all duration-200 font-semibold">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
