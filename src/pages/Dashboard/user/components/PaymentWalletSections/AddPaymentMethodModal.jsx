import React, { useState } from 'react';
import PaystackPop from '@paystack/inline-js';
import { X, Shield, CreditCard } from 'lucide-react';

const AddPaymentMethodModal = ({ onConfirm, onCancel, userEmail }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleAddMethod = () => {
    setLoading(true);
    setError('');
    
    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    
    if (!paystackKey) {
      setError('Paystack public key is not configured');
      setLoading(false);
      return;
    }
    
    if (!userEmail) {
      setError('User email is required');
      setLoading(false);
      return;
    }
    
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: paystackKey,
      email: userEmail,
      amount: 100, // Charge a small amount to verify the card (e.g., ₦1.00)
      currency: 'NGN',
      onSuccess: (transaction) => {
        onConfirm(transaction.reference);
        setLoading(false);
      },
      onCancel: () => {
        setLoading(false);
        setError('Payment was cancelled');
      },
      onClose: () => {
        setLoading(false);
      },
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add Payment Method</h3>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <CreditCard size={24} className="text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">Secure Payment</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your payment details are protected
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add a new card via Paystack. A small verification charge (₦1.00) will be made and immediately refunded.
          </p>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6 flex items-start gap-3">
            <div className="mt-0.5">
              <Shield size={16} className="text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Your card information is securely processed by Paystack and never stored on our servers.
            </p>
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-6 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleAddMethod} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : 'Add Card'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;