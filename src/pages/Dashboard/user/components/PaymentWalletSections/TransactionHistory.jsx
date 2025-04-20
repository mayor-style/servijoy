import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, History, ChevronDown } from 'lucide-react';

const TransactionHistory = ({ transactions }) => {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const paginatedTransactions = transactions.slice(0, page * perPage);
  
  const getStatusStyles = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'pending':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  const getTransactionIcon = (type) => {
    return type === 'credit' 
      ? <ArrowUpRight size={16} className="text-emerald-600" /> 
      : <ArrowDownRight size={16} className="text-red-600" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
            <History size={18} className="text-gray-700 dark:text-gray-300" />
          </span>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Transaction History</h2>
        </div>
      </div>

      {!transactions.length ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/20 rounded-xl">
          <div className="bg-gray-100 dark:bg-gray-700 mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4">
            <History className="text-gray-400 dark:text-gray-500" size={28} />
          </div>
          <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-2">No transactions yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">Top up your wallet to start tracking your transaction history.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2 flex-shrink-0">
                          {getTransactionIcon(tx.type)}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{tx.description}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                      tx.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    }`}>
                      {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusStyles(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {paginatedTransactions.length < transactions.length && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => setPage(page + 1)} 
                className="px-4 py-2 text-blue-600 border border-blue-200 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                Load More
                <ChevronDown size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionHistory;