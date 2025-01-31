import React, { useState } from "react";
import { motion } from "framer-motion"; // Animation library
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5"; // Icons

const HeroSection = () => {
  // State for dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Dummy service & location data
  const services = ["Cleaning", "Plumbing", "Painting", "Electrical", "Carpentry"];
  const locations = ["Ilorin", "Lagos", "Abuja", "Port Harcourt", "Kano"];

  return (
    <section className="relative bg-cover bg-center max-lg:py-40 lg:h-[85vh] flex items-center px-0 justify-center text-center text-white bg-hero"
    >
      <div className="bg-black bg-opacity-50 absolute inset-0"></div> {/* Dark overlay */}

      <div className="relative z-10 max-w-3xl mx-auto px-5">
        {/* Animated Headline */}
        <motion.h1
          className="text-3xl xs:text-4xl lg:text-5xl font-header font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)" }}
        >
          Find Trusted <span className="text-gradient">Professionals</span> for Your Needs
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-4 text-lg text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Book top-rated experts in cleaning, plumbing, painting, and more.
        </motion.p>

        {/* Search Bar with Dropdown */}
        <motion.div
          className="mt-8 flex items-center max-md:flex-col justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* Input Field */}
          <div className="relative w-72 md:w-96">
            <input
              type="text"
              placeholder="What service do you need?"
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              value={selectedService}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => setSelectedService(e.target.value)}
            />
            <IoSearchOutline className="absolute right-3 top-3 text-gray-400 text-xl" />
            {/* Dropdown */}
            {showDropdown && (
              <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 overflow-hidden">
                {services
                  .filter((service) =>
                    service.toLowerCase().includes(selectedService.toLowerCase())
                  )
                  .map((service, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-gray-900 hover:bg-yellow-100 cursor-pointer"
                      onClick={() => {
                        setSelectedService(service);
                        setShowDropdown(false);
                      }}
                    >
                      {service}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="relative w-72 md:w-40">
            <select
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <IoLocationOutline className="absolute right-3 top-3 text-gray-400 text-xl" />
          </div>

          {/* Search Button */}
          <motion.button
            className="btn max-md:w-72 bg-blue-500 text-white  font-semibold shadow-lg  transition-all"
            whileHover={{ scale: 1.05, opacity:0.7 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;