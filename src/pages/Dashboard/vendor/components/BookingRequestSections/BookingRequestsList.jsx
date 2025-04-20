import React, { useState, useMemo } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaClock, 
  FaCheck, 
  FaTimes, 
  FaEye, 
  FaSort, 
  FaSortUp, 
  FaSortDown,
  FaFilter,
  FaSearch
} from "react-icons/fa";
import { format, parseISO } from "date-fns";

const BookingRequestsList = ({ bookings, onUpdateBookingStatus }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  const handleAction = (action, reason = "") => {
    if (!selectedBooking) return;
    onUpdateBookingStatus(selectedBooking.id, action, reason);
    handleCloseModal();
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) return <FaSort className="text-gray-300 dark:text-gray-600" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="text-blue-500" /> : 
      <FaSortDown className="text-blue-500" />;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getStatusComponent = (status) => {
    switch(status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <FaClock className="mr-1.5" /> Pending
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <FaCheck className="mr-1.5" /> Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <FaTimes className="mr-1.5" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const filteredAndSortedBookings = useMemo(() => {
    let result = [...bookings];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(booking => 
        booking.customer.name.toLowerCase().includes(lowercasedSearch) ||
        booking.service.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Special handling for nested properties
        if (sortConfig.key === 'customer.name') {
          aValue = a.customer.name;
          bValue = b.customer.name;
        }
        
        // Handle date comparison
        if (sortConfig.key === 'date') {
          aValue = new Date(a.date);
          bValue = new Date(b.date);
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [bookings, sortConfig, searchTerm, statusFilter]);

  const formatDate = (dateString) => {
    try {
      // Attempt to parse and format the date
      return format(parseISO(dateString), 'MMM d, yyyy - h:mm a');
    } catch (error) {
      // Fallback to original string if parsing fails
      return dateString;
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border dark:border-gray-800 p-12 bg-white dark:bg-gray-900 rounded-2xl shadow-xl h-64">
        <img 
          src="/api/placeholder/120/120" 
          alt="No bookings" 
          className="w-20 h-20 mb-4 opacity-50" 
        />
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          No booking requests found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          Try adjusting your filters or check back later for new booking requests.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 border dark:border-gray-800 rounded-2xl shadow-xl transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
          Booking Requests <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({filteredAndSortedBookings.length})</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => requestSort('customer.name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  {getSortIcon('customer.name')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => requestSort('service')}
              >
                <div className="flex items-center space-x-1">
                  <span>Service</span>
                  {getSortIcon('service')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => requestSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {getSortIcon('date')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => requestSort('price')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Price</span>
                  {getSortIcon('price')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => requestSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            <AnimatePresence>
              {filteredAndSortedBookings.map((booking) => (
                <motion.tr
                  key={booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {booking.customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {formatDate(booking.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300 font-mono">
                    {formatPrice(booking.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusComponent(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <button
                      onClick={() => handleOpenModal(booking)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <FaEye className="mr-1.5" /> View Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {filteredAndSortedBookings.length === 0 && (searchTerm || statusFilter !== "all") && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No bookings match your current filters.</p>
          <button 
            className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
          >
            Clear all filters
          </button>
        </div>
      )}
      
      <BookingDetailsModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
        onAction={handleAction}
      />
    </div>
  );
};

export default BookingRequestsList;