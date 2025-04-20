import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaExclamationTriangle, FaArrowLeft, FaHome, FaWrench, FaQuestion, FaMap, FaSearch, FaRocket, FaSatellite } from "react-icons/fa";

function NotFoundPage() {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const controls = useAnimation();
  const searchRef = useRef(null);
  
  useEffect(() => {
    document.title = "404 - Page Not Found";
    
    // Trigger the floating animation for the warning icon
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
    
    // Add event listener for escape key to close search focus
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchFocused(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [controls]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, you might redirect to search results
      setIsExploring(true);
      setTimeout(() => {
        navigate("/search?q=" + encodeURIComponent(searchQuery));
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white relative overflow-hidden">
      <div className="w-full max-w-3xl px-6 py-12 flex flex-col items-center text-center">
        {/* Space background particles */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 5 === 0 ? 'bg-purple-400' : i % 3 === 0 ? 'bg-blue-400' : 'bg-white'}`}
              style={{
                width: `${(i % 4) + 1}px`,
                height: `${(i % 4) + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: `blur(${i % 3 === 0 ? '1px' : '0px'})`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, i % 5 === 0 ? 2 : 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        {/* Animated shooting stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              width: `${50 + Math.random() * 100}px`,
              top: `${Math.random() * 70}%`,
              left: `-100px`,
              rotate: `${20 + Math.random() * 20}deg`,
              opacity: 0,
            }}
            animate={{
              left: ['-100px', '120%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: 5 + i * 7 + Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Animated warning icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={controls}
          whileHover={{ scale: 1.1, rotate: 0 }}
          transition={{ 
            scale: { duration: 0.5 },
          }}
          className="relative mb-8 group cursor-pointer"
          onClick={() => setIsSearchFocused(true)}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 filter blur-xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <FaExclamationTriangle className="text-8xl md:text-9xl text-yellow-300 filter drop-shadow-xl relative z-10" />
            
            {/* Orbiting satellite */}
            <motion.div
              className="absolute w-6 h-6 z-20"
              style={{ top: '10%', left: '50%' }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="relative h-full">
                <motion.div
                  className="absolute"
                  style={{ left: '50px' }}
                  whileHover={{ scale: 1.5 }}
                >
                  <FaSatellite className="text-gray-300 hover:text-white transition-colors" />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Animated stars around the icon */}
          <div className="absolute inset-0 -z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full w-1 h-1"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          {/* Hover tooltip */}
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0], y: [10, 0, 10] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
          >
            Click to search
          </motion.div>
        </motion.div>

        {/* Error Message with Typing Effect */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 relative z-10"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 relative"
            initial={{ opacity: 1 }}
            animate={{ 
              textShadow: ["0 0 5px rgba(255,255,255,0.1)", "0 0 15px rgba(255,255,255,0.3)", "0 0 5px rgba(255,255,255,0.1)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            404
            <motion.span 
              className="absolute -top-1 -right-1 text-xs bg-red-500 text-white px-1 rounded-md font-mono"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
            >
              ERROR
            </motion.span>
          </motion.h1>
          <motion.div 
            className="text-2xl md:text-3xl font-bold mb-4 text-white"
            animate={{ 
              color: ["rgba(255,255,255,1)", "rgba(255,255,255,0.8)", "rgba(255,255,255,1)"] 
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="border-r-2 border-white/50 pr-2 mr-1">Page</span> Not Found
          </motion.div>
          <motion.p 
            className="text-lg text-gray-200 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="text-yellow-300 font-semibold">Oops!</span> It seems you've ventured into uncharted territory. 
            Don't worry, we can help you find your way back to civilization.
          </motion.p>
          
          {/* Search bar */}
          <motion.div 
            className={`mt-6 max-w-md mx-auto relative ${isSearchFocused ? 'scale-105' : ''} transition-transform duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            ref={searchRef}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-5 py-3 pr-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-transparent transition-all duration-300"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </form>
            
            {/* Search focus backdrop */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div 
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSearchFocused(false)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Helpful Button Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="col-span-2 md:col-span-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center space-x-3 shadow-lg group"
              aria-label="Go back to previous page"
            >
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <FaArrowLeft className="text-yellow-300 group-hover:text-yellow-200 transition-colors" />
              </motion.div>
              <span className="font-medium">Go Back</span>
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,223,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="col-span-2 md:col-span-1 overflow-hidden rounded-xl"
            >
              <Link
                to="/"
                className="w-full h-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-medium rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all flex items-center justify-center space-x-3 shadow-lg group relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/30 to-yellow-300/0"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                <FaHome className="text-gray-900 group-hover:text-gray-800 transition-colors" />
                <span>Return Home</span>
              </Link>
            </motion.div>
          </div>
          
          {/* Expandable Help Section */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button 
              onClick={() => setShowHelp(!showHelp)}
              className="text-sm flex items-center space-x-2 text-gray-300 hover:text-white transition-colors relative px-4 py-2 rounded-full group"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              animate={showHelp ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 1, repeat: showHelp ? 0 : Infinity, repeatDelay: 3 }}
            >
              <motion.div
                animate={showHelp ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaMap className="text-yellow-300 group-hover:text-yellow-200" />
              </motion.div>
              <span>{showHelp ? "Hide navigation options" : "Need help finding something?"}</span>
              
              {/* Pulsing dot for attention */}
              {!showHelp && (
                <motion.div 
                  className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
            
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-6 w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Link
                      to="/services"
                      className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all flex items-center space-x-3 group relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8 }}
                      />
                      <FaWrench className="text-yellow-300 group-hover:text-yellow-200 transition-colors" />
                      <span>Services</span>
                    </Link>
                    <Link
                      to="/faq"
                      className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all flex items-center space-x-3 group relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8 }}
                      />
                      <FaQuestion className="text-yellow-300 group-hover:text-yellow-200 transition-colors" />
                      <span>FAQ</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all flex items-center space-x-3 group relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8 }}
                      />
                      <FaRocket className="text-yellow-300 group-hover:text-yellow-200 transition-colors" />
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Exploring animation overlay */}
      <AnimatePresence>
        {isExploring && (
          <motion.div 
            className="fixed inset-0 bg-indigo-900/80 backdrop-blur-md z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaRocket className="text-6xl text-yellow-300" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Launching Search</h2>
              <p className="text-gray-300">Preparing to explore the universe...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-auto py-4 text-sm text-gray-400 relative z-10"
      >
        <motion.p
          whileHover={{ color: "#ffffff" }}
          transition={{ duration: 0.3 }}
        >
          © {new Date().getFullYear()} Your Company • All rights reserved
        </motion.p>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;