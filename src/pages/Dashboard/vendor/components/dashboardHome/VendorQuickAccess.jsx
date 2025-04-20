import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced modern icons
const ServiceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="12" y2="18" />
  </svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
    <path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-3m0-10V7a4 4 0 0 0-4-4z" />
    <circle cx="17" cy="13" r="2" />
  </svg>
);

const DisputeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
    <path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <rect x="8" y="19" width="8" height="3" rx="1" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
    <path d="M21 12V7H12V3H3v18h18v-9z"></path>
    <path d="M16 7v13"></path>
    <path d="M12 16H7"></path>
    <path d="M12 12H7"></path>
    <path d="M12 8H7"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Enhanced QuickAccessItem component
const QuickAccessItem = ({ title, icon, bgClass, route, description, stats, isActive, onClick }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      onClick={() => {
        onClick();
        navigate(route);
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${bgClass} relative rounded-2xl overflow-hidden cursor-pointer ${isActive ? 'ring-4 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900' : ''}`}
      style={{ height: isActive ? '11rem' : '9rem' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br transition-all duration-300">
        <div className="h-full w-full flex flex-col justify-between p-5">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
              {icon}
            </div>
            {stats && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-white text-xs font-medium">{stats}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VendorQuickAccess = () => {
  // Track which category is active
  const [activeCategory, setActiveCategory] = useState("essentials");
  // Track hover state for Quick View
  const [quickViewHover, setQuickViewHover] = useState(false);

  // Define categories and their items
  const categories = {
    essentials: [
      {
        title: "Manage Services",
        description: "Update offerings, pricing & availability",
        icon: <ServiceIcon />,
        bgClass: "bg-gradient-to-br from-blue-600 to-indigo-800",
        route: "/dashboard/manage-services",
        stats: "2 active"
      },
      {
        title: "Wallet & Earnings",
        description: "Track income & withdraw funds",
        icon: <WalletIcon />,
        bgClass: "bg-gradient-to-br from-emerald-600 to-teal-800",
        route: "/dashboard/earnings",
        stats: "$1,240"
      },
      {
        title: "Dispute Center",
        description: "Resolve client issues quickly",
        icon: <DisputeIcon />,
        bgClass: "bg-gradient-to-br from-purple-600 to-fuchsia-800",
        route: "/dashboard/vendor-disputes",
        stats: "0 open"
      },
      {
        title: "Settings",
        description: "Customize your experience",
        icon: <SettingsIcon />,
        bgClass: "bg-gradient-to-br from-gray-700 to-gray-900",
        route: "/dashboard/settings"
      }
    ],
    analytics: [
      {
        title: "Performance",
        description: "Review service metrics & growth",
        icon: <AnalyticsIcon />,
        bgClass: "bg-gradient-to-br from-orange-500 to-red-700",
        route: "/dashboard/analytics/performance"
      },
      {
        title: "Client Insights",
        description: "Understand client behaviors & preferences",
        icon: <ServiceIcon />,
        bgClass: "bg-gradient-to-br from-pink-500 to-rose-700",
        route: "/dashboard/analytics/client-insights"
      },
      {
        title: "Scheduling",
        description: "Manage your calendar & availability",
        icon: <CalendarIcon />,
        bgClass: "bg-gradient-to-br from-cyan-500 to-blue-700",
        route: "/dashboard/calendar"
      },
      {
        title: "Quick Insights",
        description: "View important metrics at a glance",
        icon: <AnalyticsIcon />,
        bgClass: "bg-gradient-to-br from-amber-500 to-orange-700",
        route: "/dashboard/quick-insights"
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl mr-4">
              <span className="text-white text-lg">⚡</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Quick Access</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Essential tools to manage your business</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveCategory("essentials")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === "essentials" 
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" 
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/40"
              }`}
            >
              Essentials
            </button>
            <button 
              onClick={() => setActiveCategory("analytics")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === "analytics" 
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" 
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/40"
              }`}
            >
              Analytics & Planning
            </button>
          </div>
        </div>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {categories[activeCategory].map((item, index) => (
                <QuickAccessItem 
                  key={index} 
                  {...item} 
                  isActive={false}
                  onClick={() => {}}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          
          <motion.div 
            className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                  className="w-4 h-4 text-blue-600 dark:text-blue-400">
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="17" x2="12" y2="17"></line>
                </svg>
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Need help navigating your dashboard?
              </span>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setQuickViewHover(true)}
              onMouseLeave={() => setQuickViewHover(false)}
            >
              <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center">
                Quick Tour
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                  className="w-4 h-4 ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              
              <AnimatePresence>
                {quickViewHover && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 bottom-8 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-xs text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                  >
                    Take a 2-minute tour of your vendor dashboard features and capabilities
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorQuickAccess;