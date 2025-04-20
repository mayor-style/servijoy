import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTools, FaPlus } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import ServiceCard from "./ServiceCard";

const ActiveServicesList = ({ isEmpty = false, isLoading = false }) => {
  // Sample data (will be replaced with real API data later)
  const services = [
    { 
      id: 1, 
      name: "Home Cleaning", 
      category: "Cleaning", 
      status: "approved", 
      totalBookings: 24, 
      earnings: 1200,
      rating: 4.8,
      lastBooking: "2025-03-15"
    },
    { 
      id: 2, 
      name: "Plumbing Repairs", 
      category: "Plumbing", 
      status: "pending", 
      totalBookings: 5, 
      earnings: 300,
      rating: 4.5,
      lastBooking: "2025-03-10"
    },
    { 
      id: 3, 
      name: "Electric Repairs", 
      category: "Electrical", 
      status: "rejected", 
      totalBookings: 0, 
      earnings: 0,
      rating: 0,
      lastBooking: null
    },
  ];

  // Loading skeleton animation
  const loadingAnimation = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1.5
      }
    }
  };

  const handleAddService = () => {
    console.log("Add service clicked!");
    // Placeholder for navigation or modal trigger
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl transition-all duration-300 overflow-hidden border dark:border-gray-700">
        <div className="flex justify-center items-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-green/50"
          >
            <HiOutlineRefresh size={36} />
          </motion.div>
          <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">Loading services...</span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="h-24 sm:h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl"
              variants={loadingAnimation}
              animate="animate"
              style={{ backgroundSize: "200% 200%" }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Render empty state or data
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl transition-all duration-300 overflow-hidden border dark:border-gray-700"
    >
      {isEmpty || services.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="bg-green/50 dark:bg-green/90/20 p-6 rounded-full mb-6"
          >
            <FaTools size={48} className="text-green/50 dark:text-green/40" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Active Services</h3>
          <p className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-md">
            You haven't added any services yet. Get started by adding your first service!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddService}
            className="bg-gradient-to-r from-green/50 to-green/60 hover:from-green/60 hover:to-green/70 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 shadow-md flex items-center gap-2"
          >
            <FaPlus size={16} />
            <span>Add Your First Service</span>
          </motion.button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default ActiveServicesList;