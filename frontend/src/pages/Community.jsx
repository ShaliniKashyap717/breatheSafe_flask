
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, AlertTriangle, CheckCircle, Trophy, MessageSquare, FileText, Flag } from 'lucide-react';

const Community = () => {
  const recentReports = [
    { id: 1, location: "Jaipur", type: "Industrial Pollution", status: "verified", time: "2 hours ago" },
    { id: 2, location: "Delhi", type: "Vehicle Emissions", status: "pending", time: "4 hours ago" },
    { id: 3, location: "Taj Mahal", type: "Good Air Quality", status: "verified", time: "6 hours ago" },
    { id: 4, location: "Kanpur", type: "Construction Dust", status: "verified", time: "8 hours ago" },
  ];

  const communityFeatures = [
    {
      title: "Group Challenges",
      description: "Join community-wide environmental challenges and make a collective impact",
      icon: Trophy,
      link: "/challenges",
      color: "from-emerald-500 to-green-600"
    },
    {
      title: "Report Problems",
      description: "Report air quality issues directly to government agencies",
      icon: Flag,
      link: "/report-problems",
      color: "from-red-500 to-pink-600"
    },
    {
      title: "User Stories",
      description: "Share your experiences and solutions with the community",
      icon: FileText,
      link: "/user-stories",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Discussion Forum",
      description: "Connect with others about air quality topics and solutions",
      icon: MessageSquare,
      link: "/forum",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Community Hub
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect, collaborate, and contribute to environmental awareness. 
            Together, we can create cleaner air for everyone.
          </p>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            (This is a PROTOTYPE of how Community Section will look like)
          </p>
        </div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {communityFeatures.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Reports */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="mr-2 text-emerald-500" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">Recent Reports</h3>
              </div>
              <Link to="/report-problems" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-gray-500 mt-1" size={16} />
                      <div>
                        <h4 className="font-semibold text-gray-800">{report.location}</h4>
                        <p className="text-gray-600 text-sm">{report.type}</p>
                        <p className="text-gray-500 text-xs mt-1">{report.time}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'verified' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {report.status === 'verified' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      {report.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Challenges Preview */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Trophy className="mr-2 text-yellow-500" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">Active Challenges</h3>
              </div>
              <Link to="/challenges" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                Join Now →
              </Link>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-2">Reduce Pollution Week</h4>
                <p className="text-sm text-gray-600 mb-3">Track and reduce your carbon footprint this week</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">234 participants</span>
                  <span className="text-sm font-medium text-yellow-600">5 days left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2">Plant a Tree Challenge</h4>
                <p className="text-sm text-gray-600 mb-3">Help improve air quality by planting trees</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">156 participants</span>
                  <span className="text-sm font-medium text-green-600">12 days left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '43%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">1,247</div>
            <div className="text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">892</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">156</div>
            <div className="text-gray-600">Locations Monitored</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
            <div className="text-gray-600">Active Challenges</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
