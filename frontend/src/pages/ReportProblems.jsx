import React, { useState, useEffect } from 'react';
import { Flag, MapPin, Send, AlertTriangle, CheckCircle, Phone, Mail, User } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});



const ReportProblems = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    mobile: '',
    location: '',
    subject: '',
    message: ''
  });

  const [reports, setReports] = useState([]);

  // Fetch reports when the component loads
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/report`);
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        const newReport = {
          ...formData,
          coordinates: [latitude, longitude], // Use browser's actual coordinates
        };
  
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReport),
          });
  
          if (response.ok) {
            const updatedReports = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/report`).then((res) => res.json());
            setReports(updatedReports);
            setFormData({
              userName: '',
              email: '',
              mobile: '',
              location: '',
              subject: '',
              message: '',
            });
            alert('Report submitted successfully.');
          } else {
            throw new Error('Failed to submit the report');
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while submitting your report.');
        }
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location. Please enable location services and try again.');
      }
    );
  };
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-700';
      case 'forwarded': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted': return <AlertTriangle size={12} />;
      case 'forwarded': return <Send size={12} />;
      case 'resolved': return <CheckCircle size={12} />;
      default: return <AlertTriangle size={12} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Report Air Quality Problems
          </h1>
          <div className="bg-red-100 border border-red-200 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-red-800 text-lg font-medium mb-2">
              Report any concerns regarding air quality and pollution
            </p>
            <p className="text-red-700">
              We will forward your report to the relevant government agencies and environmental authorities 
              to ensure proper action is taken.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <div className="flex items-center mb-6">
              <Flag className="mr-2 text-red-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Submit a Report</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-1" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    Exact Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Street address, landmarks, etc."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of the problem"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the air quality problem..."
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Submit Report
              </button>
            </form>
          </div>

          {/* Recent Reports */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Reports</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {reports.map((report) => (
                <div key={report.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{report.subject}</h3>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      {report.status}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.message.substring(0, 100)}...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {report.location}
                    </span>
                    <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports Map</h2>
    <div className="h-96 rounded-lg">
      <MapContainer center={[37.7749, -122.4194]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {reports.map((report) => (
          <Marker key={report._id} position={report.coordinates}>
            <Popup>
              <h3 className="font-bold">{report.subject}</h3>
              <p>{report.message}</p>
              <p className="text-sm text-gray-500">
                <MapPin size={12} className="inline mr-1" />
                {report.location}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default ReportProblems;
