import { motion } from "framer-motion";
import { FaTools, FaHandHoldingHeart, FaCheckCircle } from "react-icons/fa";

const ServicesHero = () => {
  return (
    <section className="relative w-full sm:min-h-[60vh] flex items-center justify-center pt-36 pb-24 gradient-black">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-5xl text-center text-white px-6">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-gradient font-semibold text-xl"
        >
          Wide Range of Professional Services
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className=" text-white header mt-2"
        >
          Reliable Services, On-Demand!  
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="subheader text-white/80 max-w-3xl mx-auto mt-3"
        >
          Book verified professionals for cleaning, plumbing, home repairs, and more.
          Hassle-free, fast, and secure. Quality service at your fingertips!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="flex flex-wrap items-center gap-4 justify-center mt-6"
        >
          <button className="btn-green flex items-center gap-2">
            <FaCheckCircle /> Book a Service
          </button>
          <button className="btn-blue flex items-center gap-2">
            <FaHandHoldingHeart /> Become a Vendor
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
