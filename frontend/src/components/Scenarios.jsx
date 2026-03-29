import React, { useState, useContext } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Lightbulb, RefreshCw, Shield, Award } from 'lucide-react';
import { BadgeContext } from './Explore';

const Scenarios = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const { addBadge, updateAchievements, achievements } = useContext(BadgeContext);

  const scenarios = [
    {
      id: 1,
      situation: "The AQI in your city is 165 (Unhealthy). You planned to go jogging in the park this morning.",
      choices: [
        "Go jogging as planned - exercise is always good",
        "Cancel outdoor exercise and work out indoors instead",
        "Wear a cloth mask and jog for a shorter time",
        "Wait until evening when it might be better"
      ],
      correct: 1,
      explanation: "When AQI is 165 (Unhealthy), everyone should avoid prolonged outdoor exertion. Indoor exercise is the safest option.",
      consequence: "Exercising outdoors in unhealthy air can cause respiratory irritation and worsen health conditions.",
      difficulty: "medium"
    },
    {
      id: 2,
      situation: "You're a parent and the AQI is 110 (Unhealthy for Sensitive Groups). Your child has asthma and wants to play outside.",
      choices: [
        "Let them play outside with an inhaler nearby",
        "Keep them indoors and suggest indoor activities",
        "Allow 30 minutes of light outdoor play",
        "Take them to an indoor playground instead"
      ],
      correct: 3,
      explanation: "Children with asthma are sensitive to air pollution. Indoor alternatives like indoor playgrounds provide safe exercise options.",
      consequence: "Protecting sensitive individuals from moderate pollution prevents respiratory flare-ups.",
      difficulty: "easy"
    },
    {
      id: 3,
      situation: "The AQI forecast shows 180 (Unhealthy) tomorrow. You need to commute to work by bike.",
      choices: [
        "Bike as usual - fresh air is good",
        "Take public transportation or drive instead",
        "Bike with an N95 mask",
        "Work from home if possible"
      ],
      correct: 3,
      explanation: "Working from home eliminates exposure entirely. If not possible, public transport with windows closed is second best.",
      consequence: "Reducing outdoor exposure time and physical exertion in polluted air protects your health.",
      difficulty: "medium"
    },
    {
      id: 4,
      situation: "Wildfire smoke has pushed the AQI to 220 (Very Unhealthy). Your air purifier broke yesterday.",
      choices: [
        "Open windows for ventilation",
        "Create a DIY air filter with a box fan and furnace filters",
        "Go to a shopping mall or library with good air filtration",
        "Both B and C are good options"
      ],
      correct: 3,
      explanation: "Both DIY air filters and seeking cleaner indoor spaces (malls, libraries) are effective strategies when AQI is very unhealthy.",
      consequence: "Having multiple strategies for very poor air quality can significantly reduce health risks.",
      difficulty: "hard"
    },
    {
      id: 5,
      situation: "The AQI is 45 (Good), but you notice hazy skies and smell smoke from a distant fire.",
      choices: [
        "Ignore it since AQI is good",
        "Monitor AQI frequently as conditions may change rapidly",
        "Proceed with all outdoor activities normally",
        "Close windows just to be safe"
      ],
      correct: 1,
      explanation: "Smoke and haze indicate conditions may worsen quickly. Frequent monitoring helps you respond to rapid changes.",
      consequence: "Early awareness of changing conditions allows for proactive health protection.",
      difficulty: "hard"
    },
    {
      id: 6,
      situation: "You're elderly with heart conditions. The AQI is 95 (Moderate) and you need groceries.",
      choices: [
        "Go shopping early in the morning",
        "Order groceries online for delivery",
        "Go shopping with an N95 mask",
        "Ask a family member to shop for you"
      ],
      correct: 1,
      explanation: "Online delivery eliminates exposure entirely. For elderly with heart conditions, avoiding outdoor exposure is safest.",
      consequence: "Seniors with heart conditions are at higher risk from even moderate pollution levels.",
      difficulty: "medium"
    },
    {
      id: 7,
      situation: "Your office has poor ventilation and the outdoor AQI is 75 (Moderate). Colleagues are coughing.",
      choices: [
        "Open windows to get fresh air",
        "Suggest improving indoor air with portable air purifiers",
        "Ignore it - moderate AQI isn't dangerous",
        "Work near the window"
      ],
      correct: 1,
      explanation: "Poor indoor air quality can be worse than moderate outdoor air. Air purifiers improve indoor air without bringing in outdoor pollution.",
      consequence: "Indoor air quality management is crucial for workplace health.",
      difficulty: "medium"
    },
    {
      id: 8,
      situation: "The AQI is 135 (Unhealthy for Sensitive Groups). Your neighbor is mowing their lawn and asks you to help.",
      choices: [
        "Help them - it's just yard work",
        "Politely decline and suggest postponing",
        "Help but wear a dust mask",
        "Suggest using an electric mower to reduce emissions"
      ],
      correct: 1,
      explanation: "Outdoor physical activity should be avoided when AQI reaches unhealthy levels. Postponing protects both of you.",
      consequence: "Lawn work stirs up particles and requires physical exertion, doubling the health risk.",
      difficulty: "easy"
    },
    {
      id: 9,
      situation: "You're planning a weekend camping trip. The forecast shows AQI will be 160-180 (Unhealthy) due to wildfires.",
      choices: [
        "Go camping with extra water for coughing",
        "Cancel the trip and plan indoor activities",
        "Go but stay inside the RV/cabin most of the time",
        "Move the trip to a different location with better air quality"
      ],
      correct: 3,
      explanation: "Moving to an area with better air quality allows you to enjoy outdoor activities safely. Always check air quality forecasts when traveling.",
      consequence: "Flexible planning based on air quality forecasts ensures safe outdoor recreation.",
      difficulty: "medium"
    },
    {
      id: 10,
      situation: "The school called - recess is cancelled due to AQI of 125. Your child is disappointed about missing outdoor time.",
      choices: [
        "Tell them they can play outside at home",
        "Explain why the school made this decision and plan fun indoor activities",
        "Let them play outside for just 15 minutes",
        "Take them to an indoor trampoline park instead"
      ],
      correct: 3,
      explanation: "Indoor alternatives like trampoline parks provide safe physical activity while teaching children about air quality awareness.",
      consequence: "Supporting school air quality policies while providing alternatives helps children understand health priorities.",
      difficulty: "easy"
    },
    {
      id: 11,
      situation: "You're pregnant and the AQI has been above 100 for three days straight. You have a doctor's appointment.",
      choices: [
        "Drive with windows up and AC on recirculate",
        "Walk to get fresh air and exercise",
        "Take public transportation",
        "Reschedule the appointment"
      ],
      correct: 0,
      explanation: "Pregnant women are more sensitive to air pollution. Driving with AC on recirculate minimizes exposure while ensuring you get necessary medical care.",
      consequence: "Pregnancy increases vulnerability to air pollution effects, requiring extra precautions.",
      difficulty: "hard"
    },
    {
      id: 12,
      situation: "Your city's AQI is 50 (Good), but your weather app shows high pollen count. You have allergies.",
      choices: [
        "AQI is good, so outdoor activities are fine",
        "Consider both air quality and pollen when planning outdoor activities",
        "Only worry about AQI, not pollen",
        "Stay indoors regardless"
      ],
      correct: 1,
      explanation: "Both air pollution and pollen affect respiratory health. People with allergies should consider both factors.",
      consequence: "Comprehensive awareness of air quality factors leads to better health decisions.",
      difficulty: "medium"
    },
    {
      id: 13,
      situation: "There's an air quality alert (AQI 190) but your dog needs exercise. What's your plan?",
      choices: [
        "Take a normal walk - dogs need exercise",
        "Shorten the walk and avoid busy streets",
        "Keep the dog indoors and play indoor games",
        "Drive to a park with better air quality"
      ],
      correct: 2,
      explanation: "Pets are also affected by air pollution. Indoor play protects both you and your pet from very unhealthy air.",
      consequence: "Pet health is also impacted by air pollution - they deserve protection too.",
      difficulty: "easy"
    },
    {
      id: 14,
      situation: "You're hosting an outdoor birthday party. The morning AQI is 85 (Moderate) but rising due to nearby construction.",
      choices: [
        "Continue with outdoor party as planned",
        "Move the party indoors or to a covered area",
        "Shorten the outdoor time",
        "Postpone until air quality improves"
      ],
      correct: 1,
      explanation: "With moderate AQI rising due to local sources, moving indoors protects guests, especially children and elderly attendees.",
      consequence: "Proactive planning protects party guests and ensures everyone can enjoy the celebration safely.",
      difficulty: "medium"
    },
    {
      id: 15,
      situation: "You're a teacher and the AQI is 105 (Unhealthy for Sensitive Groups). Some students have asthma and want to play outside.",
      choices: [
        "Let all students play outside with supervision",
        "Keep sensitive students inside, others can go out",
        "Move all students to indoor activities like gym or library",
        "Allow only 10 minutes of outdoor time"
      ],
      correct: 2,
      explanation: "Schools should protect all students equally. Indoor alternatives ensure no child is excluded and everyone stays safe.",
      consequence: "Educational institutions have a responsibility to protect all students' health equally.",
      difficulty: "easy"
    },
    {
      id: 16,
      situation: "You work night shifts and the AQI is 140 during your commute home at 6 AM when traffic is building up.",
      choices: [
        "Drive with windows down for fresh air",
        "Take a longer route through residential areas",
        "Use AC on recirculate and choose less congested routes",
        "Wait until traffic dies down"
      ],
      correct: 2,
      explanation: "Using AC on recirculate and avoiding high-traffic areas reduces exposure to vehicle emissions during unhealthy air quality periods.",
      consequence: "Night shift workers face unique air quality challenges that require strategic planning.",
      difficulty: "hard"
    },
    {
      id: 17,
      situation: "The AQI is 200 (Very Unhealthy) and your elderly neighbor asks for help moving furniture outside.",
      choices: [
        "Help quickly to minimize exposure",
        "Suggest postponing until air quality improves",
        "Help while wearing N95 masks",
        "Hire professional movers for another day"
      ],
      correct: 1,
      explanation: "At AQI 200, everyone should avoid outdoor exertion. Elderly individuals are at even higher risk.",
      consequence: "Very unhealthy air quality requires avoiding all unnecessary outdoor activities, especially physical exertion.",
      difficulty: "easy"
    },
    {
      id: 18,
      situation: "You're planning a marathon run. The race day forecast shows AQI 120 (Unhealthy for Sensitive Groups) with high humidity.",
      choices: [
        "Run the marathon as planned",
        "Consider skipping if you have respiratory sensitivities",
        "Run but slow down your pace significantly",
        "Wait to see morning conditions before deciding"
      ],
      correct: 1,
      explanation: "People with respiratory sensitivities should avoid prolonged exertion when AQI exceeds 100. High humidity can worsen pollution effects.",
      consequence: "Athletic events during poor air quality can cause serious health complications for sensitive individuals.",
      difficulty: "hard"
    },
    {
      id: 19,
      situation: "Your indoor plants are dying and the outdoor AQI is 90 (Moderate). You want to move them outside for better light.",
      choices: [
        "Move plants outside immediately",
        "Wait for better air quality before moving plants",
        "Move plants outside but bring them in during high pollution hours",
        "Keep plants indoors and invest in grow lights"
      ],
      correct: 3,
      explanation: "Plants can also be affected by air pollution. Grow lights provide consistent, clean light without pollution exposure.",
      consequence: "Even plants and gardens require consideration of air quality for optimal health.",
      difficulty: "medium"
    },
    {
      id: 20,
      situation: "You're a delivery driver and the AQI is 170 (Unhealthy). Your shift is 8 hours of outdoor work.",
      choices: [
        "Work as normal - it's your job",
        "Wear an N95 mask throughout the shift",
        "Take frequent breaks in air-conditioned spaces",
        "Both B and C are important strategies"
      ],
      correct: 3,
      explanation: "Outdoor workers need multiple protection strategies: proper masks, frequent breaks in clean air, and minimizing exposure when possible.",
      consequence: "Occupational exposure to air pollution requires comprehensive protection strategies.",
      difficulty: "hard"
    }
  ];

  const handleChoiceSelect = (choiceIndex) => {
    setSelectedChoice(choiceIndex);
    setShowResult(true);
    
    const isCorrect = choiceIndex === scenarios[currentScenario].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Badge logic
    const newAchievements = achievements.scenariosCompleted + 1;
    updateAchievements('scenariosCompleted');

    if (newAchievements === 3) {
      addBadge('scenario-solver', 'Scenario Solver', 'Complete 3 scenarios', <Lightbulb className="w-8 h-8" />, 'from-orange-400 to-orange-600');
    }
    
    if (newAchievements === 10) {
      addBadge('decision-master', 'Decision Master', 'Complete 10 scenarios', <Shield className="w-8 h-8" />, 'from-green-400 to-green-600');
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  const resetScenarios = () => {
    setCurrentScenario(0);
    setSelectedChoice(null);
    setShowResult(false);
    setScore(0);
  };

  const currentScenarioData = scenarios[currentScenario];
  const isCompleted = currentScenario === scenarios.length - 1 && showResult;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'hard': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Lightbulb className="w-8 h-8 text-orange-500" />
          <h2 className="text-3xl font-bold text-gray-800">Air Quality Decision Scenarios</h2>
          <Award className="w-8 h-8 text-purple-500" />
        </div>
        <p className="text-gray-600">Practice making smart decisions based on real-world air quality situations!</p>
        
        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-800">{achievements.scenariosCompleted}</div>
            <div className="text-xs text-orange-600">Total Completed</div>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-800">{score}/{scenarios.length}</div>
            <div className="text-xs text-green-600">Current Score</div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-800">{Math.round((score/Math.max(currentScenario, 1))*100)}%</div>
            <div className="text-xs text-purple-600">Accuracy</div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-800">{currentScenarioData?.difficulty?.toUpperCase() || 'N/A'}</div>
            <div className="text-xs text-blue-600">Difficulty</div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="bg-gray-200 rounded-full h-4 mb-6 relative overflow-hidden">
        <div 
          className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${((currentScenario + (showResult ? 1 : 0)) / scenarios.length) * 100}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-600">
          {currentScenario + 1}/{scenarios.length}
        </div>
      </div>

      {/* Difficulty and Category */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className={`bg-gradient-to-r ${getDifficultyColor(currentScenarioData.difficulty)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {currentScenarioData.difficulty?.toUpperCase() || 'SCENARIO'}
          </div>
        </div>
        <span className="text-gray-600">Scenario {currentScenario + 1} of {scenarios.length}</span>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
          
          {/* Scenario Header */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              Situation:
            </h3>
            <p className="text-gray-700 leading-relaxed bg-white/70 rounded-lg p-4 border-l-4 border-orange-400">
              {currentScenarioData.situation}
            </p>
          </div>

          {/* Choices */}
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              What would you do?
            </h4>
            <div className="space-y-3 mb-6">
              {currentScenarioData.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleChoiceSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                    showResult
                      ? index === currentScenarioData.correct
                        ? 'bg-green-100 border-green-500 text-green-800 shadow-lg'
                        : index === selectedChoice
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                      : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:from-orange-50 hover:to-red-50 hover:border-orange-300 hover:scale-[1.02] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{choice}</span>
                    {showResult && (
                      <div>
                        {index === currentScenarioData.correct && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {index === selectedChoice && index !== currentScenarioData.correct && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                  {!showResult && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                  )}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium mb-2">
                    {selectedChoice === currentScenarioData.correct ? '✅ Excellent Decision!' : '❌ Not the optimal choice'}
                  </p>
                  <p className="text-blue-700 mb-2"><strong>Best Choice:</strong> {currentScenarioData.explanation}</p>
                  <p className="text-blue-700"><strong>Why it matters:</strong> {currentScenarioData.consequence}</p>
                </div>

                <div className="flex justify-center pt-4">
                  {currentScenario < scenarios.length - 1 ? (
                    <button
                      onClick={nextScenario}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
                    >
                      Next Scenario →
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowResult(true)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
                    >
                      View Results
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <Award className="w-20 h-20 mx-auto mb-4 text-yellow-300 animate-bounce" />
          <h3 className="text-3xl font-bold mb-4">Scenarios Completed!</h3>
          <p className="text-xl mb-6">
            You made {score} out of {scenarios.length} optimal decisions
          </p>
          <div className="text-lg mb-6">
            {score === scenarios.length && "🌟 Perfect! You're ready to handle any air quality situation!"}
            {score >= scenarios.length * 0.8 && score < scenarios.length && "🎉 Excellent judgment! You understand air quality safety!"}
            {score >= scenarios.length * 0.6 && score < scenarios.length * 0.8 && "👍 Good thinking! Keep practicing air quality decisions!"}
            {score < scenarios.length * 0.6 && "📚 Keep learning! Understanding air quality scenarios helps protect your health!"}
          </div>
          <button
            onClick={resetScenarios}
            className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Scenarios Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Scenarios;
