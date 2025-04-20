import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const UpcomingBookings = ({ bookings }) => {
  const [expandedBooking, setExpandedBooking] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  return (
    <section className="w-full p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-green-500 dark:text-green-400 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Upcoming Bookings
          </h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {bookings.length}
        </div>
      </div>

      {bookings.length === 0 ? (
        <motion.div
          className="text-center py-16 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaCalendarAlt className="text-6xl mx-auto mb-6 text-gray-400 dark:text-gray-500" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            No Upcoming Bookings
          </h3>
          <p className="text-sm mt-3 max-w-md mx-auto text-gray-500 dark:text-gray-400">
            Book a service now to get started!
          </p>
          <button className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto">
            Explore Services
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              className={`border ${
                expandedBooking === booking.id
                  ? "border-green-300 dark:border-green-600 shadow-lg"
                  : "border-gray-200 dark:border-gray-600 hover:shadow-md"
              } rounded-xl bg-white dark:bg-gray-700 transition-all duration-300 cursor-pointer`}
              onClick={() => toggleExpand(booking.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {booking.serviceName}
                      </h3>
                      <p className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <FaUser className="mr-2 text-green-500" /> {booking.vendorName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <div className="flex flex-col text-right">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <FaCalendarAlt className="text-gray-400 dark:text-gray-500" />
                        <span className="text-sm">{booking.date}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedBooking === booking.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400 dark:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Booking Details
                        </h4>
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
                        </div>
                      </div>
                      <div>
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                          <FaClock className="mr-2 text-green-500" /> Time: {booking.time}
                        </p>
                        <p className="mt-3 text-gray-700 dark:text-gray-300">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              booking.status === "Confirmed"
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </p>
                        <div className="flex justify-end mt-6">
                          {booking.status === "Confirmed" && (
                            <button
                              className="btn btn-error flex items-center gap-2 px-5 py-2"
                              aria-label="Cancel booking"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Implement cancellation logic here
                              }}
                            >
                              <FaTimes /> Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
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

export default UpcomingBookings;
