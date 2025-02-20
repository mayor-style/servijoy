import React from "react";
import { FaPlus } from "react-icons/fa";

const ServicePageHeader = () => {
  return (
    <div className="flex md:flex-row  gap-3 mt-16  items-center flex-col justify-between p-6 bg-soft-white dark:bg-gray-800 shadow-md rounded-lg mb-6 transition">

      {/* Page Title */}
      <h1 className="text-2xl header font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
        Service Management
      </h1>
      
      {/* Breadcrumb Navigation */}
     {/* 
      <nav className="flex items-center text-sm text-gray-600 dark:text-gray-300 space-x-2 mb-4 md:mb-0">
        <span>Admin Dashboard</span>
        <span className="mx-1">/</span>
        <span>Service Management</span>
      </nav>
     */}

      

      {/* Quick Actions Button */}
      <button className="flex items-center gap-2 bg-blue-600 btn-blue hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
        <FaPlus />
        Add New Service Category
      </button>
    </div>
  );
};

export default ServicePageHeader;
