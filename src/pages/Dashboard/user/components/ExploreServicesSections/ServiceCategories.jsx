import React from "react";
import { 
  FaBroom, FaWrench, FaTruckMoving, FaBolt, 
  FaPaintRoller, FaTree, FaUtensils, FaLaptop, 
  FaHands, FaMusic, FaGraduationCap, FaCarAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
  { name: "Cleaning", icon: <FaBroom />, color: "bg-blue-500" },
  { name: "Repairs", icon: <FaWrench />, color: "bg-red-500" },
  { name: "Moving", icon: <FaTruckMoving />, color: "bg-green/50" },
  { name: "Electrical", icon: <FaBolt />, color: "bg-yellow-500" },
  { name: "Painting", icon: <FaPaintRoller />, color: "bg-purple-500" },
  { name: "Landscaping", icon: <FaTree />, color: "bg-teal-500" },
  { name: "Catering", icon: <FaUtensils />, color: "bg-orange-500" },
  { name: "Tech Support", icon: <FaLaptop />, color: "bg-indigo-500" },
  { name: "Wellness", icon: <FaHands />, color: "bg-pink-500" },
  { name: "Music", icon: <FaMusic />, color: "bg-cyan-500" },
  { name: "Education", icon: <FaGraduationCap />, color: "bg-amber-500" },
  { name: "Transportation", icon: <FaCarAlt />, color: "bg-lime-500" },
];

const ServiceCategories = ({ onSelectCategory, selectedCategory }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-4"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Service Categories
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Browse services by category and find what you need quickly
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        variants={containerVariants}
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category.name)}
            className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedCategory === category.name
                ? `${category.color} text-white shadow-md`
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
            }`}
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
              selectedCategory === category.name
                ? "bg-white bg-opacity-20"
                : `${category.color} bg-opacity-10 dark:bg-opacity-20`
            }`}>
              <div className={`text-2xl ${
                selectedCategory === category.name
                  ? "text-white"
                  : category.color.replace("bg-", "text-").replace("-500", "-600")
              }`}>
                {category.icon}
              </div>
            </div>
            <p className="text-xs font-medium text-center">{category.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ServiceCategories;