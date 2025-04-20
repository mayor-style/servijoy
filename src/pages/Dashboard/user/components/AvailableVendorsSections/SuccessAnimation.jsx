import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const SuccessAnimation = ({ message = "Booking Confirmed!", onComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Trigger confetti after the checkmark animation completes
    const timer = setTimeout(() => {
      setShowConfetti(true);
      
      // Create confetti burst
      if (typeof window !== "undefined") {
        const duration = 2000;
        const end = Date.now() + duration;
        
        const colors = ['#4ade80', '#22c55e', '#16a34a', '#bbf7d0'];
        
        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });
          
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }
      
      // Callback when animation completes
      const completeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000);
      
      return () => clearTimeout(completeTimer);
    }, 1000);
    
    // Animate the loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newValue = prev + (100 - prev) / 10;
        return newValue >= 100 ? 100 : newValue;
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  // Define animation variants
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.34, 1.56, 0.64, 1] // Custom spring curve
      }
    }
  };
  
  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        delay: 0.3,
        duration: 0.8, 
        ease: "easeInOut" 
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.6,
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };
  
  const pulseVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1.5,
      opacity: 0.15,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative flex items-center justify-center"
      >
        {/* Outer pulsing glow */}
        <motion.div
          variants={pulseVariants}
          className="absolute w-32 h-32 bg-green/40 dark:bg-green/50 opacity-20 rounded-full filter blur-xl"
        />
        
        {/* Inner glow */}
        <motion.div
          variants={circleVariants}
          className="absolute w-28 h-28 bg-green/30 dark:bg-green/60 opacity-20 rounded-full filter blur-md"
        />
        
        {/* Main circle */}
        <motion.div
          variants={circleVariants}
          className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green/40 to-green/60 dark:from-green/50 dark:to-green/70 rounded-full shadow-lg"
        >
          <motion.svg 
            className="w-12 h-12 text-white" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              variants={checkVariants}
              d="M20 6L9 17L4 12"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
      
      {/* Progress indicator */}
      <div className="w-48 h-1 mt-6 mb-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 2 }}
          className="h-full bg-green/50 rounded-full"
        />
      </div>
      
      {/* Text message */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="mt-3 text-2xl font-bold text-gray-800 dark:text-white"
      >
        {message}
      </motion.div>
      
      {/* Subtext message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-2 text-center text-gray-600 dark:text-gray-300"
      >
        Your confirmation details have been sent to your email
      </motion.p>
      
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <button 
            className="px-6 py-2 bg-green/50 hover:bg-green/60 text-white rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95"
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SuccessAnimation;