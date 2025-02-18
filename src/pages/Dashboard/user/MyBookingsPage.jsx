import { useState } from "react";
import UpcomingBookings from "./components/MyBookingsSections/UpcomingBookings";
import PastBookings from "./components/MyBookingsSections/PastBookings";
import PendingRequests from "./components/MyBookingsSections/PendingRequests";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("requests");

  // Mock Data for Bookings (Simulating API Response)
  const upcomingBookings = [
    {
      id: 1,
      serviceName: "Home Cleaning",
      vendorName: "John Doe",
      date: "March 15, 2025",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      serviceName: "Plumbing Repair",
      vendorName: "Jane Smith",
      date: "March 18, 2025",
      time: "2:30 PM",
      status: "Pending",
    },
  ];

  const pastBookings = [
    {
      id: 3,
      serviceName: "Electrician Service",
      vendorName: "Mark Wilson",
      date: "February 10, 2025",
      rating: 4,
      receiptAvailable: true,
    },
    {
      id: 4,
      serviceName: "Car Wash",
      vendorName: "Lisa Brown",
      date: "January 25, 2025",
      rating: null, // Not rated yet
      receiptAvailable: false,
    },
  ];

  const pendingRequests = [
    {
      id: 5,
      serviceName: "Gardening Service",
      vendorName: "Tom Green",
      date: "March 20, 2025",
      status: "Waiting for Provider Approval",
    },
  ];

  return (
    <section className="w-full py-4 md:py-8 px-3 bg-white dark:bg-gray-800  shadow-2xl rounded-2xl transition-all duration-300">
      <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 font-header dark:text-gray-200">
        My Bookings
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
        <button
          className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold  transition-colors duration-200 text-sm md:text-base ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold  transition-colors duration-200 text-sm md:text-base ${
            activeTab === "past"
              ? "bg-blue-600 text-white"
              : "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
        <button
          className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-colors duration-200 text-sm md:text-base ${
            activeTab === "requests"
              ? "bg-blue-600 text-white"
              : "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full overflow-x-auto">
        {activeTab === "upcoming" && <UpcomingBookings bookings={upcomingBookings} />}
        {activeTab === "past" && <PastBookings pastBookings={pastBookings} />}
        {activeTab === "requests" && <PendingRequests requests={pendingRequests} />}
      </div>
    </section>
  );
};

export default MyBookings;
