import React, { useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import sampleImg from '../../assets/imgs/electrical.webp';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import OptimizedImage from "../OptimizedImage";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonyInfo = [
    {
      name: "Chinedu O.",
      profession: "Homeowner",
      avatar: "/images/avatar1.webp",
      rating: 5,
      feedback:
        "ServiJoy made finding a reliable plumber effortless. Within minutes, I got connected, and the service was top-notch!",
    },
    {
      name: "Fatima K.",
      profession: "Event Planner",
      avatar: "/images/avatar2.webp",
      rating: 4.5,
      feedback:
        "I needed a last-minute home cleaning before an event, and ServiJoy delivered beyond my expectations. Highly recommended!",
    },
    {
      name: "Ahmed T.",
      profession: "Electrician",
      avatar: "/images/avatar3.webp",
      rating: 5,
      feedback:
        "As a service provider, joining ServiJoy has boosted my business. More clients, smooth transactions, and an easy-to-use platform!",
    },
    {
      name: "Jessica M.",
      profession: "Business Owner",
      avatar: "/images/avatar4.webp",
      rating: 4,
      feedback:
        "The process was seamless. I booked an electrician, and he arrived on time with all the necessary tools. Great experience!",
    },
    {
      name: "Emmanuel B.",
      profession: "Property Manager",
      avatar: "/images/avatar5.webp",
      rating: 5,
      feedback:
        "Trust and security were my concerns, but ServiJoy's verification system made me feel at ease. I always use them for home repairs.",
    },
  ];

  // Function to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar 
            key={i} 
            className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} 
                      ${rating - i > 0 && rating - i < 1 ? 'text-yellow-400 opacity-50' : ''} 
                      w-5 h-5`} 
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <section className="py-24 relative bg-gradient-to-br from-emerald-900 to-teal-800 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 bg-white rounded-full w-64 h-64 -mt-32 -mr-32"></div>
        <div className="absolute bottom-0 left-0 bg-white rounded-full w-96 h-96 -mb-48 -ml-48"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title with Animation */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-3 px-4 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium">
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What Our <span className="italic text-emerald-300">Community</span> Says
          </h2>
          <p className="text-xl text-emerald-50/90 max-w-2xl mx-auto">
            Hear from our satisfied users and service providers across the region.
          </p>
        </div>

        {/* Testimonial Cards with Enhanced Swiper */}
        <div className="relative pb-16">
          <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                translate: ["-120%", 0, -500],
                opacity: 0,
              },
              next: {
                translate: ["120%", 0, -500],
                opacity: 0,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            modules={[Autoplay, Pagination, EffectCreative]}
            className="testimonials-swiper"
          >
            {testimonyInfo.map((info, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden">
                  {/* Left Side - Visual */}
                  <div className="w-full md:w-2/5 bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:p-12 flex flex-col items-center justify-center h-full">
                    {/* Avatar with glow effect */}
                    <div className="relative mb-6 group">
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-xl transform group-hover:scale-110 transition-all duration-300"></div>
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                        <OptimizedImage 
                          alt={`${info.name} Avatar`}
                          className="w-full h-full object-cover"
                          src={sampleImg}
                        />
                      </div>
                    </div>
                    
                    {/* Name and Role */}
                    <h3 className="text-2xl font-bold text-white text-center">{info.name}</h3>
                    <p className="text-emerald-100 mb-4">{info.profession}</p>
                    
                    {/* Large Quote Icon */}
                    <FaQuoteLeft className="text-5xl text-white/20" />
                  </div>
                  
                  {/* Right Side - Content */}
                  <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    {/* Rating */}
                    <div className="mb-6">{renderStars(info.rating)}</div>
                    
                    {/* Testimonial */}
                    <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 mb-8 italic">
                      "{info.feedback}"
                    </blockquote>
                    
                    {/* Branded Element */}
                    <div className="flex items-center">
                      <div className="w-12 h-1 bg-emerald-500 rounded"></div>
                      <span className="ml-4 text-sm uppercase tracking-wider text-emerald-700 font-semibold">Verified Review</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Pagination Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonyInfo.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-white w-8" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Social Proof Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-white mb-2">5,000+</div>
            <p className="text-emerald-100">Happy Customers</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-white mb-2">4.8/5</div>
            <p className="text-emerald-100">Average Rating</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-white mb-2">97%</div>
            <p className="text-emerald-100">Satisfaction Rate</p>
          </div>
        </div>

        {/* Enhanced Call-to-Action */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-emerald-900 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-emerald-500 rounded-full group-hover:w-full group-hover:h-56"></span>
            <span className="relative group-hover:text-white transition-colors duration-300">Find a Service Provider Now</span>
            <svg className="w-5 h-5 ml-2 relative group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="mt-4 text-emerald-100 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No commitment, cancel anytime</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;