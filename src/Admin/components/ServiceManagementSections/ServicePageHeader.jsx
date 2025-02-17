import React from "react";
import { FaPlus } from "react-icons/fa";

const ServicePageHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-600 dark:text-gray-300 space-x-2">
        <span>Admin Dashboard</span>
        <span className="mx-1">/</span>
        <span>Service Management</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Service Management
      </h1>

      {/* Quick Actions Button */}
      <button
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
      >
        <FaPlus />
        Add New Service Category
      </button>
    </div>
  );
};

export default ServicePageHeader;
