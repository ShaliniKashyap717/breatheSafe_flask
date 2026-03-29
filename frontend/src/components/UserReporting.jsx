
import React, { useState } from 'react';
import { MapPin, AlertTriangle, Camera, Send, Eye } from 'lucide-react';

const UserReporting = () => {
  const [isReporting, setIsReporting] = useState(false);
  const [reportData, setReportData] = useState({
    type: '',
    description: '',
    severity: 'medium',
    location: ''
  });
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Industrial Pollution',
      description: 'Heavy smoke from factory',
      severity: 'high',
      location: 'Downtown Area',
      timestamp: '2 hours ago',
      status: 'verified'
    },
    {
      id: 2,
      type: 'Vehicle Emissions',
      description: 'Heavy traffic causing smog',
      severity: 'medium',
      location: 'Highway 101',
      timestamp: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'Construction Dust',
      description: 'Dust from building site',
      severity: 'low',
      location: 'Residential Area',
      timestamp: '1 day ago',
      status: 'verified'
    }
  ]);

  const pollutionTypes = [
    'Industrial Pollution',
    'Vehicle Emissions',
    'Construction Dust',
    'Wildfire Smoke',
    'Chemical Odor',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reportData.type && reportData.description && reportData.location) {
      const newReport = {
        id: reports.length + 1,
        ...reportData,
        timestamp: 'Just now',
        status: 'pending'
      };
      setReports([newReport, ...reports]);
      setReportData({
        type: '',
        description: '',
        severity: 'medium',
        location: ''
      });
      setIsReporting(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'dismissed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <AlertTriangle className="mr-2 text-orange-500" size={24} />
          <h3 className="text-2xl font-bold text-gray-800">Community Reports</h3>
        </div>
        
        <button
          onClick={() => setIsReporting(!isReporting)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Camera className="mr-2" size={16} />
          Report Issue
        </button>
      </div>

      {isReporting && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
          <h4 className="font-semibold text-gray-800 mb-4">Report Air Quality Concern</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pollution Type
                </label>
                <select
                  value={reportData.type}
                  onChange={(e) => setReportData({...reportData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select type...</option>
                  {pollutionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <select
                  value={reportData.severity}
                  onChange={(e) => setReportData({...reportData, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={reportData.location}
                onChange={(e) => setReportData({...reportData, location: e.target.value})}
                placeholder="Enter location or address..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={reportData.description}
                onChange={(e) => setReportData({...reportData, description: e.target.value})}
                placeholder="Describe what you observed..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Send className="mr-2" size={16} />
                Submit Report
              </button>
              <button
                type="button"
                onClick={() => setIsReporting(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Recent Reports</h4>
          <div className="flex items-center text-sm text-gray-600">
            <Eye className="mr-1" size={16} />
            {reports.length} reports
          </div>
        </div>
        
        {reports.map((report) => (
          <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-800">{report.type}</h5>
                <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(report.severity)}`}>
                  {report.severity}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <span className="text-sm text-gray-500">{report.timestamp}</span>
            </div>
            
            <p className="text-gray-700 mb-2">{report.description}</p>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-1" size={14} />
              {report.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReporting;
