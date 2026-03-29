import React, { useContext } from 'react';
import {
  Brain, Lightbulb, Play, Trophy, Award, Star, Shield,
  Target, Zap, Crown, Medal
} from 'lucide-react';
import { BadgeContext } from './Explore';

const iconMap = {
  Brain, Lightbulb, Play, Trophy, Award, Star, Shield, Target, Zap, Crown, Medal
};

const BadgeSystem = () => {
  const { badges, achievements } = useContext(BadgeContext);

  const availableBadges = [
    {
      id: 'first-quiz',
      name: 'Quiz Starter',
      description: 'Complete your first quiz',
      iconName: 'Brain',
      color: 'from-[#2C7A7B] to-[#4FD1C5]',
      requirement: 'Complete 1 quiz'
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      description: 'Complete 5 quizzes',
      iconName: 'Trophy',
      color: 'from-[#319795] to-[#38A169]',
      requirement: 'Complete 5 quizzes'
    },
    {
      id: 'perfect-score',
      name: 'Perfect Scholar',
      description: 'Get 100% on a quiz',
      iconName: 'Star',
      color: 'from-[#ECC94B] to-[#F6AD55]',
      requirement: 'Score 100% on any quiz'
    },
    {
      id: 'scenario-solver',
      name: 'Scenario Solver',
      description: 'Complete 3 scenarios',
      iconName: 'Lightbulb',
      color: 'from-[#F6AD55] to-[#ECC94B]',
      requirement: 'Complete 3 scenarios'
    },
    {
      id: 'air-quality-expert',
      name: 'Air Quality Expert',
      description: 'Complete all learning modules',
      iconName: 'Shield',
      color: 'from-[#38A169] to-[#68D391]',
      requirement: 'Read all learning content'
    },
    {
      id: 'video-watcher',
      name: 'Knowledge Seeker',
      description: 'Watch 5 educational videos',
      iconName: 'Play',
      color: 'from-[#E53E3E] to-[#F56565]',
      requirement: 'Watch 5 videos'
    },
    {
      id: 'streak-master',
      name: 'Consistency King',
      description: 'Complete activities for 7 days',
      iconName: 'Target',
      color: 'from-[#4C51BF] to-[#667EEA]',
      requirement: '7-day learning streak'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete a quiz in under 2 minutes',
      iconName: 'Zap',
      color: 'from-[#319795] to-[#4FD1C5]',
      requirement: 'Fast quiz completion'
    },
    {
      id: 'pollution-pro',
      name: 'Pollution Pro',
      description: 'Master all quiz categories',
      iconName: 'Crown',
      color: 'from-[#D53F8C] to-[#B83280]',
      requirement: 'Complete advanced content'
    },
    {
      id: 'environmental-hero',
      name: 'Environmental Hero',
      description: 'Complete everything with excellence',
      iconName: 'Medal',
      color: 'from-[#38A169] to-[#48BB78]',
      requirement: 'Ultimate achievement'
    }
  ];

  const earnedBadgeIds = badges.map(badge => badge.id);

  return (
    <div className="space-y-10 px-4 py-8 max-w-7xl mx-auto">
      {/* Header and Progress */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-[#2C7A7B] mb-3">🏆 My Badge Collection</h2>
        <p className="text-[#319795] max-w-3xl mx-auto mb-8">
          Showcase your air quality knowledge achievements! Keep learning to unlock more badges.
        </p>
        <div className="bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] rounded-3xl p-8 text-white shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{badges.length}</div>
              <div className="text-sm opacity-90">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{achievements.quizzesCompleted}</div>
              <div className="text-sm opacity-90">Quizzes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{achievements.scenariosCompleted}</div>
              <div className="text-sm opacity-90">Scenarios Solved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{Math.round((badges.length / availableBadges.length) * 100)}%</div>
              <div className="text-sm opacity-90">Collection Complete</div>
            </div>
          </div>
        </div>
      </div>

      {badges.length > 0 && (
        <section>
          <h3 className="text-3xl font-bold text-[#2C7A7B] mb-6 flex items-center justify-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-400" />
            Earned Badges ({badges.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {badges.map((badge) => {
              const Icon = iconMap[badge.iconName] || Star;
              return (
                <div
                  key={badge.id}
                  className="relative bg-white rounded-2xl p-6 border-2 border-yellow-300 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-bl-3xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-[#2C7A7B] text-center mb-2">{badge.name}</h4>
                  <p className="text-[#319795] text-center mb-3">{badge.description}</p>
                  <p className="text-xs text-gray-500 text-center">Earned: {new Date(badge.earnedAt).toLocaleDateString()}</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 animate-pulse pointer-events-none rounded-2xl"></div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-3xl font-bold text-[#2C7A7B] mb-6 flex items-center justify-center gap-2">
          <Target className="w-7 h-7 text-[#2C7A7B]" />
          Available Badges ({availableBadges.length - badges.length} remaining)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            const Icon = iconMap[badge.iconName] || Star;
            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-6 border-2 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 cursor-default
                  ${isEarned ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200 hover:border-[#4FD1C5]'}`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${isEarned ? 'from-gray-300 to-gray-400' : badge.color} flex items-center justify-center mb-4 mx-auto ${!isEarned ? 'animate-pulse' : ''}`}>
                  <Icon className={`w-8 h-8 ${isEarned ? 'text-gray-500' : 'text-white'}`} />
                </div>
                <h4 className={`text-xl font-bold text-center mb-2 ${isEarned ? 'text-gray-500' : 'text-[#2C7A7B]'}`}>{badge.name}</h4>
                <p className={`text-center mb-3 ${isEarned ? 'text-gray-400' : 'text-[#319795]'}`}>{badge.description}</p>
                <p className={`text-xs text-center ${isEarned ? 'text-gray-400' : 'text-[#4FD1C5] font-semibold'}`}>{isEarned ? '✓ Completed' : badge.requirement}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default BadgeSystem;
