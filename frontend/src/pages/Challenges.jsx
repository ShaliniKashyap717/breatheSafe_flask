import React, { useState } from 'react';
import { Trophy, Users, Target, Calendar, Plus, CheckCircle } from 'lucide-react';

const Challenges = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  const activeChallenges = [
    {
      id: 1,
      title: "Reduce Pollution Week",
      description: "Track and reduce your carbon footprint this week by using public transport, cycling, or walking instead of driving.",
      participants: 234,
      goal: 500,
      progress: 67,
      daysLeft: 5,
      category: "Transportation",
      reward: "Green Champion Badge",
      impact: "2.3 tons CO2 saved"
    },
    {
      id: 2,
      title: "Plant a Tree Challenge",
      description: "Help improve air quality by planting trees in your neighborhood or participating in local plantation drives.",
      participants: 156,
      goal: 300,
      progress: 43,
      daysLeft: 12,
      category: "Environmental",
      reward: "Tree Planter Certificate",
      impact: "89 trees planted"
    },
    {
      id: 3,
      title: "Zero Waste Month",
      description: "Minimize waste generation and practice sustainable living for an entire month.",
      participants: 89,
      goal: 200,
      progress: 28,
      daysLeft: 18,
      category: "Sustainability",
      reward: "Eco Warrior Badge",
      impact: "450 kg waste reduced"
    }
  ];

  const completedChallenges = [
    {
      id: 4,
      title: "Air Quality Monitoring Week",
      participants: 567,
      impact: "1,200 air quality reports submitted",
      completed: true
    }
  ];

  const [userContributions, setUserContributions] = useState({});

  const joinChallenge = (challengeId) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId]);
    }
  };

  const submitContribution = (challengeId, contribution) => {
    setUserContributions({
      ...userContributions,
      [challengeId]: [...(userContributions[challengeId] || []), contribution]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Community Challenges
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join environmental challenges and make a collective impact with your community.
          </p>
        </div>

        {/* Challenge Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'active'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              Active Challenges
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Active Challenges */}
        {activeTab === 'active' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="text-yellow-500 mr-2" size={24} />
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                      {challenge.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{challenge.daysLeft} days left</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{challenge.participants}/{challenge.goal} participants</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300" 
                      style={{width: `${challenge.progress}%`}}
                    ></div>
                  </div>
                </div>

                {/* Impact */}
                <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-emerald-700 font-medium">Collective Impact</p>
                  <p className="text-sm text-emerald-600">{challenge.impact}</p>
                </div>

                {/* Actions */}
                {joinedChallenges.includes(challenge.id) ? (
                  <div className="space-y-3">
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <CheckCircle size={16} className="mr-2" />
                      Joined Challenge
                    </div>
                    <ContributionForm 
                      challengeId={challenge.id}
                      onSubmit={submitContribution}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => joinChallenge(challenge.id)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Join Challenge
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Completed Challenges */}
        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {completedChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl opacity-75">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-500 mr-2" size={24} />
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{challenge.participants} participants</p>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-700 font-medium">Final Impact</p>
                  <p className="text-sm text-green-600">{challenge.impact}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ContributionForm = ({ challengeId, onSubmit }) => {
  const [contribution, setContribution] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contribution.trim()) {
      onSubmit(challengeId, {
        text: contribution,
        timestamp: new Date().toLocaleString()
      });
      setContribution('');
      setShowForm(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center justify-center"
      >
        <Plus size={16} className="mr-2" />
        Report Contribution
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={contribution}
        onChange={(e) => setContribution(e.target.value)}
        placeholder="Describe your contribution to this challenge..."
        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
        rows="3"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-all duration-200"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Challenges;
