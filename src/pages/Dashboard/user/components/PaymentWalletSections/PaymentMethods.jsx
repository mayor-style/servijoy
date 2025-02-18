// File: components/PaymentWalletSections/PaymentMethods.jsx
import React from 'react';
import { FaCreditCard, FaUniversity } from 'react-icons/fa';

const PaymentMethods = ({ methods, onAddMethod, onEditMethod }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white font-header">Payment Methods</h2>
        <button
          onClick={onAddMethod}
          className="px-4 sm:px-6 py-2 btn-blue sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
        >
          Add Payment Method
        </button>
      </div>
      {methods.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No payment methods added.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {methods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="text-2xl sm:text-3xl dark:text-white">
                  {method.type === 'credit' ? <FaCreditCard /> : <FaUniversity />}
                </div>
                <div>
                  <p className="font-bold dark:text-white text-sm sm:text-base">
                    {method.brand} ending with {method.last4}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Exp: {method.expiry}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onEditMethod(method.id)}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm sm:text-base"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;

