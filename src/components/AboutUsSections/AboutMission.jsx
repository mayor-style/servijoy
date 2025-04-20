import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHandshake, FaRocket, FaGlobe } from "react-icons/fa";

const AboutMission = () => {
  const [activeValue, setActiveValue] = useState(null);
  const controls = useAnimationControls();
  
  // More precise intersection observer configuration
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
    rootMargin: "-100px 0px",
  });
  
  // Independent observers for content elements
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const { ref: iconsRef, inView: iconsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Animation variants with more sophisticated easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    },
  };
  
  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        duration: 0.7
      } 
    },
  };
  
  // Values data for enhanced organization
  const values = [
    { 
      icon: FaHandshake, 
      title: "Trust & Integrity", 
      color: "from-green/40 to-emerald-600",
      description: "We build lasting relationships founded on transparency and honesty with every interaction."
    },
    { 
      icon: FaRocket, 
      title: "Innovation & Growth", 
      color: "from-blue-400 to-indigo-600",
      description: "We constantly evolve our platform to deliver cutting-edge solutions that empower service providers."
    },
    { 
      icon: FaGlobe, 
      title: "Global Impact", 
      color: "from-gray-700 to-gray-900",
      description: "We're creating a worldwide community that transcends borders to connect services globally."
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute -right-24 -top-24 text-gray-100 w-96 h-96 opacity-70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M47.1,-68.1C59.9,-59.8,68.9,-44.5,74.6,-28.2C80.3,-11.9,82.8,5.5,78.3,20.8C73.9,36.1,62.5,49.3,48.4,57.8C34.3,66.3,17.1,70.2,0.3,69.7C-16.5,69.3,-33,64.5,-47.5,55.2C-62,45.9,-74.5,32.1,-78.9,15.6C-83.3,-0.9,-79.6,-20,-69.8,-33.8C-60,-47.5,-44,-55.9,-29.3,-63.3C-14.7,-70.7,-1.3,-77.2,12.2,-76.6C25.7,-76,42.1,-68.3,47.1,-68.1Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute -left-24 -bottom-24 text-gray-100 w-96 h-96 opacity-70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M54.2,-78.2C68.9,-71.9,78.7,-56.4,83.7,-40.1C88.7,-23.8,89,-6.6,86.4,10.1C83.7,26.8,78.2,43,68.1,55.7C58,68.4,43.4,77.5,27.2,81.9C11,86.2,-6.9,85.7,-21.5,78.9C-36.1,72.1,-47.5,58.9,-58.3,45.1C-69.1,31.2,-79.3,16.6,-81.3,0.5C-83.3,-15.6,-77.1,-31.1,-66.8,-42.8C-56.5,-54.5,-42.2,-62.3,-28.1,-68.6C-14,-74.9,-0.2,-79.9,13.8,-77.5C27.7,-75.2,39.5,-84.5,54.2,-78.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative">
        {/* Section title with animated underline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-sm uppercase tracking-widest text-gray-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            What drives us
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block">
            Our Mission & Vision
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-green/40 to-blue-500 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side - Text content with sequential animation */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/50 p-6 md:p-8 rounded-xl border border-gray-100 shadow-xl shadow-gray-100/10"
            >
              <motion.p variants={itemVariants} className="text-lg leading-relaxed text-gray-700">
                At <span className="bg-clip-text text-transparent bg-gradient-to-r from-green/50 to-blue-500 font-semibold">ServiJoy</span>, our mission is to
                revolutionize service accessibility by seamlessly connecting skilled
                professionals with those in need. We believe in efficiency,
                reliability, and trust.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6"
              />
              
              <motion.p variants={itemVariants} className="text-lg leading-relaxed text-gray-700">
                Our vision is to create a future where finding and booking trusted
                services is effortless—from local repairs to premium
                professionals. We aim to bridge the gap between quality service
                providers and satisfied customers, ensuring fair opportunities for
                all.
              </motion.p>
              
              <motion.button
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" 
                }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-green/50 to-blue-500 text-white rounded-lg font-medium"
              >
                Learn More About Us
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive values cards */}
          <motion.div
            ref={iconsRef}
            variants={iconContainerVariants}
            initial="hidden"
            animate={iconsInView ? "visible" : "hidden"}
            className="lg:w-1/2"
          >
            <div className="grid gap-6 md:grid-cols-3 md:gap-3 lg:gap-5">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  onHoverStart={() => setActiveValue(index)}
                  onHoverEnd={() => setActiveValue(null)}
                  className={`relative overflow-hidden flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 shadow-lg transition-all ${
                    activeValue === index ? 'z-10 scale-105' : 'z-0'
                  }`}
                >
                  {/* Background gradient overlay */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0`}
                    animate={{ 
                      opacity: activeValue === index ? 0.1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon with circle background */}
                  <motion.div 
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${value.color} text-white`}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <value.icon className="text-2xl" />
                    
                    {/* Animated ring */}
                    <motion.div 
                      className="absolute inset-0 border-2 border-current rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: activeValue === index ? [0.8, 1.2, 1] : 0.8,
                        opacity: activeValue === index ? [0, 1, 0.8] : 0 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: activeValue === index ? Infinity : 0,
                        repeatType: "loop"
                      }}
                    />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  
                  <motion.p 
                    className="text-gray-600 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: activeValue === index ? 1 : 0,
                      height: activeValue === index ? "auto" : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
            
            {/* Statistics counter */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 grid grid-cols-3 gap-4 p-5 bg-white/80 backdrop-blur-md rounded-xl border border-gray-100 shadow-lg"
            >
              {[
                { label: "Service Providers", value: "25K+" },
                { label: "Happy Customers", value: "100K+" },
                { label: "Countries", value: "32" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (index * 0.2), duration: 0.5 }}
                  >
                    <motion.h4 
                      className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green/50 to-blue-500"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 1 + (index * 0.2), duration: 0.5, type: "spring" }}
                    >
                      {stat.value}
                    </motion.h4>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;