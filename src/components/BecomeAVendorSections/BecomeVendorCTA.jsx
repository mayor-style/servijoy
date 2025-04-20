import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket, FaInfoCircle, FaCheck, FaUserTie, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";

const BecomeVendorCTA = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Parallax effect for background elements
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollDifference = scrollPosition - sectionTop + window.innerHeight;
      
      // Only apply effect when section is in view
      if (scrollDifference > 0 && scrollPosition < sectionTop + sectionRef.current.offsetHeight) {
        const circles = sectionRef.current.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
          const speed = 0.05 + (index * 0.02);
          circle.style.transform = `translateY(${scrollDifference * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Benefits data
  const benefits = [
    { icon: <FaUserTie />, text: "Build Your Brand" },
    { icon: <FaMoneyBillWave />, text: "Increase Revenue" },
    { icon: <FaShieldAlt />, text: "Verified Platform" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circle absolute w-64 h-64 rounded-full bg-blue-400 opacity-10 -top-20 -left-20"></div>
        <div className="floating-circle absolute w-96 h-96 rounded-full bg-blue-300 opacity-5 bottom-0 right-0 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="floating-circle absolute w-40 h-40 rounded-full bg-blue-200 opacity-10 top-1/2 left-1/4"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-blue-900 bg-opacity-50 rounded-full mb-6"
            >
              <span className="text-blue-200 text-sm font-medium flex items-center">
                <FaRocket className="mr-2" /> FOR SERVICE PROVIDERS
              </span>
            </motion.div>
            
            {/* Heading with gradient text */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-white">Elevate Your Business,</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-green-300">
                Unlock More Opportunities
              </span>
            </h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-blue-100 mt-6 max-w-xl"
            >
              Join Nigeria's most trusted service platform and grow your income. 
              Get more bookings, build credibility, and stand out in your field.
            </motion.p>

            {/* Benefits */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2"
                >
                  <span className="text-green-300 mr-2">{benefit.icon}</span>
                  <span className="text-white text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/become-a-vendor")}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-500/30 transition duration-300 flex items-center"
              >
                Start Now <FaRocket className="ml-2" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/how-it-works")}
                className="px-8 py-3 bg-blue-900 border border-blue-400 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition duration-300 flex items-center"
              >
                Learn More <FaInfoCircle className="ml-2" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right content - Statistics Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:w-5/12"
          >
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 border-opacity-20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Why Join ServiJoy?</h3>
              
              <div className="space-y-5">
                {[
                  { number: "30%", text: "Average income increase for vendors" },
                  { number: "1000+", text: "Active service providers" },
                  { number: "24/7", text: "Support for all vendors" },
                  { number: "15K+", text: "Monthly customer requests" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 bg-opacity-30 rounded-lg mr-4">
                      <span className="text-green-300 font-bold">{stat.number}</span>
                    </div>
                    <p className="text-blue-100">{stat.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 pt-6 border-t border-blue-200 border-opacity-20"
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(num => (
                      <div key={num} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-blue-900 overflow-hidden">
                        <img src={`/api/placeholder/${32}/${32}`} alt="Vendor" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="ml-3 text-blue-100 text-sm">Join 1000+ service providers already on ServiJoy</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BecomeVendorCTA;