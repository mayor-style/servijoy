import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaTimes, FaRedo } from "react-icons/fa";

const UpcomingBookings = ({ bookings }) => {
  const [expandedBooking, setExpandedBooking] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  return (
    <section className="w-full p-2 bg-white dark:bg-gray-800 shadow-xl rounded-2xl transition-all duration-300">
      <h2 className="sm:text-2xl text-xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Upcoming Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No upcoming bookings.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl bg-gray-50 dark:bg-gray-700 transition-shadow duration-300 hover:shadow-2xl"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(booking.id)}
              >
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
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
                <div className="mt-6 bg-gray-100 dark:bg-gray-600 p-6 rounded-xl transition-all">
                  <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaClock className="mr-2 text-blue-600" /> Time: {booking.time}
                  </p>
                  <p className="flex items-center mt-3 text-gray-700 dark:text-gray-300">
                    <FaUser className="mr-2 text-blue-600" /> Vendor: {booking.vendorName}
                  </p>
                  <p className="mt-3 dark:text-gray-300 text-base">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        booking.status === "Confirmed"
                          ? "text-green"
                          : booking.status === "Pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>

                  <div className="flex justify-end gap-4 mt-6">
                    {booking.status === "Confirmed" && (
                      <button className="flex items-center gap-2 px-5 py-2 border border-red-500 text-red-500 rounded-lg transition-colors hover:bg-red-500 hover:text-white">
                        <FaTimes className="text-lg" /> Cancel
                      </button>
                    )}
                    {booking.status === "Pending" && (
                      <button className="flex items-center gap-2 px-5 py-2 border border-gray-500 text-gray-700 dark:text-gray-200 rounded-lg transition-colors hover:bg-gray-500 hover:text-white">
                        <FaRedo className="text-lg" /> Reschedule
                      </button>
                    )}
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

export default UpcomingBookings;
