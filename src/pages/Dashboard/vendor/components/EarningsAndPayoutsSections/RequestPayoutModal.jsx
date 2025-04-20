import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaUniversity, FaPaypal, FaBitcoin } from "react-icons/fa";

const RequestPayoutModal = ({ isOpen, onClose, onSubmit, availableAmount }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const payoutAmount = parseFloat(amount);
    if (isNaN(payoutAmount) || payoutAmount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }
    
    if (payoutAmount > availableAmount) {
      setError(`Amount exceeds your available balance of $${availableAmount.toFixed(2)}.`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with slight delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const request = {
        id: Date.now(),
        amount: payoutAmount,
        paymentMethod,
        comments,
        date: new Date().toISOString().split('T')[0],
        status: "pending",
      };
      
      onSubmit(request);
      onClose();
      setAmount("");
      setPaymentMethod("bank_transfer");
      setComments("");
    } catch (err) {
      setError("Failed to submit payout request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPaymentIcon = (method) => {
    switch(method) {
      case 'bank_transfer': return <FaUniversity className="text-blue-500" />;
      case 'paypal': return <FaPaypal className="text-blue-700" />;
      case 'crypto': return <FaBitcoin className="text-orange-500" />;
      default: return <FaUniversity className="text-blue-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-h-[90vh] sm:p-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent max-w-xs sm:max-w-md md:max-w-lg w-full relative"
          initial={{ y: -30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -30, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-gray-400 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={18} />
          </button>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
            Request Payout
          </h2>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Max: ${availableAmount.toFixed(2)}`}
                  step="0.01"
                  min="0.01"
                  max={availableAmount}
                  required
                  className="w-full pl-8 pr-3 py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Available balance: ${availableAmount.toFixed(2)}
              </div>
            </div>
            
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "bank_transfer", label: "Bank Transfer", icon: <FaUniversity /> },
                  { id: "paypal", label: "PayPal", icon: <FaPaypal /> },
                  { id: "crypto", label: "Cryptocurrency", icon: <FaBitcoin /> }
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {React.cloneElement(method.icon, {
                        className: paymentMethod === method.id
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      })}
                    </div>
                    <div className={`text-xs font-medium ${
                      paymentMethod === method.id
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300"
                    }`}>
                      {method.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Comments / Bank Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Payment Details
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={
                  paymentMethod === "bank_transfer" 
                    ? "Enter your bank account details..." 
                    : paymentMethod === "paypal" 
                    ? "Enter your PayPal email address..." 
                    : "Enter your wallet address..."
                }
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <span className="mr-1">
                  {getPaymentIcon(paymentMethod)}
                </span>
                {paymentMethod === "bank_transfer" 
                  ? "Include account number and routing details" 
                  : paymentMethod === "paypal" 
                  ? "We'll send payment to your PayPal account" 
                  : "Double check your wallet address"
                }
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "transform active:scale-98"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit Payout Request"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RequestPayoutModal;