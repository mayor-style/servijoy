import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaClipboardCheck, 
  FaHandshake, 
  FaSmile, 
  FaUserCheck, 
  FaBriefcase, 
  FaTools, 
  FaStar,
  FaArrowRight
} from "react-icons/fa";

// User steps data with enhanced descriptions
const userSteps = [
  {
    id: 1,
    icon: <FaSearch size={24} />,
    title: "Find the Right Service",
    description: "Browse through our verified professionals to find the perfect match for your specific needs.",
    color: "from-emerald-400 to-emerald-500",
    lightColor: "emerald-50",
    darkColor: "emerald-500",
    hoverColor: "emerald-100"
  },
  {
    id: 2,
    icon: <FaClipboardCheck size={24} />,
    title: "Book & Confirm",
    description: "Select your service, schedule a convenient time, and confirm your booking with our secure system.",
    color: "from-blue-400 to-blue-500",
    lightColor: "blue-50",
    darkColor: "blue-500",
    hoverColor: "blue-100"
  },
  {
    id: 3,
    icon: <FaHandshake size={24} />,
    title: "Service Execution",
    description: "Our vetted professionals deliver top-tier services directly to your doorstep or preferred location.",
    color: "from-violet-400 to-violet-500",
    lightColor: "violet-50",
    darkColor: "violet-500",
    hoverColor: "violet-100"
  },
  {
    id: 4,
    icon: <FaSmile size={24} />,
    title: "Payment & Review",
    description: "Securely pay through our platform and share your experience to help others make informed decisions.",
    color: "from-teal-400 to-teal-500",
    lightColor: "teal-50",
    darkColor: "teal-500",
    hoverColor: "teal-100"
  },
];

// Vendor steps data with enhanced descriptions
const vendorSteps = [
  {
    id: 1,
    icon: <FaUserCheck size={24} />,
    title: "Sign Up & Verify",
    description: "Create your professional profile and complete our verification process to establish credibility.",
    color: "from-amber-400 to-amber-500",
    lightColor: "amber-50",
    darkColor: "amber-500",
    hoverColor: "amber-100"
  },
  {
    id: 2,
    icon: <FaBriefcase size={24} />,
    title: "Get Hired",
    description: "Receive and accept job requests that match your skills and availability through our intuitive platform.",
    color: "from-indigo-400 to-indigo-500",
    lightColor: "indigo-50",
    darkColor: "indigo-500",
    hoverColor: "indigo-100"
  },
  {
    id: 3,
    icon: <FaTools size={24} />,
    title: "Complete the Job",
    description: "Deliver exceptional service quality to build your reputation and create a loyal customer base.",
    color: "from-fuchsia-400 to-fuchsia-500",
    lightColor: "fuchsia-50",
    darkColor: "fuchsia-500",
    hoverColor: "fuchsia-100"
  },
  {
    id: 4,
    icon: <FaStar size={24} />,
    title: "Get Paid & Reviewed",
    description: "Receive secure payments and build your credibility through verified customer reviews and ratings.",
    color: "from-cyan-400 to-cyan-500",
    lightColor: "cyan-50",
    darkColor: "cyan-500",
    hoverColor: "cyan-100"
  },
];

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12, 
      duration: 0.6 
    } 
  },
};

const tabVariants = {
  inactive: { opacity: 0.85, scale: 0.98 },
  active: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20, 
      duration: 0.4 
    } 
  },
};

const stepBadgeVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    } 
  },
  hover: { 
    scale: 1.1, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
};

// Enhanced connecting path for step visualization
const ConnectingPath = ({ inView, activeTab }) => {
  const pathControls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      pathControls.start({
        pathLength: 1,
        transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 }
      });
    } else {
      pathControls.start({ pathLength: 0 });
    }
  }, [inView, pathControls]);

  const pathColor = activeTab === "users" ? "#10B981" : "#3B82F6";

  return (
    <div className="hidden lg:block absolute top-1/2 left-0 right-0 z-0 h-12 w-full">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1200 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={pathControls}
          d="M50 25 H1150"
          stroke={pathColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 8"
          className="opacity-70"
        />

        {/* Circle markers for each step */}
        {[150, 450, 750, 1050].map((position, index) => (
          <motion.circle
            key={index}
            cx={position}
            cy="25"
            r="6"
            fill={pathColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                delay: 0.5 + (index * 0.3), 
                duration: 0.5, 
                type: "spring" 
              }
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const HowItWorkSteps = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [loaded, setLoaded] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const headerControls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    setLoaded(true);
    if (inView) {
      headerControls.start({ opacity: 1, y: 0 });
      contentControls.start({ opacity: 1, y: 0 });
    }
  }, [inView, headerControls, contentControls]);

  const activeSteps = activeTab === "users" ? userSteps : vendorSteps;
  const gradientColor = activeTab === "users" ? "from-emerald-500 to-teal-500" : "from-blue-500 to-indigo-500";
  const shadowColor = activeTab === "users" ? "emerald-200" : "blue-200";

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute h-64 w-64 rounded-full bg-emerald-100 blur-3xl -top-32 -left-32 opacity-30"></div>
      <div className="absolute h-64 w-64 rounded-full bg-blue-100 blur-3xl -bottom-32 -right-32 opacity-30"></div>
      <div className="absolute h-32 w-32 rounded-full bg-violet-100 blur-3xl top-1/2 left-1/4 opacity-20"></div>
      <div className="absolute h-32 w-32 rounded-full bg-amber-100 blur-3xl bottom-1/4 right-1/3 opacity-20"></div>
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Connecting path between steps */}
      <ConnectingPath inView={inView} activeTab={activeTab} />

      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title & Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={headerControls}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.span 
            className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${gradientColor} bg-opacity-10 text-sm font-medium text-gray-800 shadow-sm mb-4`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Seamless 4-Step Process
          </motion.span>
          <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradientColor}`}>
            How ServiJoy Works
          </h2>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Our streamlined process ensures a smooth experience whether you're seeking services
            or offering your professional expertise.
          </p>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={contentControls}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === "users" ? "active" : "inactive"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative px-8 py-3.5 rounded-xl font-medium flex items-center justify-center transition-all duration-300 ${
              activeTab === "users" 
                ? `bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200` 
                : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-200"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              activeTab === "users" ? "bg-white/20" : "bg-emerald-100"
            } mr-3`}>
              <FaSearch size={18} className={activeTab === "users" ? "text-white" : "text-emerald-500"} />
            </div>
            For Customers
            {activeTab === "users" && (
              <motion.span
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                style={{ bottom: "-3px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
          
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === "vendors" ? "active" : "inactive"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative px-8 py-3.5 rounded-xl font-medium flex items-center justify-center transition-all duration-300 ${
              activeTab === "vendors" 
                ? `bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200` 
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200"
            }`}
            onClick={() => setActiveTab("vendors")}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              activeTab === "vendors" ? "bg-white/20" : "bg-blue-100"
            } mr-3`}>
              <FaTools size={18} className={activeTab === "vendors" ? "text-white" : "text-blue-500"} />
            </div>
            For Vendors
            {activeTab === "vendors" && (
              <motion.span
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                style={{ bottom: "-3px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Enhanced Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={inView && loaded ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {activeSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onHoverStart={() => setHoveredStep(step.id)}
                  onHoverEnd={() => setHoveredStep(null)}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Top colored border based on step */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${step.color}`}></div>
                  
                  <div className="p-8">
                    {/* Step number badge */}
                    <motion.div
                      variants={stepBadgeVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br ${step.color} shadow-md`}
                    >
                      {step.id}
                    </motion.div>
                    
                    {/* Icon with enhanced animation */}
                    <motion.div 
                      className={`flex justify-center items-center w-16 h-16 rounded-full mb-6 mx-auto bg-${step.lightColor} text-${step.darkColor} group-hover:bg-${step.hoverColor} transition-colors duration-300`}
                      animate={hoveredStep === step.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {React.cloneElement(step.icon, { 
                        className: `text-${step.darkColor}` 
                      })}
                    </motion.div>
                    
                    {/* Content with enhanced typography */}
                    <h3 className="font-bold text-xl text-gray-800 text-center mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                    
                    {/* Animated arrow to next step (except last step) */}
                    {index < activeSteps.length - 1 && (
                      <motion.div
                        className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:flex"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      >
                        <FaArrowRight size={20} className={`text-${step.darkColor} opacity-50`} />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Enhanced decoration for visual interest */}
                  <div 
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ 
                      background: `radial-gradient(circle, var(--tw-gradient-from) 0%, rgba(0,0,0,0) 70%)` 
                    }}
                  ></div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Enhanced Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
          className="text-center mt-20"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Ready to {activeTab === "users" ? "discover quality services" : "grow your business"}?
          </p>
          <motion.button 
            className={`px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 ${
              activeTab === "users"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-200"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="flex items-center">
              {activeTab === "users" ? "Explore Services" : "Become a Vendor"}
              <FaArrowRight className="ml-2" size={18} />
            </span>
          </motion.button>
          
          {/* Added social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 flex justify-center items-center gap-2 text-gray-500 text-sm"
          >
            <span>Trusted by 10,000+ customers</span>
            <span>•</span>
            <span>4.9/5 satisfaction rate</span>
            <span>•</span>
            <span>Secure payments</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorkSteps;