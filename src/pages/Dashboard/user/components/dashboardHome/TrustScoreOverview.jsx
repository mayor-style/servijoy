import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import axios from "axios";
import { FaStar, FaRegStar, FaArrowUp, FaSpinner, FaUserShield, FaHistory, FaChartLine } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from 'react-tooltip';

const TrustScoreOverview = () => {
  const { user } = useAuth();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [trustScore, setTrustScore] = useState(user?.trustScore || 0);
  const [bookingStats, setBookingStats] = useState({
    completed: 0,
    cancelled: 0,
    disputed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const progressRef = useRef(null);

  // Mock data for history chart - replace with real data in production
  const historyData = [
    { month: "Jan", score: 78 },
    { month: "Feb", score: 82 },
    { month: "Mar", score: 85 },
    { month: "Apr", score: 81 },
    { month: "May", score: 87 },
    { month: "Jun", score: trustScore }
  ];

  // Calculate trust level based on score
  const getTrustLevel = (score) => {
    if (score >= 90) return { level: "Premium", color: "text-purple-600 dark:text-purple-400" };
    if (score >= 80) return { level: "Advanced", color: "text-blue-600 dark:text-blue-400" };
    if (score >= 70) return { level: "Established", color: "text-green-600 dark:text-green-400" };
    if (score >= 50) return { level: "Growing", color: "text-yellow-600 dark:text-yellow-400" };
    return { level: "Starter", color: "text-gray-600 dark:text-gray-400" };
  };

  const trustLevel = getTrustLevel(trustScore);

  // Get color for progress bar based on score
  const getProgressColor = (score) => {
    if (score >= 90) return "from-purple-400 to-purple-600";
    if (score >= 80) return "from-blue-400 to-blue-600";
    if (score >= 70) return "from-green/40 to-green/60";
    if (score >= 50) return "from-yellow-400 to-yellow-600";
    return "from-gray-400 to-gray-600";
  };


  // Fetch user booking stats
  const fetchUserStats = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/orders/user`,
        { withCredentials: true }
      );
      if (response.status === 200 && response.data) {
        setBookingStats({
          completed: response.data.completedBookings || 0,
          cancelled: response.data.cancelledBookings || 0, 
          disputed: response.data.disputedBookings || 0
        });
        // You might want to set trust score based on user's booking behavior
        // setTrustScore(response.data.trustScore);
      } else {
       // setError("Failed to load user stats.");
       setBookingStats({
        completed:0,
        cancelled:0,
        disputed:0
       })
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchUserStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center gap-3">
          <FaSpinner className="animate-spin text-4xl text-blue-500" aria-label="Loading trust score" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading your trust profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-red-200 dark:border-red-700">
        <div className="flex items-center gap-3 text-red-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-semibold">Error Loading Trust Data</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
        <button 
          onClick={() => {setLoading(true); fetchUserStats();}}
          className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case "history":
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Trust Score History</h4>
            <div className="relative h-32">
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-24">
                {historyData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-1/6">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.score / 100) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`w-2 md:w-3 rounded-t-full bg-gradient-to-t ${getProgressColor(item.score)}`}
                      data-tooltip-id="history-tooltip"
                      data-tooltip-content={`${item.month}: ${item.score}/100`}
                    />
                    <span className="text-xs mt-1 text-gray-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <Tooltip id="history-tooltip" />
          </motion.div>
        );
      case "benefits":
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {trustLevel.level} Level Benefits
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  {trustScore >= 70 ? "Priority customer support" : "Standard customer support"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  {trustScore >= 80 ? "Access to exclusive services" : "Standard service access"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  {trustScore >= 90 ? "Loyalty rewards & discounts" : "Standard rewards"}
                </span>
              </li>
            </ul>
          </motion.div>
        );
      default: // overview
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                {trustScore}
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">/100</span>
              </h2>
              <div className="flex flex-col items-end">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${trustLevel.color} bg-opacity-20 bg-current`}>
                  {trustLevel.level} Level
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {trustScore >= 90 ? "Top 5% of users" : 
                   trustScore >= 80 ? "Top 15% of users" : 
                   trustScore >= 70 ? "Top 30% of users" : ""}
                </p>
              </div>
            </div>

            <div className="mt-4" ref={progressRef}>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <div
                className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={trustScore}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trustScore}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${getProgressColor(trustScore)}`}
                />
                
                {/* Milestone markers */}
                <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
                  {[50, 70, 80, 90].map(milestone => (
                    <div 
                      key={milestone}
                      className="absolute top-0 h-full"
                      style={{ left: `${milestone}%` }}
                      data-tooltip-id="milestone-tooltip"
                      data-tooltip-content={`${milestone}: ${
                        milestone === 50 ? "Starter" :
                        milestone === 50 ? "Starter" :
                        milestone === 70 ? "Established" :
                        milestone === 80 ? "Advanced" : "Premium"
                      }`}
                    >
                      <div className="absolute h-full w-px bg-gray-400 dark:bg-gray-500"></div>
                      <div className={`absolute top-0 w-2 h-2 rounded-full -ml-1 ${
                        trustScore >= milestone ? 'bg-white' : 'bg-gray-400 dark:bg-gray-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Tooltip id="milestone-tooltip" />
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
    {/* Glass-morphism header */}
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 md:p-8 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20 rounded-full blur-2xl bg-blue-400 dark:bg-blue-600 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 rounded-full shadow-lg"
          >
            <FaUserShield className="text-blue-500 dark:text-blue-300 text-2xl md:text-3xl" />
          </motion.div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-header">
              Your Trust Score
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your customer reliability on ServiJoy
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="ml-auto text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </motion.button>
        </div>
      </div>

      {/* User stats display */}
      <div className="p-6 md:p-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4"
          >
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Bookings completed:</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{bookingStats.completed}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your booking history directly affects your trust score
              </p>
            </div>
            
            <div className="w-px h-10 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
            
            <div className="mt-2 md:mt-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cancellations:</span>
                <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{bookingStats.cancelled}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disputes:</span>
                <span className="text-sm font-bold text-red-600 dark:text-red-400">{bookingStats.disputed}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-2 rounded-lg"
          >
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm font-medium text-green-800 dark:text-green-300">
              +5 points last month
            </span>
          </motion.div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              {/* Tab navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {["overview", "history", "benefits"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab 
                        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {tab === "overview" && <FaChartLine className="text-xs" />}
                      {tab === "history" && <FaHistory className="text-xs" />}
                      {tab === "benefits" && <FaUserShield className="text-xs" />}
                      <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl flex items-center gap-4"
        >
          <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
            <FaArrowUp className="text-blue-600 dark:text-blue-300 text-lg" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">How to improve your score</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Complete bookings as scheduled, avoid cancellations, and maintain positive interactions with service providers to boost your trust score.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrustScoreOverview;