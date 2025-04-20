import React, { useState, useEffect, useCallback } from "react";
import { FaExclamationTriangle, FaUserTimes, FaUserCheck, FaBell, FaFilter, FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AlertsNotificationsPanel = ({ onAlertClick, refreshInterval = 60000 }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Simulate fetching alerts
  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockAlerts = [
        { 
          id: 1, 
          type: "warning", 
          message: "5 vendors are currently suspended.", 
          timestamp: new Date(Date.now() - 30 * 60000),
          actionable: true,
          details: "Vendors failed to meet compliance requirements. Review accounts."
        },
        { 
          id: 2, 
          type: "pending", 
          message: "10 user accounts pending verification.", 
          timestamp: new Date(Date.now() - 120 * 60000),
          actionable: true,
          details: "New users await verification. Some accounts are older than 24 hours."
        },
        { 
          id: 3, 
          type: "suspension", 
          message: "2 users have been suspended this week.", 
          timestamp: new Date(Date.now() - 2 * 24 * 60000),
          actionable: false,
          details: "Users were suspended due to violation of terms of service."
        },
        { 
          id: 4, 
          type: "success", 
          message: "System maintenance completed successfully.", 
          timestamp: new Date(Date.now() - 10 * 60000),
          actionable: false,
          details: "All systems operating normally after scheduled maintenance."
        },
      ];
      
      setAlerts(mockAlerts);
    } catch (err) {
      setError("Failed to fetch alerts. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    
    // Set up refresh interval
    const intervalId = setInterval(() => {
      fetchAlerts();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [fetchAlerts, refreshInterval]);

  const getIcon = (type) => {
    switch (type) {
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "pending":
        return <FaUserCheck className="text-blue-500" />;
      case "suspension":
        return <FaUserTimes className="text-red-500" />;
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  const getAlertClass = (type) => {
    switch (type) {
      case "warning":
        return "border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "pending":
        return "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20";
      case "suspension":
        return "border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20";
      case "success":
        return "border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20";
      default:
        return "border-l-4 border-gray-300 bg-gray-50 dark:bg-gray-700";
    }
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    if (onAlertClick) onAlertClick(alert);
  };

  const dismissAlert = (id, e) => {
    e.stopPropagation();
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const formatTimeAgo = (date) => {
    const minutes = Math.floor((new Date() - date) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 24 * 60) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / (60 * 24))}d ago`;
  };

  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl transition-all duration-300 mt-6 relative">
      {/* Header with filter and refresh controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaBell className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Alerts & Notifications
            {filteredAlerts.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
                {filteredAlerts.length}
              </span>
            )}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaFilter className="text-xs" />
              <span>Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
            </button>
            
            {isFilterMenuOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10 w-40 py-1 border border-gray-200 dark:border-gray-700">
                {["all", "warning", "pending", "suspension", "success"].map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-2 text-sm ${filter === option ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => {
                      setFilter(option);
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={fetchAlerts}
            disabled={loading}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Refresh alerts"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Settings"
          >
            <FaEllipsisV className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-3">Notification Settings</h3>
              <div className="space-y-3">
                {["warning", "pending", "suspension", "success"].map((type) => (
                  <div key={type} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`show-${type}`} 
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 mr-2"
                      defaultChecked
                    />
                    <label htmlFor={`show-${type}`} className="text-sm text-gray-600 dark:text-gray-300">{type.charAt(0).toUpperCase() + type.slice(1)} alerts</label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm border border-red-200 dark:border-red-800">
          {error}
          <button 
            onClick={fetchAlerts}
            className="ml-2 underline"
          >
            Try again
          </button>
        </div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading alerts...</p>
          </div>
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="py-12 text-center">
          <FaBell className="mx-auto text-4xl text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No alerts to display</p>
          {filter !== "all" && (
            <button 
              onClick={() => setFilter("all")}
              className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredAlerts.map((alert) => (
              <motion.li
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleAlertClick(alert)}
                className={`flex items-start p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${getAlertClass(alert.type)}`}
              >
                <div className="text-2xl p-1">{getIcon(alert.type)}</div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-800 dark:text-white">{alert.message}</p>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                      {alert.actionable && (
                        <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded-full text-xs">
                          Action needed
                        </span>
                      )}
                      <button 
                        onClick={(e) => dismissAlert(alert.id, e)}
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 ml-1"
                        aria-label="Dismiss"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                  {selectedAlert?.id === alert.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {alert.details}
                    </motion.div>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
      
      {/* Footer with pagination if needed */}
      {filteredAlerts.length > 0 && (
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Showing {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}</span>
          <button 
            onClick={fetchAlerts}
            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Refresh</span>
            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertsNotificationsPanel;