// File: components/settings/PrivacySettings.jsx
import React, { useState } from 'react';

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public", // options: public, private, friends
    dataSharing: false,
  });

  const handleChange = (key, value) => {
    setPrivacy({
      ...privacy,
      [key]: value,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700  mx-auto">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white font-header">Privacy Settings</h3>
      <div className="space-y-4 md:space-y-6">
        {/* Profile Visibility */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 md:mb-2 dark:text-white">
            Profile Visibility
          </label>
          <select
            value={privacy.profileVisibility}
            onChange={(e) => handleChange("profileVisibility", e.target.value)}
            className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>

        {/* Data Sharing Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base dark:text-white">
            Share my data with third-parties
          </span>
          <button
            onClick={() => handleChange("dataSharing", !privacy.dataSharing)}
            className={`px-4 md:px-6 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 ${
              privacy.dataSharing
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            }`}
          >
            {privacy.dataSharing ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;