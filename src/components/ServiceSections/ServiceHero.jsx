import { motion } from "framer-motion";
import { FaTools, FaHandHoldingHeart, FaCheckCircle, FaSearch, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const ServicesHero = () => {
  const [activeService, setActiveService] = useState(0);
  const services = [
    { name: "Cleaning", icon: "🧹", description: "Professional home cleaning services" },
    { name: "Plumbing", icon: "🔧", description: "Expert plumbing repairs and installations" },
    { name: "Electrical", icon: "⚡", description: "Certified electrical work and maintenance" },
    { name: "Gardening", icon: "🌱", description: "Landscaping and garden maintenance" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5 z-0"></div>
      <motion.div 
        className="absolute -top-32 -right-32 sm:-top-48 sm:-right-48 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 z-0"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-32 -left-32 sm:-bottom-48 sm:-left-48 w-64 sm:w-96 h-64 sm:h-96 bg-green/10 rounded-full blur-3xl opacity-20 z-0"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left text-white"
          >
            {/* Subtitle */}
            <motion.div 
              variants={itemVariants}
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-green/20 backdrop-blur-sm border border-white/10 mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 text-gradient font-semibold text-xs sm:text-sm md:text-base">
                Wide Range of Professional Services
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              Reliable Services,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                On-Demand!
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-white/80 mt-4 sm:mt-6 mx-auto lg:mx-0 max-w-lg"
            >
              Book verified professionals for cleaning, plumbing, home repairs, and more.
              Hassle-free, fast, and secure. Quality service at your fingertips!
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 mt-6 sm:mt-8"
            >
              <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
                <FaStar className="text-yellow-400 text-xs sm:text-sm" />
                <span className="text-xs sm:text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-medium">10,000+ Completed Jobs</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-medium">100% Satisfaction</span>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 sm:mt-8 relative"
            >
              <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-full p-1 sm:p-1.5 border border-white/10">
                <input 
                  type="text" 
                  placeholder="What service do you need?" 
                  className="flex-1 bg-transparent text-white placeholder-white/50 text-sm sm:text-base px-3 sm:px-4 py-2 outline-none"
                />
                <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1 sm:gap-2 font-medium transition-all shadow-lg shadow-blue-500/20">
                  <FaSearch className="text-xs sm:text-sm" /> <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              <button className="bg-gradient-to-r from-green to-green hover:shadow-lg hover:shadow-green text-white text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1 sm:gap-2 font-medium transition-all shadow-lg shadow-green/20">
                <FaCheckCircle className="text-xs sm:text-sm" /> Book a Service
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/20 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1 sm:gap-2 font-medium transition-all shadow-lg shadow-blue-500/20">
                <FaHandHoldingHeart className="text-xs sm:text-sm" /> Become a Vendor
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Service Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative h-[400px] xl:h-[450px] w-full">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  animate={{ 
                    opacity: activeService === index ? 1 : 0, 
                    scale: activeService === index ? 1 : 0.8,
                    rotate: activeService === index ? 0 : 5,
                    zIndex: activeService === index ? 10 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl h-full flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
                    <div>
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{service.name}</h3>
                      <p className="text-sm sm:text-base text-white/70">{service.description}</p>
                      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-green/50 text-xs sm:text-sm" />
                          <span className="text-xs sm:text-sm text-white/80">Verified professionals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-green/50 text-xs sm:text-sm" />
                          <span className="text-xs sm:text-sm text-white/80">Satisfaction guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-green/50 text-xs sm:text-sm" />
                          <span className="text-xs sm:text-sm text-white/80">Available 24/7</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-6 sm:mt-8 w-full bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-1.5 sm:py-2 rounded-full flex items-center justify-center gap-1 sm:gap-2 transition-all">
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
