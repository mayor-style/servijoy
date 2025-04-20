import { FaUserCheck, FaCogs, FaBriefcase, FaWallet, FaArrowRight, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

// Helper function to extract the base color from a string like "from-green to-teal"
const getColorName = (colorString) => {
  // We assume the string is in the format "from-green to-teal"
  const firstWord = colorString.split(" ")[0]; // e.g. "from-green"
  return firstWord.replace("from-", "");
};

const HowItWorksVendor = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);

  const steps = [
    {
      icon: <FaUserCheck className="text-3xl sm:text-4xl" />,
      title: "Sign Up & Verify",
      description: "Create an account, complete verification, and get ready to start working.",
      color: "from-green to-teal", // updated
      bgColor: "bg-green/10",       // updated
      borderColor: "border-green/20", // updated
      iconColor: "text-green",       // updated
      detailedSteps: [
        "Create your ServiJoy account",
        "Verify your identity and qualifications",
        "Complete your background check",
        "Get approved within 24-48 hours"
      ]
    },
    {
      icon: <FaCogs className="text-3xl sm:text-4xl" />,
      title: "Set Up Profile",
      description: "Add your skills, pricing, availability, and let users find you.",
      color: "from-blue to-indigo", // updated
      bgColor: "bg-blue/10",        // updated
      borderColor: "border-blue/20", // updated
      iconColor: "text-blue",        // updated
      detailedSteps: [
        "Upload profile photos and portfolio",
        "List your services and set pricing",
        "Define your service area and availability",
        "Add your professional credentials"
      ]
    },
    {
      icon: <FaBriefcase className="text-3xl sm:text-4xl" />,
      title: "Get Hired & Work",
      description: "Users book your services, you complete tasks, and earn money.",
      color: "from-purple to-violet", // updated
      bgColor: "bg-purple/10",         // updated
      borderColor: "border-purple/20", // updated
      iconColor: "text-purple",        // updated
      detailedSteps: [
        "Receive job requests from clients",
        "Accept bookings that fit your schedule",
        "Complete work to client specifications",
        "Get rated and reviewed by clients"
      ]
    },
    {
      icon: <FaWallet className="text-3xl sm:text-4xl" />,
      title: "Get Paid Securely",
      description: "Receive payments quickly and withdraw your earnings anytime.",
      color: "from-amber to-orange", // updated
      bgColor: "bg-amber/10",         // updated
      borderColor: "border-amber/20", // updated
      iconColor: "text-amber",        // updated
      detailedSteps: [
        "Payments are held in secure escrow",
        "Funds released after job completion",
        "Withdraw to your bank account anytime",
        "Track all transactions in your dashboard"
      ]
    },
  ];

  // Section animation using object destructuring
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Create separate refs for each card
  const cardRefsData = steps.reduce((acc, _, index) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
    acc.refs.push(ref);
    acc.inViews.push(inView);
    return acc;
  }, { refs: [], inViews: [] });
  const { refs: stepRefs, inViews: stepInViews } = cardRefsData;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const connectingLineVariants = {
    hidden: { width: "0%" },
    visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green/10 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-blue/10 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-amber/10 opacity-30 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div 
            variants={headerVariants}
            className="inline-block px-4 py-1 rounded-full bg-green/10 text-green text-sm font-medium mb-6"
          >
            Simple 4-Step Process
          </motion.div>
          
          <motion.h2 
            variants={headerVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green to-teal bg-clip-text text-transparent"
          >
            How It Works
          </motion.h2>
          
          <motion.p 
            variants={headerVariants}
            className="text-base md:text-lg text-gray-600 max-w-2xl"
          >
            Becoming a vendor on ServiJoy is simple! Follow these four easy steps to start earning today.
            Our streamlined process gets you up and running quickly.
          </motion.p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* The connecting line between steps */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -mt-1 z-0"></div>
          <motion.div 
            className="hidden lg:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-green via-blue to-amber -mt-1 z-0"
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            variants={connectingLineVariants}
          ></motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                ref={stepRefs[index]}
                initial={{ opacity: 0, y: 30 }}
                animate={stepInViews[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                className={`relative p-6 pt-12 pb-8 bg-white rounded-2xl shadow-lg border ${step.borderColor} transition-all duration-300 cursor-pointer
                  ${activeStep === index ? 'shadow-xl transform -translate-y-2' : ''}
                  ${expandedStep === index ? 'md:col-span-2 lg:col-span-4 shadow-xl' : ''}`}
              >
                {/* Step number badge */}
                <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r ${step.color} shadow-lg`}>
                  {index + 1}
                </div>
                
                {/* Icon with animated background */}
                <div className="mb-6 flex justify-center">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: activeStep === index ? 
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : 
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center ${step.iconColor} text-3xl sm:text-4xl`}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                
                {/* Content */}
                <h3 className={`font-bold text-xl mb-3 text-gray-800 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                
                {/* Expanded content */}
                {expandedStep === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-4">Detailed Steps</h4>
                        <ul className="space-y-3">
                          {step.detailedSteps.map((item, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start"
                            >
                              <span className={`mr-2 mt-1 ${step.iconColor}`}><FaCheck /></span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className={`${step.bgColor} rounded-xl p-6 shadow-inner`}>
                        <h4 className="font-semibold text-lg mb-4">Pro Tips</h4>
                        <p className="text-gray-700 mb-4">
                          {index === 0 && "Have your ID and professional credentials ready before starting verification."}
                          {index === 1 && "High-quality photos and detailed descriptions can increase your booking rate by 30%."}
                          {index === 2 && "Respond to inquiries within 2 hours to improve your visibility in search results."}
                          {index === 3 && "Set up automatic transfers to your bank account for hassle-free payments."}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`mt-2 px-4 py-2 rounded-lg bg-gradient-to-r ${step.color} text-white font-medium flex items-center`}
                        >
                          Learn More <FaArrowRight className="ml-2" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Show more indicator */}
                {expandedStep !== index && (
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`mt-4 inline-flex items-center text-sm font-medium ${step.iconColor}`}
                  >
                    Click to see details <FaArrowRight className="ml-1" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 p-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl text-white text-center shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start Earning?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join thousands of service professionals who are growing their business with ServiJoy.
            Our platform makes it easy to find clients, manage bookings, and get paid securely.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-green to-blue rounded-lg font-medium inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Become a Vendor Today <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksVendor;
