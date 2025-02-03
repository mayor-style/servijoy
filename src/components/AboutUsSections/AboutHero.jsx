import React from "react";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="w-full bg-hero bg-cover relative bg-no-repeat text-white pt-32 min-h-[70vh] py-24">
        <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative mx-auto px-4 lg:px-20 flex flex-col items-center text-center">
        <motion.h1
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
        className="header text-gradient">
          Empowering Seamless Service Connections
        </motion.h1>
        <motion.p
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut", delay:0.2 }}
        className="subheader max-w-2xl mt-4 text-gray-100">
          ServiJoy is a premium platform connecting top-rated service providers
          with individuals in need. We bridge the gap between quality and
          convenience, ensuring a hassle-free experience every time.
        </motion.p>
        <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut", delay:0.6 }}
        className="mt-6 flex flex-wrap justify-center gap-3 items-center">
          <button className="btn-green">Explore Services</button>
          <button className="btn-blue">Become a Vendor</button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
