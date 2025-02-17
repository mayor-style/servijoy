import { ChevronRightIcon, PlusIcon } from 'lucide-react';

export default function OrderManagementHeader() {
  return (
    <div className="w-full bg-base-200 p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-400">
        <span>Admin Dashboard</span>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-primary font-medium">Order Management</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-base-content mt-2 md:mt-0">Order Management</h1>

      {/* Quick Actions Button */}
      <button className="btn btn-primary mt-3 md:mt-0">
        <PlusIcon size={18} className="mr-2" /> Add New Order
      </button>
    </div>
  );
}