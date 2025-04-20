import { useState, useEffect } from "react";
import axios from "axios";
import BookingFilters from "./components/BookingRequestSections/BookingFilters";
import BookingRequestsList from "./components/BookingRequestSections/BookingRequestsList";
import debounce from "lodash.debounce";
import { useAuth } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaServer, FaDev, FaCheck } from "react-icons/fa";

// Toast notification component
const Toast = ({ toast }) => {
  if (!toast.show) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
        toast.type === "success"
          ? "bg-green/50 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      {toast.type === "success" ? (
        <FaCheck className="text-white" />
      ) : (
        <FaExclamationTriangle className="text-white" />
      )}
      <span>{toast.message}</span>
    </motion.div>
  );
};

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the range of pages to display
  const getPageRange = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    if (currentPage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }
    
    return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
  };

  const pageRange = getPageRange();
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center items-center gap-2 mt-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        className="btn btn-sm sm:btn-md btn-outline gap-2 dark:border-gray-700 dark:text-gray-300"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Go to first page"
      >
        First
      </button>
      <button
        className="btn btn-sm sm:btn-md btn-outline gap-2 dark:border-gray-700 dark:text-gray-300"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      
      <div className="join mx-2" role="navigation" aria-label="Pagination">
        {pageRange.map((pageNum) => (
          <button
            key={pageNum}
            className={`join-item btn btn-sm sm:btn-md ${
              currentPage === pageNum
                ? "btn-primary"
                : "btn-outline dark:border-gray-700 dark:text-gray-300"
            }`}
            onClick={() => onPageChange(pageNum)}
            aria-label={`Page ${pageNum}`}
            aria-current={currentPage === pageNum ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>
      
      <button
        className="btn btn-sm sm:btn-md btn-outline gap-2 dark:border-gray-700 dark:text-gray-300"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
      </button>
      <button
        className="btn btn-sm sm:btn-md btn-outline gap-2 dark:border-gray-700 dark:text-gray-300"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Go to last page"
      >
        Last
      </button>
      
      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
    </motion.div>
  );
};

// Development mode controls component
const DevModeControls = ({ devMode, showEmptyState, onToggleEmptyState, onExitDevMode }) => {
  if (!devMode) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 mb-6 relative"
    >
      <div className="absolute top-2 right-2 bg-indigo-200 dark:bg-indigo-800 text-xs font-bold px-2 py-1 rounded-md">
        DEV MODE
      </div>
      <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
        <FaDev /> Development Testing Controls
      </h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onToggleEmptyState}
          className={`btn btn-sm ${
            showEmptyState ? "btn-warning" : "btn-outline"
          }`}
        >
          {showEmptyState ? "Show Dummy Data" : "Show Empty State"}
        </button>
        <button
          onClick={onExitDevMode}
          className="btn btn-sm btn-outline"
        >
          Exit Dev Mode
        </button>
      </div>
      <div className="mt-2 text-xs text-indigo-700 dark:text-indigo-300">
        Note: These controls are for development purposes only and should be removed in production.
      </div>
    </motion.div>
  );
};

// Empty state component
const EmptyState = ({ filteredText }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center my-8"
    >
      <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
        No booking requests {filteredText ? "match your filters" : "yet"}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        {filteredText 
          ? "Try adjusting your search or filter criteria to see more results."
          : "When customers book your services, their requests will appear here for you to manage."
        }
      </p>
    </motion.div>
  );
};

// Loading state component
const LoadingState = () => {
  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -10,
    },
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <div className="text-center p-8 max-w-md">
        <div className="inline-block mx-auto mb-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Loading Booking Requests
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Please wait while we fetch your data...
        </p>
      </div>
    </motion.div>
  );
};

// Error state component
const ErrorState = ({ error, onRetry, onUseTestData }) => {
  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -10,
    },
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <div className="text-center p-8 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <div className="inline-block mx-auto mb-6 text-red-500 dark:text-red-400">
          <FaExclamationTriangle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-2">Oops! Something went wrong</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="btn btn-primary inline-flex items-center justify-center gap-2"
          >
            <FaServer /> Retry Connection
          </button>
          <button
            onClick={onUseTestData}
            className="btn btn-outline inline-flex items-center justify-center gap-2 dark:text-gray-300"
          >
            <FaDev /> Use Test Data
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const BookingRequestsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    dateRange: { start: null, end: null },
  });
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // DEV MODE CONTROLS - for development & testing only
  const [devMode, setDevMode] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Generate dummy data for development purposes
  const generateDummyData = () => {
    const statuses = ["pending", "accepted", "rejected"];
    const services = ["House Cleaning", "Lawn Mowing", "Window Washing", "Pressure Washing", "Carpet Cleaning"];
    
    return Array.from({ length: 15 }, (_, i) => ({
      id: `dummy-${i}`,
      customer: {
        name: `Customer ${i + 1}`,
      },
      service: services[Math.floor(Math.random() * services.length)],
      date: new Date(Date.now() + Math.random() * 30 * 86400000).toLocaleDateString(),
      price: Math.floor(Math.random() * 200) + 50,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      rejectionReason: Math.random() > 0.7 ? "Schedule conflict" : "",
    }));
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Skip API call if in dev mode
        if (devMode) {
          const dummyData = showEmptyState ? [] : generateDummyData();
          setBookings(dummyData);
          setFilteredBookings(dummyData);
          setLoading(false);
          return;
        }
        
        const baseUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.get(`${baseUrl}/api/orders/vendor`, {withCredentials:true});
        if (response.data.success) {
          const mappedOrders = response.data.data.map((order) => {
            const scheduledDate = new Date(order.scheduledTime);
            return {
              id: order._id,
              customer: {
                name:
                  order.user && order.user.profile
                    ? `${order.user.profile.firstName || ""} ${order.user.profile.lastName || ""}`.trim() || order.user.email
                    : order.user.email,
              },
              service: order.service && order.service.title ? order.service.title : "N/A",
              date: scheduledDate.toLocaleDateString(),
              price: order.price,
              status: order.status,
              rejectionReason: order.rejectionReason || "",
            };
          });
          setBookings(mappedOrders);
          setFilteredBookings(mappedOrders);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch booking requests.");
        setLoading(false);
      }
    };

    if (user || devMode) fetchBookings();
  }, [user, devMode, showEmptyState]);

  // Filter bookings when filters or bookings change
  useEffect(() => {
    if (loading) return;
    const filtered = bookings.filter((booking) => {
      const statusMatch =
        filters.status === "all" ||
        booking.status.toLowerCase() === filters.status;
      const searchMatch =
        booking.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        booking.service.toLowerCase().includes(filters.search.toLowerCase());
      let dateMatch = true;
      if (filters.dateRange.start) {
        dateMatch = new Date(booking.date) >= new Date(filters.dateRange.start);
      }
      if (filters.dateRange.end) {
        dateMatch =
          dateMatch && new Date(booking.date) <= new Date(filters.dateRange.end);
      }
      return statusMatch && searchMatch && dateMatch;
    });
    setFilteredBookings(filtered);
  }, [filters, bookings, loading]);

  // Adjust current page when filtered bookings change
  useEffect(() => {
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [filteredBookings, currentPage, itemsPerPage]);

  const handleFilterChange = debounce((newFilters) => {
    setFilters(newFilters);
  }, 300);

  // Handle booking status update (vendor accepting/rejecting a booking)
  const handleUpdateBookingStatus = async (id, action, reason = "") => {
    try {
      // Validate rejection reason if required
      if (action === "rejected" && !reason.trim()) {
        showToast("Please provide a reason for rejection.", "error");
        return;
      }

      // Handle dev mode updates without API calls
      if (devMode) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id
              ? { ...booking, status: action, rejectionReason: reason }
              : booking
          )
        );
        showToast("Booking status updated successfully", "success");
        return;
      }
      
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.put(
        `${baseUrl}/api/orders/${id}/vendor-status`,
        { status: action, rejectionReason: reason },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id
              ? { ...booking, status: action, rejectionReason: reason }
              : booking
          )
        );
        
        showToast("Booking status updated successfully", "success");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Error updating booking status.";
      showToast(errorMessage, "error");
    }
  };

  // Toast notification functionality
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the listing when changing pages
    window.scrollTo({ top: document.querySelector('.bookings-list-container')?.offsetTop - 100 || 0, behavior: 'smooth' });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -10,
    },
  };

  // Handle retry connection
  const handleRetry = () => {
    setLoading(true);
    setError(null);
  };

  // Handle exit dev mode
  const handleExitDevMode = () => {
    setDevMode(false);
    setShowEmptyState(false);
    setLoading(true);
  };

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState 
        error={error} 
        onRetry={handleRetry} 
        onUseTestData={() => setDevMode(true)} 
      />
    );
  }

  // Check if we have filtered results
  const isFiltered = filters.status !== "all" || filters.search !== "" || filters.dateRange.start || filters.dateRange.end;

  return (
    <motion.div 
      className="p-4 sm:py-6 px-4 dark:bg-gray-900 min-h-screen transition-all duration-300"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* DEV MODE CONTROLS */}
        <DevModeControls 
          devMode={devMode}
          showEmptyState={showEmptyState}
          onToggleEmptyState={() => setShowEmptyState(!showEmptyState)}
          onExitDevMode={handleExitDevMode}
        />
        
        {/* Page Header */}
        <header className="mb-6 sm:mb-8">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-header font-bold text-gray-800 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Manage Booking Requests
          </motion.h1>
          <motion.p 
            className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Review and manage all your incoming service booking requests in one place.
          </motion.p>
        </header>
        
        {/* Filters Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <BookingFilters onFilterChange={handleFilterChange} />
        </motion.div>
        
        {/* Bookings List or Empty State */}
        <div className="bookings-list-container">
          {currentBookings.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BookingRequestsList
                bookings={currentBookings}
                onUpdateBookingStatus={handleUpdateBookingStatus}
              />
            </motion.div>
          ) : (
            <EmptyState filteredText={isFiltered} />
          )}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      
      {/* Toast notification */}
      <Toast toast={toast} />
    </motion.div>
  );
};

export default BookingRequestsPage;