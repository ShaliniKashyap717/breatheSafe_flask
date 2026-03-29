import React, { useState } from 'react';
import { Play, ExternalLink, BookOpen, Users, Globe } from 'lucide-react';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videoCategories = [
    { id: 'all', name: 'All Videos', icon: <Globe className="w-4 h-4" /> },
    { id: 'basics', name: 'Air Quality Basics', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'health', name: 'Health Impact', icon: <Users className="w-4 h-4" /> },
    { id: 'protection', name: 'Protection Methods', icon: <Play className="w-4 h-4" /> }
  ];

  const videos = [
    {
      id: 1,
      title: "What is Air Quality Index (AQI)?",
      description: "Learn the basics of AQI and how it's calculated",
      embedId: "3E0BZmWvhG8",
      duration: "4:32",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/3E0BZmWvhG8/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "PM2.5 Explained: The Invisible Threat",
      description: "Understanding particulate matter and its health effects",
      embedId: "GVBeY1jSG9Y",
      duration: "6:15",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/GVBeY1jSG9Y/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "How Air Pollution Affects Your Health",
      description: "The science behind pollution's impact on human body",
      embedId: "qtOoOI6z6Ag",
      duration: "8:45",
      category: "health",
      thumbnail: "https://img.youtube.com/vi/qtOoOI6z6Ag/maxresdefault.jpg"
    },
    {
      id: 4,
      title: "Protecting Yourself from Air Pollution",
      description: "Practical tips to reduce exposure to harmful air",
      embedId: "V3-waqXOJgQ",
      duration: "5:20",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/V3-waqXOJgQ/maxresdefault.jpg"
    },
    {
      id: 5,
      title: "Indoor Air Quality vs Outdoor Air Quality",
      description: "Comparing and managing air quality in different environments",
      embedId: "KeSUDNOWn9g",
      duration: "7:10",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/KeSUDNOWn9g/maxresdefault.jpg"
    },
    {
      id: 6,
      title: "Air Pollution and Climate Change",
      description: "Understanding the connection between pollution and climate",
      embedId: "jHLl5VgmvUE",
      duration: "9:30",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/jHLl5VgmvUE/maxresdefault.jpg"
    },
    {
      id: 7,
      title: "The Hidden Health Impacts of Air Pollution",
      description: "Long-term effects on cardiovascular and respiratory systems",
      embedId: "MJl1FNPtCU0",
      duration: "11:20",
      category: "health",
      thumbnail: "https://img.youtube.com/vi/MJl1FNPtCU0/maxresdefault.jpg"
    },
    {
      id: 8,
      title: "Air Purifiers: Do They Really Work?",
      description: "Science-based review of air purification technologies",
      embedId: "kH5APw_SLUU",
      duration: "8:15",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/kH5APw_SLUU/maxresdefault.jpg"
    },
    {
      id: 9,
      title: "Wildfire Smoke and Air Quality",
      description: "How to protect yourself during wildfire season",
      embedId: "IU27Nr3pbgs",
      duration: "6:45",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/IU27Nr3pbgs/maxresdefault.jpg"
    },
    {
      id: 10,
      title: "Children and Air Pollution",
      description: "Special considerations for protecting young lungs",
      embedId: "7KJp_Ma3Par",
      duration: "7:55",
      category: "health",
      thumbnail: "https://img.youtube.com/vi/7KJp_Ma3Par/maxresdefault.jpg"
    },
    {
      id: 11,
      title: "N95 vs Surgical Masks for Air Pollution",
      description: "Choosing the right mask for different pollution levels",
      embedId: "7ie0dOucyPw",
      duration: "5:40",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/7ie0dOucyPw/maxresdefault.jpg"
    },
    {
      id: 12,
      title: "Urban Air Quality Solutions",
      description: "How cities are fighting air pollution",
      embedId: "AZIWGNCxWBU",
      duration: "12:30",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/AZIWGNCxWBU/maxresdefault.jpg"
    }
  ];

  const [playingVideo, setPlayingVideo] = useState(null);

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  const openVideo = (videoId) => {
    setPlayingVideo(videoId);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="space-y-8 px-4 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Play className="w-9 h-9 text-[#2C7A7B]" />
          <h2 className="text-4xl font-bold text-[#2C7A7B]">Educational Videos</h2>
        </div>
        <p className="text-[#319795] max-w-2xl mx-auto">
          Watch engaging videos to deepen your understanding of air quality and its impact on health.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {videoCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm
              ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] text-white scale-105 shadow-md'
                  : 'bg-[#E6FFFA] text-[#319795] hover:bg-[#B2F5EA] hover:scale-105'
              }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#EDF2F7] hover:border-[#4FD1C5] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg animate-fade-in"
          >
            {/* Thumbnail */}
            <div className="relative group cursor-pointer" onClick={() => openVideo(video.id)}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-[#2C7A7B]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#4FD1C5] rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-[#2C7A7B] bg-opacity-80 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </div>
            </div>
            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#2C7A7B] mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-[#319795] text-sm mb-4 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    video.category === 'basics' ? 'bg-[#E6FFFA] text-[#2C7A7B]' :
                    video.category === 'health' ? 'bg-[#C6F6D5] text-[#38A169]' :
                    'bg-[#E9D8FD] text-[#805AD5]'
                  }`}>
                  {videoCategories.find(cat => cat.id === video.category)?.name || 'General'}
                </span>
                <button
                  onClick={() => openVideo(video.id)}
                  className="flex items-center space-x-1 text-[#2C7A7B] hover:text-[#319795] font-medium transition-colors duration-200"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-[#2C7A7B]/70 flex items-center justify-center z-50 p-4 animate-fade-in-slow">
          <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-xl border-2 border-[#4FD1C5]">
            <div className="flex items-center justify-between p-4 border-b border-[#EDF2F7]">
              <h3 className="text-lg font-semibold text-[#2C7A7B]">
                {videos.find(v => v.id === playingVideo)?.title}
              </h3>
              <div className="flex items-center space-x-2">
                <a
                  href={`https://www.youtube.com/watch?v=${videos.find(v => v.id === playingVideo)?.embedId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-[#4FD1C5] hover:text-[#319795] transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
                <button
                  onClick={closeVideo}
                  className="text-[#A0AEC0] hover:text-[#2C7A7B] text-2xl leading-none font-bold"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videos.find(v => v.id === playingVideo)?.embedId}?autoplay=1`}
                title={videos.find(v => v.id === playingVideo)?.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] rounded-2xl p-8 text-white text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Keep Learning!</h3>
        <p className="text-[#E6FFFA] mb-6 max-w-2xl mx-auto">
          Understanding air quality through visual content helps you make better decisions for your health.
          Share these videos with friends and family to spread awareness!
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">📚 Learn Continuously</h4>
            <p>Stay updated with the latest air quality research</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">👥 Share Knowledge</h4>
            <p>Help others understand air quality importance</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">🎯 Take Action</h4>
            <p>Apply what you learn to protect your health</p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.8s;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
};

export default Videos;
