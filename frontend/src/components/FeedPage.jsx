import React, { useState } from 'react';

// Mock data for activity feed
const MOCK_ACTIVITIES = [
  {
    id: 1,
    user: 'Green Warrior',
    action: 'cleaned up',
    location: 'Central Park',
    image: '🌳',
    stats: { trash: '15 items', points: 45 },
    time: '2 hours ago',
    likes: 124,
    liked: false,
  },
  {
    id: 2,
    user: 'Eco Hero',
    action: 'reported',
    location: 'Times Square',
    image: '🏙️',
    stats: { trash: '8 items', points: 24 },
    time: '4 hours ago',
    likes: 89,
    liked: false,
  },
  {
    id: 3,
    user: 'Clean Crew',
    action: 'organized cleanup',
    location: 'Brooklyn Bridge',
    image: '🌉',
    stats: { volunteers: '12 people', points: 120 },
    time: '1 day ago',
    likes: 245,
    liked: false,
  },
  {
    id: 4,
    user: 'Nature Guardian',
    action: 'cleaned up',
    location: 'Riverside Park',
    image: '🏞️',
    stats: { trash: '23 items', points: 69 },
    time: '1 day ago',
    likes: 156,
    liked: false,
  },
];

// Today's impact mock data
const TODAY_IMPACT = {
  cleanups: 12,
  itemsCollected: 156,
  volunteers: 45,
};

const FeedPage = () => {
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading more activities
  const loadMoreActivities = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, fetch more activities from API
    }, 1000);
  };

  // Toggle like on activity
  const toggleLike = (id) => {
    setActivities(
      activities.map((activity) => {
        if (activity.id === id) {
          return {
            ...activity,
            liked: !activity.liked,
            likes: activity.liked ? activity.likes - 1 : activity.likes + 1,
          };
        }
        return activity;
      })
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 pt-4 pb-6 safe-area-inset-top flex-shrink-0">
        <h1 className="text-3xl font-bold mb-4">EcoSynk</h1>

        {/* Today's Impact Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold">{TODAY_IMPACT.cleanups}</div>
            <div className="text-xs opacity-90">Cleanups</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold">{TODAY_IMPACT.itemsCollected}</div>
            <div className="text-xs opacity-90">Items</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold">{TODAY_IMPACT.volunteers}</div>
            <div className="text-xs opacity-90">Volunteers</div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="flex-1 overflow-y-auto">
        {/* Section Header */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
        </div>

        {/* Activity Cards */}
        <div className="px-4 pb-20">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-lg">
                    {activity.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{activity.user}</h3>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-4 py-3">
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">{activity.user}</span> {activity.action} at{' '}
                  <span className="font-semibold text-green-600">{activity.location}</span>
                </p>

                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-2 bg-gray-50 rounded-lg p-3 mb-3">
                  {Object.entries(activity.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-green-600">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer - Engagement Buttons */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => toggleLike(activity.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activity.liked
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label={activity.liked ? 'Unlike' : 'Like'}
                >
                  <span className="text-xl">{activity.liked ? '❤️' : '🤍'}</span>
                  <span className="text-sm font-medium">{activity.likes}</span>
                </button>

                <button
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Comment"
                >
                  <span className="text-xl">💬</span>
                  <span className="text-sm font-medium">Comment</span>
                </button>

                <button
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Share"
                >
                  <span className="text-xl">📤</span>
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="flex justify-center py-6">
            <button
              onClick={loadMoreActivities}
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors duration-200 min-h-12 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Loading...
                </>
              ) : (
                'Load More Activities'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
