
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, Filter, TrendingUp, MapPin, Loader } from 'lucide-react';

const AQITrendsChart = () => {
  const [timeRange, setTimeRange] = useState('current');
  const [chartType, setChartType] = useState('bar');
  const [airQualityData, setAirQualityData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const WAQI_TOKEN = '2d0cb996f45520d273a8e6ebc45c7742225d23b0';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Using default location.');
          setLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLocation({ lat: 37.7749, lng: -122.4194 });
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchAirQualityData();
    }
  }, [location]);

  const fetchAirQualityData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.waqi.info/feed/geo:${location.lat};${location.lng}/?token=${WAQI_TOKEN}`
      );
      const data = await response.json();
      
      if (data.status === 'ok') {
        setAirQualityData(data.data);
        setError(null);
      } else {
        setError('Failed to fetch air quality data');
      }
    } catch (err) {
      console.error('Error fetching air quality data:', err);
      setError('Failed to fetch air quality data');
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!airQualityData || !airQualityData.iaqi) return [];

    const pollutants = [];
    const iaqi = airQualityData.iaqi;

    if (iaqi.pm25) pollutants.push({ name: 'PM2.5', value: iaqi.pm25.v, color: '#ef4444' });
    if (iaqi.pm10) pollutants.push({ name: 'PM10', value: iaqi.pm10.v, color: '#f59e0b' });
    if (iaqi.so2) pollutants.push({ name: 'SO2', value: iaqi.so2.v, color: '#8b5cf6' });
    if (iaqi.no2) pollutants.push({ name: 'NO2', value: iaqi.no2.v, color: '#06b6d4' });
    if (iaqi.o3) pollutants.push({ name: 'O3', value: iaqi.o3.v, color: '#10b981' });
    if (iaqi.co) pollutants.push({ name: 'CO', value: iaqi.co.v, color: '#f97316' });

    return pollutants;
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#10b981';
    if (aqi <= 100) return '#f59e0b';
    if (aqi <= 150) return '#f97316';
    if (aqi <= 200) return '#ef4444';
    if (aqi <= 300) return '#a855f7';
    return '#7c2d12';
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const chartData = getChartData();

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <Loader className="animate-spin mx-auto mb-4 text-blue-500" size={32} />
            <p className="text-gray-600">Loading air quality data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchAirQualityData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="mr-2 text-blue-500" size={24} />
          <h3 className="text-2xl font-bold text-gray-800">Real-Time Air Quality of current location</h3>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-gray-600" size={16} />
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
            </select>
          </div>
          
          <button 
            onClick={fetchAirQualityData}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {airQualityData && (
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-gray-600" size={16} />
              <span className="text-gray-700">{airQualityData.city?.name || 'Current Location'}</span>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date(airQualityData.time?.s).toLocaleString()}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div 
              className="px-4 py-2 rounded-lg text-white font-bold text-xl"
              style={{ backgroundColor: getAQIColor(airQualityData.aqi) }}
            >
              AQI: {airQualityData.aqi}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              {getAQILevel(airQualityData.aqi)}
            </div>
          </div>
        </div>
      )}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" label={{ value: 'Concentration (μg/m³)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [`${value} μg/m³`, name]}
              />
              <Bar 
                dataKey="value" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                onClick={(data) => console.log('Clicked:', data)}
              />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" label={{ value: 'Concentration (μg/m³)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [`${value} μg/m³`, name]}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-4 gap-6 flex-wrap">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-600">{item.name}: {item.value} μg/m³</span>
          </div>
        ))}
      </div>

      {airQualityData && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Health Information</h4>
          <p className="text-sm text-gray-600">
            {airQualityData.aqi <= 50 && "Air quality is satisfactory, and air pollution poses little or no risk."}
            {airQualityData.aqi > 50 && airQualityData.aqi <= 100 && "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."}
            {airQualityData.aqi > 100 && airQualityData.aqi <= 150 && "Members of sensitive groups may experience health effects. The general public is less likely to be affected."}
            {airQualityData.aqi > 150 && airQualityData.aqi <= 200 && "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."}
            {airQualityData.aqi > 200 && airQualityData.aqi <= 300 && "Health alert: The risk of health effects is increased for everyone."}
            {airQualityData.aqi > 300 && "Health warning of emergency conditions: everyone is more likely to be affected."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AQITrendsChart;
