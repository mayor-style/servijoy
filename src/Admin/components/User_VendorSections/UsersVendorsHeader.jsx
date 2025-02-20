import React from "react";
import { FaPlus, FaFileExport } from "react-icons/fa";

const UsersVendorsHeader = () => {
  return (
    <div className="bg-soft-white dark:bg-gray-800 p-5 rounded-lg shadow-xl mb-8 transition">
      {/* Header Title & Breadcrumb */}
      <div className="mb-6">
        <h1 className="header text-gray-800 dark:text-white ">
          Users & Vendors Management
        </h1>
        <div className="text-gray-600 dark:text-gray-300 text-xs xs:text-sm mt-1">
          <a href="/dashboard" className="hover:underline">
            Home
          </a>{" "}
          / <span>Users & Vendors</span>
        </div>
      </div>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, role, or status"
          className="input input-bordered w-full transition"
        />
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap w-full gap-4">
        <button className="btn-green flex items-center gap-2 px-4 py-2 transition">
          <FaPlus /> Add New User
        </button>
        <button className="btn-green flex items-center gap-2 px-4 py-2 transition">
          <FaPlus /> Add New Vendor
        </button>
        <button className="btn-blue flex items-center gap-2 px-4 py-2 transition">
          <FaFileExport /> Export Data
        </button>
      </div>
    </div>
  );
};

export default UsersVendorsHeader;
