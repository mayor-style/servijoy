import React, { useState, useEffect } from "react";
import { FaUsers, FaStore, FaUserPlus, FaUserSlash } from "react-icons/fa";

const StatisticsSummaryCards = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeVendors: 0,
    recentUsers: 0,
    suspendedAccounts: 0,
  });
  const [timeframe, setTimeframe] = useState("weekly");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock data for development
      setStats({
        totalUsers: 1500,
        activeVendors: 320,
        recentUsers: 50,
        suspendedAccounts: 12,
      });
      setLoading(false);
    }, 1500);
  }, [timeframe]);

  const cards = [
    { 
      id: "total-users",
      label: "Total Users", 
      value: stats.totalUsers, 
      icon: FaUsers, 
      color: "bg-blue-600",
      trend: "+12%",
      trendDirection: "up",
      description: "Total number of registered users in the system"
    },
    { 
      id: "active-vendors",
      label: "Active Vendors", 
      value: stats.activeVendors, 
      icon: FaStore, 
      color: "bg-green-600",
      trend: "+5%",
      trendDirection: "up",
      description: "Vendors with at least one active listing"
    },
    { 
      id: "recent-users",
      label: "New Users", 
      value: stats.recentUsers, 
      icon: FaUserPlus, 
      color: "bg-purple-600",
      trend: "+8%", 
      trendDirection: "up",
      description: "Users registered within the last 30 days"
    },
    { 
      id: "suspended",
      label: "Suspended Accounts", 
      value: stats.suspendedAccounts, 
      icon: FaUserSlash, 
      color: "bg-red-600",
      trend: "-3%",
      trendDirection: "down",
      description: "Accounts currently suspended due to violations"
    },
  ];

  const handleCardClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const skeletonPulse = "animate-pulse bg-gray-300 dark:bg-gray-600 rounded";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">Statistics Dashboard</h2>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setTimeframe("daily")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              timeframe === "daily" 
                ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-gray-700 dark:text-blue-300" 
                : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeframe("weekly")}
            className={`px-4 py-2 text-sm font-medium border-t border-b ${
              timeframe === "weekly" 
                ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-gray-700 dark:text-blue-300" 
                : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              timeframe === "monthly" 
                ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-gray-700 dark:text-blue-300" 
                : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
              <div className="flex items-center gap-4">
                <div className={`${skeletonPulse} h-12 w-12`}></div>
                <div className="flex-1">
                  <div className={`${skeletonPulse} h-4 w-24 mb-2`}></div>
                  <div className={`${skeletonPulse} h-6 w-16`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`bg-white dark:bg-gray-700 p-6 rounded-xl shadow hover:shadow-xl transition-all cursor-pointer ${
                expanded === card.id ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${card.color} text-white`}>
                  <card.icon className="text-xl" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.label}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      card.trendDirection === "up" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {card.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(card.value)}</p>
                </div>
              </div>
              
              {expanded === card.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300">
                  <p>{card.description}</p>
                  <div className="mt-2 flex justify-end">
                    <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-xs">
                      View Details →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-right">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default StatisticsSummaryCards;