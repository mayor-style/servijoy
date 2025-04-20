import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCalendarAlt, FaHandsHelping, FaSmileBeam } from "react-icons/fa";

const howItWorkData = [
  {
    index: 1,
    title: "Describe your needs.",
    desc: "Describe the kind of service you need and get linked with the best professional.",
    icon: <FaCalendarAlt className="text-3xl" />,
  },
  {
    index: 2,
    title: "Get matched instantly.",
    desc: "Get matched with the best Professionals around you with our sleek matching algorithm.",
    icon: <FaHandsHelping className="text-3xl" />,
  },
  {
    index: 3,
    title: "Hire and complete your task.",
    desc: "Get in contact with your Professional and schedule a time to get the task done.",
    icon: <FaSmileBeam className="text-3xl" />,
  },
];

const HowItWorks = () => {
  // Animated container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading - Centered and enhanced */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold header text-black">
              How <span className="text-gradient">ServiJoy</span> Works
            </h2>
            <div className="w-24 h-1 bg-green mx-auto my-4 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Three simple steps to book a service and get your tasks done with ease.
            </p>
          </motion.div>
        </div>

        {/* Process Flow Indicator */}
        <div className="hidden md:flex justify-center mb-10">
          <div className="relative w-3/4 h-1 bg-gray-200 rounded-full">
            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            
            {/* Step Markers */}
            {howItWorkData.map((step, index) => (
              <motion.div
                key={step.index}
                className="absolute top-0 -mt-2 w-5 h-5 rounded-full bg-green flex items-center justify-center shadow-md"
                style={{ left: `${index * 50}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.5 }}
              >
                <span className="text-xs text-white font-bold">{step.index}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {howItWorkData.map((data, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });

            return (
              <motion.div
                key={data.index}
                ref={ref}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.3,
                }}
                whileHover={{ y: -10 }}
              >
                <div className="relative">
                  
                  <div
                    className={`w-20 h-20 ${
                      data.index === 2 ? "gradient" : "bg-green"
                    } rounded-full flex items-center justify-center text-white mb-6 shadow-lg transform transition-transform duration-300 hover:scale-110`}
                  >
                    {data.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  {data.title}
                </h3>
                
                <p className="text-gray-700 text-center">
                  {data.desc}
                </p>
                
                {index < howItWorkData.length - 1 && (
                  <div className="md:hidden mt-6">
                    <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <button className="px-8 py-3 bg-green hover:bg-green/90 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Find a Professional Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;