
import React from 'react';

const PollutantCard = ({ name, value, unit, description, color }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${color}`}></div>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-800 mb-1">
          {value}
          <span className="text-lg text-gray-600 ml-1">{unit}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min((parseFloat(value) / 100) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PollutantCard;
