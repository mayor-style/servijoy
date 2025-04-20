import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { Calendar, ChevronDown, Filter, RefreshCw, X } from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const OrdersFiltersSortingPanel = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    customer: "",
    dateRange: { startDate: null, endDate: null, key: "selection" },
  });

  const [sortOption, setSortOption] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // Filter options
  const orderStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "canceled", label: "Canceled" },
  ];

  const paymentStatusOptions = [
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
    { value: "partially_paid", label: "Partially Paid" },
    { value: "refunded", label: "Refunded" },
  ];

  const sortOptions = [
    { value: "orderDate", label: "Order Date (Newest)" },
    { value: "orderDateAsc", label: "Order Date (Oldest)" },
    { value: "totalAmount", label: "Total Amount (High to Low)" },
    { value: "totalAmountAsc", label: "Total Amount (Low to High)" },
    { value: "orderStatus", label: "Order Status" },
  ];

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    updateActiveFilters(name, value);
  };

  const updateActiveFilters = (name, value) => {
    if (!value || (name === "dateRange" && !value.startDate)) {
      setActiveFilters(activeFilters.filter(filter => filter.name !== name));
      return;
    }
    
    let label = value;
    if (name === "status") {
      label = orderStatusOptions.find(opt => opt.value === value)?.label || value;
    } else if (name === "paymentStatus") {
      label = paymentStatusOptions.find(opt => opt.value === value)?.label || value;
    } else if (name === "dateRange" && value.startDate) {
      const start = value.startDate?.toLocaleDateString();
      const end = value.endDate?.toLocaleDateString();
      label = start === end ? start : `${start} - ${end}`;
    }
    
    const existingIndex = activeFilters.findIndex(filter => filter.name === name);
    if (existingIndex >= 0) {
      const newFilters = [...activeFilters];
      newFilters[existingIndex] = { name, value, label };
      setActiveFilters(newFilters);
    } else {
      setActiveFilters([...activeFilters, { name, value, label }]);
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange(value);
  };

  const handleDateRangeChange = (ranges) => {
    const range = ranges.selection;
    handleFilterChange("dateRange", range);
  };

  const removeFilter = (filterName) => {
    if (filterName === "dateRange") {
      handleFilterChange("dateRange", { startDate: null, endDate: null, key: "selection" });
    } else {
      handleFilterChange(filterName, "");
    }
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      paymentStatus: "",
      customer: "",
      dateRange: { startDate: null, endDate: null, key: "selection" },
    });
    setSortOption("");
    setActiveFilters([]);
    onFilterChange({});
    onSortChange("");
  };

  const formatDateDisplay = () => {
    const { startDate, endDate } = filters.dateRange;
    if (!startDate) return "Select Date Range";
    
    const start = startDate.toLocaleDateString();
    const end = endDate?.toLocaleDateString();
    
    return start === end ? start : `${start} - ${end}`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header with title and reset button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          <h3 className="font-medium text-gray-700">Filter Orders</h3>
        </div>
        
        <button 
          onClick={resetFilters}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <RefreshCw size={14} className="mr-1" />
          Reset Filters
        </button>
      </div>
      
      {/* Filter controls */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1">Order Status</label>
          <div className="relative">
            <select
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Statuses</option>
              {orderStatusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1">Payment Status</label>
          <div className="relative">
            <select
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.paymentStatus}
              onChange={(e) => handleFilterChange("paymentStatus", e.target.value)}
            >
              <option value="">All Payments</option>
              {paymentStatusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1">Customer</label>
          <input
            type="text"
            placeholder="Name or Email"
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.customer}
            onChange={(e) => handleFilterChange("customer", e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1">Date Range</label>
          <div className="relative">
            <button 
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              <span className={`${!filters.dateRange.startDate ? 'text-gray-400' : 'text-gray-700'}`}>
                {formatDateDisplay()}
              </span>
              <Calendar size={16} className="text-gray-400" />
            </button>
            
            {isCalendarOpen && (
              <div className="absolute z-10 mt-1 right-0 shadow-lg rounded-md bg-white border border-gray-200">
                <DateRange
                  ranges={[filters.dateRange]}
                  onChange={handleDateRangeChange}
                  months={1}
                  direction="vertical"
                  className="p-2"
                />
                <div className="flex justify-end p-2 border-t border-gray-100">
                  <button 
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => setIsCalendarOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Active filters and sorting */}
      <div className="border-t border-gray-100 p-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.length > 0 && (
            <>
              <span className="text-xs text-gray-500">Active filters:</span>
              {activeFilters.map(filter => (
                <div key={filter.name} className="flex items-center bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                  <span className="font-medium mr-1 capitalize">{filter.name === "dateRange" ? "Date" : filter.name}:</span>
                  <span>{filter.label}</span>
                  <button onClick={() => removeFilter(filter.name)} className="ml-1 text-blue-600 hover:text-blue-800">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        
        <div className="relative min-w-40">
          <div className="relative">
            <select
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort Orders</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersFiltersSortingPanel;