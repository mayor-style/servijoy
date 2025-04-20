import React, { useState, useEffect } from "react";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { FaStar, FaSpinner, FaMapMarkerAlt, FaCheck, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "../../../../../components/OptimizedImage";

const ServiceListings = ({ services = [] }) => {
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300); // Wait for animation to complete
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <FaSpinner className="animate-spin text-blue-500 text-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-red-500 text-xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error loading services</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!filteredServices || filteredServices.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <FaSearch className="text-gray-400 dark:text-gray-500 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No services found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Available Services
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredServices.length} services found
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">View:</span>
          <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewType("grid")}
              className={`p-2 text-sm ${
                viewType === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`p-2 text-sm ${
                viewType === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewType === "grid" ? (
          <motion.div
            key="grid-view"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
              >
                <div className="relative">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-40 object-cover"
                  />
                  {service.location && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <FaMapMarkerAlt className="mr-1" size={10} />
                      {service.location}
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(service.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                          size={12}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                      ({service.reviews})
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.features && service.features.slice(0, 2).map((feature, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      >
                        <FaCheck className="mr-1" size={8} />
                        {feature}
                      </span>
                    ))}
                    {service.features && service.features.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        +{service.features.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.pricing}
                    </div>
                    <button
                      onClick={() => handleViewDetails(service)}
                      className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                    <OptimizedImage
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    {service.location && (
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                        <FaMapMarkerAlt className="mr-1" size={10} />
                        {service.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-0">
                        {service.title}
                      </h3>
                      
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
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          ({service.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {service.shortDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.features && service.features.map((feature, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        >
                          <FaCheck className="mr-1" size={8} />
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">
                        {service.pricing}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!service.available && (
                          <span className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-md dark:bg-red-900 dark:text-red-200">
                            Not Available
                          </span>
                        )}
                        <button
                          onClick={() => handleViewDetails(service)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

     {/* Service Details Modal */}
     <AnimatePresence>
        {isModalOpen && selectedService && (
          <ServiceDetailsModal
            service={selectedService}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
      
      {/* Empty State when filtered results are empty */}
      {filteredServices.length === 0 && (
        <div className="mt-8 text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FaSearch className="text-gray-400 dark:text-gray-500 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matching services</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">We couldn't find any services matching your criteria</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {/* Pagination Controls */}
      {filteredServices.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-1">
            <button className="px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="sr-only">Previous</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="px-4 py-2 border border-blue-500 bg-blue-500 rounded-md text-sm font-medium text-white">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">...</span>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              8
            </button>
            <button className="px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="sr-only">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
      
      {/* Quick Filters - For mobile optimization */}
      <div className="mt-6 lg:hidden">
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <button className="whitespace-nowrap px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full">
              All Services
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
              Cleaning
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
              Repairs
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
              Electrical
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
              Painting
            </button>
          </div>
        </div>
      </div>
      
      {/* Service Promotion Banner */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Premium Services</h3>
            <p className="opacity-90">Get premium services with up to 20% discount for new customers</p>
          </div>
          <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Explore Premium
          </button>
        </div>
      </div>
      
      {/* Sorting Options */}
      <div className="my-4 flex justify-end">
        <div className="relative inline-block text-left">
          <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Sort by: Featured</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Reviews</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ServiceListings;