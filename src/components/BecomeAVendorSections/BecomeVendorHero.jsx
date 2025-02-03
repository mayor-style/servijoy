import { FaUserCheck } from "react-icons/fa";
import OptimizedImage from "../OptimizedImage";
import { motion } from "framer-motion";

const BecomeVendorHero = () => {
  return (
    <section className="relative w-full gradient-black  py-20 pt-32 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between border-b border-gray-500">
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Left Content */}
      <motion.div
       initial={{ opacity: 0, x: -100 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.6, ease: "easeOut", delay:0.2 }}
      className="max-w-2xl relative text-center lg:text-left">
        <h1 className="sm:text-4xl text-3xl font-header lg:text-5xl text-gray-100 font-bold leading-tight mb-4">
          Earn More. Work Freely.  
          <span className="block pt-2 text-gradient">Join ServiJoy Today!</span>
        </h1>
        <p className="sm:text-lg max-xs:text-sm text-white/80 max-w-lg">
          Connect with customers, grow your business, and get paid with ease.  
          Join a trusted platform that brings real work to real service providers.  
        </p>

        {/* CTA Button */}
        <button className="mt-6 flex justify-center max-lg:mt-8 items-center gap-1 max-lg:m-auto btn-green">
          <FaUserCheck className="text-lg" />
          Get Started Now
        </button>
      </motion.div>

      {/* Right Side Image/Graphic */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay:0.2 }}
      className="mt-10 relative shadow-lg lg:mt-0 lg:w-1/2">
        <OptimizedImage 
        src="../../assets/imgs/carpentry.webp" 
        alt="Vendor Working" 
        className="w-full h-auto"
        rounded={'rounded-xl  '}
        />
      </motion.div>

    </section>
  );
};

export default BecomeVendorHero;
