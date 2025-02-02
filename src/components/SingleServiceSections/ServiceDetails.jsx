import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const ServiceDetails = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side: Service Description */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Our <span className="text-green-500">Premium Cleaning</span> Service?
          </h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Our expert cleaners provide deep, thorough, and reliable cleaning services 
            tailored to your needs. We use eco-friendly products and advanced techniques 
            to ensure your space remains spotless and fresh.
          </p>
        </motion.div>

        {/* Right Side: Key Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Benefit 1 */}
          <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-lg">
            <FaCheckCircle className="text-green-500 text-3xl" />
            <p className="text-gray-800 font-medium">Highly Skilled Professionals</p>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-lg">
            <FaCheckCircle className="text-green-500 text-3xl" />
            <p className="text-gray-800 font-medium">Eco-Friendly Cleaning Products</p>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-lg">
            <FaCheckCircle className="text-green-500 text-3xl" />
            <p className="text-gray-800 font-medium">Flexible Booking Options</p>
          </div>

          {/* Benefit 4 */}
          <div className="flex items-center gap-4 bg-white p-4 shadow-md rounded-lg">
            <FaCheckCircle className="text-green-500 text-3xl" />
            <p className="text-gray-800 font-medium">Affordable Pricing</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDetails;
