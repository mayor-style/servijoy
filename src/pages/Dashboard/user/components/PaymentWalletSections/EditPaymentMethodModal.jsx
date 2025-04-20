import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

const EditPaymentMethodModal = ({ method, onConfirm, onCancel }) => {
  const [expiry, setExpiry] = useState(method.expiry);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const [month, year] = expiry.split('/');
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      setError('Enter a valid MM/YY date');
      return;
    }
    onConfirm({ expiry });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Edit Payment Method</h3>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
              <CreditCard size={20} className="text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {method.brand} <span className="text-gray-500 dark:text-gray-400">•••• {method.last4}</span>
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiry Date (MM/YY)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={expiry} 
                  onChange={(e) => setExpiry(e.target.value)} 
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all" 
                  placeholder="MM/YY" 
                  required 
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                onClick={onCancel} 
                className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPaymentMethodModal;