import React from 'react';
import { CreditCard, Building, Plus, Edit2 } from 'lucide-react';

const PaymentMethods = ({ methods, onAddMethod, onEditMethod }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Methods</h2>
          <button
            onClick={onAddMethod}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm hover:shadow"
          >
            <Plus size={16} />
            <span>Add Payment Method</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {!methods.length ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <CreditCard size={32} className="text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payment methods</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              Add a payment method to make transactions easier and faster.
            </p>
            <button 
              onClick={onAddMethod} 
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              <Plus size={16} />
              <span>Add Your First Method</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {methods.map((method) => (
              <div
                key={method._id}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    method.type === 'credit' 
                      ? 'bg-purple-50 dark:bg-purple-900/20' 
                      : 'bg-green-50 dark:bg-green-900/20'
                  }`}>
                    {method.type === 'credit' ? (
                      <CreditCard size={24} className="text-purple-500 dark:text-purple-400" />
                    ) : (
                      <Building size={24} className="text-green-500 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {method.brand}
                      </p>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300">
                        •••• {method.last4}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Expires {method.expiry}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onEditMethod(method)}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                  aria-label="Edit payment method"
                >
                  <Edit2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;