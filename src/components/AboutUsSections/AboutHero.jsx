import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const AboutHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  
  // Parallax effect for background
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  
  // Staggered animation for text reveal
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full relative overflow-hidden text-white py-24 min-h-screen flex items-center">
      {/* Animated background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-hero bg-cover bg-center bg-no-repeat"
        style={{ y: backgroundY }}
      />
      
      {/* Multiple overlay layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay"></div>
      
      {/* Animated particles/shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/10"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.5 + 0.2 
            }}
            animate={{ 
              y: [null, "-10%", "10%"], 
              opacity: [null, Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2] 
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <div className="container relative mx-auto px-6 lg:px-20">
        <AnimatePresence>
          {isLoaded && (
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {/* Accent line */}
              <motion.div 
                className="w-16 h-1 bg-green/40 mb-6" 
                variants={item}
              />
              
              {/* Main heading with gradient and shadow */}
              <motion.h1
                variants={item}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-green/30 via-blue-400 to-purple-400">
                  Empowering Seamless
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green/30 via-blue-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </span>
                <br />
                <span className="text-white drop-shadow-lg">Service Connections</span>
              </motion.h1>
              
              {/* Subheading with enhanced typography */}
              <motion.p
                variants={item}
                className="max-w-2xl mt-6 text-lg md:text-xl text-gray-200 leading-relaxed font-light"
              >
                ServiJoy is a premium platform connecting top-rated service providers
                with individuals in need. We bridge the gap between quality and
                convenience, ensuring a hassle-free experience every time.
              </motion.p>
              
              {/* Animated stats bar */}
              <motion.div
                variants={item}
                className="flex justify-center gap-8 mt-10 mb-12 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl w-fit"
              >
                {[
                  { label: "Providers", value: "2,500+" },
                  { label: "Cities", value: "120+" },
                  { label: "Satisfaction", value: "98%" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <motion.p 
                      className="text-xl md:text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs md:text-sm text-gray-300">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
              
              {/* Interactive buttons with hover effects */}
              <motion.div 
                variants={item}
                className="mt-6 flex flex-wrap justify-center gap-4 items-center"
              >
                <motion.button
                  className={`px-6 py-3 rounded-lg font-medium transition-all relative overflow-hidden ${
                    activeButton === "explore" 
                      ? "bg-gradient-to-r from-green/50 to-green/60 text-white" 
                      : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setActiveButton("explore")}
                  onMouseLeave={() => setActiveButton(null)}
                >
                  <span className="relative z-10">Explore Services</span>
                  {activeButton === "explore" && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-green/40 to-emerald-500" 
                      layoutId="buttonBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>
                
                <motion.button
                  className={`px-6 py-3 rounded-lg font-medium transition-all relative overflow-hidden ${
                    activeButton === "vendor" 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" 
                      : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setActiveButton("vendor")}
                  onMouseLeave={() => setActiveButton(null)}
                >
                  <span className="relative z-10">Become a Vendor</span>
                  {activeButton === "vendor" && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500" 
                      layoutId="buttonBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>
                
                {/* Scroll indicator */}
                <motion.div 
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-300 mb-2">Scroll to discover</span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                      <motion.div 
                        className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutHero;