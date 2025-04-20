import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { user, login } = useAuth();
  const currentYear = new Date().getFullYear();

  const handleRoleChange = (role) => {
    login({ ...user, role });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Footer Logo and Tagline */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-header font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            ServiJoy
          </h2>
          <p className="text-gray-300 mt-3 text-center max-w-md">
            Connecting you with trusted service providers effortlessly.
          </p>
          
          {/* Social Media Icons - Top Placement */}
          <div className="flex space-x-6 mt-6">
            {[
              { icon: <FaFacebookF size={20} />, href: "https://facebook.com" },
              { icon: <FaInstagram size={20} />, href: "https://instagram.com" },
              { icon: <FaTwitter size={20} />, href: "https://twitter.com" },
              { icon: <FaLinkedinIn size={20} />, href: "https://linkedin.com" }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300 p-2 bg-gray-800 rounded-full"
                aria-label={`Visit our ${social.href.split("https://")[1]}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-b border-gray-800 py-12">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white relative pb-3 mb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-500">
              About
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              ServiJoy is a platform dedicated to connecting customers with qualified, verified service providers across Nigeria, making service discovery and booking seamless.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white relative pb-3 mb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-500">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "How It Works", path: "/how-it-works" },
                { name: "Services", path: "/services" },
                { name: "FAQ", path: "/faq" },
                { name: "Become a Vendor", path: "/become-a-vendor" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center text-sm"
                  >
                    <span className="text-blue-400 mr-2">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white relative pb-3 mb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-500">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {[
                { icon: <FaMapMarkerAlt />, text: "Ilorin, Nigeria", color: "text-blue-400" },
                { icon: <FaEnvelope />, text: "support@servijoy.com", color: "text-teal-400" },
                { icon: <FaPhone />, text: "+234 800 000 0000", color: "text-green-400" }
              ].map((contact, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className={`${contact.color} mr-3`}>{contact.icon}</span>
                  <span className="text-gray-300">{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white relative pb-3 mb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-500">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates on new services and offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Development Tools Section - Separated and Styled Differently */}
        <div className="my-8 p-4 bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
            <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
            Development Testing Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "User Dashboard", role: "user" },
              { name: "Vendor Dashboard", role: "vendor" }, 
              { name: "Admin Dashboard", role: "admin", path: "/admin/dashboard" }
            ].map((option, index) => (
              <Link 
                key={index}
                to={option.path || "/dashboard"}
                onClick={() => handleRoleChange(option.role)}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-gray-300 hover:text-white transition-colors duration-200"
              >
                Test {option.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="text-center text-gray-500 text-sm pt-6 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0">
          <span>© {currentYear} ServiJoy. All Rights Reserved.</span>
          <div className="md:ml-4 flex items-center">
            {[
              { name: "Terms of Use", path: "/terms" },
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Cookie Policy", path: "/cookies" }
            ].map((link, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-2">•</span>}
                <Link to={link.path} className="hover:text-white transition-colors duration-300">
                  {link.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;