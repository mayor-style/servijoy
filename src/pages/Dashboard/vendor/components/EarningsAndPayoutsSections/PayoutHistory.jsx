// File: components/vendor/earnings/PayoutHistory.jsx
import React from "react";

const PayoutHistory = ({ payouts }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-aut">
      <h3 className="text-2xl sm:text-3xl font-bold dark:text-white mb-4">Payout History</h3>
      {payouts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No payout records found.</p>
      ) : (
        <div className="overflow-x-auto overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-aut">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-3 sm:px-6 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-2 text-right text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 sm:px-6 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {payouts.map((payout) => (
                <tr key={payout.id}>
                  <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-900 dark:text-white">
                    {payout.date}
                  </td>
                  <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-gray-900 dark:text-white text-right">
                    ${payout.amount.toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-center">
                    <span
                      className={`px-2 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full ${
                        payout.status === "completed"
                          ? "bg-green text-white"
                          : payout.status === "pending"
                          ? "bg-yellow-100 text-black"
                          : "bg-red-100 text-white"
                      }`}
                    >
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 text-xs sm:text-sm text-center text-gray-900 dark:text-white">
                    {payout.paymentMethod}
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

export default PayoutHistory;