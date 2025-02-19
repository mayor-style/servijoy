// File: components/vendor/earnings/VendorEarnings.jsx
import React from "react";
import { FaWallet, FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VendorEarnings = () => {
  // Mock values; these can be replaced with dynamic data later
  const totalEarnings = 12540;
  const availableBalance = 3250;
  const expectedPayout = 850;
  const lastPayout = 1200;

  const navigate = useNavigate()

  return (
    <div className="gradient relative dark:gradient-reverse text-white p-6 sm:p-8 rounded-2xl shadow-2xl transition transform border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
      {/* Header */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 relative font-header flex items-center gap-2 truncate">
        <span role="img" aria-label="earnings">💰</span> Earnings & Payouts
      </h2>

      {/* Earnings Cards */}
      <div className="grid relative grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Earnings */}
        <div className="p-4 sm:p-6 bg-white/20 dark:bg-gray-700 rounded-xl flex flex-col items-center">
          <FaMoneyBillWave className="text-3xl sm:text-4xl md:text-5xl mb-3" />
          <p className="text-xs sm:text-sm uppercase tracking-wider">Total Earnings</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1">
            ₦{totalEarnings.toLocaleString()}
          </h3>
        </div>

        {/* Available Balance */}
        <div className="p-4 sm:p-6 bg-white/20 dark:bg-gray-700 rounded-xl flex flex-col items-center">
          <FaWallet className="text-3xl sm:text-4xl md:text-5xl mb-3" />
          <p className="text-xs sm:text-sm uppercase tracking-wider">Available Balance</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1">
            ₦{availableBalance.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Pending Payouts Section */}
      <div className="mt-8 relative bg-white/20 dark:bg-gray-700 p-4 sm:p-6 rounded-xl">
        <h4 className="text-base sm:text-lg font-semibold mb-4">🔄 Pending Payouts</h4>
        <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm">
          <p className="flex items-center gap-1">
            <FaArrowUp className="text-yellow-300" />
            <span>Expected: ₦{expectedPayout.toLocaleString()}</span>
          </p>
          <p className="flex items-center gap-1">
            <FaArrowDown className="text-red-400" />
            <span>Last Payout: ₦{lastPayout.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Withdraw Button */}
      <div className="mt-8 relative text-center">
        <button onClick={()=>navigate('/dashboard/earnings')} className="px-4 sm:px-6 py-2 sm:py-3 bg-black/30 dark:bg-black/40 hover:bg-black/50 dark:hover:bg-black/60 text-white rounded-lg font-semibold shadow-md transition duration-300 text-xs sm:text-base">
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default VendorEarnings;
