import React, { useState, useEffect, useCallback } from "react";
import { FaRegHandshake, FaChevronRight, FaBell, FaUserCircle, FaAngleDown, FaAngleUp, FaCog, FaExclamationTriangle } from "react-icons/fa";
import { BsGraphUp, BsClock, BsLightningCharge, BsArrowRepeat } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const VendorWelcome = () => {
  const { user } = useAuth();
  const vendorName = user?.name || "Vendor";
  const [greeting, setGreeting] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Development mode state
  const [devMode, setDevMode] = useState(false);
  const [devOptions, setDevOptions] = useState({
    showEmpty: false,
    showError: false,
    showLoading: false
  });

  // Actual data state
  const [quickStats, setQuickStats] = useState({
    pending: 0,
    today: 0,
    revenue: 0,
    lastUpdate: null
  });

  // Remember user's preference for expanded/collapsed state
  useEffect(() => {
    const savedState = localStorage.getItem("vendorWelcomeExpanded");
    if (savedState !== null) {
      setIsExpanded(savedState === "true");
    }
    
    // Check if dev mode was enabled previously
    const savedDevMode = localStorage.getItem("vendorDevMode");
    if (savedDevMode) {
      setDevMode(savedDevMode === "true");
    }
  }, []);

  // Save preference when changed
  useEffect(() => {
    localStorage.setItem("vendorWelcomeExpanded", isExpanded);
  }, [isExpanded]);
  
  useEffect(() => {
    localStorage.setItem("vendorDevMode", devMode);
  }, [devMode]);

  // Function to fetch data - in real app, this would be an API call
  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulating API call
    setTimeout(() => {
      try {
        // If in dev mode with empty state enabled, return empty data
        if (devMode && devOptions.showEmpty) {
          setQuickStats({
            pending: 0,
            today: 0,
            revenue: 0,
            lastUpdate: new Date()
          });
        } 
        // If in dev mode with error state enabled, throw error
        else if (devMode && devOptions.showError) {
          throw new Error("Failed to fetch dashboard data");
        }
        // Otherwise return mock data
        else {
          setQuickStats({
            pending: 5,
            today: 3,
            revenue: 1250,
            lastUpdate: new Date()
          });
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, devMode && devOptions.showLoading ? 2000 : 500);
  }, [devMode, devOptions]);

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    
    fetchData();
  }, [fetchData]);

  // Quick action buttons with improved icons and descriptions
  const quickActions = [
    { 
      icon: <FaRegHandshake size={18} />, 
      label: "Pending Requests", 
      description: "Respond to bookings",
      path: "/dashboard/booking-requests", 
      count: quickStats.pending,
      urgent: quickStats.pending > 3,
      color: "from-blue-400 to-blue-500",
      emptyMessage: "No pending requests"
    },
    { 
      icon: <BsClock size={18} />, 
      label: "Today's Schedule", 
      description: "Your upcoming events",
      path: "/dashboard/today-events", 
      count: quickStats.today,
      color: "from-green-400 to-green-500",
      emptyMessage: "No events today" 
    },
    { 
      icon: <BsGraphUp size={18} />, 
      label: "Performance", 
      description: "Track your growth",
      path: "/dashboard/analytics",
      color: "from-purple-400 to-purple-500",
      emptyMessage: "Start building your performance"
    }
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const toggleDevMode = () => {
    setDevMode(!devMode);
  };
  
  const toggleDevOption = (option) => {
    setDevOptions(prev => {
      const newOptions = {
        ...prev,
        [option]: !prev[option]
      };
      
      // Trigger data reload when options change
      setTimeout(() => fetchData(), 0);
      
      return newOptions;
    });
  };

  // Get appropriate smart suggestion based on data and state
  const getSmartSuggestion = () => {
    if (quickStats.pending === 0 && quickStats.today === 0) {
      return "Start by setting up your services to attract your first bookings.";
    } else if (quickStats.pending > 3) {
      return "You have several pending requests. Responding quickly improves your response rate.";
    } else if (quickStats.today > 0) {
      return "You have events scheduled today. Ensure you're prepared and on time.";
    } else {
      return "Your schedule looks manageable today. Great time to update your service offerings.";
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="p-4 sm:p-5 pt-0">
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white/5 p-3 rounded-xl h-20"></div>
              ))}
            </div>
            <div className="mt-4 bg-white/10 rounded-lg p-3 h-24"></div>
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="p-4 sm:p-5 pt-0">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
            <FaExclamationTriangle className="text-red-400 mx-auto mb-2" size={24} />
            <p className="text-white text-sm">{error}</p>
            <button 
              onClick={fetchData}
              className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm flex items-center mx-auto"
            >
              <BsArrowRepeat className="mr-2" /> Retry
            </button>
          </div>
        </div>
      );
    }
    
    const hasNoData = quickStats.pending === 0 && quickStats.today === 0 && quickStats.revenue === 0;
    
    return (
      <div className="p-4 sm:p-5 pt-0">
        {/* Date display */}
        <div className="mb-4 border-b border-white/10 pb-3">
          <p className="text-sm text-gray-100">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        {/* Quick stats/actions cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <Link 
              key={index}
              to={action.path}
              className={`bg-white/5 hover:bg-white/15 backdrop-blur-md p-3 rounded-xl flex items-center justify-between transition-all duration-300 border border-white/5 hover:border-white/20 group hover:shadow-md ${
                action.urgent ? 'ring-1 ring-red-400/50 hover:ring-red-400' : ''
              }`}
              data-tooltip-id={`action-tooltip-${index}`}
              data-tooltip-content={action.description}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 bg-gradient-to-br ${action.color} text-white`}>
                  {action.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{action.label}</p>
                  {action.count !== undefined && action.count > 0 ? (
                    <div className="text-xs text-gray-300 mt-0.5 flex items-center">
                      <span>{action.count}</span>
                      <span className="ml-1">{action.count === 1 ? 'item' : 'items'}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 mt-0.5">{action.emptyMessage}</div>
                  )}
                </div>
              </div>
              <FaChevronRight className="text-xs opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all text-white" />
              <Tooltip id={`action-tooltip-${index}`} place="top" />
            </Link>
          ))}
        </div>
        
        {/* Empty state message */}
        {hasNoData && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <BsLightningCharge className="text-blue-300" size={20} />
            </div>
            <h3 className="text-white text-sm font-medium mb-1">Welcome to your dashboard!</h3>
            <p className="text-gray-300 text-xs mb-3">
              This is where you'll manage your bookings and track your performance.
            </p>
            <Link
              to="/dashboard/services"
              className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
            >
              Set Up Your Services
            </Link>
          </div>
        )}
        
        {/* Smart recommendations - AI-driven suggestions */}
        {!hasNoData && (
          <div className="mt-4 bg-white/10 rounded-lg p-3 border border-white/10">
            <div className="flex items-center mb-2">
              <BsLightningCharge className="text-yellow-300 mr-2" size={14} />
              <p className="text-sm font-medium text-white">Smart Suggestion</p>
            </div>
            <p className="text-xs text-gray-200">
              {getSmartSuggestion()}
            </p>
          </div>
        )}
        
        {/* Last update indicator */}
        <div className="mt-3 text-right">
          <p className="text-xs text-white/60">
            Last updated: {quickStats.lastUpdate ? new Date(quickStats.lastUpdate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="mb-4 relative"
    >
      {/* Dev mode toggle button - only visible during development */}
      <div className="absolute -top-4 -right-4 z-20">
        <button
          onClick={toggleDevMode}
          className={`p-2 rounded-full shadow-md transition-all duration-300 ${
            devMode ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-300'
          }`}
          data-tooltip-id="dev-mode-tooltip"
          data-tooltip-content={devMode ? "Disable dev mode" : "Enable dev mode"}
        >
          <FaCog size={14} className={devMode ? "animate-spin-slow" : ""} />
        </button>
        <Tooltip id="dev-mode-tooltip" place="left" />
      </div>
      
      {/* Development options panel */}
      <AnimatePresence>
        {devMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-2 p-3 bg-gray-800 border border-yellow-500/30 rounded-lg text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-yellow-500 text-xs font-bold uppercase">Development Mode</h3>
              <button 
                onClick={fetchData}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full flex items-center"
              >
                <BsArrowRepeat className="mr-1" size={10} /> Reload
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleDevOption('showEmpty')}
                className={`text-xs px-3 py-1 rounded-full ${
                  devOptions.showEmpty ? 'bg-yellow-500 text-black' : 'bg-gray-700'
                }`}
              >
                Empty State
              </button>
              <button
                onClick={() => toggleDevOption('showError')}
                className={`text-xs px-3 py-1 rounded-full ${
                  devOptions.showError ? 'bg-red-500 text-white' : 'bg-gray-700'
                }`}
              >
                Error State
              </button>
              <button
                onClick={() => toggleDevOption('showLoading')}
                className={`text-xs px-3 py-1 rounded-full ${
                  devOptions.showLoading ? 'bg-blue-500 text-white' : 'bg-gray-700'
                }`}
              >
                Loading State
              </button>
            </div>
            <p className="mt-2 text-gray-400 text-xs">This panel is for development purposes only. Remove in production.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-indigo-900 shadow-lg">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        
        {/* Decorative elements */}
        <div className="absolute -right-16 -top-20 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl"></div>
        
        {/* Header section - always visible */}
        <div className="relative z-10 p-4 sm:p-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full mr-3 border-2 border-white/30" />
              ) : (
                <FaUserCircle className="w-9 h-9 mr-3 text-white/70" />
              )}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
                  {greeting}, {vendorName}!
                  <span className="inline-block ml-2 text-sm">👋</span>
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  {!loading && !error && quickStats.pending > 0 && (
                    <div className="bg-red-500/30 px-2 py-0.5 rounded-full text-xs text-white flex items-center">
                      <FaBell size={10} className="mr-1" />
                      {quickStats.pending} pending
                    </div>
                  )}
                  <div className="bg-green-500/20 px-2 py-0.5 rounded-full text-xs text-green-300 flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Link 
                to="/dashboard/booking-requests"
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <FaBell className="mr-1" size={12} />
                <span className="hidden sm:inline">Requests</span>
                {!loading && !error && quickStats.pending > 0 && (
                  <span className="ml-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {quickStats.pending}
                  </span>
                )}
              </Link>
              
              <button 
                onClick={toggleExpand}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all duration-300"
                aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
              >
                {isExpanded ? <FaAngleUp size={16} /> : <FaAngleDown size={16} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 overflow-hidden"
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VendorWelcome;