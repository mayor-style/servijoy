import React, { useState } from "react";
import { ChevronRight, Plus, Filter, Download, Search, Bell, MoreHorizontal } from "lucide-react";

const DisputeManagementHeader = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 transition-all">
      {/* Header Top Section */}
      <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800">
        {/* Left Side: Breadcrumb & Title */}
        <div className="space-y-2">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-gray-400" />
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  Admin
                </a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="text-gray-400" />
              </li>
              <li>
                <span className="font-medium text-primary-600 dark:text-primary-400">
                  Dispute Management
                </span>
              </li>
            </ol>
          </nav>
          
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Dispute Management
            </h1>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
              Admin Access
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg">
            Manage and resolve customer disputes efficiently with comprehensive tracking and resolution tools.
          </p>
        </div>

        {/* Right Side: Search and Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search Bar */}
          <div className={`relative ${searchFocused ? 'w-64' : 'w-48'} transition-all duration-200`}>
            <input 
              type="text" 
              placeholder="Search disputes..."
              className="w-full py-2 pl-9 pr-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Secondary Actions */}
            <button 
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Filter disputes"
              title="Filter disputes"
            >
              <Filter size={18} />
            </button>
            <button 
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Export disputes"
              title="Export disputes"
            >
              <Download size={18} />
            </button>
            <button 
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="More options"
              title="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
          
          {/* Primary Action */}
          <button 
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm"
          >
            <Plus size={16} />
            <span>New Dispute</span>
          </button>
        </div>
      </div>
      
      {/* Stats Summary with Enhanced Visual Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Disputes</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">69</div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
            <span>↑ 12%</span>
            <span className="text-gray-400 dark:text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Disputes</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">24</div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 flex items-center">
            <span>↑ 5%</span>
            <span className="text-gray-400 dark:text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Resolution</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">8</div>
          <div className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
            <span>↑ 33%</span>
            <span className="text-gray-400 dark:text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolved This Month</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">37</div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
            <span>↑ 15%</span>
            <span className="text-gray-400 dark:text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>
      
      {/* New: Quick Action Tabs */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-5 py-3">
        <div className="flex items-center space-x-6 overflow-x-auto pb-1">
          <button className="text-sm font-medium text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 pb-2 px-1">
            All Disputes
          </button>
          <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 pb-2 px-1 border-b-2 border-transparent">
            Needs Attention
          </button>
          <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 pb-2 px-1 border-b-2 border-transparent">
            Recent Activity
          </button>
          <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 pb-2 px-1 border-b-2 border-transparent">
            High Priority
          </button>
          <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 pb-2 px-1 border-b-2 border-transparent">
            Escalated
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeManagementHeader;