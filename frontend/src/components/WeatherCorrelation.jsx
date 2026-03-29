
import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const WeatherCorrelation = ({ currentData }) => {
  const getCorrelationInsight = () => {
    const { aqi, temperature, humidity, windSpeed } = currentData;
    
    if (windSpeed > 15 && aqi < 60) {
      return {
        message: "Strong winds are helping disperse pollutants",
        color: "text-green-600",
        bgColor: "bg-green-50"
      };
    }
    
    if (humidity > 70 && aqi > 80) {
      return {
        message: "High humidity may be trapping pollutants",
        color: "text-orange-600",
        bgColor: "bg-orange-50"
      };
    }
    
    if (temperature > 30 && aqi > 70) {
      return {
        message: "Hot weather can worsen air quality",
        color: "text-red-600",
        bgColor: "bg-red-50"
      };
    }
    
    return {
      message: "Weather conditions are neutral for air quality",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    };
  };

  const insight = getCorrelationInsight();

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center mb-6">
        <Cloud className="mr-2 text-blue-500" size={24} />
        <h3 className="text-2xl font-bold text-gray-800">Weather Impact</h3>
      </div>

      <div className={`p-4 rounded-lg ${insight.bgColor} border-l-4 border-blue-400 mb-6`}>
        <p className={`${insight.color} font-medium`}>{insight.message}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
          <Thermometer className="mx-auto mb-2 text-orange-500" size={24} />
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="text-xl font-bold text-gray-800">{currentData.temperature.toFixed(3)}°C</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((currentData.temperature / 40) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
          <Droplets className="mx-auto mb-2 text-blue-500" size={24} />
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-xl font-bold text-gray-800">{currentData.humidity.toFixed(3)}%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${currentData.humidity}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center">
          <Wind className="mx-auto mb-2 text-gray-500" size={24} />
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-xl font-bold text-gray-800">{currentData.windSpeed.toFixed(3)} km/h</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-gray-400 to-gray-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((currentData.windSpeed / 30) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center">
          <div className="w-6 h-6 mx-auto mb-2 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">AQI</span>
          </div>
          <p className="text-sm text-gray-600">Air Quality</p>
          <p className="text-xl font-bold text-gray-800">{Math.round(currentData.aqi).toFixed(3)}</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((currentData.aqi / 300) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCorrelation;
