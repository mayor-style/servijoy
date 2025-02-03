import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OptimizedImage from "../components/OptimizedImage"; // Import if you're using it

const ServiceCard = ({ title, img, gradient = false, hiddenOnSmall = false }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className={`relative flex h-36 items-center sm:gap-4 cursor-pointer shadow-lg hover:shadow-2xl transition-all 
        sm:h-[350px] w-full rounded-2xl bg-green sm:w-72
        ${gradient ? "gradient" : ""}
        ${hiddenOnSmall ? "sm:flex hidden" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50,
      }}
      transition={{
        duration: 0.5,
        delay: 0.4, // Delay to make animation smooth
        ease: "easeOut",
      }}
    >
      <div className="p-2 sm:w-full w-[60%] h-full sm:absolute inset-0">
        <OptimizedImage
          src={img}
          alt={`${title} Image`}
          className="sm:h-[60%] h-full w-full object-cover "
          rounded="rounded-2xl "
        />
      </div>

      <div className="px-3 text-left w-full text-gray-200 sm:absolute bottom-3">
        <h2 className="text-white font-header font-semibold text-lg sm:text-xl">{title}</h2>
        <p className="font-semibold max-xs:text-sm">
          {`Experience the best ${title} service on ServiJoy!`}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
