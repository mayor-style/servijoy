import React from "react";
import { motion } from "framer-motion";

const PricingBooking = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
        
        {/* Left Side: Service Details */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="md:w-2/3 space-y-4"
        >
          <h3 className="text-2xl font-bold text-gray-900">Standard Deep Cleaning</h3>
          <p className="text-gray-600">
            A thorough deep cleaning service covering all areas of your home. Includes dusting, mopping, vacuuming, and sanitization.
          </p>

          <ul className="text-gray-700 space-y-2">
            <li>✅ Comprehensive room-by-room cleaning</li>
            <li>✅ Use of eco-friendly cleaning supplies</li>
            <li>✅ Professional-grade equipment</li>
            <li>✅ 100% Satisfaction Guarantee</li>
          </ul>
        </motion.div>

        {/* Right Side: Price + CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="md:w-1/3 text-center"
        >
          <h3 className="text-3xl font-bold text-green-600">₦25,000</h3>
          <p className="text-gray-500 text-sm">One-time deep cleaning service</p>
          
          <button className="mt-4 px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition">
            Book Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingBooking;
