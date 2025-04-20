import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import ServiceCard from "../ServiceCard";
import sampleImg from '../../assets/imgs/hero_2.webp';

const featuredServices = [
  { 
    id: 1, 
    name: "Deep Home Cleaning", 
    img: "/images/cleaning.webp",
    description: "Thorough cleaning of all rooms and surfaces, leaving your home spotless.",
    rating: 4.9,
    reviews: 238,
    price: "$120"
  },
  { 
    id: 2, 
    name: "24/7 Plumbing Support", 
    img: "/images/plumbing.webp",
    description: "Emergency plumbing repairs available around the clock, any day of the week.",
    rating: 4.8,
    reviews: 187,
    price: "$85"
  },
  { 
    id: 3, 
    name: "Emergency Electrical Repairs", 
    img: "/images/electrical.webp",
    description: "Fast response electrical fixes for any urgent issues in your home.",
    rating: 4.7,
    reviews: 156,
    price: "$95"
  },
];

const FeaturedServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // For handling the card hover state
  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-3"
          >
            PREMIUM SERVICES
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Services You Can Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Our most in-demand services, backed by our satisfaction guarantee and trusted by thousands of happy customers.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
              className="relative"
            >
              <ServiceCard
                title={service.name}
                img={sampleImg}
                description={service.description}
                rating={service.rating}
                reviews={service.reviews}
                price={service.price}
                gradient={index % 2 === 1}
                isHovered={hoveredIndex === index}
              />
              
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a href="/services" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
            View All Services
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;