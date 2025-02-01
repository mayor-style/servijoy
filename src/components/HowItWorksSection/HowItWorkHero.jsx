import React from "react";
import { Link } from "react-router-dom";

const HowItWorksHero = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#f8f9fa] to-[#ffffff] py-20 pt-40 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between border-b border-gray-500" >
      {/* Text Content */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-header font-bold text-gray-900 leading-tight">
          How <span className="text-gradient">ServiJoy</span> Works
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Book top-rated service providers effortlessly. No stress, no delays—just premium, reliable service at your fingertips.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
          <Link
            to="/services"
            className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-opacity-90 transition"
          >
            Get Started
          </Link>
          <Link
            to="/register-vendor"
            className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-300 transition mt-3 sm:mt-0"
          >
            Become a Vendor
          </Link>
        </div>
      </div>

      {/* Image / Illustration */}
      <div className="mt-10 md:mt-0 md:w-1/2">
        <img
          src="../../assets/imgs/hero_2.jpg"
          alt="How it works"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default HowItWorksHero;
