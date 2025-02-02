import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaBriefcase, FaCheckCircle } from "react-icons/fa";

const VendorProfile = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
        
        {/* Left Side: Vendor Image + Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="flex flex-col items-center md:w-1/3"
        >
          <img 
            src="../../assets/imgs/painting.jpg" 
            alt="Vendor" 
            className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
          />
          <h3 className="text-xl font-bold text-gray-900 mt-4">John Doe</h3>
          <p className="text-center text-gray-600 text-sm">Professional Cleaner with 5+ years of experience</p>
        </motion.div>

        {/* Right Side: Vendor Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
          className="md:w-2/3 space-y-4"
        >
          {/* Ratings */}
          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            <span className="text-gray-700 text-sm">(4.9/5 Based on 120 Reviews)</span>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-4 text-gray-700 text-sm">
            <FaBriefcase className="text-green-500 text-xl" />
            <p>Over <span className="font-bold">5 years</span> of professional cleaning experience</p>
          </div>

          {/* Completed Jobs */}
          <div className="flex items-center gap-4 text-gray-700 text-sm">
            <FaCheckCircle className="text-green-500 text-xl" />
            <p>Completed <span className="font-bold">250+</span> successful cleaning projects</p>
          </div>

          {/* CTA Button */}
          <button className="btn-green">
            Hire John Doe
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default VendorProfile;
