import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaCheckCircle, FaShieldAlt, FaLeaf, FaStar } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";

const PricingBooking = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    boxShadow: [
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    ],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Section heading */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Perfect Cleaning Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Professional cleaning services tailored to your needs with transparent pricing and exceptional quality.</p>
        </motion.div>
        
        {/* Card */}
        <motion.div 
          animate={isHovered ? pulseAnimation : {}}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden transition-all duration-300"
        >
          {/* Card header */}
          <div className="bg-gradient-to-r from-green to-green text-white p-4 sm:p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Standard Deep Cleaning</h3>
              <MdCleaningServices className="text-2xl sm:text-3xl md:text-4xl opacity-80" />
            </div>
          </div>
          
          <div className="p-6 sm:p-8 flex flex-col lg:flex-row items-start gap-8">
            {/* Left Side: Service Details */}
            <motion.div 
              variants={itemVariants}
              className="lg:w-2/3 space-y-6"
            >
              <div>
                <p className="text-gray-700 text-base sm:text-lg mb-2">
                  A thorough deep cleaning service covering all areas of your home. Includes dusting, mopping, vacuuming, and sanitization.
                </p>
                <div className="flex items-center text-sm text-gray-500 gap-4 mt-3">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>4-6 hours</span>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="mr-1 text-yellow-400" />
                    <span>4.9/5 (243 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What's Included:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-gray-700">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green mt-1 mr-2 flex-shrink-0" />
                    <span>Comprehensive room cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green mt-1 mr-2 flex-shrink-0" />
                    <span>Eco-friendly supplies</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green mt-1 mr-2 flex-shrink-0" />
                    <span>Professional equipment</span>
                  </li>
                  <li className="flex items-start"> 
                    <FaCheckCircle className="text-green mt-1 mr-2 flex-shrink-0" />
                    <span>Satisfaction guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green mt-1 mr-2 flex-shrink-0" />
                    <span>Trained professionals</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green mt-1 mr-2 flex-shrink-0" />
                    <span>Insurance coverage</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                  <FaLeaf className="mr-1 text-green" /> Eco-Friendly
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                  <FaShieldAlt className="mr-1 text-green" /> Insured & Bonded
                </span>
              </div>
            </motion.div>

            {/* Right Side: Price + CTA */}
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/3 flex flex-col items-center justify-center p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-gray-200 w-full lg:pl-8"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-baseline">
                  <span className="text-lg text-gray-500 font-medium">₦</span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">25,000</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">One-time deep cleaning service</p>
                
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 w-full">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 sm:py-4 bg-green text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
                >
                  Book Now
                </motion.button>
                
                <button className="w-full px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 text-center">
                  View Details
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                No credit card required. Free cancellation up to 24 hours before service.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Testimonial */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start space-x-4"
        >
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <span className="text-sm font-bold">SA</span>
          </div>
          <div>
            <div className="flex items-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-yellow-400 text-xs" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">Sarah A.</span>
            </div>
            <p className="text-sm text-gray-600">
              "The deep cleaning service exceeded my expectations. My home hasn't been this clean in years. Worth every naira!"
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PricingBooking;