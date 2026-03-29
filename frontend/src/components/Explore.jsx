import React, { useState, useContext, createContext } from "react";
import { BookOpen, Brain, Lightbulb, Play, Trophy, Star } from "lucide-react";
import Learn from "../components/Learn";
import Quizzes from "../components/Quizzes";
import Scenarios from "../components/Scenarios";
import Videos from "../components/Videos";
import BadgeSystem from "../components/BadgeSystem";

export const BadgeContext = createContext();

const Explore = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState({
    quizzesCompleted: 0,
    scenariosCompleted: 0,
    videosWatched: 0,
    perfectQuizzes: 0,
    streakDays: 0
  });

  const addBadge = (badgeId, badgeName, badgeDescription, badgeIcon, badgeColor) => {
    const newBadge = {
      id: badgeId,
      name: badgeName,
      description: badgeDescription,
      icon: badgeIcon,
      color: badgeColor,
      earnedAt: new Date().toISOString()
    };
    setBadges(prev => {
      if (prev.find(badge => badge.id === badgeId)) return prev;
      return [...prev, newBadge];
    });
  };

  const updateAchievements = (type, increment = 1) => {
    setAchievements(prev => ({
      ...prev,
      [type]: prev[type] + increment
    }));
  };

  const tabs = [
    { id: 'learn', name: 'Learn', icon: <BookOpen className="w-5 h-5" />, component: Learn },
    { id: 'quizzes', name: 'Quizzes', icon: <Brain className="w-5 h-5" />, component: Quizzes },
    { id: 'scenarios', name: 'Scenarios', icon: <Lightbulb className="w-5 h-5" />, component: Scenarios },
    { id: 'videos', name: 'Videos', icon: <Play className="w-5 h-5" />, component: Videos },
    { id: 'badges', name: 'My Badges', icon: <Trophy className="w-5 h-5" />, component: BadgeSystem }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <BadgeContext.Provider value={{ badges, addBadge, achievements, updateAchievements }}>
      <div className="min-h-screen bg-[#E6FFFA]">
        <div className="container mx-auto px-4 py-8">
          {/* Enhanced Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < achievements.perfectQuizzes ? 'text-[#4FD1C5] fill-current' : 'text-gray-300'} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#2C7A7B] mb-6 animate-fade-in">
              🌬️ Air Quality Academy
            </h1>
            <p className="text-xl text-[#2C7A7B] max-w-4xl mx-auto leading-relaxed mb-6">
              Master air quality knowledge through interactive learning, challenging quizzes, 
              real-world scenarios, and engaging videos. Earn badges and become an air quality expert!
            </p>
            
            {/* Achievement Summary */}
            <div className="flex justify-center space-x-6 text-sm text-[#2C7A7B] bg-white/80 backdrop-blur rounded-xl p-4 inline-block shadow-md">
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-[#4FD1C5]" />
                <span>{badges.length} Badges</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4 text-[#319795]" />
                <span>{achievements.quizzesCompleted} Quizzes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lightbulb className="w-4 h-4 text-[#4FD1C5]" />
                <span>{achievements.scenariosCompleted} Scenarios</span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group focus:outline-none
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] text-white shadow-xl scale-105'
                    : 'bg-white/90 backdrop-blur text-[#2C7A7B] hover:scale-105 hover:shadow-lg'
                  }`}
                style={{ border: "none" }} 
              >
                <div className={`p-1 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-[#E6FFFA]'}`}>
                  {tab.icon}
                </div>
                <span>{tab.name}</span>
                {tab.id === 'badges' && badges.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#319795] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {badges.length}
                  </div>
                )}
                {/* Only show border on hover or active via this absolutely positioned div */}
                <div className={`pointer-events-none absolute inset-0 rounded-xl border-2 transition-all duration-300
                  ${activeTab === tab.id ? 'border-[#4FD1C5] shadow-lg shadow-[#4FD1C5]/25' : 'border-transparent group-hover:border-[#4FD1C5]'}`}></div>
              </button>
            ))}
          </div>

          {/* Content Area with Enhanced Animation */}
          <div className="animate-fade-in">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
      
      {/* Animations */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </BadgeContext.Provider>
  );
};

export default Explore;
