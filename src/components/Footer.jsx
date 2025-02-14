import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-10">
          
          {/* Branding Section */}
          <div>
            <h2 className="text-2xl font-header font-bold text-gradient">ServiJoy</h2>
            <p className="text-gray-400 mt-3 text-sm">
              Connecting you with trusted service providers effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 max-sm:text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition">How It Works</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition">Services</Link></li>
              <li><Link to="faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link to="/become-a-vendor" className="text-gray-400 hover:text-white transition">Become a Vendor</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition">Test Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-gray-400">📍 Ilorin, Nigeria</li>
              <li className="text-gray-400">📧 support@servijoy.com</li>
              <li className="text-gray-400">📞 +234 800 000 0000</li>
            </ul>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn size={18} />
              </a>
            </div>

          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="text-center text-gray-500 text-sm pt-6">
          © {new Date().getFullYear()} ServiJoy. All Rights Reserved.  
          <span className="mx-3">|</span>  
          <Link to="/terms" className="hover:text-white transition">Terms of Use</Link>  
          <span className="mx-3">|</span>  
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;
