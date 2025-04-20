import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import ActiveServices from "./components/ManageServiceSections/ActiveServicesList";
import ServiceRequestForm from "./components/ManageServiceSections/RequestNewService";
import ServiceRequestStatus from "./components/ManageServiceSections/ServiceRequestStatus";

const ManageServicesPage = () => {
  // Development testing state toggles
  const [showDevTools, setShowDevTools] = useState(false);
  const [showEmptyStates, setShowEmptyStates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Toaster position="top-right" />
      <div className="max-w-[100%] sm:max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Header Section with Development Tools Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.h1 
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white font-header bg-gradient-to-r from-green/60 to-blue-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Manage Your Services
          </motion.h1>
          
          {/* Development Tools Toggle - Only visible during development */}
          <motion.button
            onClick={() => setShowDevTools(!showDevTools)}
            className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            variants={itemVariants}
          >
            {showDevTools ? "Hide Dev Tools" : "Show Dev Tools"}
          </motion.button>
        </div>

        {/* Development Tools Panel */}
        {showDevTools && (
          <motion.div 
            className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 p-4 rounded-xl shadow-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Development Testing Controls</p>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setShowEmptyStates(!showEmptyStates)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                    showEmptyStates 
                      ? "bg-indigo-600 text-white" 
                      : "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700"
                  }`}
                >
                  {showEmptyStates ? "Show Data" : "Show Empty States"}
                </button>
                <button 
                  onClick={toggleLoading}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  Simulate Loading
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section 1: Active Services */}
        <motion.section 
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-header">
                Active Services
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                View and manage your current service offerings
              </p>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-green/50 to-blue-500 rounded-full mt-2 sm:hidden"></div>
          </div>
          <ActiveServices isEmpty={showEmptyStates} isLoading={isLoading} />
        </motion.section>

        {/* Section 2: Request a New Service */}
        <motion.section 
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-header">
                Request a New Service
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Submit a request to offer a new service to your customers
              </p>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-green/50 to-blue-500 rounded-full mt-2 sm:hidden"></div>
          </div>
          <ServiceRequestForm isLoading={isLoading} />
        </motion.section>

        {/* Section 3: Service Request Status */}
        <motion.section 
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-header">
                Service Request Status
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Track the progress of your service requests
              </p>
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-green/50 to-blue-500 rounded-full mt-2 sm:hidden"></div>
          </div>
          <ServiceRequestStatus isEmpty={showEmptyStates} isLoading={isLoading} />
        </motion.section>
      </div>
    </motion.div>
  );
};

export default ManageServicesPage;