import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaStar, FaMoneyBillWave, FaClock } from "react-icons/fa";
import OptimizedImage from "../OptimizedImage";
import { useNavigate } from "react-router-dom";

const BecomeVendorHero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const benefits = [
    { icon: <FaMoneyBillWave />, text: "Earn More" },
    { icon: <FaClock />, text: "Flexible Hours" },
    { icon: <FaStar />, text: "Build Your Reputation" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-gray-900 to-black py-24 px-4 sm:px-6 lg:px-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green/10 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-10 z-0"></div>
      
      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1 rounded-full bg-green/20 text-green text-sm font-medium mb-6"
          >
            Become a Service Provider
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-header font-bold leading-tight mb-6 text-white"
          >
            Earn More. Work Freely.{" "}
            <span className="block mt-2 bg-gradient-to-r from-green to-teal-300 bg-clip-text text-transparent">
              Join ServiJoy Today!
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8"
          >
            Connect with customers, grow your business, and get paid with ease. 
            Join a trusted platform that brings real work to real service providers.
          </motion.p>
          
          {/* Benefits */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start mb-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={childVariants}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm sm:text-base"
              >
                <span className="text-green">{benefit.icon}</span>
                <span className="text-white">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Button */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative overflow-hidden px-8 py-3.5 rounded-lg bg-gradient-to-r from-green to-teal-400 text-white font-medium text-lg flex items-center gap-2 shadow-lg shadow-green/20 hover:shadow-xl hover:shadow-green/30 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaUserCheck className={`text-lg transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
              Get Started Now
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-green to-teal-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </motion.button>
        </motion.div>
        
        {/* Right Side Image/Graphic */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative">
            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden shadow-2xl shadow-green/10 border border-gray-700/50"
            >
              <OptimizedImage 
                src="../../assets/imgs/carpentry.webp" 
                alt="Vendor Working" 
                className="w-full h-auto"
                rounded="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </motion.div>
            
            {/* Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-5 -left-5 md:bottom-6 md:-left-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-[180px] backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 text-green font-bold text-lg">
                <FaStar />
                <span>4.9/5.0</span>
              </div>
              <p className="text-gray-800 dark:text-gray-300 text-sm mt-1">From 2,000+ service providers</p>
            </motion.div>
            
            {/* Floating Income Card */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -top-5 -right-5 md:top-10 md:-right-10 bg-gradient-to-br from-green/90 to-teal-600/90 p-4 rounded-lg shadow-xl backdrop-blur-sm text-white max-w-[180px] border border-green/30"
            >
              <p className="font-bold text-lg">+35%</p>
              <p className="text-sm mt-1">Average monthly income increase</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeVendorHero;
