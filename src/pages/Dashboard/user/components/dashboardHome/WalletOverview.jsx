import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  FaWallet, 
  FaPlusCircle, 
  FaMinusCircle, 
  FaSpinner, 
  FaArrowUp, 
  FaArrowDown,
  FaHistory,
  FaExchangeAlt,
  FaChartLine
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "recharts";

const WalletOverview = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [walletBalance, setWalletBalance] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("transactions");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);

  // Generate mock trend data (replace with real data when available)
  const trendData = [
    { date: "Mon", amount: walletBalance ? walletBalance * 0.85 : 0 },
    { date: "Tue", amount: walletBalance ? walletBalance * 0.9 : 0 },
    { date: "Wed", amount: walletBalance ? walletBalance * 0.88 : 0 },
    { date: "Thu", amount: walletBalance ? walletBalance * 0.93 : 0 },
    { date: "Fri", amount: walletBalance ? walletBalance * 0.97 : 0 },
    { date: "Sat", amount: walletBalance ? walletBalance * 0.99 : 0 },
    { date: "Sun", amount: walletBalance ? walletBalance : 0 },
  ];

  // Fetch wallet data and recent transactions from the backend
  const fetchWalletData = async (showRefresh = false) => {
    try {
      if (showRefresh) setIsRefreshing(true);
      else setLoading(true);
      
      // Fetch the current user's data (including walletBalance) and transactions concurrently.
      const [userRes, transactionsRes] = await Promise.all([
        axios.get(`${baseUrl}/api/users/me`, { withCredentials: true }),
        axios.get(`${baseUrl}/api/payment/transactions`, { withCredentials: true })
      ]);
      
      // Assume userRes.data.data contains the current user's info, including walletBalance.
      if (userRes.data.success && userRes.data.data) {
        setWalletBalance(userRes.data.data.walletBalance);
      } else {
        setWalletBalance(0);
      }
      
      // Map transactions: convert _id to id and format date.
      if (transactionsRes.data.success && Array.isArray(transactionsRes.data.data)) {
        const mappedTransactions = transactionsRes.data.data.map(tx => ({
          id: tx._id || Math.random().toString(36).substring(2, 15),
          type: tx.type, 
          amount: tx.amount,
          description: tx.description || (tx.amount > 0 ? "Deposit" : "Withdrawal"),
          date: new Date(tx.createdAt).toLocaleDateString(),
          time: new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: tx.status || "completed"
        }));
        setRecentTransactions(mappedTransactions);
      } else {
        setRecentTransactions([]);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load wallet data.");
    } finally {
      setLoading(false);
      if (showRefresh) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  };

  const refreshData = () => {
    fetchWalletData(true);
  };

  useEffect(() => {
    fetchWalletData();
    const interval = setInterval(() => {
      fetchWalletData(true);
    }, 60000); // Refresh data every minute
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full">
        <div className="text-center py-10 text-red-500">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-4">
            <p className="font-medium">{error}</p>
          </div>
          <button
            onClick={fetchWalletData}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition transform hover:scale-105"
            aria-label="Retry loading wallet data"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return `₦${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 w-full overflow-hidden"
    >
      {/* Header with balance and refresh button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg"
          >
            <FaWallet className="text-white text-2xl md:text-3xl" />
          </motion.div>
          <div>
            <motion.h3 
              variants={childVariants}
              className="text-lg md:text-xl font-bold text-gray-900 dark:text-white font-header"
            >
              Wallet Overview
            </motion.h3>
            <motion.p 
              variants={childVariants}
              className="text-xs md:text-sm text-gray-500 dark:text-gray-400"
            >
              Manage your funds securely
            </motion.p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={refreshData}
          disabled={isRefreshing}
          className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-all rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Refresh wallet data"
        >
          <FaExchangeAlt className={`text-lg ${isRefreshing ? "animate-spin text-blue-500" : ""}`} />
        </motion.button>
      </div>

      {/* Balance card with 3D effect */}
      <motion.div 
        variants={childVariants}
        className="mt-6 md:mt-8 bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl shadow-lg relative overflow-hidden"
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        whileHover={{ 
          rotateY: 5, 
          rotateX: 5,
          transition: { duration: 0.3 }
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs md:text-sm text-blue-100">Available Balance</p>
            <div className="flex items-center bg-white/20 backdrop-blur-sm py-1 px-2 rounded-full">
              <span className="text-xs text-white">Wallet</span>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.h2
              key={walletBalance}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-extrabold text-white mb-1"
            >
              {formatCurrency(walletBalance || 0)}
            </motion.h2>
          </AnimatePresence>
          
          <div className="h-10 w-full mt-4">
            {walletBalance > 0 && (
              <div className="h-full w-full">
                <Line
                  data={trendData}
                  width={200}
                  height={40}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#ffffff"
                    strokeWidth={2}
                    dot={false}
                  />
                </Line>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div 
        variants={childVariants}
        className="mt-6 md:mt-8 grid grid-cols-2 gap-4"
      >
        <Link
          to="/dashboard/wallet/deposit"
          className="flex items-center justify-center gap-2 px-3 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-102"
          aria-label="Deposit funds"
        >
          <FaPlusCircle className="text-lg md:text-xl" />
          <span className="font-medium">Deposit</span>
        </Link>
        <Link
          to="/dashboard/wallet/withdraw"
          className="flex items-center justify-center gap-2 px-3 py-3 md:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-102"
          aria-label="Withdraw funds"
        >
          <FaMinusCircle className="text-lg md:text-xl" />
          <span className="font-medium">Withdraw</span>
        </Link>
      </motion.div>

      {/* Tabs for Transactions/Analytics */}
      <motion.div 
        variants={childVariants}
        className="mt-6 md:mt-8"
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex items-center gap-2 pb-2 px-4 border-b-2 transition-all ${
              activeTab === "transactions"
                ? "border-blue-500 text-blue-500 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FaHistory className="text-sm" />
            <span className="font-medium text-sm">Transactions</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 pb-2 px-4 border-b-2 transition-all ${
              activeTab === "analytics"
                ? "border-blue-500 text-blue-500 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FaChartLine className="text-sm" />
            <span className="font-medium text-sm">Analytics</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "transactions" ? (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {recentTransactions.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 styled-scrollbar">
                  {recentTransactions.map((tx, index) => (
                    <motion.div
                      key={tx.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow group"
                      role="listitem"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.amount > 0 
                            ? "bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {tx.amount > 0 ? <FaArrowUp /> : <FaArrowDown />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {tx.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{tx.date}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            <span>{tx.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <span className={`font-bold text-sm ${
                          tx.amount > 0 ? "text-green/50 dark:text-green/40" : "text-red-500 dark:text-red-400"
                        }`}>
                          {tx.amount > 0 ? "+" : "-"}{formatCurrency(Math.abs(tx.amount))}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          tx.status === "completed" 
                            ? "bg-green-100 text-green/60 dark:bg-green/90 dark:text-green/40" 
                            : tx.status === "pending" 
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-6 text-center">
                  <div className="mb-3 w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <FaWallet className="text-gray-400 dark:text-gray-500 text-2xl" />
                  </div>
                  <h4 className="text-gray-700 dark:text-gray-300 mb-2 font-medium">No transactions yet</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Your transaction history will appear here.</p>
                  <Link 
                    to="/dashboard/wallet/deposit" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                  >
                    <FaPlusCircle /> Make Your First Deposit
                  </Link>
                </div>
              )}
              
              {recentTransactions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-center"
                >
                  <Link 
                    to="/dashboard/wallet/transactions" 
                    className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                  >
                    View All Transactions
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <FaArrowUp className="text-green/50" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Total Income</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(recentTransactions
                      .filter(tx => tx.amount > 0)
                      .reduce((sum, tx) => sum + tx.amount, 0))}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <FaArrowDown className="text-red-500" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Total Expenses</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(Math.abs(recentTransactions
                      .filter(tx => tx.amount < 0)
                      .reduce((sum, tx) => sum + tx.amount, 0)))}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Balance Trend</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Last 7 days</span>
                </div>
                <div className="h-32 w-full">
                  {walletBalance > 0 && (
                    <div className="h-full w-full">
                      <Line
                        data={trendData}
                        width={300}
                        height={120}
                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      >
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 3, fill: "#3b82f6", strokeWidth: 2, stroke: "#3b82f6" }}
                        />
                      </Line>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link 
                  to="/dashboard/wallet/analytics" 
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                >
                  View Detailed Analytics
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .styled-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }

        .styled-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </motion.div>
  );
};

export default WalletOverview;