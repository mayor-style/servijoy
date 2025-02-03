import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../ServiceCard"; // Import the reusable card component
import sampleImg from '../../assets/imgs/hero_2.webp'

const featuredServices = [
  { id: 1, name: "Deep Home Cleaning", img: "/images/cleaning.webp" },
  { id: 2, name: "24/7 Plumbing Support", img: "/images/plumbing.webp" },
  { id: 3, name: "Emergency Electrical Repairs", img: "/images/electrical.webp" },
];

const FeaturedServices = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="header text-black"
        >
          Featured Premium Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="subheader text-gray-600 max-w-xl mx-auto mt-2"
        >
          Our most in-demand services, trusted by thousands of happy customers.
        </motion.p>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="flex justify-center flex-wrap gap-6 mt-10"
        >
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.name}
              img={sampleImg}
              gradient={index % 2 === 1} // Apply gradient to every second card
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
