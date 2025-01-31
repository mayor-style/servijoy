import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Example Services (Replace with actual API fetch later)
  const services = ['Plumbing', 'Cleaning', 'Electrician', 'Painting', 'Carpentry', 'AC Repair'];
  const locations = ['Ilorin', 'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'];

  return (
    <div className="py-[170px] lg:py-0 lg:min-h-[90vh] flex w-full relative bg-hero bg-no-repeat bg-cover bg-center">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative flex text-center w-full m-auto justify-center items-center flex-col text-white z-10 xs:px-5 md:px-10">
        
        {/* Headline */}
        <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-header leading-tight">
          Find the Best <span className="text-gradient">Professional</span> <br className="hidden md:block" /> in Your Area
        </h1>

        {/* Subtext */}
        <p className="sm:text-lg max-xs:text-sm md:text-xl lg:text-2xl text-light-gray font-semibold lg:max-w-3xl xl:max-w-4xl mt-4">
          Reliable, vetted, and ready to help with all your needs.
        </p>

        {/* Service & Location Search */}
        <div className="mt-8 bg-white max-sm:text-sm rounded-xl flex flex-col md:flex-row p-4 md:p-2 items-center max-xs:max-w-sm gap-4 shadow-lg w-full md:w-auto max-w-3xl">
          
          {/* Service Dropdown */}
          <div className="relative flex-1 w-full md:w-64">
            <select
              className="w-full px-4 py-3 text-black bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">What service do you need?</option>
              {services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="relative flex-1 w-full md:w-64">
            <select
              className="w-full px-4 py-3 text-black bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <Link
            to={`/services?category=${selectedService}&location=${selectedLocation}`}
            className={`flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition ${
              !selectedService || !selectedLocation ? 'opacity-50 pointer-events-none' : 'hover:bg-blue-600'
            }`}
          >
            <FaSearch className="mr-2" /> Search
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Hero;
