import React, { useEffect, useRef } from "react";
import { MdClose, MdVerifiedUser, MdOutlineCalendarMonth, MdLogin, MdEmail } from "react-icons/md";
import { FaShoppingBag, FaStar } from "react-icons/fa";

const VendorDetailsModal = ({ isOpen, onClose, vendor }) => {
  const modalRef = useRef(null);
  
  // Default mock vendor data if none is provided
  const defaultVendor = {
    name: "Default Vendor",
    email: "vendor@example.com",
    role: "Vendor",
    status: "Active",
    registrationDate: "2024-01-01",
    lastLogin: "2024-02-15",
    servicesOffered: ["Service A", "Service B"],
    reviews: ["Excellent service!", "Very professional."],
    ratings: {
      overall: 4.7,
      communication: 4.8,
      quality: 4.6,
      reliability: 4.9
    }
  };
  
  const v = vendor || defaultVendor;
  
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);
  
  // Handle click outside modal to close
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  // Animation mounting
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.classList.add("opacity-100", "scale-100");
      modalRef.current.classList.remove("opacity-0", "scale-95");
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`${
              i < Math.floor(rating) 
                ? "text-yellow-400" 
                : i < rating 
                  ? "text-yellow-400 opacity-50" 
                  : "text-gray-300 dark:text-gray-600"
            } w-4 h-4`} 
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto px-4 py-6">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out opacity-0 scale-95 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 rounded-t-xl z-10">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white flex items-center">
            <MdVerifiedUser className="mr-2 text-blue-600 dark:text-blue-400" />
            Vendor Details
          </h2>
          <button
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            onClick={onClose}
            aria-label="Close"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto flex-grow px-6 py-4">
          {/* Vendor summary card */}
          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{v.name}</h3>
                <div className="flex items-center mt-1">
                  <MdEmail className="text-gray-500 dark:text-gray-400 mr-1" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{v.email}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(v.status)}`}>
                {v.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <MdOutlineCalendarMonth className="text-gray-500 dark:text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Registration Date</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{formatDate(v.registrationDate)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MdLogin className="text-gray-500 dark:text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last Activity</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{formatDate(v.lastLogin)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <FaShoppingBag className="mr-2 text-blue-600 dark:text-blue-400" />
              Services Offered
            </h3>
            {v.servicesOffered && v.servicesOffered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {v.servicesOffered.map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 text-sm"
                  >
                    {service}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-sm">No services listed.</p>
            )}
          </div>
          
          {/* Ratings section */}
          {v.ratings && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <FaStar className="mr-2 text-blue-600 dark:text-blue-400" />
                Performance Ratings
              </h3>
              <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall</span>
                    {renderStars(v.ratings.overall)}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(v.ratings.overall / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-700 dark:text-gray-300">Communication</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {v.ratings.communication.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-green-500 h-1 rounded-full" 
                        style={{ width: `${(v.ratings.communication / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-700 dark:text-gray-300">Quality</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {v.ratings.quality.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-purple-500 h-1 rounded-full" 
                        style={{ width: `${(v.ratings.quality / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-700 dark:text-gray-300">Reliability</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {v.ratings.reliability.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-yellow-500 h-1 rounded-full" 
                        style={{ width: `${(v.ratings.reliability / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Reviews section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <MdVerifiedUser className="mr-2 text-blue-600 dark:text-blue-400" />
              Client Reviews
            </h3>
            {v.reviews && v.reviews.length > 0 ? (
              <div className="space-y-3">
                {v.reviews.map((review, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg border-l-4 border-blue-500 dark:border-blue-600"
                  >
                    <p className="text-gray-800 dark:text-gray-200 text-sm italic">"{review}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-sm">No reviews available.</p>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t dark:border-gray-700 flex justify-end space-x-3 sticky bottom-0 bg-white dark:bg-gray-800 rounded-b-xl">
          <button 
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsModal;