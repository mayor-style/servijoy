import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <div className="py-[200px] lg:py-0 lg:min-h-[100vh] flex w-full relative bg-hero bg-no-repeat bg-cover bg-center">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-black "></div>

      {/* Hero Content */}
      <div className="relative flex text-center w-full m-auto justify-center items-center flex-col text-white z-10 px-5 md:px-10">
        {/* Headline */}
        <div className="">
        <h1 className=" md:text-5xl lg:text-6xl xl:text-7xl pb-3 font-header text-4xl  max-xs:text-3xl font-bold">
         Find the Best Professional
        </h1>
        <h1 className=" mt-3 md:text-5xl lg:text-6xl xl:text-7xl pb-3 font-header text-4xl  max-xs:text-3xl font-bold">
          in Your Area
        </h1>
        </div>

        {/* Subtext */}
        <p className=" sm:text-lg max-xs:text-sm  md:text-xl lg:text-2xl text-light-gray font-semibold lg:max-w-3xl xl:max-w-4xl">
          Reliable, vetted and ready to help with all your needs.
        </p>

        {/* CTA Buttons */}
        
      </div>
    </div>
  );
};

export default Hero;
