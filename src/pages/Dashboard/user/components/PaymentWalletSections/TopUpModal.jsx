import React, { useState } from 'react';
import { X, DollarSign,  CreditCard } from 'lucide-react';

const TopUpModal = ({ onConfirm, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  // Predefined amount options
  const amountOptions = [100, 500, 1000, 5000];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    onConfirm(numAmount);
  };

  const selectAmount = (value) => {
    setAmount(value.toString());
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <CreditCard size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Top Up Wallet</h3>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="amount">
                Amount (₦)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                  className="shadow-sm border border-gray-300 dark:border-gray-600 rounded-lg block w-full pl-10 pr-4 py-3 text-gray-700 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter amount"
                  min="100"
                  step="100"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Quick Select
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {amountOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAmount(option)}
                    className={`py-2 px-4 rounded-lg border text-center transition-colors ${
                      parseFloat(amount) === option
                        ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    ₦{option.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow transition-all font-medium flex items-center gap-2"
              >
                <CreditCard size={16} />
                Proceed to Payment
              </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default TopUpModal;