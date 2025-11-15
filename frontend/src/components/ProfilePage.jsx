import React, { useState } from 'react';

// Mock user data
const USER_DATA = {
  name: 'Alex Green',
  rank: 'Eco Warrior',
  totalCleanups: 24,
  totalItems: 156,
  currentStreak: 7,
  totalPoints: 420,
  joinDate: 'March 2024',
};

// Mock achievements data
const ACHIEVEMENTS = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first cleanup',
    icon: '👣',
    earned: true,
    earnedDate: 'Apr 5, 2024',
  },
  {
    id: 2,
    name: 'Trash Hunter',
    description: 'Report 10 trash locations',
    icon: '🔍',
    earned: true,
    earnedDate: 'Apr 12, 2024',
  },
  {
    id: 3,
    name: 'Community Leader',
    description: 'Organize 5 cleanups',
    icon: '👑',
    earned: true,
    earnedDate: 'May 1, 2024',
  },
  {
    id: 4,
    name: 'Eco Champion',
    description: 'Collect 500 items',
    icon: '🏆',
    earned: false,
    progress: '156/500',
  },
  {
    id: 5,
    name: 'Week Warrior',
    description: 'Maintain 30-day streak',
    icon: '🔥',
    earned: false,
    progress: '7/30 days',
  },
  {
    id: 6,
    name: 'Global Impact',
    description: 'Earn 1000 points',
    icon: '🌍',
    earned: false,
    progress: '420/1000',
  },
];

const ProfilePage = () => {
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const earnedCount = ACHIEVEMENTS.filter((a) => a.earned).length;
  const displayedAchievements = showAllAchievements ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 3);

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Gradient Header */}
      <div className="bg-gradient-to-b from-green-600 via-emerald-600 to-teal-600 text-white px-4 pt-4 pb-8 safe-area-inset-top flex-shrink-0">
        {/* Profile Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm border border-white border-opacity-40">
            👤
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{USER_DATA.name}</h1>
            <p className="text-sm opacity-90">{USER_DATA.rank}</p>
            <p className="text-xs opacity-75">Joined {USER_DATA.joinDate}</p>
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm border border-white border-opacity-20">
            <div className="text-3xl font-bold">{USER_DATA.totalCleanups}</div>
            <div className="text-xs opacity-90">Total Cleanups</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm border border-white border-opacity-20">
            <div className="text-3xl font-bold">{USER_DATA.totalPoints}</div>
            <div className="text-xs opacity-90">Points Earned</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm border border-white border-opacity-20">
            <div className="text-3xl font-bold">{USER_DATA.totalItems}</div>
            <div className="text-xs opacity-90">Items Collected</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm border border-white border-opacity-20">
            <div className="text-3xl font-bold flex items-center">
              <span>🔥</span>
              <span className="ml-1">{USER_DATA.currentStreak}</span>
            </div>
            <div className="text-xs opacity-90">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10 flex-shrink-0">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 font-semibold text-sm transition-colors duration-200 border-b-2 ${
            activeTab === 'overview'
              ? 'text-green-600 border-green-600'
              : 'text-gray-600 border-transparent hover:text-green-600'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-3 px-4 font-semibold text-sm transition-colors duration-200 border-b-2 ${
            activeTab === 'achievements'
              ? 'text-green-600 border-green-600'
              : 'text-gray-600 border-transparent hover:text-green-600'
          }`}
        >
          Achievements
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="p-4 pb-20">
            {/* Stats Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h2>

              <div className="space-y-3">
                {/* Cleanup Progress */}
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Cleanup Goal</span>
                    <span className="text-sm text-green-600 font-semibold">{USER_DATA.totalCleanups}/30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(USER_DATA.totalCleanups / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Items Goal */}
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Items Goal</span>
                    <span className="text-sm text-green-600 font-semibold">{USER_DATA.totalItems}/500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(USER_DATA.totalItems / 500) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Points Goal */}
                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Points Goal</span>
                    <span className="text-sm text-green-600 font-semibold">{USER_DATA.totalPoints}/1000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(USER_DATA.totalPoints / 1000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-white border-2 border-green-600 text-green-600 px-4 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 min-h-20 flex items-center justify-center"
                  aria-label="Start cleanup"
                >
                  <span>
                    <div className="text-2xl mb-1">🧹</div>
                    <div className="text-xs">Start Cleanup</div>
                  </span>
                </button>

                <button
                  className="bg-white border-2 border-green-600 text-green-600 px-4 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 min-h-20 flex items-center justify-center"
                  aria-label="View leaderboard"
                >
                  <span>
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-xs">Leaderboard</div>
                  </span>
                </button>
              </div>
            </div>

            {/* Current Streak Info */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 border-l-4 border-orange-500 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <span className="text-3xl">🔥</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {USER_DATA.currentStreak}-Day Streak!
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Keep it up! Complete a cleanup tomorrow to maintain your streak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="p-4 pb-20">
            {/* Achievements Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Achievements</h2>
              <p className="text-sm text-gray-600">
                {earnedCount} of {ACHIEVEMENTS.length} earned
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 gap-3">
              {displayedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-lg p-4 border transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-white border-green-200 shadow-sm'
                      : 'bg-gray-50 border-gray-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`text-3xl w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 ${
                        achievement.earned
                          ? 'bg-green-100'
                          : 'bg-gray-200'
                      }`}
                    >
                      {achievement.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>

                      {achievement.earned ? (
                        <p className="text-xs text-green-600 font-semibold mt-2">
                          ✓ Earned {achievement.earnedDate}
                        </p>
                      ) : (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-1.5 rounded-full"
                              style={{
                                width: `${
                                  achievement.progress.includes('/500')
                                    ? (156 / 500) * 100
                                    : achievement.progress.includes('/30')
                                    ? (7 / 30) * 100
                                    : (420 / 1000) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{achievement.progress}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {!showAllAchievements && ACHIEVEMENTS.length > 3 && (
              <div className="flex justify-center py-6">
                <button
                  onClick={() => setShowAllAchievements(true)}
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
                >
                  Show All Achievements ({ACHIEVEMENTS.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
