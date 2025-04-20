import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import OptimizedImage from "../OptimizedImage";
import { ArrowRight, Star, ChevronRight } from "lucide-react";

const HowItWorksHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Floating badges data
  const badges = [
    { text: "4.9★ Avg Rating", icon: <Star size={14} className="text-yellow-400" /> },
    { text: "100% Verified Vendors", icon: null },
    { text: "Instant Booking", icon: null }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-black to-gray-900 min-h-[90vh] py-20 pt-32 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between border-b border-gray-500/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <motion.div 
        style={{ opacity, y }}
        className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"
      ></motion.div>
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-green/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"
      ></motion.div>

      {/* Text Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 max-w-xl text-center lg:text-left lg:w-1/2"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center px-3 py-1 mb-6 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
          <span className="mr-2 bg-blue-400 w-2 h-2 rounded-full"></span>
          Your home, our expertise
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-header font-bold text-gray-100 leading-tight">
          How <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green">ServiJoy</span> Works
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg text-gray-300 mt-6 leading-relaxed">
          Book top-rated service providers effortlessly. No stress, no delays—just premium, reliable service at your fingertips.
        </motion.p>

        {/* Floating Badges */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full text-sm text-gray-200"
            >
              {badge.icon}
              <span>{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/services"
            className="group flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            <span>Get Started</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/register-vendor"
            className="flex items-center justify-center px-6 py-3 border border-green/50 hover:border-green text-green hover:text-green hover:bg-green/10 font-medium rounded-xl transition-all duration-300"
          >
            <span>Become a Vendor</span>
            <ChevronRight size={18} className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Image / Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="relative mt-12 lg:mt-0 lg:w-1/2 flex justify-center"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
          <div className="relative">
            <OptimizedImage 
              src="../../assets/imgs/flooring.webp"
              alt="Professional home service"
              className="w-full h-auto object-cover rounded-xl shadow-2xl"
              rounded="rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20"
            >
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={16} fill="#FFCA28" color="#FFCA28" />
                  ))}
                </div>
                <span className="text-white text-sm">5.0 (2,349 reviews)</span>
              </div>
              <p className="text-white text-sm mt-1">"Transformed our home in just one day!"</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorksHero;
