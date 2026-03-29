
import React from 'react';
import { Heart, Stethoscope, Activity, AlertTriangle } from 'lucide-react';

const HealthRecommendations = ({ aqi }) => {
  const getRecommendations = (aqi) => {
    if (aqi <= 50) {
      return {
        level: 'Good',
        color: 'from-green-400 to-green-600',
        icon: Heart,
        recommendations: [
          'Perfect day for outdoor activities',
          'Enjoy your morning jog or bike ride',
          'Windows can be kept open for fresh air',
          'Great time for outdoor exercise'
        ],
        advice: 'Air quality is excellent. Enjoy outdoor activities!'
      };
    }
    
    if (aqi <= 100) {
      return {
        level: 'Moderate',
        color: 'from-yellow-400 to-yellow-600',
        icon: Activity,
        recommendations: [
          'Outdoor activities are generally safe',
          'Sensitive individuals should limit prolonged outdoor exertion',
          'Consider indoor activities if you have respiratory conditions',
          'Monitor air quality throughout the day'
        ],
        advice: 'Air quality is acceptable for most people.'
      };
    }
    
    if (aqi <= 150) {
      return {
        level: 'Unhealthy for Sensitive Groups',
        color: 'from-orange-400 to-orange-600',
        icon: Stethoscope,
        recommendations: [
          'Sensitive groups should reduce outdoor activities',
          'Consider wearing a mask when going outside',
          'Keep windows closed and use air purifiers',
          'Limit outdoor exercise, especially near busy roads'
        ],
        advice: 'Sensitive individuals should take precautions.'
      };
    }
    
    return {
      level: 'Unhealthy',
      color: 'from-red-400 to-red-600',
      icon: AlertTriangle,
      recommendations: [
        'Avoid outdoor activities',
        'Keep windows and doors closed',
        'Use air purifiers indoors',
        'Wear N95 masks if you must go outside',
        'Consider staying indoors'
      ],
      advice: 'Everyone should avoid outdoor activities.'
    };
  };

  const recommendations = getRecommendations(aqi);
  const IconComponent = recommendations.icon;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center mb-4">
        <IconComponent className="mr-3 text-2xl" size={32} />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Health Recommendations</h3>
          <p className={`text-lg font-semibold bg-gradient-to-r ${recommendations.color} bg-clip-text text-transparent`}>
            {recommendations.advice}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.recommendations.map((rec, index) => (
          <div 
            key={index}
            className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${recommendations.color} mt-2 mr-3 flex-shrink-0`}></div>
            <p className="text-gray-700">{rec}</p>
          </div>
        ))}
      </div>

      {/* Additional Health Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <h4 className="font-semibold text-blue-800 mb-2">General Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Stay hydrated and drink plenty of water</li>
          <li>• Consider using indoor plants to improve air quality</li>
          <li>• Regular health check-ups are recommended</li>
          <li>• Follow local air quality alerts and warnings</li>
        </ul>
      </div>
    </div>
  );
};

export default HealthRecommendations;
