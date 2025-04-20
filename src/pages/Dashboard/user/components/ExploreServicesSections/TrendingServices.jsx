import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaSpinner, FaArrowRight, FaFire } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../../../../../components/OptimizedImage";

const TrendingServices = ({ services = [] }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBookNow = (service) => {
    const serviceRouteName = service.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/dashboard/book/${serviceRouteName}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <FaSpinner className="animate-spin text-blue-500 text-2xl" />
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <FaFire className="text-gray-400 dark:text-gray-500 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trending services</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Check back soon for new trending services!</p>
      </div>
    );
  }

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FaFire className="text-red-500 mr-2" /> Trending Services
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Our most popular and highly-rated services
          </p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/services')}
          className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          View all <FaArrowRight className="ml-1" />
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
          >
            <div className="relative">
              <OptimizedImage
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Trending
              </div>
              {!service.available && (
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 text-white text-xs font-semibold px-3 py-1 text-center">
                  Currently Unavailable
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {service.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {service.shortDescription}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(service.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                        size={14}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                    {service.rating} ({service.reviews})
                  </span>
                </div>
                
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {service.pricing}
                </div>
              </div>
              
              <button
                onClick={() => handleBookNow(service)}
                disabled={!service.available}
                className={`w-full py-2 text-sm font-medium rounded-lg ${
                  service.available 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                } transition-colors duration-200`}
              >
                {service.available ? "Book Now" : "Unavailable"}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrendingServices;