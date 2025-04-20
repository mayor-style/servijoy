import React from "react";
import { motion } from "framer-motion";
import { FaDollarSign, FaWallet, FaChartLine, FaHandHoldingUsd } from "react-icons/fa";

const EarningsSummary = ({ totalEarnings, pendingPayouts, isEmpty = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const renderEmptyState = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 text-center"
    >
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-full mb-4">
          <FaHandHoldingUsd className="h-12 w-12 text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Earnings Yet</h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
          Your earnings will appear here once you start making sales on your store.
        </p>
      </div>
    </motion.div>
  );

  if (isEmpty) {
    return renderEmptyState();
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
    >
      {/* Total Earnings Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 border-l-4 border-green/50 dark:border-green/40 transition-all duration-300 hover:shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-1">Total Earnings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Accumulated earnings to date</p>
          </div>
          <div className="bg-green/10 dark:bg-green/90/30 p-3 rounded-lg">
            <FaDollarSign className="h-6 w-6 text-green/60 dark:text-green/40" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              ${totalEarnings.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center mt-4">
            <FaChartLine className="h-4 w-4 text-green/50 mr-1" />
            <span className="text-sm font-medium text-green/60 dark:text-green/40">Lifetime earnings</span>
          </div>
        </div>
      </motion.div>
      
      {/* Pending Payouts Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 border-l-4 border-blue-500 dark:border-blue-400 transition-all duration-300 hover:shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-1">Available for Payout</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Earnings you can withdraw</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
            <FaWallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              ${pendingPayouts.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <FaWallet className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Ready to withdraw</span>
            </div>
            {pendingPayouts > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium"
              >
                Request Now
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EarningsSummary;