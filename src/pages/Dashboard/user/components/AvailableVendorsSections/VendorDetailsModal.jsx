// File: components/vendors/VendorDetailsModal.jsx
import React from "react";
import { FaTimes, FaStar } from "react-icons/fa";

const VendorDetailsModal = ({ vendor, isOpen, onClose }) => {
  if (!isOpen || !vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center p-2 md:p-4 justify-center bg-black bg-opacity-60 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-auto max-w-lg md:max-w-2xl p-6 md:p-8 relative transition-transform duration-300 transform">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FaTimes size={20} />
        </button>
        
        {/* Vendor Basic Info */}
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <img
            src={vendor.profileImage}
            alt={vendor.name}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h2 className="text-xl md:text-3xl font-bold dark:text-white">{vendor.name}</h2>
            <p className="mt-1 text-sm md:text-lg text-gray-600 dark:text-gray-300">
              {vendor.experience} years of experience
            </p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(vendor.rating)
                  ? "text-yellow-500"
                  : "text-gray-300 dark:text-gray-500"
              }
              size={18}
            />
          ))}
          <span className="ml-2 text-sm md:text-lg font-semibold text-gray-700 dark:text-gray-300">
            ({vendor.reviews} reviews)
          </span>
        </div>
        
        {/* Vendor Description */}
        <div className="mb-8">
          <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300">
            {vendor.description}
          </p>
        </div>
        
        {/* Reviews Section */}
        <div>
          <h3 className="text-lg md:text-2xl font-bold dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
            Reviews
          </h3>
          {vendor.reviewsList && vendor.reviewsList.length > 0 ? (
            <div className="max-h-40 md:max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-auto  dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
              <ul className="space-y-2">
                {vendor.reviewsList.map((review, index) => (
                  <li key={index} className="p-2 md:p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <p className="text-sm md:text-base font-semibold dark:text-white">{review.reviewer}</p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsModal;