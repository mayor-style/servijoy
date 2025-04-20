import React, { useState, useEffect } from "react";
import EarningsSummary from "./components/EarningsAndPayoutsSections/EarningsSummary";
import PayoutHistory from "./components/EarningsAndPayoutsSections/PayoutHistory";
import RequestPayoutModal from "./components/EarningsAndPayoutsSections/RequestPayoutModal";
import { motion } from "framer-motion";
import { FaTools, FaChartLine, FaExclamationTriangle, FaEye, FaEyeSlash } from "react-icons/fa";

const EarningsAndPayouts = () => {
  // State management
  const [totalEarnings, setTotalEarnings] = useState(5230.5);
  const [pendingPayouts, setPendingPayouts] = useState(1280.75);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  
  // State for loading and development testing
  const [isLoading, setIsLoading] = useState(true);
  const [isDev, setIsDev] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  
  // Mock data
  const mockPayoutHistory = [
    {
      id: 1,
      date: "2025-02-01",
      amount: 500.0,
      status: "completed",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 2,
      date: "2025-01-15",
      amount: 300.0,
      status: "completed",
      paymentMethod: "PayPal",
    },
    {
      id: 3,
      date: "2025-01-05",
      amount: 250.0,
      status: "pending",
      paymentMethod: "Bank Transfer",
    },
  ];

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        if (!showEmptyState) {
          setPayoutHistory(mockPayoutHistory);
        } else {
          setPayoutHistory([]);
          setPendingPayouts(0);
          setTotalEarnings(0);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [showEmptyState]);

  // Handler when a new payout request is submitted
  const handlePayoutRequest = (request) => {
    setPayoutHistory([request, ...payoutHistory]);
    setPendingPayouts((prev) => Math.max(0, prev - request.amount));
  };

  // Toggle development mode
  const toggleDevMode = () => {
    setIsDev(!isDev);
  };

  // Toggle empty state for testing
  const toggleEmptyState = () => {
    setShowEmptyState(!showEmptyState);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 transition-colors duration-300">
      {/* Dev Mode Toggle - For Development Only */}
      {isDev && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-2xl border border-gray-700"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <FaTools className="mr-2" />
                <span className="font-medium">Dev Tools</span>
              </span>
              <button
                onClick={toggleDevMode}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                Hide
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Empty State</span>
              <button
                onClick={toggleEmptyState}
                className={`text-sm px-3 py-1 rounded flex items-center ${
                  showEmptyState 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {showEmptyState ? <FaEye className="mr-1" /> : <FaEyeSlash className="mr-1" />}
                {showEmptyState ? "Show Data" : "Show Empty"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Earnings & Payouts
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your earnings and request payouts
          </p>
        </div>
        
        {/* Button to toggle dev mode (only visible in development) */}
        <div className="flex justify-end mb-6">
          {!isDev && (
            <button
              onClick={toggleDevMode}
              className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <FaTools /> Dev Mode
            </button>
          )}
        </div>
        
        {isLoading ? (
          // Loading State
          <div className="space-y-8">
            {/* Skeleton for Earnings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            
            {/* Skeleton for Button */}
            <div className="flex justify-end">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            </div>
            
            {/* Skeleton for Payout History */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8 transition-all duration-300">
            {/* Earnings Summary Section */}
            <EarningsSummary 
              totalEarnings={totalEarnings} 
              pendingPayouts={pendingPayouts}
              isEmpty={showEmptyState} 
            />
            
            {/* Request Payout Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsPayoutModalOpen(true)}
                disabled={pendingPayouts <= 0}
                className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg flex items-center gap-2 ${
                  pendingPayouts <= 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaChartLine />
                Request Payout
              </motion.button>
            </div>
            
            {/* Payout History Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PayoutHistory 
                payouts={payoutHistory} 
                isLoading={isLoading}
                isEmpty={payoutHistory.length === 0}
              />
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Empty State Info Banner (only visible in dev mode) */}
      {isDev && showEmptyState && !isLoading && (
        <div className="max-w-7xl mx-auto mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg flex items-start gap-3">
          <FaExclamationTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Development Mode: Empty State</h3>
            <p className="text-sm mt-1">Showing empty state for testing purposes. Click "Show Data" to view sample data.</p>
          </div>
        </div>
      )}
      
      {/* Request Payout Modal */}
      <RequestPayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        onSubmit={handlePayoutRequest}
        availableAmount={pendingPayouts}
      />
    </div>
  );
};

export default EarningsAndPayouts;