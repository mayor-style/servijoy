import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Star, Clock, ArrowUpRight, Users } from "lucide-react";
import OptimizedImage from "../components/OptimizedImage";

const ServiceCard = ({
  title,
  img,
  description,
  rating = 4.8,
  reviews = 150,
  price,
  gradient = false,
  hiddenOnSmall = false,
  isHovered = false
}) => {
  const [hover, setHover] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const navigate = useNavigate();

  const handleCardClick = () => {
    // Convert title to slug for the URL
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/service/${slug}`);
  };

  // Create local hover state that combines parent and local hover
  const isCardHovered = hover || isHovered;

  return (
    <motion.div
      ref={ref}
      onClick={handleCardClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative overflow-hidden flex flex-col cursor-pointer rounded-xl
        w-full sm:w-full h-full
        transition-all duration-300
        ${isCardHovered ? "shadow-xl transform -translate-y-1" : "shadow-md"}
        ${gradient ? "bg-gradient-to-br from-blue-600 to-indigo-700" : "bg-white"}
        ${hiddenOnSmall ? "sm:flex hidden" : ""}
      `}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50,
      }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <OptimizedImage
          src={img}
          alt={`${title} Service`}
          className={`w-full h-full object-cover transition-transform duration-500 ${isCardHovered ? "scale-110" : "scale-100"}`}
          rounded="rounded-t-xl"
        />
        
        {/* Price Tag */}
        {price && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md text-blue-700 font-bold">
            {price}
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
      </div>

      {/* Content */}
      <div className={`flex-1 p-5 ${gradient ? "text-white" : "text-gray-800"}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        {description && (
          <p className={`text-sm mb-4 line-clamp-2 ${gradient ? "text-blue-100" : "text-gray-600"}`}>
            {description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{rating}</span>
          </div>
          <span className={`mx-2 text-xs ${gradient ? "text-blue-200" : "text-gray-400"}`}>•</span>
          <div className="flex items-center text-sm">
            <span className={`${gradient ? "text-blue-100" : "text-gray-500"}`}>{reviews} reviews</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center text-sm mb-2">
          <Clock className={`w-4 h-4 mr-1 ${gradient ? "text-blue-200" : "text-blue-500"}`} />
          <span className={`${gradient ? "text-blue-100" : "text-gray-600"}`}>Quick service</span>
          
          <span className="mx-2">•</span>
          
          <Users className={`w-4 h-4 mr-1 ${gradient ? "text-blue-200" : "text-blue-500"}`} />
          <span className={`${gradient ? "text-blue-100" : "text-gray-600"}`}>Professional team</span>
        </div>
      </div>

      {/* Call to action footer */}
      <div className={`px-5 py-3 border-t ${gradient ? "border-blue-500/30 text-white" : "border-gray-100 text-gray-800"}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">View details</span>
          <motion.div
            animate={{ 
              x: isCardHovered ? 0 : -5, 
              opacity: isCardHovered ? 1 : 0.7 
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className={`w-5 h-5 ${gradient ? "text-blue-200" : "text-blue-600"}`} />
          </motion.div>
        </div>
      </div>

      {/* Highlight border animation */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isCardHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
};

export default ServiceCard;