import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaCheck, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [helpfulVotes, setHelpfulVotes] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Animation effects when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Enhanced review data with more details
  const allReviews = [
    {
      id: 1,
      name: "John Smith",
      position: "Residential Client",
      image: "/api/placeholder/80/80",
      date: "2 weeks ago",
      rating: 5,
      verified: true,
      review: "Absolutely amazing service! My house has never been cleaner. The attention to detail was impressive, and they even cleaned areas I hadn't thought to mention.",
      service: "Deep Cleaning",
      category: "residential"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Business Owner",
      image: "/api/placeholder/80/80",
      date: "1 month ago",
      rating: 4,
      verified: true,
      review: "Professional and on time. The team was friendly and accommodating to our office's specific needs. Highly recommend for any business!",
      service: "Office Cleaning",
      category: "business"
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Homeowner",
      image: "/api/placeholder/80/80",
      date: "3 days ago",
      rating: 5,
      verified: true,
      review: "Exceeded all my expectations. The cleaning crew was thorough, efficient, and used eco-friendly products that left my home smelling fresh without harsh chemicals.",
      service: "Regular Cleaning",
      category: "residential"
    },
    {
      id: 4,
      name: "Emily Parker",
      position: "Apartment Resident",
      image: "/api/placeholder/80/80",
      date: "1 week ago",
      rating: 5,
      verified: true,
      review: "I've used many cleaning services before, but this one stands out. They transformed my apartment in just a few hours. Worth every penny!",
      service: "Move-in Cleaning",
      category: "residential"
    },
    {
      id: 5,
      name: "David Williams",
      position: "Restaurant Owner",
      image: "/api/placeholder/80/80",
      date: "2 months ago",
      rating: 5,
      verified: true,
      review: "Exceptional service for our restaurant. The team understands the unique challenges of keeping a food establishment clean and sanitary. They've become an essential part of our operation.",
      service: "Commercial Cleaning",
      category: "business"
    },
    {
      id: 6,
      name: "Sophia Rodriguez",
      position: "Realtor",
      image: "/api/placeholder/80/80",
      date: "3 weeks ago",
      rating: 4,
      verified: true,
      review: "I regularly use this cleaning service for my property listings. They make every home look its absolute best for potential buyers. Reliable and transformative results every time.",
      service: "Deep Cleaning",
      category: "business"
    }
  ];

  // Filter reviews based on active filter
  const filteredReviews = activeFilter === "all" 
    ? allReviews 
    : allReviews.filter(review => review.category === activeFilter);

  // Featured reviews for the carousel (always show first 4)
  const reviews = filteredReviews.slice(0, 4);

  // Ref for the review carousel
  const carouselRef = useRef(null);

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }
    
    if (touchEnd - touchStart > 50) {
      // Swipe right
      goToPrev();
    }
  };

  // Autoplay functionality with pause on hover
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, reviews.length]);

  // Pause autoplay when hovering over carousel
  const handleCarouselHover = (isHovering) => {
    setAutoplay(!isHovering);
  };

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000); // Resume autoplay after 10 seconds
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000); // Resume autoplay after 10 seconds
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000); // Resume autoplay after 10 seconds
  };

  // Handle helpful/not helpful votes
  const handleVote = (reviewId, isHelpful) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: isHelpful
    }));

    // Show toast notification
    // This would connect to a real notification system in production
    console.log(`Marked review ${reviewId} as ${isHelpful ? 'helpful' : 'not helpful'}`);
  };

  // Handle filter change
  const changeFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentIndex(0); // Reset to first review when changing filters
  };

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="my-16 overflow-hidden bg-gradient-to-b from-white to-indigo-50 py-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Animated heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4 shadow-sm">
            Client Experiences
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
            What Our Clients <span className="text-indigo-600">Love</span> About Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers have to say about our cleaning services.
          </p>
          <div className="h-1 w-24 bg-indigo-600 mx-auto mt-6"></div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-10 gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === "all" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
            onClick={() => changeFilter("all")}
          >
            All Reviews
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === "residential" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
            onClick={() => changeFilter("residential")}
          >
            Residential
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === "business" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-indigo-100"
            }`}
            onClick={() => changeFilter("business")}
          >
            Business
          </motion.button>
        </div>

        {/* Review stats summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-lg p-4 shadow-md text-center"
          >
            <div className="text-3xl font-bold text-indigo-600">4.8</div>
            <div className="flex justify-center gap-1 my-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className={star <= 4 ? "text-yellow-500" : "text-yellow-300"} />
              ))}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-lg p-4 shadow-md text-center"
          >
            <div className="text-3xl font-bold text-indigo-600">98%</div>
            <div className="text-sm text-gray-600">Satisfied Clients</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-lg p-4 shadow-md text-center"
          >
            <div className="text-3xl font-bold text-indigo-600">27</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-lg p-4 shadow-md text-center"
          >
            <div className="text-3xl font-bold text-indigo-600">5+</div>
            <div className="text-sm text-gray-600">Years of Service</div>
          </motion.div>
        </div>

        {/* Review Slider */}
        <div className="relative" 
          ref={carouselRef}
          onMouseEnter={() => handleCarouselHover(true)}
          onMouseLeave={() => handleCarouselHover(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mb-6">
            <motion.div 
              className="h-full bg-indigo-600"
              initial={{ width: "0%" }}
              animate={{ 
                width: `${((currentIndex + 1) / reviews.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Previous button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-indigo-600 hover:text-white transition-colors duration-300 hidden md:flex"
            onClick={goToPrev}
            aria-label="Previous review"
          >
            <FaChevronLeft />
          </motion.button>

          {/* Review container */}
          <div className="mx-auto max-w-4xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left column - image and details */}
                  <div className="md:w-1/3 flex flex-col items-center md:items-start">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-indigo-100 shadow-md transform transition-transform hover:scale-105 duration-300">
                        <img 
                          src={reviews[currentIndex].image} 
                          alt={reviews[currentIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {reviews[currentIndex].verified && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="absolute -bottom-2 -right-2 bg-green/50 text-white p-1 rounded-full"
                        >
                          <FaCheck className="h-3 w-3" />
                        </motion.div>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-lg text-gray-800 text-center md:text-left">{reviews[currentIndex].name}</h4>
                    <p className="text-gray-500 text-sm mb-2 text-center md:text-left">{reviews[currentIndex].position}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <FaStar 
                            className={i < reviews[currentIndex].rating ? "text-yellow-500" : "text-gray-300"}
                            size={18}
                          />
                        </motion.div>
                      ))}
                      <span className="text-gray-600 text-sm ml-2">
                        ({reviews[currentIndex].rating}.0)
                      </span>
                    </div>
                    
                    <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {reviews[currentIndex].service}
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        {reviews[currentIndex].date}
                      </span>
                    </div>
                  </div>
                  
                  {/* Right column - review text */}
                  <div className="md:w-2/3 relative">
                    <FaQuoteLeft className="absolute text-4xl text-indigo-100 -left-2 -top-2" />
                    <div className="pl-6 pt-4">
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {reviews[currentIndex].review}
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-gray-400 text-sm">{reviews[currentIndex].date}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Was this helpful?</span>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleVote(reviews[currentIndex].id, true)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-300 ${
                              helpfulVotes[reviews[currentIndex].id] === true 
                                ? "bg-green/10 text-green/70" 
                                : "bg-gray-100 text-gray-700 hover:bg-green/50"
                            }`}
                          >
                            <FaThumbsUp size={12} />
                            <span>Yes</span>
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleVote(reviews[currentIndex].id, false)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-300 ${
                              helpfulVotes[reviews[currentIndex].id] === false 
                                ? "bg-red-100 text-red-700" 
                                : "bg-gray-100 text-gray-700 hover:bg-red-50"
                            }`}
                          >
                            <FaThumbsDown size={12} />
                            <span>No</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-indigo-600 hover:text-white transition-colors duration-300 hidden md:flex"
            onClick={goToNext}
            aria-label="Next review"
          >
            <FaChevronRight />
          </motion.button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-indigo-600 w-6 h-3 rounded-full" 
                  : "bg-gray-300 hover:bg-indigo-400 w-3 h-3 rounded-full"
              }`}
              onClick={() => goToReview(index)}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile navigation */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-md"
            onClick={goToPrev}
            aria-label="Previous review"
          >
            <FaChevronLeft />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-md"
            onClick={goToNext}
            aria-label="Next review"
          >
            <FaChevronRight />
          </motion.button>
        </div>

        {/* All reviews (expandable) */}
        <motion.div 
          className="mt-16"
          animate={{ height: isExpanded ? "auto" : "0px", opacity: isExpanded ? 1 : 0 }}
          initial={{ height: "0px", opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ overflow: "hidden" }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">All Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map(review => (
              <motion.div 
                key={review.id}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                      size={14}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">{review.review}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                    {review.service}
                  </span>
                  {review.verified && (
                    <span className="text-xs text-green/60 flex items-center">
                      <FaCheck className="mr-1" size={10} /> Verified
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Toggle button for expanding reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
          >
            {isExpanded ? (
              <>
                Hide Reviews
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </>
            ) : (
              <>
                See All {filteredReviews.length} Reviews
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-20 gradient rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient opacity-90"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Experience Our Premium Cleaning Services</h3>
            <p className="mb-6 max-w-2xl mx-auto">Join our satisfied customers and discover why we're the most trusted cleaning service in the area.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#book-now"
                className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-300 shadow-md"
              >
                Book Now
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
              >
                Contact Us
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ReviewSection;