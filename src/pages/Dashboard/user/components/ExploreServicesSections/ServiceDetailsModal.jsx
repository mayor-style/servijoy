import React, { useEffect, useRef } from "react";
import { FaTimes, FaStar, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../../../../../components/OptimizedImage";

const ServiceDetailsModal = ({ service, isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    
    // Focus trap
    const handleTab = (e) => {
      if (!modalRef.current || !isOpen) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);
    
    // Auto-focus on modal when opened
    if (isOpen && modalRef.current) {
      // Set timeout to allow animation to start
      setTimeout(() => {
        const firstButton = modalRef.current.querySelector("button");
        if (firstButton) firstButton.focus();
      }, 100);
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const serviceRouteName = service.title.toLowerCase().replace(/\s+/g, "-");
  
  // Calculate discounted price if available
  const hasDiscount = service.regularPrice && service.price && service.regularPrice > service.price;
  const discountPercentage = hasDiscount ? 
    Math.round(((service.regularPrice - service.price) / service.regularPrice) * 100) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="service-modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close service details modal"
            >
              <FaTimes size={20} />
            </button>

            {/* Service Image with Overlay Gradient */}
            {service.image && (
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover"
                  rounded="rounded-xl"
                />
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>
            )}

            {/* Service Title and Info */}
            <div className="space-y-6">
              <div>
                <h2
                  id="service-modal-title"
                  className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                >
                  {service.title}
                </h2>
                
                {/* Price Information */}
                <div className="mt-2 flex items-center">
                  {service.price && (
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${service.price}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="ml-2 text-gray-500 line-through text-sm">
                      ${service.regularPrice}
                    </span>
                  )}
                  {service.durationMinutes && (
                    <span className="ml-auto text-gray-600 dark:text-gray-400 text-sm">
                      {service.durationMinutes} min
                    </span>
                  )}
                </div>
              </div>
              
              {/* Rating */}
              {service.rating && (
                <div className="flex items-center" aria-label={`Rating: ${service.rating} out of 5`}>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(service.rating) ? "text-yellow-500" : "text-gray-300"}
                        size={18}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">
                    {service.rating} ({service.reviews} reviews)
                  </span>
                </div>
              )}
              
              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 text-base">
                {service.description}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Features:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Book Now Button */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-md transition-all hover:shadow-lg text-lg font-semibold flex items-center justify-center gap-2"
                  onClick={() => navigate(`/dashboard/book/${serviceRouteName}`)}
                  aria-label={`Book ${service.title} now`}
                >
                  <FaCalendarCheck />
                  Book Now
                </button>
                <button
                  className="flex-1 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg font-semibold"
                  onClick={onClose}
                >
                  Not Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailsModal;