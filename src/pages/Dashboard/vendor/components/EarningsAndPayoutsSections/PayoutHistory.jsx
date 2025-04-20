import React from "react";
import { motion } from "framer-motion";
import { FaFileInvoiceDollar, FaExclamationCircle, FaCheckCircle, FaClock } from "react-icons/fa";

const PayoutHistory = ({ payouts, isLoading = false, isEmpty = false }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green/50 mr-2" />;
      case "pending":
        return <FaClock className="text-yellow-500 mr-2" />;
      case "failed":
        return <FaExclamationCircle className="text-red-500 mr-2" />;
      default:
        return <FaClock className="text-gray-400 mr-2" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green/10 dark:bg-green/30 text-green/80 dark:text-green/20";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      case "failed":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const renderEmptyState = () => (
    <div className="text-center py-16">
      <div className="bg-gray-100 dark:bg-gray-700 inline-flex p-4 rounded-full mb-4">
        <FaFileInvoiceDollar className="h-8 w-8 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payout history</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Once you request a payout, your transaction history will appear here.
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Payout History
        </h3>
        {payouts.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium">
            {payouts.length} {payouts.length === 1 ? 'transaction' : 'transactions'}
          </div>
        )}
      </div>

      {isEmpty || payouts.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {payouts.map((payout) => (
                <motion.tr 
                  key={payout.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                >
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatDate(payout.date)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {payout.paymentMethod}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-medium">
                    ${payout.amount.toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-3 py-1 inline-flex items-center rounded-full text-xs font-medium ${getStatusClass(payout.status)}`}>
                      {getStatusIcon(payout.status)}
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default PayoutHistory;