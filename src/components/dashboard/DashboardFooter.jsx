import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdKeyboardArrowUp, MdOutlinePolicy, MdGavel, MdHelpOutline } from "react-icons/md";

const DashboardFooter = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position for the scroll-to-top button
  useState(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubmitted(true);
      setEmail("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 800);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and About Section */}
          <div className="md:col-span-4 flex flex-col">
            <Link to="/dashboard" className="inline-block">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                ServiJoy
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Connecting service providers with clients through a seamless, 
              trustworthy platform. Experience joy in every service.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <SocialIcon Icon={FaFacebookF} label="Facebook" color="bg-blue-500" />
              <SocialIcon Icon={FaTwitter} label="Twitter" color="bg-blue-400" />
              <SocialIcon Icon={FaInstagram} label="Instagram" color="bg-gradient-to-r from-purple-500 to-pink-500" />
              <SocialIcon Icon={FaLinkedinIn} label="LinkedIn" color="bg-blue-600" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/press">Press</FooterLink>
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <FooterLink to="/help" icon={<MdHelpOutline />}>Help Center</FooterLink>
              <FooterLink to="/terms" icon={<MdGavel />}>Terms of Service</FooterLink>
              <FooterLink to="/privacy" icon={<MdOutlinePolicy />}>Privacy Policy</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </div>
          
          {/* Newsletter Section */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            
            <form onSubmit={handleSubscribe} className="mt-2">
              <div className="relative max-w-xs">
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-3 text-gray-500 dark:text-gray-400">
                    <MdEmail />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email"
                    className="block w-full rounded-r-md border-gray-300 dark:border-gray-600 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-medium rounded-md text-sm px-5 py-2 flex items-center justify-center transition-colors duration-200"
                >
                  {isSubscribing ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Subscribe"}
                </button>
                
                {isSubmitted && (
                  <div className="absolute -bottom-8 left-0 text-green-500 text-sm animate-fade-in">
                    Thanks for subscribing!
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              &copy; {currentYear} ServiJoy. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-3 md:mt-0">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Made with ❤️ for service providers and clients
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        className={`fixed right-6 bottom-20 p-2 rounded-full bg-blue-500 text-white shadow-lg transform transition-all duration-300 hover:bg-blue-600 z-40 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <MdKeyboardArrowUp className="text-xl" />
      </button>
    </footer>
  );
};

// Helper components
const SocialIcon = ({ Icon, label, color }) => (
  <a 
    href="#" 
    className="group cursor-pointer" 
    aria-label={label}
  >
    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:${color} group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1`}>
      <Icon className="text-lg" />
    </div>
  </a>
);

const FooterLink = ({ to, children, icon }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 text-sm"
    >
      {icon && icon}
      {children}
    </Link>
  </li>
);

export default DashboardFooter;