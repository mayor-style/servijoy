import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown, FaFilter } from "react-icons/fa";

// Custom status badge with improved visual design
const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

// Custom payment badge with visual indicators
const PaymentBadge = ({ payment }) => {
  const getPaymentStyles = (payment) => {
    switch (payment.toLowerCase()) {
      case "paid":
        return "bg-green-50 text-green-700 border-green-100";
      case "unpaid":
        return "bg-red-50 text-red-700 border-red-100";
      case "partially paid":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStyles(payment)}`}>
      {payment}
    </span>
  );
};

// Custom action button with tooltip
const ActionButton = ({ icon, label, onClick, color }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const getColorClass = () => {
    switch (color) {
      case "blue": return "bg-blue-50 hover:bg-blue-100 text-blue-600 focus:ring-blue-500";
      case "amber": return "bg-amber-50 hover:bg-amber-100 text-amber-600 focus:ring-amber-500";
      case "red": return "bg-red-50 hover:bg-red-100 text-red-600 focus:ring-red-500";
      default: return "bg-gray-50 hover:bg-gray-100 text-gray-600 focus:ring-gray-500";
    }
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-2 rounded-full focus:outline-none focus:ring-2 transition-all duration-150 ${getColorClass()}`}
        aria-label={label}
      >
        {icon}
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
          {label}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

// Custom checkbox component
const Checkbox = ({ checked, onChange, indeterminate = false }) => {
  const checkboxRef = React.useRef(null);
  
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  return (
    <div className="relative inline-flex items-center">
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="opacity-0 absolute h-5 w-5 cursor-pointer"
      />
      <div className={`border-2 rounded w-5 h-5 flex flex-shrink-0 justify-center items-center focus-within:border-blue-500 transition-colors duration-200 ease-in-out
        ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 dark:border-gray-600 dark:bg-gray-700'}`}>
        {checked && (
          <svg className="fill-current w-3 h-3 text-white pointer-events-none" viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
        {!checked && indeterminate && (
          <svg className="fill-current w-3 h-3 text-gray-600 dark:text-gray-300 pointer-events-none" viewBox="0 0 20 20">
            <path d="M2 10h16" strokeWidth="2" stroke="currentColor" />
          </svg>
        )}
      </div>
    </div>
  );
};

// Loading skeleton component
const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition animate-pulse">
      <table className="w-full min-w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {[...Array(8)].map((_, i) => (
              <th key={i} className="p-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b dark:border-gray-700">
              {[...Array(8)].map((_, j) => (
                <td key={j} className="p-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Empty state component
const EmptyState = ({ message = "No orders found" }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
        <FaFilter className="text-gray-400 dark:text-gray-500 text-xl" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{message}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
    </div>
  );
};

const OrdersTable = ({ filters, selectedOrders, setSelectedOrders, onOpenModal }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    customer: true,
    date: true,
    status: true,
    payment: true,
    amount: true
  });
  const [columnsMenuOpen, setColumnsMenuOpen] = useState(false);

  // Simulate fetching orders from an API with dummy data
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Extended mock data set for better demonstration
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: "ORD1234",
                customer: "Jane Doe",
                date: "2025-02-17",
                status: "Pending",
                payment: "Unpaid",
                amount: 250.00,
                items: 3,
                location: "New York, NY"
              },
              {
                id: "ORD1235",
                customer: "John Smith",
                date: "2025-02-16",
                status: "Delivered",
                payment: "Paid",
                amount: 350.00,
                items: 5,
                location: "Los Angeles, CA"
              },
              {
                id: "ORD1236",
                customer: "Alice Johnson",
                date: "2025-02-15",
                status: "Processing",
                payment: "Partially Paid",
                amount: 180.00,
                items: 2,
                location: "Chicago, IL"
              },
              {
                id: "ORD1237",
                customer: "Robert Chen",
                date: "2025-02-14",
                status: "Shipped",
                payment: "Paid",
                amount: 425.50,
                items: 7,
                location: "Seattle, WA"
              },
              {
                id: "ORD1238",
                customer: "Maria Garcia",
                date: "2025-02-14",
                status: "Canceled",
                payment: "Refunded",
                amount: 189.99,
                items: 1,
                location: "Miami, FL"
              },
              {
                id: "ORD1239",
                customer: "James Wilson",
                date: "2025-02-13",
                status: "Delivered",
                payment: "Paid",
                amount: 559.95,
                items: 8,
                location: "Austin, TX"
              },
              {
                id: "ORD1240",
                customer: "Sarah Lee",
                date: "2025-02-12",
                status: "Processing",
                payment: "Paid",
                amount: 320.75,
                items: 4,
                location: "Boston, MA"
              }
            ]);
          }, 1000);
        });
        setOrders(response);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Sort orders based on sortField and sortDirection
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Apply filters and sorting
  const processOrders = () => {
    // First filter
    let result = orders.filter((order) => {
      let valid = true;
      if (filters.customer && filters.customer.trim() !== "") {
        valid = valid && order.customer.toLowerCase().includes(filters.customer.toLowerCase());
      }
      if (filters.status && filters.status !== "") {
        valid = valid && order.status.toLowerCase() === filters.status.toLowerCase();
      }
      return valid;
    });

    // Then sort
    result = [...result].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle date strings specifically
      if (sortField === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle strings
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return result;
  };

  const filteredOrders = processOrders();

  // Handle checkbox selection
  const toggleSelect = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length
        ? []
        : filteredOrders.map((order) => order.id)
    );
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    });
  };

  // Format values for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };

  // Creates sort indicator
  const SortIndicator = ({ field }) => {
    if (sortField !== field) {
      return <FaSort size={12} className="ml-1 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <FaSortUp size={12} className="ml-1 text-blue-600" />
    ) : (
      <FaSortDown size={12} className="ml-1 text-blue-600" />
    );
  };

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-sm">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return <EmptyState />;
  }

  const isAllSelected = filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length;
  const isIndeterminate = selectedOrders.length > 0 && selectedOrders.length < filteredOrders.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-200">
      {/* Table toolbar */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Orders {selectedOrders.length > 0 && 
              <span className="ml-2 py-0.5 px-2 rounded-full bg-blue-100 text-blue-800 text-xs">
                {selectedOrders.length} selected
              </span>
            }
          </h3>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setColumnsMenuOpen(!columnsMenuOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Columns
              <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {columnsMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {Object.keys(visibleColumns).map((column) => (
                    <div
                      key={column}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => toggleColumnVisibility(column)}
                    >
                      <Checkbox 
                        checked={visibleColumns[column]} 
                        onChange={() => toggleColumnVisibility(column)} 
                      />
                      <span className="ml-2 capitalize">{column}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="pl-6 py-3 w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={toggleSelectAll}
                />
              </th>
              {visibleColumns.id && (
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Order ID
                    <SortIndicator field="id" />
                  </div>
                </th>
              )}
              {visibleColumns.customer && (
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("customer")}
                >
                  <div className="flex items-center">
                    Customer
                    <SortIndicator field="customer" />
                  </div>
                </th>
              )}
              {visibleColumns.date && (
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    <SortIndicator field="date" />
                  </div>
                </th>
              )}
              {visibleColumns.status && (
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    <SortIndicator field="status" />
                  </div>
                </th>
              )}
              {visibleColumns.payment && (
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("payment")}
                >
                  <div className="flex items-center">
                    Payment
                    <SortIndicator field="payment" />
                  </div>
                </th>
              )}
              {visibleColumns.amount && (
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center">
                    Total
                    <SortIndicator field="amount" />
                  </div>
                </th>
              )}
              <th scope="col" className="pl-4 pr-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredOrders.map((order) => (
              <tr 
                key={order.id} 
                onMouseEnter={() => setHoveredRow(order.id)} 
                onMouseLeave={() => setHoveredRow(null)}
                className={`transition-colors ${hoveredRow === order.id ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <td className="pl-6 py-4 whitespace-nowrap">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelect(order.id)}
                  />
                </td>
                {visibleColumns.id && (
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </div>
                  </td>
                )}
                {visibleColumns.customer && (
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {order.location}
                    </div>
                  </td>
                )}
                {visibleColumns.date && (
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatDate(order.date)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </div>
                  </td>
                )}
                {visibleColumns.status && (
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                )}
                {visibleColumns.payment && (
                  <td className="px-4 py-4 whitespace-nowrap">
                    <PaymentBadge payment={order.payment} />
                  </td>
                )}
                {visibleColumns.amount && (
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(order.amount)}
                  </td>
                )}
                <td className="pl-4 pr-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <ActionButton
                      icon={<FaEye size={14} />}
                      label="View Details"
                      onClick={() => onOpenModal("details", order)}
                      color="blue"
                    />
                    <ActionButton
                      icon={<FaEdit size={14} />}
                      label="Edit Order"
                      onClick={() => onOpenModal("edit", order)}
                      color="amber"
                    />
                    <ActionButton
                      icon={<FaTrash size={14} />}
                      label="Delete Order"
                      onClick={() => onOpenModal("delete", order)}
                      color="red"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> orders
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900 text-sm font-medium text-blue-600 dark:text-blue-200"
              >
                2
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                3
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white">
                ...
              </span>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
               <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
        <div className="flex sm:hidden">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option>Page 1</option>
            <option>Page 2</option>
            <option>Page 3</option>
          </select>
        </div>
      </div>

      {/* Batch actions panel - appears when orders are selected */}
      {selectedOrders.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="p-2 rounded-lg bg-blue-600 shadow-lg sm:p-3">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <span className="flex p-2 rounded-lg bg-blue-800">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <p className="ml-3 font-medium text-white truncate">
                    <span className="md:hidden">
                      {selectedOrders.length} orders selected
                    </span>
                    <span className="hidden md:inline">
                      {selectedOrders.length} orders selected. What would you like to do with these orders?
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                    >
                      Update Status
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-blue-500"
                    >
                      Export
                    </button>
                  </div>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOrders([])}
                    className="-mr-1 flex p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;