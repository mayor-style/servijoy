import React from "react";
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const NotificationCard = ({ notification, onMarkRead }) => {
  const navigate = useNavigate();
  
  // Background based on read status
  const bgClass = notification.read
    ? "bg-white dark:bg-gray-800"
    : "bg-blue-50 dark:bg-blue-900";

  // Handle click to mark as read and navigate if a link exists
  const handleClick = () => {
    onMarkRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${bgClass} flex flex-col sm:flex-row sm:items-center sm:justify-between`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
      aria-label={`Notification: ${notification.title}${notification.read ? " (read)" : " (unread)"}`}
    >
      <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
        <FaBell
          className={`${notification.read ? "" : "animate-pulse"} text-blue-600 dark:text-blue-400`}
          size={24}
          aria-hidden="true"
        />
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {notification.title}
          </h3>
          <p
            className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notification.message) }}
          />
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {notification.date}
        </p>
        {!notification.read && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            New
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCard;