import React, { useState } from "react";
import { FaHeart, FaStar, FaRegStar, FaExternalLinkAlt, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../../../../components/OptimizedImage";

const FavoriteCard = ({ favorite, onInitiateRemoval, onBookNow }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format date if available
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const addedDate = formatDate(favorite.createdAt);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700 transition-all duration-300 relative w-full flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ribbon for special status if applicable */}
      {favorite.isPopular && (
        <div className="absolute top-4 right-0 bg-primary text-white text-sm py-1 px-3 rounded-l-full shadow-md z-10">
          Popular
        </div>
      )}
      
      {/* Image container */}
      <div className="relative overflow-hidden h-52">
        {/* Skeleton loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        )}
        
        {/* Image */}
        {favorite.image ? (
          <motion.div
            className="h-full w-full"
            animate={{ 
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <OptimizedImage
              src={favorite.image}
              alt={favorite.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-lg">No Image</span>
          </div>
        )}
        
        {/* Favorite button overlay */}
        <motion.button
          className="absolute top-3 left-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md text-red-500 hover:text-red-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onInitiateRemoval(favorite);
          }}
          aria-label={`Remove ${favorite.title} from favorites`}
        >
          <FaHeart size={18} />
        </motion.button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Category tag if available */}
        {favorite.category && (
          <span className="text-xs font-medium text-primary dark:text-primary-light bg-primary-50 dark:bg-primary-900/30 py-1 px-2 rounded-full mb-2 inline-block w-fit">
            {favorite.category}
          </span>
        )}
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
          {favorite.title}
        </h3>
        
        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-3 flex-grow">
          {favorite.shortDescription || favorite.description || "No description available"}
        </p>
        
        {/* Date added */}
        {addedDate && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-3">
            <FaClock className="mr-1" size={12} />
            <span>Added on {addedDate}</span>
          </div>
        )}
        
        {/* Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                favorite.rating && i < Math.floor(favorite.rating) ? (
                  <FaStar key={i} className="text-yellow-500" size={16} />
                ) : favorite.rating && i < favorite.rating && i > Math.floor(favorite.rating) - 0.5 ? (
                  <motion.div key={i} className="relative">
                    <FaRegStar className="text-yellow-500" size={16} />
                    <motion.div 
                      className="absolute top-0 left-0 overflow-hidden"
                      style={{ width: `${(favorite.rating - Math.floor(favorite.rating)) * 100}%` }}
                    >
                      <FaStar className="text-yellow-500" size={16} />
                    </motion.div>
                  </motion.div>
                ) : (
                  <FaRegStar key={i} className="text-gray-400 dark:text-gray-500" size={16} />
                )
              ))}
            </div>
            {favorite.reviews && (
              <span className="ml-2 text-gray-700 dark:text-gray-300 text-xs">
                ({favorite.reviews})
              </span>
            )}
          </div>
          
          {/* Price indicator if available */}
          {favorite.price && (
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {typeof favorite.price === 'number' ? `$${favorite.price.toFixed(2)}` : favorite.price}
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          {/* Book Now Button */}
          <motion.button
            onClick={() => onBookNow && onBookNow(favorite)}
            className="flex-grow py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center justify-center gap-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Now
          </motion.button>
          
          {/* Details Link Button */}
          <motion.a
            href={favorite.detailsUrl || `/service/${favorite.id}`}
            className="py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View details about ${favorite.title}`}
          >
            <FaExternalLinkAlt size={16} />
          </motion.a>
        </div>
      </div>
      
      {/* Availability badge if applicable */}
      {favorite.availability && (
        <div className={`absolute bottom-3 left-3 text-xs py-1 px-2 rounded-full ${
          favorite.availability === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          favorite.availability === 'Limited' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {favorite.availability}
        </div>
      )}
    </motion.div>
  );
};

export default FavoriteCard;