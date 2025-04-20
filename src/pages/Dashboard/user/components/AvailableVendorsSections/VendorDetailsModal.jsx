import React from "react";
import { FaTimes, FaStar, FaUser, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const VendorDetailsModal = ({ vendor, isOpen, onClose }) => {
  // Handle keyboard events for accessibility
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !vendor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="vendor-profile-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with better positioned close button and sticky positioning */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 pt-1 pb-4 z-10 flex justify-between items-start">
              <h2 
                id="vendor-profile-title" 
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                Vendor Profile
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>
            
            {/* Profile section with improved layout */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                {vendor.profileImage ? (
                  <img
                    src={vendor.profileImage}
                    alt={`${vendor.name}'s profile`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FaUser size={32} className="text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{vendor.name}</h3>
                
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(vendor.rating) ? "text-yellow-500" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {vendor.rating?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({vendor.reviews || 0} reviews)
                  </span>
                </div>
                
                <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaClock className="mr-1" size={14} />
                  {vendor.experience} years of experience
                </div>
              </div>
            </div>
            
            {/* About section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{vendor.description}</p>
            </div>
            
            {/* Reviews section with improved visual hierarchy */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reviews</h3>
                {vendor.reviewsList && vendor.reviewsList.length > 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {vendor.reviewsList.length} total
                  </span>
                )}
              </div>
              
              {vendor.reviewsList && vendor.reviewsList.length > 0 ? (
                <ul className="space-y-3">
                  {vendor.reviewsList.map((review, index) => (
                    <li key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium text-gray-900 dark:text-white">{review.reviewer}</p>
                        {review.date && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                        )}
                      </div>
                      
                      {review.rating && (
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.round(review.rating) ? "text-yellow-500" : "text-gray-300"}
                              size={12}
                            />
                          ))}
                        </div>
                      )}
                      
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">No reviews available yet.</p>
                </div>
              )}
            </div>
            
            {/* Contact/Action buttons */}
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-white transition"
                onClick={onClose}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
                onClick={() => {
                  // Add contact or booking logic here
                  console.log("Contact vendor:", vendor.name);
                  // You could also close the modal and navigate to a booking page
                }}
              >
                Contact Vendor
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VendorDetailsModal;