import React from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const TestimonialsSection = () => {
  const testimonyInfo = [
    {
      name: "John Doe",
      avatar: "/images/avatar1.jpg",
      rating: 5,
      feedback:
        "Luxe BNB Cleaning exceeded my expectations. My home has never been this spotless!",
    },
    {
      name: "Jane Smith",
      avatar: "/images/avatar2.jpg",
      rating: 4,
      feedback:
        "Their service was impeccable! They truly know how to deliver a luxury experience.",
    },
    {
      name: "Emily Johnson",
      avatar: "/images/avatar3.jpg",
      rating: 5,
      feedback:
        "Professional, efficient, and friendly. Luxe BNB Cleaning is my go-to service.",
    },
    {
      name: "Michael Brown",
      avatar: "/images/avatar4.jpg",
      rating: 4.5,
      feedback:
        "Fantastic job! They even handled tough stains I thought were impossible to remove.",
    },
    {
      name: "Michael Brown",
      avatar: "/images/avatar4.jpg",
      rating: 4.5,
      feedback:
        "Fantastic job! They even handled tough stains I thought were impossible to remove.",
    },
  ];

  return (
    <section className="py-16 gradient-blue">
     <div className="max-w-7xl mx-auto px-1 sm:px-9">
      {/* Section Title */}
    <div className="mb-12 text-center">
    <h1 className="header">What Our Clients Are Saying</h1>
     <p className="subheader mt-3">
            Real experiences from our satisfied clients.
          </p>
    </div>

{/* Testimonials Slider */}
<Swiper
  spaceBetween={20}
  loop={true}
  autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
  speed={3000}
  pagination={{ clickable: true }}
  breakpoints={{
    640: { slidesPerView: 1 }, // For medium devices (md)
    768: { slidesPerView: 2 }, // For large devices (lg)
    1024: { slidesPerView: 3 }, // For extra-large devices (xl)
    1280: { slidesPerView: 4 }, // Default (4 slides on larger screens)
  }}
  modules={[Autoplay, Pagination]}
  className="w-full h-full "
>
  {testimonyInfo.map((info, index) => (
    <SwiperSlide
      key={index}
      className="shadow-lg bg-[#f7f7f7] mx-6 p-6 rounded-lg mb-16 text-center w-full h-full"
    >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
                <img
                 src="../../assets/imgs/hero_2.jpg"
                  alt={info.name}
                  className="w-full h-full object-cover"
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
          <button className="btn hover:gradient transition-all ease-in-out duration-300 bg-green text-white max-xs:text-sm md:text-lg font-semibold">
            Book Service Now
          </button>
        </div>
     </div>
    </section>
  );
};

export default TestimonialsSection;
