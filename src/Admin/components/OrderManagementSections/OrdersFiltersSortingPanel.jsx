import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrdersFiltersSortingPanel = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    customer: "",
    dateRange: { start: null, end: null },
  });

  const [sortOption, setSortOption] = useState("");

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div className="p-4 bg-base-200 dark:bg-gray-800 rounded-xl mb-4 transition">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="select select-bordered w-full dark:bg-gray-700 transition"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">Order Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>

        <select
          className="select select-bordered w-full dark:bg-gray-700 transition"
          value={filters.paymentStatus}
          onChange={(e) => handleFilterChange("paymentStatus", e.target.value)}
        >
          <option value="">Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="partially_paid">Partially Paid</option>
          <option value="refunded">Refunded</option>
        </select>

        <input
          type="text"
          placeholder="Customer Name/Email"
          className="input input-bordered w-full dark:bg-gray-700 dark:text-white transition"
          value={filters.customer}
          onChange={(e) => handleFilterChange("customer", e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 dark:text-white">Date Range</label>
          <div className="flex gap-2">
            <DatePicker
              selected={filters.dateRange.start}
              onChange={(date) =>
                handleFilterChange("dateRange", { ...filters.dateRange, start: date })
              }
              placeholderText="From"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white transition"
              dateFormat="yyyy-MM-dd"
            />
            <DatePicker
              selected={filters.dateRange.end}
              onChange={(date) =>
                handleFilterChange("dateRange", { ...filters.dateRange, end: date })
              }
              placeholderText="To"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white transition"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        <select
          className="select select-bordered w-full dark:bg-gray-700 transition"
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="orderDate">Order Date</option>
          <option value="orderStatus">Order Status</option>
          <option value="totalAmount">Total Amount</option>
        </select>
      </div>
    </div>
  );
};

export default OrdersFiltersSortingPanel;
