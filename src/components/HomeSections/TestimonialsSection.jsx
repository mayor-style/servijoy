import React from "react";
import { FaStar } from "react-icons/fa";
import sampleImg from '../../assets/imgs/electrical.webp'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import OptimizedImage from "../OptimizedImage";

const TestimonialsSection = () => {
  const testimonyInfo = [
    {
      name: "Chinedu O.",
      avatar: "/images/avatar1.webp",
      rating: 5,
      feedback:
        "ServiJoy made finding a reliable plumber effortless. Within minutes, I got connected, and the service was top-notch!",
    },
    {
      name: "Fatima K.",
      avatar: "/images/avatar2.webp",
      rating: 4.5,
      feedback:
        "I needed a last-minute home cleaning before an event, and ServiJoy delivered beyond my expectations. Highly recommended!",
    },
    {
      name: "Ahmed T.",
      avatar: "/images/avatar3.webp",
      rating: 5,
      feedback:
        "As a service provider, joining ServiJoy has boosted my business. More clients, smooth transactions, and an easy-to-use platform!",
    },
    {
      name: "Jessica M.",
      avatar: "/images/avatar4.webp",
      rating: 4,
      feedback:
        "The process was seamless. I booked an electrician, and he arrived on time with all the necessary tools. Great experience!",
    },
    {
      name: "Emmanuel B.",
      avatar: "/images/avatar5.webp",
      rating: 5,
      feedback:
        "Trust and security were my concerns, but ServiJoy’s verification system made me feel at ease. I always use them for home repairs.",
    },
  ];

  return (
    <section className="py-16 gradient-blue">
      <div className="max-w-7xl mx-auto px-1 sm:px-9">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h1 className="header text-gradient">What They Say About Us</h1>
          <p className="subheader mt-3">
            Hear from our satisfied users and service providers.
          </p>
        </div>

        {/* Testimonials Slider */}
        <Swiper
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          centerInsufficientSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={1500}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
        >
          {testimonyInfo.map((info, index) => (
            <SwiperSlide
              key={index}
              className="shadow-lg bg-[#f7f7f7] mx-4 p-6 rounded-lg mb-16 text-center w-full h-full"
            >
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
             <OptimizedImage 
              alt={`${info.name} Image`}
              className={"w-full h-full object-cover"}
              src={sampleImg}
             />
              </div>
              {/* Name */}
              <h3 className="text-xl font-semibold text-dark-gray">
                {info.name}
              </h3>
              {/* Rating */}
              <div className="flex justify-center items-center mt-2">
                {Array.from({ length: Math.floor(info.rating) }, (_, i) => (
                  <FaStar key={i} className="text-green" />
                ))}
                {info.rating % 1 !== 0 && (
                  <FaStar className="text-green opacity-50" />
                )}
              </div>
              {/* Feedback */}
              <p className="mt-3 text-gray-600">{info.feedback}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call-to-Action */}
        <div className="text-center mt-4">
          <button className="btn-green">Find a Service Provider Now</button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
