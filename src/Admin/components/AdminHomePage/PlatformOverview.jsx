import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Wrench, 
  DollarSign, 
  AlertTriangle, 
  UserCheck, 
  RefreshCw, 
  BarChart2, 
  ArrowUpRight, 
  MoreHorizontal 
} from "lucide-react";

const PlatformOverview = () => {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState({});
  const [timeRange, setTimeRange] = useState("weekly");
  const [showRefreshAnimation, setShowRefreshAnimation] = useState(false);

  // Simulated data for different time ranges
  const timeRangeData = {
    daily: {
      totalUsers: 1250,
      activeServices: 58,
      totalRevenue: "$120,500",
      pendingDisputes: 7,
      activeVendors: 75,
      totalTransactions: 980,
      ongoingDisputes: 15,
      changes: {
        totalUsers: 2.4,
        activeServices: 1.8,
        totalRevenue: 3.2,
        pendingDisputes: -1.5,
        activeVendors: 0.7,
        totalTransactions: 2.1,
        ongoingDisputes: -0.8
      }
    },
    weekly: {
      totalUsers: 1320,
      activeServices: 62,
      totalRevenue: "$145,750",
      pendingDisputes: 5,
      activeVendors: 81,
      totalTransactions: 1150,
      ongoingDisputes: 12,
      changes: {
        totalUsers: 5.6,
        activeServices: 6.9,
        totalRevenue: 20.9,
        pendingDisputes: -28.6,
        activeVendors: 8.0,
        totalTransactions: 17.3,
        ongoingDisputes: -20.0
      }
    },
    monthly: {
      totalUsers: 1495,
      activeServices: 73,
      totalRevenue: "$195,200",
      pendingDisputes: 4,
      activeVendors: 92,
      totalTransactions: 1325,
      ongoingDisputes: 9,
      changes: {
        totalUsers: 19.6,
        activeServices: 25.9,
        totalRevenue: 62.0,
        pendingDisputes: -42.8,
        activeVendors: 22.7,
        totalTransactions: 35.2,
        ongoingDisputes: -40.0
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOverviewData(timeRangeData[timeRange]);
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const refreshData = () => {
    setShowRefreshAnimation(true);
    setLoading(true);
    
    setTimeout(() => {
      setOverviewData(timeRangeData[timeRange]);
      setLoading(false);
      
      setTimeout(() => {
        setShowRefreshAnimation(false);
      }, 1000);
    }, 800);
  };

  const stats = [
    { 
      label: "Total Users", 
      value: overviewData.totalUsers?.toLocaleString(), 
      icon: Users, 
      color: "bg-blue-500",
      lightColor: "bg-blue-50", 
      changeValue: overviewData.changes?.totalUsers,
      description: "Registered users on platform"
    },
    { 
      label: "Active Services", 
      value: overviewData.activeServices?.toLocaleString(), 
      icon: Wrench, 
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50", 
      changeValue: overviewData.changes?.activeServices,
      description: "Currently active services"
    },
    { 
      label: "Total Revenue", 
      value: overviewData.totalRevenue, 
      icon: DollarSign, 
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50", 
      changeValue: overviewData.changes?.totalRevenue,
      description: "Gross revenue across platform"
    },
    { 
      label: "Pending Disputes", 
      value: overviewData.pendingDisputes?.toLocaleString(), 
      icon: AlertTriangle, 
      color: "bg-red-500", 
      lightColor: "bg-red-50",
      changeValue: overviewData.changes?.pendingDisputes,
      description: "Awaiting resolution"
    },
    { 
      label: "Active Vendors", 
      value: overviewData.activeVendors?.toLocaleString(), 
      icon: UserCheck, 
      color: "bg-amber-500", 
      lightColor: "bg-amber-50",
      changeValue: overviewData.changes?.activeVendors,
      description: "Verified service providers"
    },
    { 
      label: "Total Transactions", 
      value: overviewData.totalTransactions?.toLocaleString(), 
      icon: BarChart2, 
      color: "bg-cyan-500", 
      lightColor: "bg-cyan-50",
      changeValue: overviewData.changes?.totalTransactions,
      description: "Completed service exchanges"
    },
    { 
      label: "Ongoing Disputes", 
      value: overviewData.ongoingDisputes?.toLocaleString(), 
      icon: RefreshCw, 
      color: "bg-orange-500", 
      lightColor: "bg-orange-50",
      changeValue: overviewData.changes?.ongoingDisputes,
      description: "Currently in resolution"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      {/* Header with controls */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Platform Performance Overview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {timeRange === "daily" ? "Last 24 hours" : timeRange === "weekly" ? "Last 7 days" : "Last 30 days"}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Time range selector */}
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-l-lg ${
                timeRange === "daily" 
                  ? "bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-300" 
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setTimeRange("daily")}
            >
              Daily
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-200 dark:border-gray-700 ${
                timeRange === "weekly" 
                  ? "bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-300" 
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setTimeRange("weekly")}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-r-lg ${
                timeRange === "monthly" 
                  ? "bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-300" 
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setTimeRange("monthly")}
            >
              Monthly
            </button>
          </div>
          
          {/* Refresh button */}
          <button 
            onClick={refreshData}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw 
              className={`w-5 h-5 ${showRefreshAnimation ? "animate-spin" : ""}`} 
            />
          </button>
        </div>
      </div>

      {/* Statistics grid */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm rounded-md text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-gray-800 transition ease-in-out duration-150">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading statistics...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className={`${stat.lightColor} dark:bg-opacity-10 p-3 rounded-lg`}>
                      <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div className="flex items-center text-xs font-medium">
                      {stat.changeValue > 0 ? (
                        <div className="flex items-center text-emerald-500 dark:text-emerald-400">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{stat.changeValue}%
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500 dark:text-red-400">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {stat.changeValue}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value || '-'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {stat.description}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 px-5 py-3">
                  <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
                    View Details
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Summary footer */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Export Report
            </button>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Share Dashboard
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;