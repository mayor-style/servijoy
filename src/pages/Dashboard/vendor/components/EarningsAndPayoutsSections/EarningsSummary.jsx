// File: components/PaymentWalletSections/EarningsSummary.jsx
import React from "react";

const EarningsSummary = ({ totalEarnings, pendingPayouts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-10">
      {/* Total Earnings Card */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-300">
        <h3 className="text-2xl sm:text-3xl font-bold dark:text-white">Total Earnings</h3>
        <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-4 dark:text-white">
          ${totalEarnings.toFixed(2)}
        </p>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2">
          Accumulated earnings to date.
        </p>
      </div>
      {/* Pending Payouts Card */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 transition-colors duration-300">
        <h3 className="text-2xl sm:text-3xl font-bold dark:text-white">Pending Payouts</h3>
        <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-4 dark:text-white">
          ${pendingPayouts.toFixed(2)}
        </p>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2">
          Earnings awaiting payout.
        </p>
      </div>
    </div>
  );
};

export default EarningsSummary;