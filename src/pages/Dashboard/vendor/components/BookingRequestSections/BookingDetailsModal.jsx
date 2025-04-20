import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaCheck, FaTimesCircle, FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BookingDetailsModal = ({ isOpen, onClose, booking, onAction }) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [reasonError, setReasonError] = useState("");
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) modalRef.current?.focus();
    
    // Handle escape key to close modal
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);
  
  // Reset state when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setShowRejectionInput(false);
      setRejectionReason("");
      setReasonError("");
    }
  }, [isOpen]);
  
  // Focus input when rejection form appears
  useEffect(() => {
    if (showRejectionInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showRejectionInput]);

  if (!isOpen || !booking) return null;

  const handleRejectClick = () => setShowRejectionInput(true);
  
  const validateReason = () => {
    if (rejectionReason.trim().length < 3) {
      setReasonError("Please provide a more detailed reason (at least 3 characters)");
      return false;
    }
    setReasonError("");
    return true;
  };
  
  const handleConfirmReject = () => {
    if (validateReason()) {
      onAction("rejected", rejectionReason);
      setShowRejectionInput(false);
      setRejectionReason("");
    }
  };
  
  const handleBackToOptions = () => {
    setShowRejectionInput(false);
    setRejectionReason("");
    setReasonError("");
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" 
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg p-6 sm:p-8 relative overflow-hidden z-10"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>

            {/* Status Indicator - Shows current booking status */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              booking.status === "pending" ? "bg-yellow-500" :
              booking.status === "accepted" ? "bg-green/50" : "bg-red-500"
            }`} />

            {/* Header */}
            <h2
              id="booking-modal-title"
              className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight flex items-center gap-2"
            >
              Booking Request
              <span className={`text-xs px-2 py-1 rounded-full uppercase ${
                booking.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" :
                booking.status === "accepted" ? "bg-green/10 text-green/80 dark:bg-green/90/30 dark:text-green/20" : 
                "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
              }`}>
                {booking.status}
              </span>
            </h2>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Review the booking details before taking action
            </p>

            {/* Booking Details */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-3 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">{booking.customer.name}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">{booking.service}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">{booking.date}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">${booking.price}</p>
              </div>
              
              {booking.status === "rejected" && booking.rejectionReason && (
                <div className="flex flex-col pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rejection Reason</p>
                  <p className="text-base italic text-gray-800 dark:text-gray-200">"{booking.rejectionReason}"</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <AnimatePresence mode="wait">
              {!showRejectionInput ? (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="action-buttons"
                >
                  {booking.status === "pending" && (
                    <>
                      <button
                        className="btn btn-primary w-full flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200 text-base sm:text-lg"
                        onClick={() => onAction("accepted")}
                      >
                        <FaCheck className="text-white" size={18} /> Accept Booking
                      </button>
                      <button
                        className="btn btn-error w-full flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200 text-base sm:text-lg"
                        onClick={handleRejectClick}
                      >
                        <FaTimesCircle size={18} /> Reject Booking
                      </button>
                    </>
                  )}
                  
                  {booking.status !== "pending" && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
                      <p className="text-gray-600 dark:text-gray-300">
                        This booking has already been {booking.status}.
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="rejection-form"
                >
                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 mb-4">
                    <div className="flex gap-2 items-start">
                      <FaQuestionCircle className="text-yellow-500 mt-1 flex-shrink-0" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Please provide a reason for rejection. This will be shared with the customer.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="rejection-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rejection Reason
                    </label>
                    <textarea
                      ref={inputRef}
                      id="rejection-reason"
                      placeholder="Explain why you're rejecting this booking..."
                      value={rejectionReason}
                      onChange={(e) => {
                        setRejectionReason(e.target.value);
                        if (reasonError) validateReason();
                      }}
                      className={`textarea textarea-bordered w-full h-24 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary transition-all duration-150 ${
                        reasonError ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                      aria-label="Rejection reason"
                      aria-invalid={reasonError ? "true" : "false"}
                      aria-describedby={reasonError ? "rejection-error" : undefined}
                    />
                    {reasonError && (
                      <p id="rejection-error" className="text-sm text-red-500 mt-1">
                        {reasonError}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button
                      className="btn btn-outline flex-1"
                      onClick={handleBackToOptions}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-error flex-1 hover:shadow-lg transition-all duration-200"
                      onClick={handleConfirmReject}
                      disabled={!rejectionReason.trim()}
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingDetailsModal;