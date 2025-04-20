import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBroom, FaTools, FaBolt, FaPaintRoller, FaTruckMoving, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const services = [
  { 
    id: 1, 
    name: "Cleaning Services", 
    icon: <FaBroom />, 
    color: "from-green/50 to-green/60", // Updated green classes
    description: "Professional cleaning services for homes and offices",
    route: "/service/cleaning"
  },
  { 
    id: 2, 
    name: "Plumbing & Repairs", 
    icon: <FaTools />, 
    color: "from-blue-500 to-indigo-600", // Blue remains unchanged
    description: "Expert plumbing solutions and general repairs",
    route: "/service/plumbing"
  },
  { 
    id: 3, 
    name: "Electrical Work", 
    icon: <FaBolt />, 
    color: "from-amber-400 to-yellow-600", // Amber remains unchanged
    description: "Licensed electricians for all your electrical needs",
    route: "/service/electrical"
  },
  { 
    id: 4, 
    name: "Painting Services", 
    icon: <FaPaintRoller />, 
    color: "from-red-400 to-rose-600", // Red remains unchanged
    description: "Transform your space with professional painting",
    route: "/service/painting"
  },
  { 
    id: 5, 
    name: "Moving Services", 
    icon: <FaTruckMoving />, 
    color: "from-purple-400 to-violet-600", // Purple remains unchanged
    description: "Reliable moving services to make relocation easy",
    route: "/service/moving"
  },
  { 
    id: 6, 
    name: "Landscaping", 
    icon: <FaLeaf />, 
    color: "from-teal-400 to-green/60", // Updated green usage; teal remains
    description: "Professional landscaping and garden maintenance",
    route: "/service/landscaping"
  },
];

const ServiceCategories = () => {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);
  
  const handleNavigate = (route) => {
    navigate(route);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-wider text-blue-600 uppercase"
          >
            What We Offer
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
          >
            Explore Our Premium Services
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-3 mx-auto h-1 w-24 bg-blue-600 rounded"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Professional and verified experts ready to assist you with high-quality services tailored to your needs.
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => handleNavigate(service.route)}
              className="group relative flex flex-col h-64 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${service.color}`} />
              
              {/* Content */}
              <div className="flex flex-col items-center justify-center p-8 h-full relative z-10">
                {/* Icon with gradient */}
                <div className={`w-20 h-20 flex items-center justify-center text-white text-3xl rounded-full bg-gradient-to-br ${service.color} shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                  {service.icon}
                </div>
                
                {/* Service Name */}
                <h3 className="mt-6 font-bold text-xl text-gray-900 text-center group-hover:text-blue-700 transition-colors duration-300">
                  {service.name}
                </h3>
                
                {/* Description - Fade in on hover */}
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredService === service.id ? 1 : 0,
                    height: hoveredService === service.id ? "auto" : 0 
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-gray-600 text-center text-sm"
                >
                  {service.description}
                </motion.p>
              </div>
              
              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/services')}
          >
            View All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCategories;
