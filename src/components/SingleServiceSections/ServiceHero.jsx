import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaArrowRight, FaCheck, FaClock, FaLeaf, FaShieldAlt, FaMedal } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceHero = () => {
  // State for hero background cycling
  const [activeBackground, setActiveBackground] = useState(0);
  const backgrounds = [
    "living-room-cleaning",
    "kitchen-deep-clean",
    "bathroom-sanitization"
  ];
  
  // Background image cycling with timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const drawPath = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut"
      }
    }
  };

  // Service benefits data
  const benefits = [
    { icon: <FaCheck />, text: "100% Satisfaction" },
    { icon: <FaClock />, text: "24/7 Support" },
    { icon: <FaLeaf />, text: "Eco-Friendly" },
    { icon: <FaShieldAlt />, text: "Insured & Bonded" },
    { icon: <FaMedal />, text: "Top-Rated Pros" }
  ];

 
  
  return (
    <section className="relative  w-full h-screen overflow-hidden">
      {/* Dynamic Background with Crossfade Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/api/placeholder/1920/1080)`,
            backgroundSize: "cover"
          }}
        />
      </AnimatePresence>
      
      {/* Advanced overlay with multiple gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 C30,30 70,70 100,50"
          stroke="white"
          strokeWidth="0.2"
          fill="none"
          variants={drawPath}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M0,30 C30,50 70,30 100,50"
          stroke="white"
          strokeWidth="0.2"
          fill="none"
          variants={drawPath}
          initial="hidden"
          animate="visible"
        />
      </svg>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-heading badge */}
            <motion.div 
              variants={fadeInUp}
              className="inline-block mb-6"
            >
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-4 py-1 rounded-full text-white text-sm font-medium tracking-wide">
                Top-Rated Service
              </span>
            </motion.div>
            
            {/* Main Heading with gradient text */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 leading-tight"
            >
              Premium Home Cleaning
              <span className="block text-emerald-400">Redefined</span>
            </motion.h1>
            
            {/* Description with improved width constraints */}
            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the ultimate in home cleaning with our meticulous attention to detail, 
              eco-friendly products, and expertly trained professionals who treat your home like their own.
            </motion.p>
            
            {/* Rating component */}
            <motion.div 
              variants={fadeInScale}
              className="flex justify-center items-center gap-1 mb-8"
            >
              <div className="flex">
                {Array(5).fill().map((_, index) => (
                  <FaStar key={index} className="text-yellow-400 text-xl md:text-2xl" />
                ))}
              </div>
              <span className="text-gray-200 text-lg ml-2 font-medium">4.9</span>
              <span className="text-gray-400 text-base">(500+ reviews)</span>
            </motion.div>
            
            {/* CTA buttons with enhanced styling */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link 
                to="/book-now" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-8 py-4 rounded-lg text-white font-medium text-lg flex items-center justify-center transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-900"
              >
                Book Now 
                <FaArrowRight className="ml-2" />
              </Link>
              <Link 
                to="/services" 
                className="bg-transparent border-2 border-white/30 hover:border-white px-8 py-4 rounded-lg text-white font-medium text-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>  
        </div>

      </div>
    </section>
  );
};

export default ServiceHero;