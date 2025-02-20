// File: components/vendor/bookingDashboard/VendorRecentMessages.jsx
import React from "react";
import { FaBell, FaEnvelopeOpenText, FaRegEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const VendorRecentMessages = () => {
  return (
    <div className="gradient relative dark:gradient-reverse text-white p-6 sm:p-8 rounded-2xl shadow-2xl transition-transform duration-300 border border-transparent dark:border-gray-700">
      <div className="absolute inset-0 dark:bg-black/20 bg-black/10"></div>
      <h2 className="xs:text-2xl text-xl relative sm:text-3xl font-header font-bold mb-6">
        📩 Recent Messages & Notifications
      </h2>

      {/* Notification Bell Section */}
      <div className="flex flex-col relative sm:flex-row items-center justify-between bg-white/25 dark:bg-white/20 p-4 rounded-xl mb-6 border border-white/20 dark:border-gray-600 transition hover:bg-white/30 dark:hover:bg-white/30">
        <div className="flex items-center gap-3">
          <FaBell className="text-3xl" />
          <p className="text-base">
            🔔 You have <strong>2</strong> new notifications
          </p>
        </div>
        <Link to={'/dashboard/notifications'} className="mt-4 sm:mt-0 text-xs bg-white/40 dark:bg-white/30 px-4 py-2 rounded-full hover:bg-white/50 dark:hover:bg-white/40 transition">
          View All
        </Link>
      </div>

      {/* Recent Messages Section */}
      <div className="space-y-4 relative">
        {/* Unread Message */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white/25 dark:bg-white/20 p-4 rounded-xl border border-white/20 dark:border-gray-600 transition hover:bg-white/30 dark:hover:bg-white/30">
          <div className="flex items-center gap-3">
            <FaRegEnvelope className="text-3xl text-yellow-300" />
            <div>
              <p className="text-base font-semibold">John Doe</p>
              <p className="text-sm">"Hey, can you confirm my booking?"</p>
            </div>
          </div>
          <span className="mt-2 sm:mt-0 text-xs bg-yellow-400 text-black px-3 py-1 rounded-full">
            New
          </span>
        </div>

        {/* Read Message */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white/15 dark:bg-white/10 p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition">
          <div className="flex items-center gap-3">
            <FaEnvelopeOpenText className="text-3xl text-gray-300" />
            <div>
              <p className="text-base font-semibold">Jane Smith</p>
              <p className="text-sm">"Thanks for the service! Great work!"</p>
            </div>
          </div>
          <span className="mt-2 sm:mt-0 text-xs bg-white/40 dark:bg-white/30 px-3 py-1 rounded-full">
            Read
          </span>
        </div>
      </div>
    </div>
  );
};

export default VendorRecentMessages;
