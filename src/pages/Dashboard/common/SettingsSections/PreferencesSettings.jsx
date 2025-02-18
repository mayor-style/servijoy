

import React, { useState } from 'react';

const PreferencesSettings = () => {
  const [preferences, setPreferences] = useState({
    theme: "system", // options: light, dark, system
    language: "en",  // options: en, es, fr, etc.
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full  mx-auto">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white text-center md:text-left font-header">Preferences</h3>
      <div className="space-y-4 md:space-y-6">
        {/* Theme Selector */}
        <div>
          <label className="block text-base font-semibold mb-1 md:mb-2 dark:text-white">Theme</label>
          <select
            value={preferences.theme}
            onChange={(e) => handlePreferenceChange("theme", e.target.value)}
            className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
        {/* Language Selector */}
        <div>
          <label className="block text-base font-semibold mb-1 md:mb-2 dark:text-white">Language</label>
          <select
            value={preferences.language}
            onChange={(e) => handlePreferenceChange("language", e.target.value)}
            className="w-full p-3 md:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;
