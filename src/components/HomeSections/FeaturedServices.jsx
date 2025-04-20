import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../OptimizedImage";

// Import images
import cleaner from "../../assets/imgs/home_repair.webp";
import Plumbing from "../../assets/imgs/plumbing.webp";
import Painting from "../../assets/imgs/painting.webp";
import Capentry from "../../assets/imgs/carpentry.webp";
import home_repair from "../../assets/imgs/electrical.webp";
import Flooring from "../../assets/imgs/flooring.webp";

const FeaturedServices = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const featuredService = [
    { 
      title: "Cleaning", 
      img: cleaner,
      description: "Professional cleaning services for homes and offices",
      icon: "✨"
    },
    { 
      title: "Plumbing", 
      img: Plumbing,
      description: "Expert plumbing repairs and installations",
      icon: "🔧"
    },
    { 
      title: "Painting", 
      img: Painting,
      description: "Quality interior and exterior painting services",
      icon: "🎨"
    },
    { 
      title: "Home Repair", 
      img: home_repair,
      description: "General home maintenance and repair solutions",
      icon: "🔌"
    },
    { 
      title: "Carpentry", 
      img: Capentry,
      description: "Custom woodworking and furniture repairs",
      icon: "🪚"
    },
    { 
      title: "Flooring", 
      img: Flooring,
      description: "Installation and repair of all flooring types",
      icon: "🧱"
    },
  ];

  const handleNavigate = (service) => {
    navigate(`/service/${service.title.toLowerCase()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Title with animated underline */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block">
            Popular Services
            <motion.span 
              className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </h2>
          <p className="md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our wide range of professional services, tailored to meet your specific needs with quality and reliability.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredService.map((service, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });
            
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                ref={ref}
                key={index}
                className={`relative overflow-hidden rounded-xl bg-white shadow-lg h-80 group cursor-pointer
                  ${index > 3 ? "lg:flex hidden" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: inView ? 1 : 0,
                  y: inView ? 0 : 50,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                onClick={() => handleNavigate(service)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Service Icon Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 p-2 rounded-full shadow-md">
                  <span className="text-xl">{service.icon}</span>
                </div>
                
                {/* Image Container */}
                <div className="h-3/5 w-full overflow-hidden">
                  <OptimizedImage
                    src={service.img}
                    alt={`${service.title} Service`}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                    rounded="rounded-t-xl"
                  />
                </div>
                
                {/* Content Overlay */}
                <div className={`h-2/5 p-4 bg-white relative transition-all duration-300
                  ${hoveredIndex === index ? 'bg-gradient-to-br from-blue-50 to-sky-100' : ''}`}>
                  <div className={`absolute -top-6 left-0 right-0 h-12 
                    ${isEven ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-teal-500 to-emerald-500'}
                    skew-y-3 transform origin-right z-0`}
                  />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    
                    <motion.div 
                      className="mt-3 inline-flex items-center text-blue-600 font-medium text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Book Now
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* View All Services Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/services" 
            className="sm:inline-block group relative px-6 py-3 font-medium text-white bg-blue-600 rounded-lg overflow-hidden shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <span className="relative z-10">View All Services</span>
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-1 bg-white"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;