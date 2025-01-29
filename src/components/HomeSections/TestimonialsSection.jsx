import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const TestimonialsSection = () => {
  const testimonyInfo = [
    { name: "Jacob Samuel" },
    { name: "John Doe" },
    { name: "Papa James 1" },
    { name: "Papa James 2" },
    { name: "Papa James 3" },
    { name: "Papa James 4" },
  ];

  return (
    <div className="py-[80px] px-6 h-full w-full gradient-blue">
      <h1 className="header mb-14 text-center">What Our Clients Are Saying</h1>

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
        className="w-full h-full"
      >
        {testimonyInfo.map((info, index) => (
          <SwiperSlide
            key={index}
            className="shadow-lg bg-[#f7f7f7] mb-14 px-4 py-6 rounded-xl h-full"
          >
            <div>
              <div className="flex gap-4 items-center">
                <img
                  className="object-cover h-20 w-20 rounded-full"
                  src="../../assets/imgs/hero_2.jpg"
                  alt=""
                />

                <div>
                  <h1 className="font-header pb-1 text-lg text-black font-medium">
                    {info.name}
                  </h1>
                  <p className="font-subheading font-normal border w-fit text-black py-1 px-3 border-gray-300 rounded-full">
                    User
                  </p>
                </div>
              </div>

              <p className=" pt-4">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi enim ab minus architecto nulla aliquid voluptas eligendi
                adipisci maxime neque."
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsSection;
