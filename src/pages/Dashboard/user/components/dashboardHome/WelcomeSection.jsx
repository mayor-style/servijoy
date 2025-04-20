import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { 
  FaSun, FaMoon, FaCloudSun, FaSearch, FaSpinner, 
  FaArrowRight, FaChevronDown, FaChevronUp, 
  FaMapMarkerAlt, FaRegClock

} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeSection = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const searchInputRef = useRef(null);

  // Check localStorage for user preference on expanded state
  useEffect(() => {
    const savedExpandState = localStorage.getItem('welcomeSectionExpanded');
    if (savedExpandState !== null) {
      setIsExpanded(savedExpandState === 'true');
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Replace with real API call later
        const mockServices = [
          "Plumbing", "Electrician", "House Cleaning", "Car Repair", "Gardening", "Painting",
          "Tutoring", "Personal Trainer", "Delivery Service", "IT Support", "Home Moving"
        ];
        setServices(mockServices);
       
           // Mock weather info
           setWeatherInfo({
            temp: 23,
            condition: "Sunny",
            icon: "☀️"
          });
          
          // Mock location
          setUserLocation("Lagos, Nigeria");
  

        // Get recent searches from localStorage
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
          setRecentSearches(JSON.parse(saved).slice(0, 3));
        }
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Save expanded state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('welcomeSectionExpanded', isExpanded);
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    
    // If expanding, focus on search input
    if (!isExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  };

  const currentHour = new Date().getHours();
  let greeting = "";
  let Icon = null;
  if (currentHour < 12) {
    greeting = "Good Morning";
    Icon = FaSun;
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
    Icon = FaCloudSun;
  } else {
    greeting = "Good Evening";
    Icon = FaMoon;
  }

  const userFirstName= user?.profile.firstName

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query.length > 0) {
      const matches = services.filter((service) =>
        service.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(matches);
    } else {
      setFilteredServices([]);
    }
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && selectedIndex < filteredServices.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      selectService(filteredServices[selectedIndex]);
    }
  };

  const selectService = (service) => {
    setSearch(service);
    setFilteredServices([]);
    
    // Save to recent searches
    const updatedSearches = [service, ...recentSearches.filter(s => s !== service)].slice(0, 3);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  if (loading) {
    return (
      <div className="text-center py-6">
        <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">
        {error}{" "}
        <button
          onClick={() => {
            setLoading(true);
            fetchServices();
          }}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Gradient background variants
  const gradientVariants = {
    light: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
    dark: "dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
  };

  return (
    <div className="mb-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${gradientVariants.light} ${gradientVariants.dark} text-white 
          rounded-xl shadow-lg w-full max-w-5xl mx-auto border border-white/10 
          backdrop-blur-sm overflow-hidden transition-all duration-300`}
      >
    
        {/* Header - Always Visible */}
        <div 
          className={`px-5 py-4 md:px-6 md:py-5 flex items-center justify-between cursor-pointer 
            ${isExpanded ? 'border-b border-white/20' : 'hover:bg-white/5'}`}
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: isExpanded ? 0 : -10 }}
              transition={{ duration: 0.3 }}
              className="p-3 md:p-4 bg-white/20 rounded-full shadow-lg"
            >
              <Icon className="text-xl md:text-2xl text-yellow-300" />
            </motion.div>
            <div>
              <div className="flex items-center">
                <h2 className="text-lg md:text-xl font-header font-bold tracking-wide">
                  {greeting}, {userFirstName || "User"}!
                </h2>
                {weatherInfo && (
                  <div className="ml-3 flex items-center gap-1 text-sm bg-white/10 px-2 py-1 rounded-full">
                    <span>{weatherInfo.icon}</span>
                    <span>{weatherInfo.temp}°C</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {userLocation && (
                  <div className="flex items-center text-xs text-white/80">
                    <FaMapMarkerAlt className="mr-1 text-xs" />
                    {userLocation}
                  </div>
                )}
                {!isExpanded && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs md:text-sm text-white/80 ml-2"
                  >
                    Click to expand and search for services
                  </motion.p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <FaRegClock className="text-xs text-white/70" />
              <span className="text-xs text-white/70">
                {new Date().toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <button 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              aria-label={isExpanded ? "Collapse welcome section" : "Expand welcome section"}
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 md:p-5 pt-2">
                {/* Search Section */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-full"
                >
                  <div className="relative w-full">
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="w-full bg-white/95 dark:bg-gray-800/95 text-gray-900 dark:text-white 
                        rounded-lg py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-300 
                        dark:focus:ring-blue-600 text-base shadow-md transition-all"
                      placeholder="Search for a service..."
                      value={search}
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyDown}
                      aria-label="Search for a service"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    
                    {filteredServices.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                          shadow-xl rounded-lg mt-2 z-10 max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700"
                      >
                        {filteredServices.map((service, index) => (
                          <li
                            key={service}
                            className={`px-4 py-3 cursor-pointer transition ${
                              selectedIndex === index 
                                ? "bg-blue-500 text-white" 
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onMouseDown={() => selectService(service)}
                            role="option"
                            aria-selected={selectedIndex === index}
                          >
                            {service}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && search.length === 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs text-white/70">Recent:</span>
                      {recentSearches.map(item => (
                        <motion.button
                          key={item}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => selectService(item)}
                          className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition"
                        >
                          {item}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Book Service Button */}
                  <Link
                    to={`/book-service?query=${search}`}
                    className={`mt-4 w-full flex items-center justify-center gap-2 bg-green hover:bg-green 
                      font-medium py-3 px-5 rounded-lg shadow-md transition-all ${!search ? 'opacity-70 pointer-events-none' : 'hover:scale-[1.02]'}`}
                  >
                    Book Service
                    <FaArrowRight />
                  </Link>
                </motion.div>

                {/* Popular Services */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-5 pt-3 border-t border-white/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Popular Services</h3>
                    <Link to="/services" className="text-xs text-white/80 hover:text-white">View All</Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {services.slice(0, 5).map(service => (
                      <motion.button
                        key={service}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectService(service)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
                      >
                        {service}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WelcomeSection;

