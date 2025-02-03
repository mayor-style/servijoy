import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceHero = () => {
  return (
    <section 
      className="relative w-full py-16 sm:min-h-[75vh] flex items-center justify-center bg-cover bg-center bg-hero" 
    >
      {/* Dark Overlay for Better Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        {/* Service Name with Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="sm:text-4xl text-3xl md:text-6xl font-extrabold text-white"
        >
          Premium Home Cleaning
        </motion.h1>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="sm:text-lg md:text-xl text-gray-200 mt-4 max-w-2xl mx-auto"
        >
          Experience top-tier cleaning services with unmatched quality and reliability.
        </motion.p>

        {/* Star Ratings */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8, duration: 1 }}
          className="flex justify-center items-center gap-1 mt-4"
        >
          {Array(5).fill().map((_, index) => (
            <FaStar key={index} className="text-yellow-400 sm:text-xl  md:text-2xl" />
          ))}
          <span className="text-gray-200 text-lg ml-2">(4.9/5)</span>
        </motion.div>

        {/* Call-to-Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1, duration: 1 }}
          className="mt-6"
        >
          <Link to={'/vendor-list'} className="btn-green">
            Book Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
