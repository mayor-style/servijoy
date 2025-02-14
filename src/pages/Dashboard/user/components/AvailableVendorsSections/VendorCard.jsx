// File: components/vendors/VendorCard.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const VendorCard = ({ vendor, onViewDetails, onBookNow }) => {
  const handleBookNow = () => {
    if (onBookNow) onBookNow(vendor);
    else onViewDetails(vendor);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 p-6 cursor-pointer flex flex-col w-full "
      onClick={() => onViewDetails(vendor)}
    >
      {/* Vendor Info */}
      <div className="flex items-center mb-6">
        <img
          src={vendor.profileImage}
          alt={vendor.name}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg md:text-xl font-bold dark:text-white">{vendor.name}</h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            {vendor.experience} yrs experience
          </p>
        </div>
      </div>

      {/* Rating & View Details */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(vendor.rating)
                  ? "text-yellow-500"
                  : "text-gray-300 dark:text-gray-500"
              }
              size={16}
            />
          ))}
          <span className="ml-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            ({vendor.reviews} reviews)
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(vendor);
          }}
          className="px-3 md:px-4 py-1 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 text-xs md:text-sm font-medium"
        >
          View Details
        </button>
      </div>

      {/* Price & Book Now */}
      <div className="mt-auto">
        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-4">
          Price: {vendor.pricing}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBookNow();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 text-sm md:text-base font-semibold"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default VendorCard;


