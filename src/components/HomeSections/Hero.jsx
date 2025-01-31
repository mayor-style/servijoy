import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Fuzzy Keyword Mapping
const keywordMapping = {
  cleaner: 'Cleaning',
  plumber: 'Plumbing',
  electrician: 'Electrician',
  painter: 'Painting',
  carpenter: 'Carpentry',
  ac: 'AC Repair',
  acrepair: 'AC Repair',
};

// Available Services & Locations
const services = ['Plumbing', 'Cleaning', 'Electrician', 'Painting', 'Carpentry', 'AC Repair'];
const locations = ['Ilorin', 'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'];

const Hero = () => {
  const [selectedService, setSelectedService] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isGlowing, setIsGlowing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsGlowing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle Service Input
  const handleServiceChange = (e) => {
    let inputValue = e.target.value;
    setSelectedService(inputValue);

    // Try to match a keyword dynamically
    const matchedKeyword = Object.keys(keywordMapping).find((keyword) =>
      inputValue.toLowerCase().includes(keyword)
    );

    if (matchedKeyword) {
      setSelectedService(keywordMapping[matchedKeyword]);
      setFilteredServices([]);
    } else {
      // Filter services dynamically
      const filtered = services.filter((service) =>
        service.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  // Handle Service Selection
  const selectService = (service) => {
    setSelectedService(service);
    setFilteredServices([]);
  };

  // Handle Location Input
  const handleLocationChange = (e) => {
    let inputValue = e.target.value;
    setSelectedLocation(inputValue);

    // Filter locations dynamically
    const filtered = locations.filter((location) =>
      location.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  // Handle Location Selection
  const selectLocation = (location) => {
    setSelectedLocation(location);
    setFilteredLocations([]);
  };

  return (
    <div className="py-[170px] lg:py-0 lg:min-h-[90vh] flex w-full relative bg-hero bg-no-repeat bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative flex text-center w-full m-auto justify-center items-center flex-col text-white z-10 xs:px-5 md:px-10">

        {/* Headline with Glow Effect */}
        <motion.h1
          className={`text-3xl xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-header leading-tight transition-all ${
            isGlowing ? 'animate-glow' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Find the Best <span className="text-gradient">Professional</span> <br className="hidden md:block" /> in Your Area
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="sm:text-lg max-xs:text-sm md:text-xl lg:text-2xl text-light-gray font-semibold lg:max-w-3xl xl:max-w-4xl mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Reliable, vetted, and ready to help with all your needs.
        </motion.p>

        {/* Search Section */}
        <motion.div
          className="mt-8 bg-white max-sm:text-sm rounded-xl flex flex-col md:flex-row p-4 md:p-2 items-center max-xs:max-w-sm gap-4 shadow-lg w-full md:w-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >

          {/* Service Input */}
          <div className="relative flex-1 w-full md:w-64">
            <input
              type="text"
              className="w-full px-4 py-3 text-black bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What service do you need?"
              value={selectedService}
              onChange={handleServiceChange}
            />
            {filteredServices.length > 0 && (
              <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-y-auto z-50">
                {filteredServices.map((service, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-gray-900 hover:bg-blue-100 cursor-pointer"
                    onClick={() => selectService(service)}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location Input */}
          <div className="relative flex-1 w-full md:w-64">
            <input
              type="text"
              className="w-full px-4 py-3 text-black bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select Location"
              value={selectedLocation}
              onChange={handleLocationChange}
            />
            {filteredLocations.length > 0 && (
              <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-y-auto z-50">
                {filteredLocations.map((location, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-gray-900 hover:bg-blue-100 cursor-pointer"
                    onClick={() => selectLocation(location)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/services?category=${selectedService}&location=${selectedLocation}`}
              className={`flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition ${
                !selectedService || !selectedLocation ? 'opacity-50 pointer-events-none' : 'hover:bg-blue-600'
              }`}
            >
              <FaSearch className="mr-2" /> Search
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
