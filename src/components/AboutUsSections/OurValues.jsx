import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Custom intersection observer hook replacement
const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && options.triggerOnce) {
        observer.disconnect();
      }
    }, {
      threshold: options.threshold || 0,
      rootMargin: options.rootMargin || "0px"
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce, options.rootMargin]);

  return { ref, inView };
};

// SVG Icon Components to replace react-icons
const IconHandshake = () => (
  <svg viewBox="0 0 640 512" fill="currentColor" className="text-3xl w-8 h-8">
    <path d="M506.1 127.1c-17.97-20.17-61.46-61.65-122.7-71.1c-22.5-3.354-45.39 3.606-63.41 18.21C302 60.47 279.1 48.9 255.1 48.9h-76.56c-24.1 0-46.19 9.328-63.2 26.34L81.88 109.7c-19.94 14.98-29.25 39.72-24.87 64.82C55.37 180.1 56.14 185.4 57.37 190.8H16c-8.836 0-16 7.164-16 16v32c0 8.836 7.164 16 16 16h104.9c-2.867 35.87 15.7 74.09 50.18 94.02c-17.69 5.566-29.48 22.1-29.48 40.33c0 23.47 19.04 42.51 42.52 42.51c-23.47 0-42.52 19.04-42.52 42.5C141.6 492.1 160.6 512 184.1 512h190.9c46.95 0 85.06-38.11 85.06-85.06V331.4c0-10.84-2.2-21.64-5.95-31.73C445.2 256.3 416 219.5 415.1 156.2C415.1 147.8 410.2 139.8 401.9 136.3zM375.1 282.8v144.1c0 20.37-16.6 36.97-36.97
36.97H184.1c-5.387 0-10.88-3.33-10.88-8.391c0-5.35 5.611-7.98 10.88-8.391c23.93-.8242 43.09-20.66 42.6-44.6C226.7 378.4 207.7 360 184.1 360c-5.387 0-10.88-3.328-10.88-8.391c0-5.35 5.611-7.979 10.88-8.391c23.93-.8222 43.09-20.66 42.6-44.6c-.3516-23.13-19.36-41.53-42.6-41.53H80.15C72.88 243.9 79.46 227.4 92.82 217.5l64-48c9.969-10.06 23.54-15.15 37.19-15.15h61.96c21.94 0 39.93 17.95 39.93 39.93c0 12.49-5.25 22.25-9.503 29.12c-2.116 3.41-3.203 7.318-3.203 11.27c0 11.33 9.493 21.1 20.1 21.1h6.053c10.54 0 20.24-3.223 28.35-10.1c17.12-14.57 14.38-18.33 29.76-20.09c1.754-.2019 3.534-.2997 5.336-.2997c14.55 0 28.34 6.583 37.55 17.91c10.16 12.5 10.1 22.69 10.1
50.53C421 243.5 399.1 276.9 375.1 282.8z"/>
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="text-3xl w-8 h-8">
    <path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256 464c-132.7-56.7-240-201.6-240-336 0-4.6 2.8-8.8 7.1-10.6l192-80c1.8-.7 3.8-.7 5.7 0l192 80c4.3 1.8 7.1 6 7.1 10.6 0 134.4-107.3 279.3-240 336z"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 640 512" fill="currentColor" className="text-3xl w-8 h-8">
    <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 576 512" fill="currentColor" className="text-3xl w-8 h-8">
    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
  </svg>
);

const IconRocket = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="text-3xl w-8 h-8">
    <path d="M505.1 19.1C503.8 13 499 8.2 492.9 6.9 460.7 0 435.5 0 410.4 0 307.2 0 245.3 55.2 199.1 128H94.9c-18.2 0-34.8 10.3-42.9 26.5L2.6 253.3c-8 16 3.6 34.7 21.3 34.7h95.1c-5.9 12.8-11.9 25.5-18 37.7-3.1 6.2-1.9 13.6 3 18.5l63.6 63.6c4.9 4.9 12.3 6.1 18.5 3 12.2-6.1 24.9-12 37.7-17.9V488c0 17.7 18.7 29.4 34.7 21.3l99-49.3c16.3-8.1 26.5-24.8 26.5-42.9V312.8c72.6-46.3 128-108.4 128-211.1.1-25.2.1-50.4-6.8-82.6zM400 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/>
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="text-3xl w-8 h-8">
    <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
  </svg>
);

const values = [
  {
    icon: <IconHandshake />,
    title: "Trust & Integrity",
    description: "We prioritize honesty, ensuring secure and transparent transactions at all times.",
    color: "bg-emerald-500",
    gradient: "from-emerald-400 to-green-600",
    delay: 0.1
  },
  {
    icon: <IconShield />,
    title: "Security & Reliability",
    description: "Your safety matters. We implement top-tier security to protect your interests.",
    color: "bg-blue-500", 
    gradient: "from-blue-400 to-indigo-600",
    delay: 0.2
  },
  {
    icon: <IconUsers />,
    title: "Community & Support",
    description: "We're building a thriving network where users and vendors support each other.",
    color: "bg-emerald-500",
    gradient: "from-emerald-400 to-green-600",
    delay: 0.3
  },
  {
    icon: <IconStar />,
    title: "Excellence & Quality",
    description: "We set the highest standards, ensuring top-tier service providers every time.",
    color: "bg-amber-500",
    gradient: "from-amber-400 to-yellow-600",
    delay: 0.4
  },
  {
    icon: <IconRocket />,
    title: "Innovation & Growth",
    description: "We continuously evolve, adapting to new technologies for a better experience.",
    color: "bg-blue-500",
    gradient: "from-blue-400 to-indigo-600",
    delay: 0.5
  },
  {
    icon: <IconHeart />,
    title: "Customer Satisfaction",
    description: "Our users come first. We strive to make every experience smooth and joyful.",
    color: "bg-rose-500",
    gradient: "from-rose-400 to-red-600",
    delay: 0.6
  },
];

const OurValues = () => {
  const [activeCard, setActiveCard] = useState(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-block mb-3">
            <span className="text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Our Foundation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">What Drives Us</h2>
          <p className="text-gray-600 text-lg mt-4 leading-relaxed">
            These core values define our mission and shape every decision we make, guiding us to deliver exceptional experiences.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1.0],
                delay: value.delay
              }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-md overflow-hidden"
            >
              <div className="flex-1 p-8">
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-br ${value.gradient}`}
                >
                  <motion.div
                    animate={activeCard === index ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {value.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
              
              {/* Animated bottom bar that appears on hover */}
              <motion.div 
                className={`h-1 bg-gradient-to-r ${value.gradient} w-full`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeCard === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <a href="#" className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium text-base transition-transform hover:translate-y-1 shadow-lg hover:shadow-xl">
            <span>Learn More About Our Mission</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OurValues;