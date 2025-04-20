import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  FaBroom, FaTools, FaBolt, FaPaintRoller, FaUtensils, 
  FaSpinner, FaSearch, FaArrowRight, FaStar, FaFire 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const QuickAccessServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Fetch services function
  const fetchServices = async () => {
    try {
      // Simulate API call (replace with real API later)
      const mockServices = [
        { 
          id: 1, 
          name: "Home Cleaning", 
          icon: <FaBroom />, 
          color: "from-blue-400 to-blue-600",
          rating: 4.8,
          bookings: 1200,
          description: "Professional home cleaning services"
        },
        { 
          id: 2, 
          name: "Plumbing", 
          icon: <FaTools />, 
          color: "from-emerald-400 to-emerald-600",
          rating: 4.6,
          bookings: 850,
          description: "Quick plumbing repairs and installations"
        },
        { 
          id: 3, 
          name: "Electrician", 
          icon: <FaBolt />, 
          color: "from-amber-400 to-amber-600",
          rating: 4.7,
          bookings: 920,
          description: "Certified electrical services"
        },
        { 
          id: 4, 
          name: "Painting", 
          icon: <FaPaintRoller />, 
          color: "from-red-400 to-red-600",
          rating: 4.5,
          bookings: 750,
          description: "Interior and exterior painting"
        },
        { 
          id: 5, 
          name: "Cooking", 
          icon: <FaUtensils />, 
          color: "from-purple-400 to-purple-600",
          rating: 4.9,
          bookings: 1500,
          description: "Personal chef and catering services"
        },
      ];
      
      setServices(mockServices);
      // Set popular services based on bookings
      setPopularServices(
        [...mockServices].sort((a, b) => b.bookings - a.bookings).slice(0, 3)
      );
    } catch (err) {
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedServices = activeTab === "popular" 
    ? popularServices 
    : filteredServices;

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-4xl text-blue-500" aria-label="Loading services" />
        </motion.div>
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center py-10 text-red-500">
          <div className="text-center mb-4">{error}</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchServices();
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition shadow-md"
            aria-label="Retry loading services"
          >
            Retry
          </motion.button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
            <FaFire />
          </span>
          Book a Service
        </h3>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border ${
                isSearchFocused 
                  ? "border-blue-500 ring-2 ring-blue-200" 
                  : "border-gray-300 dark:border-gray-600"
              } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none transition-all duration-300`}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-800 transition text-sm font-medium"
            aria-label="View all services"
          >
            View All Services <FaArrowRight />
          </Link>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 px-1 ${
              activeTab === "all" 
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium" 
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setActiveTab("popular")}
            className={`pb-3 px-1 flex items-center ${
              activeTab === "popular" 
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium" 
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <FaStar className="mr-1" /> Popular
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + searchQuery}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {displayedServices.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {displayedServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="flex flex-col"
                >
                  <Link
                    to={`/book-service/${service.name.toLowerCase().replace(" ", "-")}`}
                    className="flex flex-col items-center h-full rounded-xl overflow-hidden shadow-md group"
                    aria-label={`Book ${service.name} service`}
                  >
                    <div className={`flex items-center justify-center w-full pt-6 pb-4 bg-gradient-to-br ${service.color} group-hover:scale-105 transition-transform duration-300`}>
                      <span className="text-3xl md:text-4xl text-white">{service.icon}</span>
                    </div>
                    <div className="w-full p-3 bg-white dark:bg-gray-800 flex flex-col items-center">
                      <p className="text-sm font-medium text-center text-gray-900 dark:text-white">{service.name}</p>
                      <div className="flex items-center mt-2 text-amber-500">
                        <FaStar className="mr-1" />
                        <span className="text-xs">{service.rating}</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        Book Now
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
              <FaSearch className="text-5xl mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-center mb-4">No services found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Need a custom service?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Can't find what you're looking for? Request a custom service.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Make a Request
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickAccessServices;