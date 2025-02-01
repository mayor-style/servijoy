import React from "react";
import { FaHandshake, FaRocket, FaGlobe } from "react-icons/fa";

const AboutMission = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        {/* Left Side - Text */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="header">Our Mission & Vision</h2>
          <p className="subheader text-gray-700 mt-4">
            At <span className="span">ServiJoy</span>, our mission is to
            revolutionize service accessibility by seamlessly connecting skilled
            professionals with those in need. We believe in **efficiency,
            reliability, and trust.**
          </p>
          <p className="subheader text-gray-700 mt-4">
            Our vision is to create a **future where finding and booking trusted
            services is effortless**—from local repairs to premium
            professionals. We aim to **bridge the gap between quality service
            providers and satisfied customers, ensuring fair opportunities for
            all.**
          </p>
        </div>

        {/* Right Side - Icons */}
        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <FaHandshake className="text-5xl text-green" />
              <p className="subheader mt-2 text-gray-700">Trust & Integrity</p>
            </div>
            <div className="flex flex-col items-center">
              <FaRocket className="text-5xl text-blue-500" />
              <p className="subheader mt-2 text-gray-700">Innovation & Growth</p>
            </div>
            <div className="flex flex-col items-center">
              <FaGlobe className="text-5xl text-black" />
              <p className="subheader mt-2 text-gray-700">Global Impact</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
