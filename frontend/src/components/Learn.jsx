
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, AlertTriangle, Shield, Wind } from 'lucide-react';

const Learn = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const learningTopics = [
    {
      id: 1,
      title: "What is Air Quality Index (AQI)?",
      icon: <Info className="w-6 h-6" />,
      summary: "AQI is a standardized way to communicate air pollution levels to the public",
      content: "The Air Quality Index (AQI) is a numerical scale used to communicate how polluted the air currently is or how polluted it is forecast to become. It ranges from 0 to 500, where higher values indicate greater levels of air pollution and greater health concerns. The AQI is calculated based on five major air pollutants: ground-level ozone, particulate matter (PM2.5 and PM10), carbon monoxide, sulfur dioxide, and nitrogen dioxide.",
      color: "bg-[#E6FFFA] border-[#4FD1C5]"
    },
    {
      id: 2,
      title: "Understanding PM2.5 Particles",
      icon: <AlertTriangle className="w-6 h-6" />,
      summary: "Tiny particles that can penetrate deep into your lungs and bloodstream",
      content: "PM2.5 refers to particulate matter with a diameter of 2.5 micrometers or smaller. These particles are so small that they can penetrate deep into the lungs and even enter the bloodstream. They come from vehicle emissions, industrial processes, wildfires, and dust storms. Long-term exposure to PM2.5 can cause serious health problems including heart disease, lung cancer, and premature death.",
      color: "bg-red-50 border-red-200"
    },
    {
      id: 3,
      title: "What are PM10 Particles?",
      icon: <Wind className="w-6 h-6" />,
      summary: "Larger particles that can irritate your airways and lungs",
      content: "PM10 particles have a diameter of 10 micrometers or smaller. While larger than PM2.5, they can still penetrate into the lungs and cause respiratory problems. Common sources include dust from construction sites, landfills, agriculture, wildfires, and pollen. PM10 can cause coughing, wheezing, and reduced lung function, especially in sensitive individuals.",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      id: 4,
      title: "Why Air Quality Matters for Your Health",
      icon: <Shield className="w-6 h-6" />,
      summary: "Poor air quality affects every system in your body",
      content: "Air pollution doesn't just affect your lungs - it impacts your entire body. Poor air quality can cause immediate symptoms like coughing, throat irritation, and shortness of breath. Long-term exposure increases risks of cardiovascular disease, stroke, lung cancer, diabetes, and cognitive decline. Children, elderly, and people with pre-existing conditions are especially vulnerable.",
      color: "bg-[#E6FFFA] border-[#319795]"
    },
    {
      id: 5,
      title: "The Importance of Air Quality Monitoring",
      icon: <Info className="w-6 h-6" />,
      summary: "Real-time data helps you make informed decisions about outdoor activities",
      content: "Continuous air quality monitoring provides real-time data that helps individuals and communities make informed decisions. This data helps determine when it's safe to exercise outdoors, when to keep windows closed, and when sensitive individuals should limit outdoor exposure. Monitoring also helps track pollution trends and evaluate the effectiveness of pollution control measures.",
      color: "bg-[#E6FFFA] border-[#4FD1C5]"
    },
    {
      id: 6,
      title: "Why Regular Masks Don't Work Against Air Pollution",
      icon: <AlertTriangle className="w-6 h-6" />,
      summary: "Surgical masks and cloth masks offer limited protection against fine particles",
      content: "Regular surgical masks and cloth masks are designed to stop large droplets, not tiny air pollution particles. PM2.5 particles are 40 times smaller than the width of a human hair and can easily pass through these masks. For air pollution protection, you need specialized masks with HEPA filters or N95/N99 ratings that can filter out at least 95% of particles 0.3 micrometers or larger.",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2C7A7B] mb-4">Learn About Air Quality</h2>
        <p className="text-[#2C7A7B] max-w-2xl mx-auto">
          Understanding air quality is the first step toward protecting your health and making informed decisions about your daily activities.
        </p>
      </div>

      <div className="grid gap-6">
        {learningTopics.map((topic) => (
          <div
            key={topic.id}
            className={`${topic.color} rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
          >
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleCard(topic.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2C7A7B]">{topic.title}</h3>
                    <p className="text-[#319795] mt-1">{topic.summary}</p>
                  </div>
                </div>
                <div className="transition-transform duration-300">
                  {expandedCard === topic.id ? (
                    <ChevronUp className="w-6 h-6 text-[#2C7A7B]" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#2C7A7B]" />
                  )}
                </div>
              </div>
            </div>
            
            {expandedCard === topic.id && (
              <div className="px-6 pb-6 animate-fade-in">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-[#2C7A7B] leading-relaxed">{topic.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Take Action Today</h3>
        <p className="text-[#E6FFFA] mb-6">
          Knowledge is power. Use what you've learned to protect yourself and your loved ones from air pollution.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Check AQI Daily</h4>
            <p>Monitor air quality before outdoor activities</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Use Proper Masks</h4>
            <p>Invest in N95/N99 masks for polluted days</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Stay Informed</h4>
            <p>Keep learning about air quality and health</p>
          </div>
        </div>
      </div>
      
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
};

export default Learn;