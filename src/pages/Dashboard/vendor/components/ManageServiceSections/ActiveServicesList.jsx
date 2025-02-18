// File: components/vendors/ActiveServicesList.jsx
import React from "react";
import ServiceCard from "./ServiceCard";

const ActiveServicesList = () => {
  // Sample data (will be replaced with real API data later)
  const services = [
    { id: 1, name: "Home Cleaning", category: "Cleaning", status: "approved", totalBookings: 24, earnings: 1200 },
    { id: 2, name: "Plumbing Repairs", category: "Plumbing", status: "pending", totalBookings: 5, earnings: 300 },
    { id: 3, name: "Electric Repairs", category: "Electrical", status: "rejected", totalBookings: 0, earnings: 0 },
  ];

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-header dark:text-white mb-8 truncate">
        Your Active Services
      </h2>
      {services.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          You have not added any services yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveServicesList;