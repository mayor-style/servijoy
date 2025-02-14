import React, { useState } from "react";
import NotificationsList from "./NotificationSections/NotificationsList";

const Notifications = () => {
  // MOCK DATA simulating notifications fetched from the backend
  const initialNotifications = [
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your booking for Home Cleaning has been confirmed.",
      date: "2025-02-11 10:00 AM",
      read: false,
    },
    {
      id: 2,
      title: "New Message from Vendor",
      message: "Vendor John Doe sent you a message regarding your booking.",
      date: "2025-02-10 02:30 PM",
      read: true,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Your wallet has been credited with $50.00.",
      date: "2025-02-09 05:45 PM",
      read: false,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Handler to mark a single notification as read
  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Handler to mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Count unread notifications for display in the header button
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-6 sm:py-10 px-0">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <button
            onClick={handleMarkAllRead}
            className="mt-4 sm:mt-0 px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
          >
            Mark All as Read {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        {/* Notifications List Section */}
        <NotificationsList notifications={notifications} onMarkRead={handleMarkRead} />
      </div>
    </div>
  );
};

export default Notifications;
