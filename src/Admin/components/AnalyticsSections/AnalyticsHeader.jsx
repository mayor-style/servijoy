import React from "react";
import { ChevronRightIcon, DownloadIcon } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="w-full bg-soft-white dark:bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 transition">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mb-4 md:mb-0">
        <span>Admin Dashboard</span>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-primary font-medium">Analytics</span>
      </div>
      
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 font-header dark:text-gray-100 mb-4 md:mb-0">
        Analytics Dashboard
      </h1>
      
      {/* Quick Action Button */}
      <button className="btn btn-primary flex items-center gap-2 py-2 px-4 rounded-lg transition">
        <DownloadIcon size={18} className="mr-2" /> Export Report
      </button>
    </div>
  );
}
