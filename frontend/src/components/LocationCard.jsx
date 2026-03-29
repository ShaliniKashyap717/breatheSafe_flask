
import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const LocationCard = ({ currentLocation, onLocationChange }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const popularLocations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLocationChange(searchQuery.trim());
      setSearchQuery('');
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <MapPin className="mr-2 text-blue-500" size={24} />
          Location
        </h3>
        <button
          onClick={() => setIsSearching(!isSearching)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <Search size={16} />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-lg text-gray-700">{currentLocation}</p>
      </div>

      {isSearching && (
        <div className="animate-fade-in">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div>
            <p className="text-sm text-gray-600 mb-2">Popular locations:</p>
            <div className="grid grid-cols-2 gap-2">
              {popularLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    onLocationChange(location);
                    setIsSearching(false);
                  }}
                  className="text-left px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
