import React, { useState, useEffect, useContext } from 'react'; 
import { UserContext } from '../context/UserContext'; 
import AQICard from './AQICard';
import PollutantCard from './PollutantCard';
import HealthRecommendations from './HealthRecommendations';
import PersonalizedHealthAdvisor from './PersonalizedHealthAdvisor';
import AQITrendsChart from './AQITrendsChart';
import WeatherCorrelation from './WeatherCorrelation';
import { Wind, Thermometer, Droplets, Eye, Activity, TrendingUp, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';


const Dashboard = () => {

  const { currentUser } = useContext(UserContext);

  const [currentData, setCurrentData] = useState({
    aqi: 0,
    location: "",
    temperature: 0,
    humidity: 0,
    visibility: 0,
    windSpeed: 0,
    pollutants: {
      pm25: 0,
      pm10: 0,
      o3: 0,
      no2: 0,
      co: 0
    },
    lastUpdated: new Date(),
    coordinates: { lat: 0, lng: 0 }
  });
const [rawAqi, setRawAqi] = useState(null);
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasData, setHasData] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const API_TOKEN = import.meta.env.VITE_WAQI_API_TOKEN;
  console.log(API_TOKEN)


  const fetchAirQualityData = async (location) => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching data for location:', location);
      
      const coordPattern = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
      const isCoordinates = coordPattern.test(location.replace(/\s/g, ''));
      
      let url;
      if (isCoordinates) {
        const [lat, lng] = location.split(',').map(coord => coord.trim());
        url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${API_TOKEN}`;
      } else {
        url = `https://api.waqi.info/feed/${encodeURIComponent(location)}/?token=${API_TOKEN}`;
      }
      
      console.log('API URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.status === 'ok' && data.data) {
        const aqiData = data.data;

      setRawAqi(aqiData); 
        
        const pollutants = {
          pm25: aqiData.iaqi?.pm25?.v || 0,
          pm10: aqiData.iaqi?.pm10?.v || 0,
          o3: aqiData.iaqi?.o3?.v || 0,
          no2: aqiData.iaqi?.no2?.v || 0,
          co: aqiData.iaqi?.co?.v || 0
        };

        const temperature = aqiData.iaqi?.t?.v || 0;
        const humidity = aqiData.iaqi?.h?.v || 0;
        const windSpeed = aqiData.iaqi?.w?.v || 0;
        const pressure = aqiData.iaqi?.p?.v || 0;

        const coordinates = aqiData.city?.geo ? 
          { lat: aqiData.city.geo[0], lng: aqiData.city.geo[1] } : 
          { lat: 0, lng: 0 };

        setCurrentData({
          aqi: aqiData.aqi || 0,
          location: aqiData.city?.name || location,
          temperature: temperature,
          humidity: humidity,
          visibility: pressure > 0 ? Math.round(pressure / 100) : 10, 
          windSpeed: windSpeed,
          pollutants: pollutants,
          lastUpdated: new Date(),
          coordinates: coordinates
        });
        
        setHasData(true);
        console.log('Data updated successfully');
      } else {
        setError(data.message || 'Failed to fetch air quality data. Please check the location and try again.');
        console.error('API Error:', data);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setGettingLocation(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setGettingLocation(false);
      return;
    }

    console.log('Requesting high-accuracy location...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log('Location obtained:', { latitude, longitude, accuracy });
        console.log('Accuracy:', accuracy, 'meters');
        
        fetchAirQualityData(`${latitude.toFixed(6)},${longitude.toFixed(6)}`);
        setGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to retrieve your location. ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        setError(errorMessage + ' Please enter a location manually.');
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, 
        maximumAge: 60000 
      }
    );
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (locationInput.trim()) {
      fetchAirQualityData(locationInput.trim());
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (hasData && currentData.coordinates.lat !== 0) {
      const interval = setInterval(() => {
        fetchAirQualityData(`${currentData.coordinates.lat},${currentData.coordinates.lng}`);
      }, 600000); // 10 minutes

      return () => clearInterval(interval);
    }
  }, [hasData, currentData.coordinates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6FFFA] via-[#F7FAFC] to-[#EDF2F7] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#2C7A7B] via-[#319795] to-[#4FD1C5] bg-clip-text text-transparent mb-2">
            Air Quality Dashboard
          </h1>
          <p className="text-[#A0AEC0] text-lg">Real-time Environmental Monitoring</p>
        </div>

        {/* Location Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <form onSubmit={handleLocationSubmit} className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter city name or coordinates"
                  className="w-full px-4 py-3 rounded-xl border border-[#EDF2F7] focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent outline-none transition-all duration-200 bg-white"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !locationInput.trim()}
                className="px-8 py-3 bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] text-white rounded-xl font-semibold hover:from-[#319795] hover:to-[#68D391] focus:ring-2 focus:ring-[#4FD1C5] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Loading...' : 'Get Air Quality'}
              </button>
            </form>
            <button
              onClick={getCurrentLocation}
              disabled={gettingLocation || loading}
              className="px-6 py-3 bg-gradient-to-r from-[#38A169] to-[#68D391] text-white rounded-xl font-semibold hover:from-[#2F855A] hover:to-[#48BB78] focus:ring-2 focus:ring-[#68D391] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <MapPin size={20} />
              {gettingLocation ? 'Getting Location...' : 'Use My Location'}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-[#FED7D7] border border-[#E53E3E] text-[#E53E3E] rounded-xl">
              {error}
            </div>
          )}
        </div>

        {hasData && (
          <>
            {/* Last Updated Info */}
            <div className="text-center mb-6">
              <div className="text-sm text-[#A0AEC0] flex items-center justify-center gap-2">
                <Activity className="text-[#38A169]" size={16} />
                Last updated: {currentData.lastUpdated.toLocaleTimeString()}
              </div>
            </div>

          {/* Main AQI Display */}
<div className="mb-8 animate-scale-in">
  <AQICard aqi={currentData.aqi} location={currentData.location} />
</div>

{/* ML PERSOANLIZED ANALYSIS CARD */}
<div className="mb-8">
   {console.log("Dashboard state check:", { hasData, currentUser, currentData })}
   {
   hasData && currentUser &&(
<PersonalizedHealthAdvisor 
  aqiData={rawAqi} // Pass the raw data from the API
  user={currentUser}  
/>
    )
   }
 
</div>


            {/* Map Section */}
            {currentData.coordinates.lat !== 0 && currentData.coordinates.lng !== 0 && (
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#EDF2F7] relative z-10">
                  <h3 className="text-xl font-semibold text-[#2C7A7B] mb-4 flex items-center gap-2">
                    <MapPin className="text-[#4FD1C5]" size={24} />
                    Air Quality Map - {currentData.location}
                  </h3>
                  <div className="h-96 rounded-xl overflow-hidden relative z-0">
                    <MapContainer
                      center={[currentData.coordinates.lat, currentData.coordinates.lng]}
                      zoom={10}
                      style={{ height: '100%', width: '100%', zIndex: 1 }}
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <TileLayer
                        url={`https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${API_TOKEN}`}
                        attribution='Air Quality tiles &copy; <a href="https://waqi.info/">WAQI</a>'
                        opacity={0.7}
                      />
                      <Marker position={[currentData.coordinates.lat, currentData.coordinates.lng]}>
                        <Popup>
                          <div className="text-center">
                            <strong>{currentData.location}</strong><br/>
                            AQI: {currentData.aqi}<br/>
                            {currentData.aqi <= 50 ? 'Good' : currentData.aqi <= 100 ? 'Moderate' : currentData.aqi <= 150 ? 'Unhealthy for Sensitive' : currentData.aqi <= 200 ? 'Unhealthy' : 'Very Unhealthy'}
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-[#F6AD55] to-[#ECC94B] backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#EDF2F7]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-800 text-sm font-medium">Temperature</p>
                    <p className="text-3xl font-bold text-orange-900">{currentData.temperature.toFixed(3)}°C</p>
                    <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(Math.max((currentData.temperature + 10) / 50 * 100, 0), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <Thermometer className="text-orange-700" size={32} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#4FD1C5] to-[#319795] backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#EDF2F7]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">Humidity</p>
                    <p className="text-3xl font-bold text-white">{currentData.humidity.toFixed(3)}%</p>
                    <div className="mt-2 w-full bg-teal-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(currentData.humidity, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <Droplets className="text-white" size={32} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#A0AEC0] to-[#718096] backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#EDF2F7]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">Wind Speed</p>
                    <p className="text-3xl font-bold text-white">{currentData.windSpeed.toFixed(3)} km/h</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-gray-400 to-gray-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((currentData.windSpeed / 30) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <Wind className="text-white" size={32} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#2C7A7B] to-[#285E61] backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#EDF2F7]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">Visibility</p>
                    <p className="text-3xl font-bold text-white">{currentData.visibility.toFixed(3)} km</p>
                    <div className="mt-2 w-full bg-teal-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((currentData.visibility / 15) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <Eye className="text-white" size={32} />
                </div>
              </div>
            </div>

            {/* Charts and Weather Correlation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <AQITrendsChart />
              <WeatherCorrelation currentData={currentData} />
            </div>

            {/* Pollutants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <PollutantCard 
                name="PM2.5" 
                value={currentData.pollutants.pm25.toFixed(1)} 
                unit="μg/m³"
                description="Fine particulate matter"
                color="from-[#E53E3E] to-red-600"
              />
              <PollutantCard 
                name="PM10" 
                value={currentData.pollutants.pm10.toFixed(1)} 
                unit="μg/m³"
                description="Coarse particulate matter"
                color="from-[#F6AD55] to-[#ECC94B]"
              />
              <PollutantCard 
                name="O₃" 
                value={currentData.pollutants.o3.toFixed(1)} 
                unit="μg/m³"
                description="Ground-level ozone"
                color="from-[#4FD1C5] to-[#319795]"
              />
              <PollutantCard 
                name="NO₂" 
                value={currentData.pollutants.no2.toFixed(1)} 
                unit="μg/m³"
                description="Nitrogen dioxide"
                color="from-[#F6AD55] to-[#ECC94B]"
              />
              <PollutantCard 
                name="CO" 
                value={currentData.pollutants.co.toFixed(1)} 
                unit="mg/m³"
                description="Carbon monoxide"
                color="from-[#A0AEC0] to-[#718096]"
              />
              <div className="bg-gradient-to-br from-[#C6F6D5] to-[#68D391] backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-[#EDF2F7]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#22543D]">Overall Status</h3>
                  <TrendingUp className="text-[#38A169]" size={24} />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#22543D] mb-2">
                    {currentData.aqi <= 50 ? 'Good' : currentData.aqi <= 100 ? 'Moderate' : currentData.aqi <= 150 ? 'Unhealthy for Sensitive' : currentData.aqi <= 200 ? 'Unhealthy' : 'Very Unhealthy'}
                  </div>
                  <p className="text-[#38A169] text-sm">Air quality assessment</p>
                </div>
              </div>
            </div>

            {/* Health Recommendations */}
            <div className="mb-8">
              <HealthRecommendations aqi={currentData.aqi} />
            </div>
          </>
        )}

        {!hasData && !loading && !gettingLocation && (
          <div className="text-center py-12">
            <div className="text-[#2C7A7B] text-lg mb-4">
              Click "Use My Location" to view your local air quality or enter a city name/coordinates
            </div>
            <div className="text-sm text-[#A0AEC0]">
              Examples: "Mumbai", "New Delhi", "19.0760,72.8777"
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        `}
      </style>
    </div>
  );
};

export default Dashboard;