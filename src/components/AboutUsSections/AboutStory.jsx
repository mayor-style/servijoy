import React, { useState, useRef } from "react";
import aboutImage from "../../assets/imgs/home_repair.webp";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OptimizedImage from "../OptimizedImage";

const AboutStory = () => {
  const [activeHighlight, setActiveHighlight] = useState(null);
  const containerRef = useRef(null);
  
  // More sophisticated scroll handling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  
  // Separate observers for better animation control
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });
  
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  // Timeline milestones for interactive story
  const milestones = [
    { year: "2019", title: "The Idea", description: "Recognizing the challenges in finding reliable service providers" },
    { year: "2020", title: "Foundation", description: "ServiJoy was established with a mission to revolutionize service booking" },
    { year: "2022", title: "Expansion", description: "Growing beyond our initial markets to serve more communities" },
    { year: "2024", title: "Innovation", description: "Leveraging technology to create seamless experiences" },
  ];
  
  // Animation variants
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
  
  // Text highlight animation effect
  const highlightText = (text, highlight) => {
    const parts = text.split(highlight);
    
    return (
      <>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <motion.span 
                className="relative inline-block"
                onMouseEnter={() => setActiveHighlight(`serviJoy-${i}`)}
                onMouseLeave={() => setActiveHighlight(null)}
              >
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 font-semibold">
                  {highlight}
                </span>
                {activeHighlight === `serviJoy-${i}` && (
                  <motion.span 
                    layoutId="highlight" 
                    className="absolute inset-0 -m-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="w-full relative py-24 overflow-hidden"
    >
      {/* Enhanced background with gradient and texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-blue-100 to-indigo-50 opacity-80"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating decoration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, Math.random() * 0.4 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div ref={sectionRef} className="container relative mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side - Enhanced Image with Parallax */}
          <motion.div 
            ref={imageRef}
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={imageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Image mask and decorative elements */}
            <div className="relative">
              <motion.div
                className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-blue-500 rounded-tl-xl opacity-70"
                initial={{ scale: 0 }}
                animate={imageInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-blue-500 rounded-br-xl opacity-70"
                initial={{ scale: 0 }}
                animate={imageInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
              
              {/* Main image with parallax */}
              <motion.div 
                className="relative z-10 overflow-hidden rounded-2xl shadow-2xl"
                style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
              >
                <OptimizedImage 
                  src={aboutImage}
                  alt="Our Story"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  width={600}
                  height={400}
                  rounded={'rounded-2xl'}
                />
                
                {/* Gradient overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.3, duration: 1 }}
                />
                
                {/* Caption */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={imageInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-1 bg-blue-400 mr-3 rounded-full" />
                    <p className="text-sm font-medium tracking-wider uppercase">Our Journey</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Interactive timeline below image */}
            <motion.div 
              className="mt-8 flex overflow-x-auto md:overflow-visible space-x-3 pb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={imageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="min-w-max flex flex-col items-center relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <div className="h-1 w-8 bg-blue-200 absolute top-3 -left-8"></div>
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </motion.div>
                    <div className={`h-1 w-8 bg-blue-200 absolute top-3 -right-8 ${index === milestones.length - 1 ? 'hidden' : ''}`}></div>
                  </div>
                  <p className="text-xs font-bold mt-2 text-blue-600">{milestone.year}</p>
                  <p className="text-xs text-gray-600 mt-1">{milestone.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Story Text */}
          <motion.div
            ref={textRef}
            className="lg:w-1/2 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="relative inline-block mb-3"
              variants={itemVariants}
            >
              <span className="text-sm uppercase tracking-widest text-blue-600 font-medium">Our journey</span>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-200" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              The Story Behind <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">ServiJoy</span>
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed">
                  Finding reliable service providers has always been a struggle.
                  Many people end up dealing with overpriced, unqualified, or even
                  fraudulent vendors. We saw a gap, and we decided to fill it.
                </p>
              </div>
              
              <div className="relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed">
                  {highlightText("That's why ServiJoy was born—to create a seamless, trustworthy, and efficient bridge between skilled professionals and people who need their services.", "ServiJoy")}
                </p>
              </div>
              
              <div className="relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed">
                  Our goal? To make service booking effortless, reliable, and
                  transparent. Whether you need a cleaner, a plumber, or an event
                  planner—{highlightText("ServiJoy ensures you get the best.", "ServiJoy")}
                </p>
              </div>
            </motion.div>
            
            {/* Interactive call to action */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 lg:justify-start justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Discover Our Journey</span>
                <motion.div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
              >
                Meet Our Team
              </motion.button>
            </motion.div>
            
            {/* Social proof */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-blue-100"
            >
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                      >
                        <div className={`w-full h-full bg-gradient-to-br from-blue-${300 + i*100} to-indigo-${400 + i*100}`}></div>
                      </div>
                    ))}
                  </div>
                  <div className="ml-2 text-sm text-gray-600">
                    <span className="font-semibold">Trusted by</span> thousands
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 font-semibold ml-1">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;