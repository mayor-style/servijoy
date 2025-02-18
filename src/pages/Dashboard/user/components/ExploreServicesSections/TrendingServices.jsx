// File: components/explore/TrendingServices.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../../../../../components/OptimizedImage";

const TrendingServices = ({ services = [] }) => {
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    const serviceRouteName = service.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/dashboard/book/${serviceRouteName}`);
  };

  return (
    <section className="py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white font-header">Trending Services</h2>
      {services.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700 border-gray-300 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
            >
              {service.image && (
                   <OptimizedImage 
                   alt={service.title}
                   src={service.image}
                   className={"w-full h-48 object-cover transition-transform duration-300"}
                   />
             
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2 dark:text-white">{service.title}</h3>
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(service.rating) ? "text-yellow-500" : "text-gray-300 dark:text-gray-500"}
                        size={20}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                    {service.rating} ({service.reviews} reviews)
                  </span>
                </div>
                <button
                  onClick={() => handleBookNow(service)}
                  className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 text-base font-semibold"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No trending services available.</p>
      )}
    </section>
  );
};

export default TrendingServices;
