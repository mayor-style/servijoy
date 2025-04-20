import React from "react";
import { ChevronRightIcon, DownloadIcon, Calendar, Bell, Settings } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-8 w-full">
        {/* Left Section */}
        <div className="flex flex-col">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span className="hover:text-primary cursor-pointer transition-colors">Admin</span>
            <ChevronRightIcon size={14} className="mx-2" />
            <span className="hover:text-primary cursor-pointer transition-colors">Dashboard</span>
            <ChevronRightIcon size={14} className="mx-2" />
            <span className="text-primary font-medium">Analytics</span>
          </div>
          
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
            Analytics Dashboard
          </h1>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center ml-auto space-x-2 md:space-x-4">
          {/* Date Range Selector */}
          <div className="relative flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors">
            <Calendar size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-200">Last 30 days</span>
            <ChevronRightIcon size={14} className="ml-2 rotate-90 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Notification Bell */}
          <button className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors relative">
            <Bell size={18} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Settings size={18} className="text-gray-700 dark:text-gray-300" />
          </button>

          {/* Export Button */}
          <button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg ml-2">
            <DownloadIcon size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}