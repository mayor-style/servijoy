import React from "react";
import { ChevronRightIcon, PlusIcon } from "lucide-react";

export default function OrderManagementHeader() {
  return (
    <div className="w-full bg-soft-white dark:bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-6 transition">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mb-4 md:mb-0">
        <span>Admin Dashboard</span>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="font-header text-primary font-medium">Order Management</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
        Order Management
      </h1>

      {/* Quick Actions Button */}
      <button className="btn btn-primary flex items-center gap-2 py-2 px-4 rounded-lg transition">
        <PlusIcon size={18} className="mr-2" /> Add New Order
      </button>
    </div>
  );
}
