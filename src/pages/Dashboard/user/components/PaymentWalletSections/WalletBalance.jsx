
// File: components/PaymentWalletSections/WalletBalance.jsx
import React from 'react';

const WalletBalance = ({ balance, onTopUp, onWithdraw }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between transition-colors duration-300 gap-4 sm:gap-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white font-header">Wallet Balance</h2>
        <p className="text-3xl sm:text-4xl font-extrabold mt-2 dark:text-white">
          ${balance.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onTopUp}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 btn-blue  text-white rounded-md transition-colors duration-200"
        >
          Top Up Wallet
        </button>
        <button
          onClick={onWithdraw}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-green hover:bg-green btn-green text-white rounded-md transition-colors duration-200"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletBalance;