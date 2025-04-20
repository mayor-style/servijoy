import React, { useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import PlatformOverview from "../components/AdminHomePage/PlatformOverview";
import RecentActivities from "../components/AdminHomePage/RecentActivities";
import PlatformActivityOverview from "../components/AdminHomePage/PlatformActivityOverview";
import RecentTransactions from "../components/AdminHomePage/RecentTransactions";
import SystemHealthStatus from "../components/AdminHomePage/SystemHealthStatus";
import UpcomingEvents from "../components/AdminHomePage/UpcomingEvents";

// We can import icons from lucide-react 
import { Loader, RefreshCw, Bell, Settings } from "lucide-react";

const AdminHomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      setLastRefreshed(new Date());
    }, 1000);
  };

  return (
    <div className="p-6 mt-16 w-full bg-gray-50 dark:bg-gray-900 min-h-screen transition-all">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last refreshed: {lastRefreshed.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-all"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            <span>Refresh</span>
          </button>
          
          <button className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dashboard grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First column - Platform stats */}
        <div className="lg:col-span-2 space-y-6">
          <PlatformOverview />
          <PlatformActivityOverview />
        </div>

        {/* Second column - System health and events */}
        <div className="space-y-6">
          <SystemHealthStatus />
          <UpcomingEvents />
        </div>
      </div>

      {/* Second row - Activities and transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentActivities />
        <RecentTransactions />
      </div>
    </div>
  );
};

const AdminDashboardHome = () => {
  return <AdminDashboardLayout content={<AdminHomePage />} />;
};

export default AdminDashboardHome;