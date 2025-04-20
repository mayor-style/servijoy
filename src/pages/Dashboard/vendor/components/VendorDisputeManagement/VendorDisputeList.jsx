import React from "react";
import { FaSearch, FaRegSadTear } from "react-icons/fa";
import VendorDisputeCard from "./VendorDisputeCard";
import { motion } from "framer-motion";

const VendorDisputeList = ({ disputes, onViewDetails, searchTerm }) => {
  // Empty state
  if (disputes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <FaRegSadTear className="text-gray-400 dark:text-gray-500 text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No disputes found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          {searchTerm ? `No disputes matching "${searchTerm}"` : "You don't have any disputes at the moment."}
        </p>
      </motion.div>
    );
  }

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {disputes.map((dispute) => (
        <VendorDisputeCard
          key={dispute.id}
          dispute={dispute}
          onViewDetails={onViewDetails}
        />
      ))}
    </motion.div>
  );
};

export default VendorDisputeList;