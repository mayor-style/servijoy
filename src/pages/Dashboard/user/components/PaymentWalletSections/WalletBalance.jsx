import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const WalletBalance = ({ balance, onTopUp, onWithdraw }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  }).format(balance);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2563EB" strokeWidth="2" />
                <path d="M12 8V16M16 12H8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Wallet Balance</h2>
          </div>
          <p className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900 dark:text-white tracking-tight">
            {formattedBalance}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available for transactions</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={onTopUp}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ArrowUpRight size={18} />
            Top Up Wallet
          </button>
          <button
            onClick={onWithdraw}
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ArrowDownRight size={18} />
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;