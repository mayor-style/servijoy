import { FaUserCheck } from "react-icons/fa";
import OptimizedImage from "../OptimizedImage";

const BecomeVendorHero = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col relative lg:flex-row items-center justify-between px-6 md:px-12 pt-32 lg:px-20 gradient-black text-white py-16">
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Left Content */}
      <div className="max-w-2xl relative text-center lg:text-left">
        <h1 className="text-4xl font-header md:text-5xl font-bold leading-tight mb-4">
          Earn More. Work Freely.  
          <span className="block text-gradient">Join ServiJoy Today!</span>
        </h1>
        <p className="text-lg text-white/80 max-w-lg">
          Connect with customers, grow your business, and get paid with ease.  
          Join a trusted platform that brings real work to real service providers.  
        </p>

        {/* CTA Button */}
        <button className="mt-6 flex justify-center max-lg:mt-8 items-center gap-1 max-lg:m-auto btn-green">
          <FaUserCheck className="text-lg" />
          Get Started Now
        </button>
      </div>

      {/* Right Side Image/Graphic */}
      <div className="hidden relative lg:block w-1/2">
        <OptimizedImage 
        src="../../assets/imgs/carpentry.webp" 
        alt="Vendor Working" 
        className="w-full h-auto rounded-xl shadow-lg"
        rounded={'rounded-xl shadow-lg '}
        />
      </div>

    </section>
  );
};

export default BecomeVendorHero;
