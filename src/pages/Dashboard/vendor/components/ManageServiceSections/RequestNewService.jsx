import React, { useState, useEffect } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FaArrowRight, FaLightbulb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import NewServiceForm from "./NewServiceForm";

const RequestNewService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);

  // Animation to draw attention to the button after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateButton(true);
      setTimeout(() => setAnimateButton(false), 1500);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const serviceRequestTips = [
    "Make sure to upload clear, high-quality documents",
    "Include all relevant certifications in your proof",
    "Be specific about your experience in the justification",
    "Mention previous client work to strengthen your application"
  ];

  return (
    <div className="w-full flex justify-end mb-6 relative">
      {/* Request New Service Button with pulse animation */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={animateButton ? 
          { scale: [1, 1.1, 1], boxShadow: ["0px 4px 12px rgba(0,0,0,0.1)", "0px 6px 16px rgba(0,0,0,0.2)", "0px 4px 12px rgba(0,0,0,0.1)"] } 
          : {}}
        onClick={() => setIsOpen(true)}
        className="bg-green/50 text-white font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 relative"
      >
        <IoMdAdd size={22} className="text-white" />
        <span className="text-sm sm:text-base">Request New Service</span>
        
        {/* Floating help button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            setShowTips(!showTips);
          }}
          aria-label="Show tips"
        >
          <FaLightbulb size={12} />
        </motion.button>
      </motion.button>

      {/* Tips tooltip */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-12 right-0 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-64 z-10"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800 dark:text-white flex items-center gap-1">
                <FaLightbulb className="text-yellow-500" />
                <span>Request Tips</span>
              </h4>
              <button 
                onClick={() => setShowTips(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <IoMdClose />
              </button>
            </div>
            <ul className="space-y-2">
              {serviceRequestTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"
                >
                  <span className="text-green/50 mt-0.5">•</span>
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Applications typically processed within 48 hours
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal with backdrop blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-3"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 px-8 pt-6 pb-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="bg-green/10 dark:bg-green/45 p-2 rounded-full"
                    >
                      <IoMdAdd size={22} className="text-green/60 dark:text-green/40" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Request A Service
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Complete the form below to request for a new service
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close modal"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              {/* Scrollable content area */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-3 py-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                
                {/* New Service Form Component */}
                <NewServiceForm closeModal={() => setIsOpen(false)} />
              </div>
              
              {/* Footer area with policy link */}
              <div className="px-8 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center">
                By submitting, you agree to our <a href="#" className="text-green/60 dark:text-green/40 hover:underline">Service Provider Terms & Conditions</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestNewService;