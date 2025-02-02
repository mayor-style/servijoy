import React from "react";
import { Link } from "react-router-dom";

const HowItWorksHero = () => {
  return (
    <section className="relative w-full gradient-black  py-20 pt-40 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between border-b border-gray-500" >
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Text Content */}
      <div className="max-w-xl relative text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-header font-bold text-gray-100 leading-tight">
          How <span className="text-gradient">ServiJoy</span> Works
        </h1>
        <p className="text-lg text-gray-200 mt-4">
          Book top-rated service providers effortlessly. No stress, no delays—just premium, reliable service at your fingertips.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col lg:flex-row lg:space-x-4">
          <Link
            to="/services"
            className="btn-blue max-lg:mb-4"
          >
            Get Started
          </Link>
          <Link
            to="/register-vendor"
            className=" btn-green "
          >
            Become a Vendor
          </Link>
        </div>
      </div>

      {/* Image / Illustration */}
      <div className="mt-10 relative lg:mt-0 lg:w-1/2">
        <img
          src="../../assets/imgs/flooring.jpg"
          alt="How it works"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default HowItWorksHero;
