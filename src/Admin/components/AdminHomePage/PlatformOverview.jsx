import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaTools,
  FaDollarSign,
  FaExclamationCircle,
  FaUserCheck,
  FaHandshake,
  FaSyncAlt,
} from "react-icons/fa";

const PlatformOverview = () => {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState({});

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOverviewData({
        totalUsers: 1250,
        activeServices: 58,
        totalRevenue: "$120,500",
        pendingDisputes: 7,
        activeVendors: 75,
        totalTransactions: 980,
        ongoingDisputes: 15,
      });
      setLoading(false);
    }, 1500);
  }, []);

  const stats = [
    { label: "Total Users", value: overviewData.totalUsers, icon: FaUsers, color: "bg-blue-500" },
    { label: "Active Services", value: overviewData.activeServices, icon: FaTools, color: "bg-purple-500" },
    { label: "Total Revenue", value: overviewData.totalRevenue, icon: FaDollarSign, color: "bg-green" },
    { label: "Pending Disputes", value: overviewData.pendingDisputes, icon: FaExclamationCircle, color: "bg-red-500" },
    { label: "Active Vendors", value: overviewData.activeVendors, icon: FaUserCheck, color: "bg-yellow-500" },
    { label: "Total Transactions", value: overviewData.totalTransactions, icon: FaHandshake, color: "bg-teal-500" },
    { label: "Ongoing Disputes", value: overviewData.ongoingDisputes, icon: FaSyncAlt, color: "bg-orange-500" },
  ];

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl transition-colors mt-6">
      <h2 className="header text-gray-800 dark:text-white mb-4">
        Platform Performance Overview
      </h2>
      {loading ? (
        <div className="text-center py-10">
          <span className="loader">Loading Performance Data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-light-gray dark:bg-gray-700 p-4 rounded-lg flex items-center gap-4 shadow hover:shadow-2xl transition review"
            >
              <div className={`p-4 rounded-full ${stat.color} text-white`}>
                <stat.icon className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {stat.label}
                </h3>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformOverview;
