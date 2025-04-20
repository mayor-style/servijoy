import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogIn } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const servicesRef = useRef(null);
  const userMenuRef = useRef(null);
  
  // Navigation links with icons and nested menus
  const links = [
    { name: "About Us", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { 
      name: "Services", 
      path: "/services",
    },
    { name: "FAQ", path: "/faq" },
  ];

  // Handle scroll effect with threshold
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-lg py-2 shadow-lg shadow-blue-900/5" 
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo with animation */}
        <Link 
          to="/"
          className="flex items-center group"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-header font-bold text-3xl relative z-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 group-hover:from-blue-700 group-hover:to-teal-600 transition-all duration-300">
                Servi
              </span>
              <span className="text-gray-800">Joy</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-teal-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Navigation Links */}
          <ul className="flex space-x-8 items-center">
            {links.map((link, index) => (
              <li key={index} className="relative" ref={link.hasSubmenu ? servicesRef : null}>
                {link.hasSubmenu ? (
                  <div className="relative">
                    <button 
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex items-center py-2 text-base font-medium transition-colors duration-300 group ${
                        isActive(link.path) 
                          ? "text-blue-600" 
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {link.name}
                      <FiChevronDown className={`ml-1 transition-transform duration-200 ${servicesOpen ? "transform rotate-180" : ""}`} />
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                          isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      ></span>
                    </button>
                    
                    {/* Services Dropdown */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-white rounded-xl shadow-xl shadow-blue-900/10 border border-gray-100 min-w-48"
                        >
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45"></div>
                          {link.submenu.map((subItem, subIndex) => (
                            <Link 
                              key={subIndex}
                              to={subItem.path}
                              className={`block px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                                isActive(subItem.path)
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link 
                    to={link.path}
                    className={`relative py-2 text-base font-medium transition-colors duration-300 group ${
                      isActive(link.path) 
                        ? "text-blue-600" 
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                        isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Authentication and Sign-Up */}
          <div className="flex items-center space-x-4" ref={userMenuRef}>
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors duration-200"
              >
                <FiUser className="text-blue-600" />
                <span>Account</span>
                <FiChevronDown className={`ml-1 transition-transform duration-200 ${userMenuOpen ? "transform rotate-180" : ""}`} />
              </button>
              
              {/* User Menu Dropdown */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 p-2 bg-white rounded-xl shadow-xl shadow-blue-900/10 border border-gray-100 min-w-48"
                  >
                    <div className="absolute top-0 right-4 transform -translate-y-1/2 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45"></div>
                    <Link 
                      to="/login-signup"
                      className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      <FiLogIn className="text-gray-500" />
                      <span>Log In</span>
                    </Link>
                    <Link 
                      to="/login-signup"
                      className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      <FiUser className="text-gray-500" />
                      <span>Sign Up</span>
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <Link 
                      to="/help"
                      className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      <span>Help Center</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link 
              to="/become-a-vendor"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:from-blue-700 hover:to-teal-600 flex items-center"
            >
              <span>Become a Vendor</span>
              <span className="ml-1 w-4 h-4 flex items-center justify-center bg-white bg-opacity-20 rounded-full text-xs">+</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX className="text-2xl text-gray-800" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiMenu className="text-2xl text-gray-800" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
            onClick={() => setIsOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl z-40 lg:hidden overflow-y-auto"
          >
            {/* Mobile Menu Content */}
            <div className="flex flex-col h-full p-6">
              {/* Mobile Brand */}
              <div className="flex items-center justify-center mb-8 mt-6">
                <h2 className="font-header font-bold text-2xl">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                    Servi
                  </span>
                  <span className="text-gray-800">Joy</span>
                </h2>
              </div>
              
              {/* Mobile Navigation Links */}
              <ul className="flex flex-col space-y-1 mb-8">
                {links.map((link, index) => (
                  <li key={index}>
                    {link.hasSubmenu ? (
                      <div className="mb-2">
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className={`flex items-center justify-between w-full py-2.5 px-4 rounded-lg text-base font-medium transition-colors duration-200 ${
                            isActive(link.path)
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          }`}
                        >
                          <span>{link.name}</span>
                          <FiChevronDown className={`ml-1 transition-transform duration-200 ${servicesOpen ? "transform rotate-180" : ""}`} />
                        </button>
                        
                        {/* Mobile Services Submenu */}
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-4 mt-1"
                            >
                              {link.submenu.map((subItem, subIndex) => (
                                <Link 
                                  key={subIndex}
                                  to={subItem.path}
                                  className={`block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                    isActive(subItem.path)
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block py-2.5 px-4 rounded-lg text-base font-medium transition-colors duration-200 ${
                          isActive(link.path)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Mobile Authentication Buttons */}
              <div className="mt-auto mb-8 space-y-4">
                <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50">
                  <Link
                    to="/login-signup"
                    className="py-2.5 px-5 w-full text-center rounded-lg bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                  >
                    <FiLogIn className="mr-2 text-blue-600" />
                    <span>Log In</span>
                  </Link>
                  <Link
                    to="/login-signup"
                    className="py-2.5 px-5 w-full text-center rounded-lg bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                  >
                    <FiUser className="mr-2 text-blue-600" />
                    <span>Sign Up</span>
                  </Link>
                </div>
                <Link
                  to="/become-a-vendor"
                  className="block py-3 w-full text-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Become a Vendor
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;