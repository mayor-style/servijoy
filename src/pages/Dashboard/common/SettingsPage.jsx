

// File: components/settings/Settings.jsx
import React, { useState } from 'react';
import ProfileSettings from './SettingsSections/ProfileSettings';
import SecuritySettings from './SettingsSections/SecuritySettings';
import NotificationSettings from './SettingsSections/NotificationSettings';
import PrivacySettings from './SettingsSections/PrivacySettings';
import PreferencesSettings from './SettingsSections/PreferencesSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "preferences":
        return <PreferencesSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-4 px-0 sm:py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-5 ">
        {/* Sidebar Navigation */}
        <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white font-header">Settings</h2>
          <ul className="space-y-3 sm:space-y-4">
            {[
              { label: "Profile", key: "profile" },
              { label: "Security", key: "security" },
              { label: "Notifications", key: "notifications" },
              { label: "Privacy", key: "privacy" },
              { label: "Preferences", key: "preferences" },
            ].map(({ label, key }) => (
              <li key={key}>
                <button
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                    activeTab === key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Content Area */}
        <div className="md:w-4/6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
