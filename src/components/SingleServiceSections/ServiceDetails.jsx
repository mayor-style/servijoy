import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaStar, 
  FaUsers, 
  FaLeaf, 
  FaClock, 
  FaWallet,
  FaPhoneAlt,
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa";

const ServiceDetails = () => {
  const [activeTab, setActiveTab] = useState("features");
  
  // Staggered animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Benefits data with expanded details
  const benefits = [
    {
      id: 1,
      icon: <FaUsers className="text-green" />, // plain green
      title: "Skilled Professionals",
      description: "Background-checked and trained cleaning experts with 5+ years experience",
      highlight: "Top 1% Cleaners",
    },
    {
      id: 2,
      icon: <FaLeaf className="text-green" />,
      title: "Eco-Friendly Products",
      description: "Non-toxic, sustainable cleaning solutions safe for kids and pets",
      highlight: "100% Safe",
    },
    {
      id: 3,
      icon: <FaClock className="text-green" />,
      title: "Flexible Scheduling",
      description: "Book same-day or in advance with 24/7 online scheduling system",
      highlight: "Same-Day Available",
    },
    {
      id: 4,
      icon: <FaWallet className="text-green" />,
      title: "Transparent Pricing",
      description: "No hidden fees with customizable cleaning packages for every budget",
      highlight: "Best Value",
    },
  ];

  // Service features for tab content
  const features = [
    "Deep cleaning of all rooms and surfaces",
    "Special attention to kitchens and bathrooms",
    "Window cleaning and blind dusting",
    "Carpet and upholstery treatment",
    "Disinfection of high-touch surfaces",
    "Customizable cleaning checklist",
  ];

  // Customer reviews for tab content
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "The cleaning team was professional and thorough. My house hasn't been this clean in years!",
      date: "2 days ago",
    },
    {
      name: "Michael Thomas",
      rating: 5,
      comment:
        "Punctual, efficient, and went beyond my expectations. Will definitely book again.",
      date: "1 week ago",
    },
    {
      name: "Aisha Peterson",
      rating: 4,
      comment:
        "Great service overall. The eco-friendly products left my home smelling fresh without harsh chemicals.",
      date: "3 weeks ago",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-green/10 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-12 -left-24 w-80 h-80 bg-blue/10 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Service header with animated badge */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-green/10 text-green text-sm font-medium mb-4">
              Premium Service
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Experience the Best in{" "}
              <span className="relative">
                <span className="px-2 relative z-10 text-white">
                  <span className="bg-gradient-to-r from-green/50 to-green/60 absolute inset-0 transform -skew-x-6"></span>
                  <span className="relative">Premium Cleaning</span>
                </span>
              </span>
            </h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 w-24 bg-green/50 mx-auto my-6"
              style={{ transformOrigin: "left" }}
            ></motion.div>
            
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              Our expert cleaners provide deep, thorough, and reliable cleaning services
              tailored to your exact specifications. Using only premium eco-friendly products
              and advanced techniques, we ensure your space is not just clean, but truly healthy.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left Side: Service Details with Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-7/12"
          >
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-8">
              {["features", "process", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-base transition-colors duration-300 ${
                    activeTab === tab
                      ? "text-green/60 border-b-2 border-green/50"
                      : "text-gray-600 hover:text-green/50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {/* Features Tab */}
              {activeTab === "features" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Service Features
                  </h3>
                  <div className="grid gap-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaCheckCircle className="text-green/50 flex-shrink-0" />
                        <p className="text-gray-700">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 bg-green/10 p-6 rounded-lg border-l-4 border-green/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-full shadow-md">
                        <FaShieldAlt className="text-green/50 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Satisfaction Guarantee
                        </h4>
                        <p className="text-gray-600">
                          Not happy with the results? We'll come back and reclean at no additional cost.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Process Tab */}
              {activeTab === "process" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Our Cleaning Process
                  </h3>
                  <div className="space-y-6">
                    {[
                      { step: 1, title: "Initial Assessment", desc: "We evaluate your space and identify specific areas that need attention" },
                      { step: 2, title: "Customized Plan", desc: "We create a cleaning plan tailored to your specific needs and preferences" },
                      { step: 3, title: "Deep Cleaning", desc: "Our experts clean thoroughly using our proven systematic approach" },
                      { step: 4, title: "Final Inspection", desc: "We conduct a final walkthrough to ensure everything meets our standards" }
                    ].map((process) => (
                      <motion.div
                        key={process.step}
                        variants={itemVariants}
                        className="flex gap-4"
                      >
                        <div className="h-10 w-10 rounded-full bg-green/50 text-white flex items-center justify-center font-bold flex-shrink-0">
                          {process.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {process.title}
                          </h4>
                          <p className="text-gray-600">{process.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-800">4.8</span>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i === 4 ? "text-gray-300" : ""} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-800">
                            {review.name}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex text-yellow-500 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i >= review.rating ? "text-gray-300" : ""} />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <a
                      href="#all-reviews"
                      className="text-green/60 font-medium inline-flex items-center hover:text-green/70"
                    >
                      View all 48 reviews <FaArrowRight className="ml-2" />
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button className="px-8 py-3 bg-green/50 hover:bg-green/60 text-white font-semibold rounded-lg shadow-lg hover:shadow-green/20 transition duration-300 flex items-center">
                Book Now <FaArrowRight className="ml-2" />
              </button>
              <button className="px-8 py-3 bg-transparent border border-green/50 text-green/70 hover:bg-green/40 font-semibold rounded-lg transition duration-300 flex items-center">
                <FaPhoneAlt className="mr-2" /> Get a Quote
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Key Benefits */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-5/12"
          >
            <div className="grid gap-6">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green/50 group relative overflow-hidden"
                >
                  {/* Background pattern */}
                  <div className="absolute right-0 bottom-0 w-24 h-24 opacity-5 transform rotate-12 group-hover:rotate-6 transition-transform duration-700">
                    {benefit.icon}
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-green/10 text-green/70 text-xs font-medium rounded">
                    {benefit.highlight}
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green/10 rounded-xl">
                      {React.cloneElement(benefit.icon, { className: "text-green/60 text-2xl" })}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-gradient-to-br from-green/10 to-blue/10 p-8 rounded-2xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 opacity-10 text-9xl">
                <FaStar />
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-yellow-500 text-4xl">"</div>
                <div>
                  <p className="text-gray-700 italic mb-4">
                    I've tried several cleaning services in the city, but this team is by far the most professional and detail-oriented. My home feels completely transformed after each visit!
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-green/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-green/60">JD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Jessica Davis</h4>
                      <p className="text-sm text-gray-500">Loyal Customer • 2+ Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
