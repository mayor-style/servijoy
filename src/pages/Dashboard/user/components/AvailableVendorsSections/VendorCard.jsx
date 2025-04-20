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
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 cursor-pointer flex flex-col"
      onClick={() => onViewDetails(vendor)}
    >
      <div className="flex items-center mb-4">
        <img
          src={vendor.profileImage}
          alt={vendor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{vendor.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {vendor.experience} yrs experience
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={i < Math.round(vendor.rating) ? "text-yellow-500" : "text-gray-300"}
              size={16}
            />
          ))}
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            ({vendor.reviews} reviews)
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(vendor);
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
        >
          View Details
        </button>
      </div>
      <div className="mt-auto">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Price: {vendor.pricing}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBookNow();
          }}
          className="w-full bg-green text-white py-2 rounded-lg hover:bg-green transition text-base font-semibold"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default VendorCard;