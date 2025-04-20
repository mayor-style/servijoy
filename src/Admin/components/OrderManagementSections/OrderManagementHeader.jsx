import React, { useState } from "react";
import { ChevronRightIcon, PlusIcon, SearchIcon, BellIcon, FilterIcon, DownloadIcon } from "lucide-react";

export default function OrderManagementHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Sample notification data
  const notifications = [
    { id: 1, message: "New order #38291 received", time: "5 min ago", read: false },
    { id: 2, message: "Order #37281 status updated to 'Shipped'", time: "1 hour ago", read: false },
    { id: 3, message: "Inventory alert: 3 items low on stock", time: "3 hours ago", read: true },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm transition duration-200 mb-6">
      {/* Top section with breadcrumb and actions */}
      <div className="p-4 md:p-6 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col space-y-1">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="hover:text-primary dark:hover:text-primary-light cursor-pointer transition">Dashboard</span>
            <ChevronRightIcon size={14} className="mx-2" />
            <span className="hover:text-primary dark:hover:text-primary-light cursor-pointer transition">Sales</span>
            <ChevronRightIcon size={14} className="mx-2" />
            <span className="font-medium text-primary dark:text-primary-light">Order Management</span>
          </div>
          
          {/* Page Title with subtitle */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
              Order Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View and manage customer orders in one place
            </p>
          </div>
        </div>
        
        {/* Right section with actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition relative">
              <BellIcon size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                {notifications.filter(n => !n.read).length}
              </span>
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Notifications</h3>
                  <button className="text-xs text-primary dark:text-primary-light hover:underline">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 dark:border-gray-700 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition ${notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/10'}`}
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{notification.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 dark:border-gray-700 text-center">
                  <button className="text-xs text-primary dark:text-primary-light hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Export Button */}
          <button className="hidden md:flex items-center gap-1 py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition text-sm font-medium">
            <DownloadIcon size={16} className="mr-1" /> Export
          </button>
          
          {/* New Order Button */}
          <button className="flex items-center gap-1 py-2 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white transition text-sm font-medium shadow-sm">
            <PlusIcon size={16} className="mr-1" /> New Order
          </button>
        </div>
      </div>
      
      {/* Bottom section with search and filters */}
      <div className="p-4 md:p-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search orders by ID, customer, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20 focus:border-primary dark:focus:border-primary-light transition"
          />
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-sm text-gray-600 dark:text-gray-300 mr-1 hidden md:block">Filter by:</div>
          
          {/* Status Filter Dropdown */}
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20 focus:border-primary dark:focus:border-primary-light transition cursor-pointer">
              <option value="">Status: All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
            <ChevronRightIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
          
          {/* Date Range Filter */}
          <div className="relative">
            <select className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20 focus:border-primary dark:focus:border-primary-light transition cursor-pointer">
              <option value="">Date: All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <ChevronRightIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
          
          {/* More Filters Button */}
          <button className="flex items-center gap-1 py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition text-sm">
            <FilterIcon size={14} /> More Filters
          </button>
        </div>
      </div>
    </div>
  );
}