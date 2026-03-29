import React, { useState } from 'react';
import { Shield, Clock, Brain, AlertTriangle, Loader2, User, ChevronRight } from 'lucide-react';
import axios from 'axios';


const PersonalizedHealthAdvisor = ({ aqiData, user }) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMask, setSelectedMask] = useState(null);

  const maskOptions = [
    { id: 0, label: "No Mask", efficiency: "0%", icon: "❌" },
    { id: 1, label: "Cloth Mask", efficiency: "60%", icon: "😷" },
    { id: 2, label: "Surgical Mask", efficiency: "80%", icon: "🏥" },
    { id: 3, label: "N95 / N99", efficiency: "95%+", icon: "🛡️" },
  ];

  const handleMaskSelection = async (maskId) => {
    setSelectedMask(maskId);
    setLoading(true);
    
    try {
      // NOTE: Using localhost:5000 directly to avoid proxy issues
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/health/check`, {
  userId: user._id || user.id,
        userData: { 
            ...user, 
            mask_type: maskId,
            age: user.age || 25,
            is_smoker: user.isSmoker || false,
            has_asthma: user.hasAsthma || false
        },
        aqiData: aqiData, // Passing the full object
        locationName: aqiData.location || "Current Location",
        coordinates: [aqiData.coordinates?.lng || 0, aqiData.coordinates?.lat || 0]
      });
      
      setPrediction(response.data);
    } catch (err) {
      console.error("ML Service Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-teal-100 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Brain size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-teal-500 rounded-2xl text-white shadow-lg shadow-teal-200">
            <Brain size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Personalized Health Advisor</h3>
            <p className="text-gray-500 text-sm">AI-Powered Risk Mitigation for {user?.name}</p>
          </div>
        </div>

        <p className="text-gray-700 font-medium mb-4">What protection are you wearing right now?</p>
        
        {/* MASK BUTTONS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {maskOptions.map((mask) => (
            <button
              key={mask.id}
              onClick={() => handleMaskSelection(mask.id)}
              disabled={loading}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedMask === mask.id 
                ? 'border-teal-500 bg-teal-50 shadow-md transform scale-105' 
                : 'border-gray-100 hover:border-teal-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-3xl mb-2">{mask.icon}</span>
              <span className="font-bold text-gray-800 text-sm">{mask.label}</span>
              <span className="text-[10px] text-teal-600 font-semibold">{mask.efficiency} Protection</span>
            </button>
          ))}
        </div>

        {/* RESULTS SECTION */}
        <div className="min-h-[150px] flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-6">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-teal-600">
              <Loader2 className="animate-spin" size={40} />
              <p className="font-semibold animate-pulse">Running Ensemble Model...</p>
            </div>
          ) : prediction ? (
            <div className="w-full space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50">
                  <div className="flex items-center gap-2 text-blue-500 mb-2">
                    <Shield size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">Internal Dose</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900">
                        {prediction.scientificMetrics?.effectivePm25}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">μg/m³</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-50">
                  <div className="flex items-center gap-2 text-orange-500 mb-2">
                    <Clock size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">Safety Window</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900">
                        {prediction.scientificMetrics?.safeWindowHours}
                    </span>
                    <span className="text-gray-400 text-sm font-medium">Hours Left</span>
                  </div>
                </div>
              </div>

              {/* REASONING & RECOMENDATION */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-teal-500">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="text-teal-600 mt-1 shrink-0" size={24} />
                    <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-1">{prediction.riskStatus}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{prediction.recommendation}</p>
                        <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded">
                            PRIMARY DRIVER: {prediction.mainDriver?.toUpperCase()}
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 text-lg font-medium">No Analysis Available</p>
              <p className="text-gray-300 text-sm">Select a mask above to calculate your personalized exposure.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHealthAdvisor;