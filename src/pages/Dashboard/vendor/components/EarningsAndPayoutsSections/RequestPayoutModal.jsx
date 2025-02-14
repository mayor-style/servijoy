import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const RequestPayoutModal = ({ isOpen, onClose, onSubmit, availableAmount }) => { 
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payoutAmount = parseFloat(amount);
    if (isNaN(payoutAmount) || payoutAmount <= 0 || payoutAmount > availableAmount) {
      alert("Please enter a valid amount up to your available balance.");
      return;
    }
    const request = {
      id: Date.now(),
      amount: payoutAmount,
      paymentMethod,
      comments,
      date: new Date().toLocaleDateString(),
      status: "pending",
    };
    onSubmit(request);
    onClose();
    setAmount("");
    setPaymentMethod("bank_transfer");
    setComments("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-h-[90vh] sm:p-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 max-w-xs sm:max-w-md md:max-w-lg w-full relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 sm:p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white mb-4 sm:mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
            Request Payout
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold dark:text-white mb-1 sm:mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Max: $${availableAmount.toFixed(2)}`}
                required
                className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm sm:text-base font-semibold dark:text-white mb-1 sm:mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
            </div>
            {/* Comments / Bank Details */}
            <div>
              <label className="block text-sm sm:text-base font-semibold dark:text-white mb-1 sm:mb-2">
                Comments / Bank Details
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter any additional details..."
                rows={3}
                className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-200 transform active:scale-95 text-sm sm:text-base"
            >
              Submit Payout Request
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RequestPayoutModal;
