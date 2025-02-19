import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const DashboardFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 space-y-4 md:space-y-0">
        {/* Branding & Copyright */}
        <p className="sm:text-sm text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-blue-500 font-semibold">ServiJoy</span>. All rights reserved.
        </p>
        
        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a href="#" className="cursor-pointer hover:text-blue-500 transition transform hover:scale-110">
            <FaFacebookF className="text-lg sm:text-xl" />
          </a>
          <a href="#" className="cursor-pointer hover:text-blue-500 transition transform hover:scale-110">
            <FaTwitter className="text-lg sm:text-xl" />
          </a>
          <a href="#" className="cursor-pointer hover:text-blue-500 transition transform hover:scale-110">
            <FaInstagram className="text-lg sm:text-xl" />
          </a>
          <a href="#" className="cursor-pointer hover:text-blue-500 transition transform hover:scale-110">
            <FaLinkedinIn className="text-lg sm:text-xl" />
          </a>
        </div>
        
        {/* Quick Links */}
        <div className="flex space-x-6 text-xs sm:text-sm">
          <a href="#" className="cursor-pointer hover:text-blue-500 transition transform hover:scale-105">
            Privacy Policy
          </a>
          <a href="#" className="cursor-pointer hover:text-blue-500 transition transform hover:scale-105">
            Terms of Use
          </a>
          <a href="#" className="cursor-pointer hover:text-blue-500 transition transform hover:scale-105">
            Help Center
          </a>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
