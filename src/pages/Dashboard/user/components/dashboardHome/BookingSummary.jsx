import { useAuth } from "../../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaClock, FaCheckCircle } from "react-icons/fa";

const BookingSummary = () => {
  const { user } = useAuth();

  // Mock data (Replace with real API data when ready)
  const upcomingBooking = {
    service: "House Cleaning",
    provider: "Joy's Cleaning Services",
    date: "Feb 12, 2025",
    time: "10:00 AM",
  };

  const pastBooking = {
    service: "Plumbing Repair",
    provider: "FixIt Plumbing",
    date: "Feb 3, 2025",
    status: "Completed",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Upcoming Booking Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl hover:scale-[1.02]">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <FaClock className="text-blue-600 dark:text-blue-400 text-3xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-header">
              Upcoming Booking
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Your next service is scheduled soon.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {upcomingBooking.service}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Provider: {upcomingBooking.provider}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Date: {upcomingBooking.date} • Time: {upcomingBooking.time}
          </p>
        </div>

        <Link
          to="/dashboard/my-bookings"
          className="mt-6 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          View All Bookings →
        </Link>
      </div>

      {/* Past Booking Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition hover:shadow-xl hover:scale-[1.02]">
        <div className="flex items-center gap-4">
          <div className="bg-green/50 dark:bg-green p-3 rounded-full">
            <FaCheckCircle className="text-green-600 dark:text-green-400 text-3xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-header">
              Last Completed Booking
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Your most recent service experience.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {pastBooking.service}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Provider: {pastBooking.provider}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Date: {pastBooking.date}
          </p>
          <p className="text-sm font-semibold text-green">{pastBooking.status}</p>
        </div>

        <Link
          to="/dashboard/my-bookings"
          className="mt-6 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          View All Bookings →
        </Link>
      </div>
    </div>
  );
};

export default BookingSummary;
