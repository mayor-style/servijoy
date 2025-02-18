// File: components/myBookings/PastBookings.jsx
import React, { useState } from "react";
import { FaCalendarAlt, FaUser, FaRedo, FaStar, FaDownload } from "react-icons/fa";

const PastBookings = ({ pastBookings }) => {
  const [expandedBooking, setExpandedBooking] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  return (
    <section className="w-full p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl transition-all duration-300">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Past Bookings
      </h2>

      {(!pastBookings || pastBookings.length === 0) ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No past bookings available.
        </p>
      ) : (
        <div className="space-y-6">
          {pastBookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl bg-gray-50 dark:bg-gray-700 transition-shadow duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              onClick={() => toggleExpand(booking.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {booking.serviceName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center mt-1">
                    <FaUser className="mr-2 text-blue-600" /> {booking.vendorName}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" /> {booking.date}
                </div>
              </div>

              {expandedBooking === booking.id && (
                <div className="mt-6 bg-gray-100 dark:bg-gray-600 p-6 rounded-xl transition-all duration-300">
                  <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaUser className="mr-2 text-blue-600" /> Vendor: {booking.vendorName}
                  </p>
                  <p className="mt-4 flex items-center">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Rating:</span>
                    <span className="flex ml-3 space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(booking.rating)
                              ? "text-yellow-500"
                              : "text-gray-300 dark:text-gray-400"
                          }
                          size={20}
                        />
                      ))}
                    </span>
                  </p>

                  {!booking.rated && (
                    <button className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg transition-all hover:bg-blue-600 hover:text-white">
                      <FaStar className="mr-2" /> Rate Service
                    </button>
                  )}

                  <div className="flex justify-end gap-4 mt-6">
                    <button className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-500 rounded-lg transition-all hover:bg-green-500 hover:text-white">
                      <FaRedo className="text-lg" /> Rebook
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400 rounded-lg transition-all hover:bg-gray-500 hover:text-white">
                      <FaDownload className="text-lg" /> Download Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PastBookings;

