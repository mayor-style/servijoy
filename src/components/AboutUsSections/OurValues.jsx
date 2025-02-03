import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHandshake, FaShieldAlt, FaUsers, FaStar, FaRocket, FaHeart } from "react-icons/fa";

const values = [
  {
    icon: <FaHandshake className="text-green text-3xl" />,
    title: "Trust & Integrity",
    description: "We prioritize honesty, ensuring secure and transparent transactions at all times.",
  },
  {
    icon: <FaShieldAlt className="text-blue-500 text-3xl" />,
    title: "Security & Reliability",
    description: "Your safety matters. We implement top-tier security to protect your interests.",
  },
  {
    icon: <FaUsers className="text-green text-3xl" />,
    title: "Community & Support",
    description: "We’re building a thriving network where users and vendors support each other.",
  },
  {
    icon: <FaStar className="text-yellow-500 text-3xl" />,
    title: "Excellence & Quality",
    description: "We set the highest standards, ensuring top-tier service providers every time.",
  },
  {
    icon: <FaRocket className="text-blue-500 text-3xl" />,
    title: "Innovation & Growth",
    description: "We continuously evolve, adapting to new technologies for a better experience.",
  },
  {
    icon: <FaHeart className="text-red-500 text-3xl" />,
    title: "Customer Satisfaction",
    description: "Our users come first. We strive to make every experience smooth and joyful.",
  },
];

const OurValues = () => {
  const { ref, inView } = useInView({
                triggerOnce: true, // Runs only once
                threshold: 0.5, // Ensures smooth visibility before animation
              });
  
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <motion.div
         ref={ref}
         initial={{ opacity: 0, y:20 }}
         animate={inView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12">
          <h2 className="header text-gradient">What Drives Us</h2>
          <p className="subheader text-gray-600 mt-4">
            These core values define our mission and shape every decision we make.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay:index * 0.3}}
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-lg transition hover:shadow-xl"
            >
              {value.icon}
              <h3 className="text-xl max-sm:text-lg font-semibold mt-4">{value.title}</h3>
              <p className="text-gray-600 max-sm:text-sm mt-2">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
