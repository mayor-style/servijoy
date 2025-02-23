// File: components/vendor/bookingDashboard/VendorWelcome.jsx
import React from "react";
import { FaRegHandshake } from "react-icons/fa";
import { useAuth } from "../../../../../context/AuthContext";
import { Link } from "react-router-dom";

const VendorWelcome = () => {
  const { user } = useAuth(); // Get vendor data
  const vendorName = user?.name || "Vendor";

  return (
    <div className="gradient-reverse relative dark:gradient-reverse text-white p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 items-center justify-between overflow-hidden transition-all">
      <div className="absolute inset-0 dark:bg-black/20 bg-black/10"></div>
      <div className="mb-4 sm:mb-0 text-left relative">
        <h2 className="sm:text-2xl text-lg xs:text-xl md:text-3xl font-header header font-bold overflow-hidden">
          Welcome back, {vendorName}! 👋
        </h2>
        <p className="mt-0 md:text-base text-sm text-gray-200 overflow-hidden">
          Keep up the great work! Check your new booking requests.
        </p>
      </div>
      <button className="flex relative max-sm:w-full btn-green items-center justify-center gap-2 px-5 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition duration-300">
        
        <Link className="text-sm sm:text-base"
        to={'/dashboard/booking-requests'}
        >View Requests</Link>
      </button>
    </div>
  );
};

export default VendorWelcome;
