// File: components/PaymentWalletSections/TransactionHistory.jsx
import React from 'react';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-4 font-header">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm sm:text-base">
            <thead>
              <tr className='max-sm:text-xs'>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-right font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-center font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-gray-900 dark:text-white">{tx.date}</td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-gray-500 dark:text-gray-300">{tx.description}</td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-gray-900 dark:text-white text-right">
                    {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </td>
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full ${
                      tx.status === "completed"
                        ? "bg-green/20 text-green"
                        : tx.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red/20 text-red-600"
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;

