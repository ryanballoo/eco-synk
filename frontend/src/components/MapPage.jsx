import React, { useState } from 'react';

// Mock trash data
const TRASH_REPORTS = [
  {
    id: 1,
    location: 'Central Park, NYC',
    priority: 'high',
    items: 15,
    distance: 0.3,
    reportedBy: 'Green Warrior',
    time: '2 hours ago',
    status: 'pending',
  },
  {
    id: 2,
    location: 'Times Square, NYC',
    priority: 'medium',
    items: 8,
    distance: 0.5,
    reportedBy: 'Eco Hero',
    time: '4 hours ago',
    status: 'in-progress',
  },
  {
    id: 3,
    location: 'Brooklyn Bridge, NYC',
    priority: 'high',
    items: 23,
    distance: 1.2,
    reportedBy: 'Clean Crew',
    time: '1 day ago',
    status: 'pending',
  },
  {
    id: 4,
    location: 'Riverside Park, NYC',
    priority: 'low',
    items: 4,
    distance: 0.8,
    reportedBy: 'Nature Guardian',
    time: '1 day ago',
    status: 'cleaned',
  },
  {
    id: 5,
    location: 'Union Square, NYC',
    priority: 'medium',
    items: 12,
    distance: 0.6,
    reportedBy: 'Green Warrior',
    time: '2 days ago',
    status: 'pending',
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getPriorityEmoji = (priority) => {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '⚪';
  }
};

const getStatusEmoji = (status) => {
  switch (status) {
    case 'pending':
      return '⏳';
    case 'in-progress':
      return '🧹';
    case 'cleaned':
      return '✅';
    default:
      return '❓';
  }
};

const MapPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = TRASH_REPORTS.filter((report) => {
    if (selectedFilter === 'all') return true;
    return report.priority === selectedFilter;
  });

  const stats = {
    total: TRASH_REPORTS.length,
    high: TRASH_REPORTS.filter((r) => r.priority === 'high').length,
    medium: TRASH_REPORTS.filter((r) => r.priority === 'medium').length,
    low: TRASH_REPORTS.filter((r) => r.priority === 'low').length,
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 pt-4 pb-6 safe-area-inset-top flex-shrink-0">
        <h1 className="text-3xl font-bold mb-4">Trash Map</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center backdrop-blur-sm border border-white border-opacity-20">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs opacity-90">Total Reports</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center backdrop-blur-sm border border-white border-opacity-20">
            <div className="text-2xl font-bold">{stats.high}</div>
            <div className="text-xs opacity-90">High Priority 🔴</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-gray-200 overflow-x-auto flex-shrink-0">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition-all duration-200 min-h-10 ${
            selectedFilter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setSelectedFilter('high')}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition-all duration-200 min-h-10 ${
            selectedFilter === 'high'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          🔴 High ({stats.high})
        </button>
        <button
          onClick={() => setSelectedFilter('medium')}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition-all duration-200 min-h-10 ${
            selectedFilter === 'medium'
              ? 'bg-yellow-600 text-white shadow-md'
              : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
          }`}
        >
          🟡 Med ({stats.medium})
        </button>
        <button
          onClick={() => setSelectedFilter('low')}
          className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap text-sm transition-all duration-200 min-h-10 ${
            selectedFilter === 'low'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          🟢 Low ({stats.low})
        </button>
      </div>

      {/* Reports List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 pb-20">
          {filteredReports.length > 0 ? (
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() =>
                    setSelectedReport(
                      selectedReport?.id === report.id ? null : report
                    )
                  }
                  className={`rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    selectedReport?.id === report.id
                      ? `${getPriorityColor(report.priority)} shadow-lg border-current`
                      : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Report Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 truncate">
                          � {report.location}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Reported by {report.reportedBy} • {report.time}
                        </p>
                      </div>
                      <span
                        className={`text-xl ml-2 flex-shrink-0 ${getPriorityEmoji(
                          report.priority
                        )}`}
                      ></span>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-gray-50 rounded px-3 py-2 text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {report.items}
                        </div>
                        <div className="text-xs text-gray-600">Items</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2 text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {report.distance}
                        </div>
                        <div className="text-xs text-gray-600">km away</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2 text-center">
                        <div className="text-lg font-bold">{getStatusEmoji(report.status)}</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {report.status}
                        </div>
                      </div>
                    </div>

                    {/* Priority Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(
                          report.priority
                        )}`}
                      >
                        {report.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedReport?.id === report.id && (
                    <div className="border-t-2 border-current px-4 py-4 bg-opacity-5 space-y-3">
                      <div className="bg-white bg-opacity-40 rounded p-3">
                        <h4 className="font-semibold text-sm mb-2">Details</h4>
                        <ul className="text-sm space-y-2">
                          <li>
                            <strong>Location:</strong> {report.location}
                          </li>
                          <li>
                            <strong>Items Found:</strong> {report.items} pieces
                          </li>
                          <li>
                            <strong>Distance:</strong> {report.distance} km away
                          </li>
                          <li>
                            <strong>Status:</strong>{' '}
                            <span className="capitalize">{report.status}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 min-h-12"
                          aria-label="Get directions"
                        >
                          🗺️ Get Directions
                        </button>
                        <button
                          className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 min-h-12"
                          aria-label="Join cleanup"
                        >
                          🧹 Join Cleanup
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No reports in this area
              </h2>
              <p className="text-gray-600 mb-6">
                Be the first to report trash in your area!
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 min-h-12">
                📸 Report Trash
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 safe-area-inset-bottom">
        <h4 className="font-bold text-sm mb-2 text-gray-900">Priority Levels:</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔴</span>
            <span className="text-gray-600">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">🟡</span>
            <span className="text-gray-600">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">🟢</span>
            <span className="text-gray-600">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;