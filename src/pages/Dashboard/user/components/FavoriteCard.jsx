// File: components/favorites/FavoriteCard.jsx
import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import OptimizedImage from "../../../../components/OptimizedImage";

const FavoriteCard = ({ favorite, onRemove, onBookNow }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700 transition-transform duration-300 relative w-full max-w-md mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      {favorite.image && (
        <OptimizedImage
          src={favorite.image}
          alt={favorite.title}
          className="w-full h-48 object-cover transition-transform duration-300"
        />
      )}
      <div className="p-4 md:p-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-bold dark:text-white">{favorite.title}</h3>
          <button
            onClick={() => onRemove(favorite.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            title="Remove from favorites"
          >
            <FaHeart />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">
          {favorite.shortDescription}
        </p>
        <div className="flex items-center mt-3">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(favorite.rating)
                    ? "text-yellow-500"
                    : "text-gray-400 dark:text-gray-500"
                }
                size={16}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
            ({favorite.reviews} reviews)
          </span>
        </div>
        <button
          onClick={() => onBookNow && onBookNow(favorite)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 text-sm md:text-base font-semibold"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default FavoriteCard;