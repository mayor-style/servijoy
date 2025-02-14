

// File: components/settings/ProfileSettings.jsx
import React, { useState } from 'react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    avatar: "/images/avatar-placeholder.png",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Save profile logic here (e.g., API call)
    console.log("Profile saved:", profile);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-lg mx-auto">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white">Profile Settings</h3>
      <div className="space-y-4 md:space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 md:mb-2 dark:text-white">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {/* Email Field */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 md:mb-2 dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {/* Phone Field */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 md:mb-2 dark:text-white">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        {/* Avatar URL Field */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 md:mb-2 dark:text-white">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={profile.avatar}
            onChange={handleChange}
            className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-lg font-semibold transition transform active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
