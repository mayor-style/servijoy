import React, { useState } from "react";
import { FaHistory, FaStar, FaReceipt, FaCalendarAlt, FaClock, FaUser, FaBuilding } from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const PastBookings = ({ pastBookings }) => {
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [ratings, setRatings] = useState({});
  const [isHovering, setIsHovering] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  const handleRate = async (orderId, rating, e) => {
    e.stopPropagation(); // Prevent toggle expand when rating
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/orders/${orderId}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRatings((prev) => ({ ...prev, [orderId]: rating }));
    } catch (error) {
      console.error("Failed to rate order:", error);
    }
  };

  const handleDownloadReceipt = (e, bookingId) => {
    e.stopPropagation();
    // Implement receipt download logic
    console.log(`Downloading receipt for booking ${bookingId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "No-show":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  return (
    <section className="w-full p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaHistory className="text-blue-500 dark:text-blue-400 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Past Bookings
          </h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {pastBookings.length}
        </div>
      </div>

      {pastBookings.length === 0 ? (
        <motion.div 
          className="text-center py-16 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaHistory className="text-6xl mx-auto mb-6 text-gray-400 dark:text-gray-500" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Past Bookings</h3>
          <p className="text-sm mt-3 max-w-md mx-auto text-gray-500 dark:text-gray-400">
            You haven't made any bookings yet. When you do, your booking history will appear here.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto">
            <FaCalendarAlt /> Book a Service
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {pastBookings.map((booking) => (
            <motion.div
              key={booking.id}
              className={`border ${expandedBooking === booking.id ? 'border-blue-300 dark:border-blue-600' : 'border-gray-200 dark:border-gray-600'} 
                rounded-xl bg-white dark:bg-gray-700 transition-all duration-300 
                ${expandedBooking === booking.id ? 'shadow-lg' : 'hover:shadow-md'}`}
              onMouseEnter={() => setIsHovering(booking.id)}
              onMouseLeave={() => setIsHovering(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="p-5 cursor-pointer"
                onClick={() => toggleExpand(booking.id)}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 items-center justify-center">
                      <FaBuilding className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        {booking.serviceName}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <FaUser className="text-gray-400 dark:text-gray-500" />
                        <span>{booking.vendorName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <div className="flex flex-col text-right">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <FaCalendarAlt className="text-gray-400 dark:text-gray-500" />
                        <span className="text-sm">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mt-1">
                        <FaClock className="text-gray-400 dark:text-gray-500" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                    </div>
                    <motion.div 
                      animate={{ rotate: expandedBooking === booking.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400 dark:text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedBooking === booking.id && (
                  <motion.div
                    className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 p-5 rounded-b-xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Booking Details</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Service:</span> {booking.serviceName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Vendor:</span> {booking.vendorName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Date:</span> {booking.date}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Time:</span> {booking.time}
                          </p>
                        </div>
                      </div>

                      <div>
                        {booking.status === "Completed" && !booking.rating && !ratings[booking.id] && (
                          <div>
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Rate Your Experience</h4>
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => handleRate(booking.id, i + 1, e)}
                                  className="focus:outline-none"
                                >
                                  <FaStar
                                    className={`text-2xl transition-colors duration-200 ${
                                      isHovering === booking.id && i < ratings[booking.id] ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                                    }`}
                                    aria-label={`Rate ${i + 1} stars`}
                                  />
                                </button>
                              ))}
                              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Tap to rate</span>
                            </div>
                          </div>
                        )}

                        {(booking.rating || ratings[booking.id]) && (
                          <div>
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Your Rating</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`text-lg ${
                                    i < (ratings[booking.id] || booking.rating)
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {ratings[booking.id] || booking.rating}/5
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {booking.receiptAvailable && (
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-500">
                        <button 
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                          onClick={(e) => handleDownloadReceipt(e, booking.id)}
                        >
                          <FaReceipt />
                          Download Receipt
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PastBookings;