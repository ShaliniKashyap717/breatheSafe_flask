
import React from 'react';
import { MapPin } from 'lucide-react';

const AQICard = ({ aqi, location }) => {
  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'from-green-400 to-green-600', textColor: 'text-green-800' };
    if (aqi <= 100) return { level: 'Moderate', color: 'from-yellow-400 to-yellow-600', textColor: 'text-yellow-800' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'from-orange-400 to-orange-600', textColor: 'text-orange-800' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'from-red-400 to-red-600', textColor: 'text-red-800' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-800' };
    return { level: 'Hazardous', color: 'from-red-600 to-red-800', textColor: 'text-red-900' };
  };

  const aqiInfo = getAQILevel(aqi);
  const percentage = Math.min((aqi / 300) * 100, 100);

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="text-gray-600 mr-2" size={20} />
          <span className="text-gray-700 text-lg">{location}</span>
        </div>
        
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${percentage * 2.51} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`stop-color-${aqiInfo.color.split('-')[1]}-400`} />
                <stop offset="100%" className={`stop-color-${aqiInfo.color.split('-')[3]}-600`} />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 animate-pulse">{Math.round(aqi)}</div>
              <div className="text-sm text-gray-600">AQI</div>
            </div>
          </div>
        </div>

        <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${aqiInfo.color} text-white font-semibold text-lg shadow-lg`}>
          {aqiInfo.level}
        </div>
      </div>
    </div>
  );
};

export default AQICard;
