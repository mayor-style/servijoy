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
  }, []);

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: FaUsers, color: "bg-blue-500" },
    { label: "Active Vendors", value: stats.activeVendors, icon: FaStore, color: "bg-green" },
    { label: "Recently Registered Users", value: stats.recentUsers, icon: FaUserPlus, color: "bg-purple-500" },
    { label: "Suspended Accounts", value: stats.suspendedAccounts, icon: FaUserSlash, color: "bg-red-500" },
  ];

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-4 rounded-lg shadow-xl transition-colors mb-6">
      <h2 className="subheading text-gray-800 dark:text-white mb-4">Statistics Summary</h2>
      {loading ? (
        <div className="text-center dark:text-gray-300 py-10">
          <span className="loader">Loading Statistics...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-light-gray  dark:bg-gray-700 p-4 rounded-lg flex items-center gap-4 shadow hover:shadow-xl transition"
            >
              <div className={`p-3 sm:p-4 rounded-full ${card.color} text-white`}>
                <card.icon className="text-lg sm:text-2xl" />
              </div>
              <div>
                <h3 className="sm:text-lg font-semibold text-gray-800 dark:text-white">{card.label}</h3>
                <p className="sm:text-xl text-lg font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsSummaryCards;
