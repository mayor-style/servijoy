import { useState } from "react";

const OrdersFiltersSortingPanel = ({ onFilterChange, onSortChange }) => {
    const [filters, setFilters] = useState({
      status: '',
      paymentStatus: '',
      customer: '',
      dateRange: { start: '', end: '' },
    });
  
    const [sortOption, setSortOption] = useState('');
  
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
      <div className="p-4 bg-base-200 rounded-xl mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="select select-bordered w-full"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Order Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
  
          <select
            className="select select-bordered w-full"
            value={filters.paymentStatus}
            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
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
            className="input input-bordered w-full"
            value={filters.customer}
            onChange={(e) => handleFilterChange('customer', e.target.value)}
          />
  
          <div className="flex flex-col gap-2">
            <label className="text-sm">Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="input input-bordered w-full"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
              />
              <input
                type="date"
                className="input input-bordered w-full"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
              />
            </div>
          </div>
  
          <select
            className="select select-bordered w-full"
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
  