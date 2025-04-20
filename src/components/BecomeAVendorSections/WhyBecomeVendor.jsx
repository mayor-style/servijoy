import { FaUserCheck, FaUsers, FaStar, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

// Helper function to extract the base color name from a string like "from-green/40 to-green/60"
const getColorName = (colorString) => {
  const firstColor = colorString.split(" ")[0]; // e.g. "from-green/40"
  const colorWithoutPrefix = firstColor.replace("from-", ""); // "green/40"
  const parts = colorWithoutPrefix.split("/"); // ["green", "40"]
  return parts[0] || "green";
};

const WhyBecomeVendor = () => {
  const [activeCard, setActiveCard] = useState(null);
  
  const benefits = [
    {
      icon: <FaMoneyBillWave className="text-3xl sm:text-4xl" />,
      title: "Earn More",
      description: "Expand your income by offering your services to a wider audience.",
      color: "from-green/40 to-green/60",
      lightColor: "bg-green/10",
      iconBg: "bg-green/20",
      borderColor: "border-green/30",
      hoverBg: "hover:bg-green/10",
      stats: "+32% average income increase"
    },
    {
      icon: <FaUsers className="text-3xl sm:text-4xl" />,
      title: "Trusted Network",
      description: "Join a platform that connects you with verified, high-quality clients.",
      color: "from-blue/40 to-blue/60",
      lightColor: "bg-blue/10",
      iconBg: "bg-blue/20",
      borderColor: "border-blue/30",
      hoverBg: "hover:bg-blue/10",
      stats: "5,000+ verified clients"
    },
    {
      icon: <FaClock className="text-3xl sm:text-4xl" />,
      title: "Flexible Work",
      description: "Work on your own terms, set your schedule, and take control of your time.",
      color: "from-teal/40 to-teal/60",
      lightColor: "bg-teal/10",
      iconBg: "bg-teal/20",
      borderColor: "border-teal/30", 
      hoverBg: "hover:bg-teal/10",
      stats: "Set your own hours"
    },
    {
      icon: <FaStar className="text-3xl sm:text-4xl" />,
      title: "Boost Your Reputation",
      description: "Gain ratings and reviews that help build credibility and attract more clients.",
      color: "from-amber/40 to-amber/60",
      lightColor: "bg-amber/10",
      iconBg: "bg-amber/20", 
      borderColor: "border-amber/30",
      hoverBg: "hover:bg-amber/10",
      stats: "94% of top vendors report more clients"
    },
  ];

  // Use intersection observer for the section using object destructuring
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Build separate refs for each card using object destructuring
  const { refs: cardRefs, inViews: cardInViews } = benefits.reduce(
    (acc, _, index) => {
      const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        delay: 100,
      });
      acc.refs.push(ref);
      acc.inViews.push(inView);
      return acc;
    },
    { refs: [], inViews: [] }
  );

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

  return (
    <section 
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Decorative background elements */}
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
            Benefits of Joining
          </motion.div>
          
          <motion.h2 
            variants={headerVariants}
            className="text-3xl md:text-4xl lg:text-5xl text-gradient font-bold mb-6 bg-gradient-to-r from-green to-teal bg-clip-text text-transparent"
          >
            Why Become a Vendor?
          </motion.h2>
          
          <motion.p 
            variants={headerVariants}
            className="text-base md:text-lg text-gray-600 max-w-2xl"
          >
            ServiJoy provides everything you need to succeed, grow, and thrive in your industry.
            Join thousands of successful service providers on our platform.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              ref={cardRefs[index]}
              initial={{ opacity: 0, y: 30 }}
              animate={cardInViews[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className={`relative overflow-hidden p-8 bg-white rounded-2xl shadow-lg border ${benefit.borderColor} transition-all duration-300 ${activeCard === index ? 'scale-105 shadow-xl' : ''}`}
            >
              {/* Animated background gradient that appears on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 ${activeCard === index ? 'opacity-5' : ''} transition-opacity duration-300`}></div>
              
              {/* Icon with animated background */}
              <div className="relative">
                <motion.div 
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                  className={`w-16 h-16 ${benefit.iconBg} rounded-2xl flex items-center justify-center text-${getColorName(benefit.color)}-500 mb-6`}
                >
                  {benefit.icon}
                </motion.div>
                
                {/* Stats badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={activeCard === index ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute top-0 right-0 ${benefit.lightColor} px-3 py-1 rounded-full text-xs font-medium text-${getColorName(benefit.color)}-600`}
                >
                  {benefit.stats}
                </motion.div>
              </div>
              
              {/* Content */}
              <h3 className="font-bold text-xl mb-3 text-gray-800 text-center">{benefit.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{benefit.description}</p>
              
              {/* Learn more button */}
              <motion.div
                initial={{ opacity: 0.7 }}
                animate={activeCard === index ? { opacity: 1, x: 5 } : { opacity: 0.7, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`inline-flex items-center text-${getColorName(benefit.color)}-500 font-medium`}
              >
                Learn more <HiArrowRight className="ml-2" />
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 p-8 bg-gradient-to-r gradient from-green to-teal rounded-2xl text-white text-center shadow-xl"
        >
          <blockquote className="text-lg md:text-xl italic font-light">
            "Joining ServiJoy completely transformed my business. I've increased my client base by 40% and now have complete control over my schedule."
          </blockquote>
          <div className="mt-4 font-medium">— Michael T., Professional Landscaper</div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-8 py-3 bg-white text-green rounded-lg font-medium inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Join 5,000+ Vendors Today <HiArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBecomeVendor;
