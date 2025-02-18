import { useContext } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { FaEnvelope, FaBell, FaChevronRight } from "react-icons/fa";

const RecentMessagesNotifications = () => {
  const { user } = useAuth();

  // Mock Data (Replace with API data later)
  const messages = [
    { id: 1, sender: "John Doe (Cleaner)", text: "Your booking is confirmed!", time: "2h ago", unread: true },
    { id: 2, sender: "Sarah (Plumber)", text: "I’ll be there by 4 PM.", time: "1d ago", unread: false },
  ];

  const notifications = [
    { id: 1, type: "booking", text: "New booking request received!", time: "30m ago", unread: true },
    { id: 2, type: "dispute", text: "Your dispute has been resolved.", time: "1d ago", unread: false },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 font-header dark:text-white">
          Messages & Notifications
        </h3>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1  gap-6">
        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                msg.unread
                  ? "bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FaEnvelope className="text-blue-600 dark:text-blue-400 text-2xl" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {msg.sender}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {msg.text}
                </p>
              </div>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                notif.unread
                  ? "bg-green/30 dark:bg-green/60 border-l-4 border-green-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <FaBell className="text-green/90 dark:text-green text-2xl" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {notif.text}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {notif.time}
                </p>
              </div>
              <FaChevronRight className="text-gray-400 text-base" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentMessagesNotifications;
