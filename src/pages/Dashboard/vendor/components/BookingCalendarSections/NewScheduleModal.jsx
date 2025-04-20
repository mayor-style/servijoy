import React, { useState, useEffect } from "react";
import { FaTimes, FaCalendarAlt, FaClock, FaUser, FaTools, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NewScheduleModal = ({ isOpen, onClose, onAddEvent, services = [], clients = [] }) => {
  const [formData, setFormData] = useState({
    title: "",
    service: "",
    client: "",
    date: "",
    time: "",
    details: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      // Set today's date as default
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.service) newErrors.service = "Service is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);
      const newEvent = {
        id: Date.now(),
        title: formData.title,
        client: formData.client,
        service: formData.service,
        date: eventDateTime.toISOString(),
        details: formData.details,
      };
      
      // Simulate API delay for better UX feedback
      await new Promise(resolve => setTimeout(resolve, 300));
      onAddEvent(newEvent);
      
      // Success animation before closing
      setTimeout(() => {
        onClose();
        setFormData({
          title: "",
          service: "",
          client: "",
          date: "",
          time: "",
          details: "",
        });
      }, 500);
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate title based on service and client
  useEffect(() => {
    const service = formData.service;
    const client = formData.client;
    
    if (service && client) {
      setFormData(prev => ({
        ...prev,
        title: `${service} - ${client}`
      }));
    } else if (service) {
      setFormData(prev => ({
        ...prev,
        title: service
      }));
    }
  }, [formData.service, formData.client]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative max-h-[90vh] overflow-auto"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 500 
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>

          {/* Modal Title */}
          <motion.h2 
            className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              New Appointment
            </span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Service Selection - Enhanced Dropdown */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaTools className="mr-2 text-blue-500" />
                Service
              </label>
              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 pl-4 pr-10 border ${errors.service ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
                >
                  <option value="">Select a service</option>
                  {services.length > 0 ? (
                    services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Home Cleaning">Home Cleaning</option>
                      <option value="Office Cleaning">Office Cleaning</option>
                      <option value="Deep Cleaning">Deep Cleaning</option>
                      <option value="Move-in/Move-out">Move-in/Move-out</option>
                      <option value="Carpet Cleaning">Carpet Cleaning</option>
                    </>
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
            </motion.div>

            {/* Client Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaUser className="mr-2 text-blue-500" />
                Client
              </label>
              <div className="relative">
                <input
                  list="clients"
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Select or type client name"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <datalist id="clients">
                  {clients.length > 0 ? (
                    clients.map((client) => (
                      <option key={client.id} value={client.name} />
                    ))
                  ) : (
                    <>
                      <option value="John Smith" />
                      <option value="Jane Doe" />
                      <option value="Corporate Office" />
                    </>
                  )}
                </datalist>
              </div>
            </motion.div>

            {/* Title Input */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaInfoCircle className="mr-2 text-blue-500" />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Appointment title"
                required
                className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </motion.div>

            {/* Date & Time Inputs */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Date Input */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
              </div>

              {/* Time Input */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaClock className="mr-2 text-blue-500" />
                  Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border ${errors.time ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
              </div>
            </motion.div>

            {/* Details Input */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaInfoCircle className="mr-2 text-blue-500" />
                Details
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Any special instructions or notes..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              className="pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md`}
              >
                <div className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Schedule Appointment"
                  )}
                </div>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewScheduleModal;