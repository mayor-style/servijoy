import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { MdHandyman } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Expanded keyword mapping for better service matching
const keywordMapping = {
  clean: 'Cleaning',
  cleaner: 'Cleaning',
  maid: 'Cleaning',
  housekeeping: 'Cleaning',
  vacuum: 'Cleaning',
  dusting: 'Cleaning',
  
  plumb: 'Plumbing',
  plumber: 'Plumbing',
  pipe: 'Plumbing',
  faucet: 'Plumbing',
  leak: 'Plumbing',
  
  electr: 'Electrician',
  wiring: 'Electrician',
  outlet: 'Electrician',
  circuit: 'Electrician',
  light: 'Electrician',
  
  paint: 'Painting',
  painter: 'Painting',
  wall: 'Painting',
  decor: 'Painting',
  
  carpenter: 'Carpentry',
  wood: 'Carpentry',
  furniture: 'Carpentry',
  cabinet: 'Carpentry',
  
  ac: 'AC Repair',
  air: 'AC Repair',
  condition: 'AC Repair',
  acrepair: 'AC Repair',
  cooling: 'AC Repair',
  hvac: 'AC Repair',
  heat: 'AC Repair',
};

// Enhanced service data with descriptions and more detailed icons
const services = [
  { 
    name: 'Plumbing', 
    icon: '🔧', 
    description: 'Fix leaks, install fixtures, repair pipes' 
  },
  { 
    name: 'Cleaning', 
    icon: '🧹', 
    description: 'Home cleaning, deep cleaning, office cleaning' 
  },
  { 
    name: 'Electrician', 
    icon: '⚡', 
    description: 'Wiring, repairs, installations, maintenance' 
  },
  { 
    name: 'Painting', 
    icon: '🖌️', 
    description: 'Interior & exterior painting, touch-ups' 
  },
  { 
    name: 'Carpentry', 
    icon: '🪚', 
    description: 'Furniture repair, cabinets, woodwork' 
  },
  { 
    name: 'AC Repair', 
    icon: '❄️', 
    description: 'Installation, maintenance, repairs' 
  },
];

// Locations with metadata for better organization
const locations = [
  { name: 'Ilorin', popular: true, region: 'Central' },
  { name: 'Lagos', popular: true, region: 'Southwest' },
  { name: 'Abuja', popular: true, region: 'Central' },
  { name: 'Port Harcourt', popular: true, region: 'South' },
  { name: 'Kano', popular: false, region: 'North' },
  { name: 'Ibadan', popular: false, region: 'Southwest' },
  { name: 'Kaduna', popular: false, region: 'North' },
  { name: 'Enugu', popular: false, region: 'Southeast' },
  { name: 'Benin City', popular: false, region: 'South' },
  { name: 'Owerri', popular: false, region: 'Southeast' },
  { name: 'Warri', popular: false, region: 'South' },
  { name: 'Jos', popular: false, region: 'North' },
];

// Animation variants for cleaner animation code
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
  exit: { opacity: 0, y: -10, height: 0 }
};

const Hero = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isGlowing, setIsGlowing] = useState(true);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recentSearches')) || [];
    } catch {
      return [];
    }
  });
  
  const serviceInputRef = useRef(null);
  const locationInputRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const searchButtonRef = useRef(null);

  // Memoize popular locations for better performance
  const popularLocations = useMemo(() => 
    locations.filter(location => location.popular), 
    []
  );

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target) && 
          serviceInputRef.current && !serviceInputRef.current.contains(event.target)) {
        setIsServiceDropdownOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target) && 
          locationInputRef.current && !locationInputRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle glow effect timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsGlowing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsServiceDropdownOpen(false);
        setIsLocationDropdownOpen(false);
      } else if (e.key === 'Enter' && selectedService && selectedLocation) {
        handleSearch();
      } else if (e.key === 'Tab') {
        if (document.activeElement === serviceInputRef.current && selectedService) {
          e.preventDefault();
          locationInputRef.current?.focus();
        } else if (document.activeElement === locationInputRef.current && selectedLocation) {
          e.preventDefault();
          searchButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService, selectedLocation]);

  // Handle Service Input with improved keyword matching
  const handleServiceChange = (e) => {
    const inputValue = e.target.value;
    setSelectedService(inputValue);
    setIsServiceDropdownOpen(true);

    if (inputValue.length > 2) {
      // Try to match a keyword dynamically
      const matchedKeyword = Object.keys(keywordMapping).find((keyword) =>
        inputValue.toLowerCase().includes(keyword)
      );

      if (matchedKeyword) {
        // Don't auto-select, just filter to show the matched service
        const matchedService = keywordMapping[matchedKeyword];
        setFilteredServices(services.filter(s => s.name === matchedService));
      } else {
        // Filter services dynamically
        const filtered = services.filter((service) =>
          service.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          service.description.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredServices(filtered.length > 0 ? filtered : services);
      }
    } else {
      setFilteredServices(services);
    }
  };

  // Handle Service Selection
  const selectService = (service) => {
    setSelectedService(service.name);
    setFilteredServices([]);
    setIsServiceDropdownOpen(false);
    
    // Auto-focus location field after selection for better UX flow
    setTimeout(() => {
      if (locationInputRef.current) {
        locationInputRef.current.focus();
      }
    }, 100);
  };

  // Handle Location Input with improved filtering
  const handleLocationChange = (e) => {
    const inputValue = e.target.value;
    setSelectedLocation(inputValue);
    setIsLocationDropdownOpen(true);

    // Filter locations dynamically with fuzzy matching
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      location.region.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredLocations(filtered.length > 0 ? filtered : locations);
  };

  // Handle Location Selection
  const selectLocation = (location) => {
    setSelectedLocation(location.name);
    setFilteredLocations([]);
    setIsLocationDropdownOpen(false);
    
    // Auto-focus search button after selection
    setTimeout(() => {
      if (searchButtonRef.current) {
        searchButtonRef.current.focus();
      }
    }, 100);
  };

  // Enhanced Search Submission with analytics and history
  const handleSearch = () => {
    if (selectedService && selectedLocation) {
      // Save to recent searches
      const newSearch = {
        service: selectedService,
        location: selectedLocation,
        timestamp: new Date().toISOString()
      };
      
      const updatedSearches = [newSearch, ...recentSearches.slice(0, 4)];
      setRecentSearches(updatedSearches);
      
      try {
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      } catch (e) {
        console.error('Failed to save recent searches:', e);
      }
      
      // Navigate to search results
      navigate(`/vendor-list?service=${encodeURIComponent(selectedService)}&location=${encodeURIComponent(selectedLocation)}`);
    }
  };

  // Handle recent search selection
  const selectRecentSearch = (search) => {
    setSelectedService(search.service);
    setSelectedLocation(search.location);
    setTimeout(handleSearch, 100);
  };

  // Show popular services with improved UX
  const showPopularServices = () => {
    setIsServiceDropdownOpen(true);
    setFilteredServices(services);
    setIsLocationDropdownOpen(false);
  };

  // Show popular locations with improved UX
  const showPopularLocations = () => {
    setIsLocationDropdownOpen(true);
    setFilteredLocations(locations);
    setIsServiceDropdownOpen(false);
  };

  // Clear input fields
  const clearService = () => {
    setSelectedService('');
    setFilteredServices(services);
    setIsServiceDropdownOpen(true);
    setTimeout(() => {
      if (serviceInputRef.current) {
        serviceInputRef.current.focus();
      }
    }, 10);
  };

  const clearLocation = () => {
    setSelectedLocation('');
    setFilteredLocations(locations);
    setIsLocationDropdownOpen(true);
    setTimeout(() => {
      if (locationInputRef.current) {
        locationInputRef.current.focus();
      }
    }, 10);
  };

  return (
    <div className="py-20 pt-36 px-4 lg:py-0 lg:min-h-screen flex w-full relative bg-hero bg-no-repeat bg-cover bg-center">
      {/* Enhanced Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70"></div>

      {/* Content */}
      <div className="relative flex text-center w-full max-w-6xl mx-auto justify-center items-center flex-col text-white z-10 px-4 sm:px-6 lg:px-8">
        {/* Headline with Glow Effect */}
        <motion.h1
          className={`text-3xl xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-header leading-tight transition-all ${
            isGlowing ? 'animate-glow' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Need Help Now? Get a <span className="text-gradient">Skilled</span> <br className="hidden md:block" /> Pro in a Minute!
        </motion.h1>

        {/* Enhanced Subtext */}
        <motion.p
          className="sm:text-lg max-xs:text-sm md:text-xl lg:text-2xl text-light-gray font-semibold lg:max-w-3xl xl:max-w-4xl mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Fast, reliable and vetted professionals near you, ready to assist.
        </motion.p>

        {/* Enhanced Search Section */}
        <motion.div
          className="mt-8 bg-white/95 backdrop-blur-sm rounded-xl z-50 flex flex-col md:flex-row p-4 md:p-2 items-center max-xs:max-w-sm gap-4 shadow-xl w-full md:w-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Enhanced Service Input */}
          <div className="relative flex-1 w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdHandyman className="text-gray-500" />
              </div>
              <input
                ref={serviceInputRef}
                type="text"
                aria-label="Service search"
                className="w-full pl-10 pr-10 py-3 text-black bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-green transition-all"
                placeholder="What service do you need?"
                value={selectedService}
                onChange={handleServiceChange}
                onFocus={showPopularServices}
                autoComplete="off"
              />
              {selectedService && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={clearService}
                  type="button"
                  aria-label="Clear service"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <AnimatePresence>
              {isServiceDropdownOpen && (
                <motion.div
                  ref={serviceDropdownRef}
                  className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-64 overflow-y-auto z-50"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  {recentSearches.length > 0 && !selectedService && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 flex justify-between">
                        <span>Recent Searches</span>
                        <button 
                          className="text-green hover:underline text-xs"
                          onClick={() => {
                            setRecentSearches([]);
                            localStorage.removeItem('recentSearches');
                          }}
                        >
                          Clear
                        </button>
                      </div>
                      {recentSearches.map((search, index) => (
                        <div
                          key={`recent-${index}`}
                          className="px-4 py-2 text-gray-900 hover:bg-gray-100 cursor-pointer flex justify-between items-center transition-colors"
                          onClick={() => selectRecentSearch(search)}
                        >
                          <div className="flex items-center">
                            <span className="mr-2 text-lg">{services.find(s => s.name === search.service)?.icon || '🔍'}</span>
                            <span className="font-medium">{search.service}</span>
                            <span className="mx-2 text-gray-400">in</span>
                            <span>{search.location}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(search.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200"></div>
                    </>
                  )}
                  
                  <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">Available Services</div>
                  <ul>
                    {(filteredServices.length > 0 ? filteredServices : services).map((service, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 text-gray-900 hover:bg-gray-100 cursor-pointer flex items-center transition-colors"
                        onClick={() => selectService(service)}
                      >
                        <span className="mr-2 text-lg">{service.icon}</span>
                        <div className="flex flex-col text-left">
                          <span className="font-medium">{service.name}</span>
                          <span className="text-xs text-gray-500">{service.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Location Input */}
          <div className="relative flex-1 w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaMapMarkerAlt className="text-gray-500" />
              </div>
              <input
                ref={locationInputRef}
                type="text"
                aria-label="Location search"
                className="w-full pl-10 pr-10 py-3 text-black bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-green transition-all"
                placeholder="Select Location"
                value={selectedLocation}
                onChange={handleLocationChange}
                onFocus={showPopularLocations}
                autoComplete="off"
              />
              {selectedLocation && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={clearLocation}
                  type="button"
                  aria-label="Clear location"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <AnimatePresence>
              {isLocationDropdownOpen && (
                <motion.div
                  ref={locationDropdownRef}
                  className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-64 overflow-y-auto z-50"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  {filteredLocations.length > 0 ? (
                    <>
                      {filteredLocations.filter(location => location.popular).length > 0 && (
                        <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">Popular Locations</div>
                      )}
                      <ul>
                        {filteredLocations
                          .filter(location => location.popular)
                          .map((location, index) => (
                            <li
                              key={`popular-${index}`}
                              className="px-4 py-3 text-gray-900 hover:bg-gray-100 cursor-pointer flex items-center transition-colors"
                              onClick={() => selectLocation(location)}
                            >
                              <FaMapMarkerAlt className="mr-2 text-green" />
                              <div className="flex flex-col text-left">
                                <span className="font-medium">{location.name}</span>
                                <span className="text-xs text-gray-500">{location.region} Region</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                      
                      {filteredLocations.filter(location => !location.popular).length > 0 && (
                        <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">Other Locations</div>
                      )}
                      <ul>
                        {filteredLocations
                          .filter(location => !location.popular)
                          .map((location, index) => (
                            <li
                              key={`other-${index}`}
                              className="px-4 py-3 text-gray-900 hover:bg-gray-100 cursor-pointer flex items-center transition-colors"
                              onClick={() => selectLocation(location)}
                            >
                              <FaMapMarkerAlt className="mr-2 text-gray-400" />
                              <div className="flex flex-col text-left">
                                <span>{location.name}</span>
                                <span className="text-xs text-gray-500">{location.region} Region</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </>
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center">
                      No locations found for "{selectedLocation}"
                      <div className="text-xs mt-1">Try a different search term</div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Search Button */}
          <motion.button
            ref={searchButtonRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center px-6 py-3 bg-green text-white font-semibold rounded-lg transition-all duration-300 ${
              !selectedService || !selectedLocation 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-green-600 shadow-md hover:shadow-lg'
            }`}
            onClick={handleSearch}
            disabled={!selectedService || !selectedLocation}
            type="button"
            aria-label="Search for services"
          >
            <FaSearch className="mr-2" /> Search
          </motion.button>
        </motion.div>
        
        {/* Service Categories Quick Access */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {services.slice(0, 4).map((service, index) => (
            <motion.button
              key={index}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedService(service.name);
                setIsServiceDropdownOpen(false);
                setTimeout(() => {
                  if (locationInputRef.current) {
                    locationInputRef.current.focus();
                  }
                }, 100);
              }}
            >
              <span className="mr-2">{service.icon}</span>
              {service.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;