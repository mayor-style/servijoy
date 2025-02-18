// File: components/vendor/earnings/VendorQuickAccess.jsx
import React from "react";
import { FaClipboardList, FaMoneyBillWave, FaHeadset, FaCog } from "react-icons/fa";

const VendorQuickAccess = () => {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl transition transform">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-header dark:text-white mb-6">
        ⚡ Quick Access
      </h2>
      <div className="text-center grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Manage Services */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-green dark:from-blue-600 dark:to-green-600 text-white rounded-2xl shadow-lg cursor-pointer transition transform hover:scale-105">
          <FaClipboardList className="text-3xl sm:text-4xl mb-2" />
          <p className="text-xs sm:text-base font-medium">Manage Services</p>
        </div>

        {/* Wallet & Earnings */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-green to-blue-500 dark:from-green-600 dark:to-blue-600 text-white rounded-2xl shadow-lg cursor-pointer transition transform hover:scale-105">
          <FaMoneyBillWave className="text-3xl sm:text-4xl mb-2" />
          <p className="text-xs sm:text-base font-medium">Wallet & Earnings</p>
        </div>

        {/* Dispute Center */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600 text-white rounded-2xl shadow-lg cursor-pointer transition transform hover:scale-105">
          <FaHeadset className="text-3xl sm:text-4xl mb-2" />
          <p className="text-xs sm:text-base font-medium">Dispute Center</p>
        </div>

        {/* Settings */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-gray-700 to-black dark:from-gray-800 dark:to-black text-white rounded-2xl shadow-lg cursor-pointer transition transform hover:scale-105">
          <FaCog className="text-3xl sm:text-4xl mb-2" />
          <p className="text-xs sm:text-base font-medium">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default VendorQuickAccess;
