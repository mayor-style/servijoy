import React, { useState } from 'react'; 

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full  mx-auto">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 dark:text-white text-center md:text-left font-header">Notification Settings</h3>
      <div className="space-y-4 md:space-y-6">
        {/* Email Notifications */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-base md:text-lg dark:text-white">Email Notifications</span>
          <button
            onClick={() => handleToggle("emailNotifications")}
            className={`px-4 md:px-6 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 ${
              settings.emailNotifications
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {settings.emailNotifications ? "On" : "Off"}
          </button>
        </div>
        {/* SMS Notifications */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-base md:text-lg dark:text-white">SMS Notifications</span>
          <button
            onClick={() => handleToggle("smsNotifications")}
            className={`px-4 md:px-6 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 ${
              settings.smsNotifications
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {settings.smsNotifications ? "On" : "Off"}
          </button>
        </div>
        {/* Push Notifications */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-base md:text-lg dark:text-white">Push Notifications</span>
          <button
            onClick={() => handleToggle("pushNotifications")}
            className={`px-4 md:px-6 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 ${
              settings.pushNotifications
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {settings.pushNotifications ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;