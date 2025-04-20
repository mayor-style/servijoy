import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bell, CheckCircle, X, RefreshCw, AlertCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Notifications = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "unread", "read"
  const [refreshing, setRefreshing] = useState(false);

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/notifications`, { withCredentials: true });
      if (response.data.success) {
        // Map _id to id and format the date if needed
        const data = response.data.data.map((n) => ({
          id: n._id,
          title: n.title,
          message: n.message,
          date: new Date(n.createdAt).toLocaleString(),
          read: n.read,
          // Add timestamp for sorting
          timestamp: new Date(n.createdAt).getTime(),
        }));
        // Sort by newest first
        data.sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(data);
      } else {
        setError("Failed to fetch notifications.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Refresh notifications
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setTimeout(() => {
      setRefreshing(false);
    }, 800); // Show refresh animation for at least 800ms
  };

  // Handler to mark a single notification as read
  const handleMarkRead = async (id) => {
    try {
      const response = await axios.put(`${baseUrl}/api/notifications/${id}/read`, {}, { withCredentials: true });
      if (response.data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err.response?.data?.message);
    }
  };

  // Handler to mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      const response = await axios.put(`${baseUrl}/api/notifications/read-all`, {}, { withCredentials: true });
      if (response.data.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      }
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err.response?.data?.message);
    }
  };

  // Format the date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const hasNotifications = notifications.length > 0;

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-6">
        <div className="w-full max-w-3xl px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-6">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center">
          <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button 
            onClick={fetchNotifications}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-3 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                disabled={refreshing}
              >
                <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="px-4 py-2 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Mark All Read</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            <button
              onClick={() => setFilter("all")}
              className={`pb-3 px-4 font-medium text-sm ${
                filter === "all"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`pb-3 px-4 font-medium text-sm ${
                filter === "unread"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`pb-3 px-4 font-medium text-sm ${
                filter === "read"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {hasNotifications ? (
              filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl border ${
                      notification.read 
                        ? "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800" 
                        : "border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-gray-800/60"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className={`font-semibold text-gray-900 dark:text-white mb-1 ${!notification.read && "text-blue-700 dark:text-blue-400"}`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(notification.date)}
                        </div>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkRead(notification.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                          aria-label="Mark as read"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No {filter} notifications found.</p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Notifications</h3>
                <p className="text-gray-500 dark:text-gray-400">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;