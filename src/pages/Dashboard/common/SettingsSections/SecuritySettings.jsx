// File: components/settings/SecuritySettings.jsx
import React, { useState } from 'react';

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = () => {
    // Add password validation and update logic here
    console.log("Password updated", passwords);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-lg mx-auto">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white text-center">Security Settings</h3>
      <div className="space-y-4 sm:space-y-6">
        {/* Current Password Field */}
        <div>
          <label className="block text-sm sm:text-base font-semibold mb-2 dark:text-white">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {/* New Password Field */}
        <div>
          <label className="block text-sm sm:text-base font-semibold mb-2 dark:text-white">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {/* Confirm New Password Field */}
        <div>
          <label className="block text-sm sm:text-base font-semibold mb-2 dark:text-white">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={passwords.confirmNewPassword}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {/* Update Password Button */}
        <button
          onClick={handleUpdatePassword}
          className="mt-4 sm:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg font-semibold transition transform active:scale-95"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;