import React from "react";
import aboutImage from "../../assets/imgs/home_repair.webp"; // Replace with your real image
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OptimizedImage from "../OptimizedImage";

const AboutStory = () => {
   const { ref, inView } = useInView({
                  triggerOnce: true, // Runs only once
                  threshold: 0.5, // Ensures smooth visibility before animation
                });
  return (
    <section className="w-full gradient-blue py-20">
      <div className="container mx-auto gap-6 px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        {/* Left Side - Image */}
        <motion.div 
         ref={ref}
         initial={{ opacity: 0, x: -100 }}
         animate={inView ? { opacity: 1, x: 0 } : {}}
         transition={{ duration: 0.6, ease: "easeOut", delay:0.2 }}
        className="lg:w-1/2">
          <OptimizedImage 
            src={aboutImage}
            alt="Our Story"
            className=" rounded-lg shadow-lg "
            width={600}
            height={400}
            rounded={'rounded-2xl '}
          />
        </motion.div>

        {/* Right Side - Story Text */}
        <motion.div
         ref={ref}
         initial={{ opacity: 0, x: 100 }}
         animate={inView ? { opacity: 1, x: 0 } : {}}
         transition={{ duration: 0.6, ease: "easeOut", delay:0.2 }}
        className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
          <h2 className="header">The Story Behind <span className="text-gradient">ServiJoy</span></h2>
          <p className="subheader text-gray-700 mt-4">
            Finding reliable service providers has always been a struggle.
            Many people end up dealing with overpriced, unqualified, or even
            fraudulent vendors. We saw a gap, and we decided to fill it.
          </p>
          <p className="subheader text-gray-700 mt-4">
            That’s why <span className="text-gradient font-medium">ServiJoy</span> was born—to create
            a seamless, trustworthy, and efficient bridge between skilled
            professionals and people who need their services.
          </p>
          <p className="subheader text-gray-700 mt-4">
            Our goal? To make service booking effortless, reliable, and
            transparent. Whether you need a cleaner, a plumber, or an event
            planner—<span className="font-medium text-gradient">ServiJoy</span> ensures you get the best.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStory;
