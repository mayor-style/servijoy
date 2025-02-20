import React, { useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";

// ACCOUNT SETTINGS COMPONENT
const AccountSettings = () => {
  const [account, setAccount] = useState({
    name: "Admin User",
    email: "admin@example.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Account settings saved!");
  };

  return (
    <div className="p-4 bg-soft-white dark:bg-gray-800 rounded-lg shadow-xl transition">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Account Settings
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={account.name}
          onChange={handleChange}
          className="input input-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={account.email}
          onChange={handleChange}
          className="input input-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save Account Settings
      </button>
    </div>
  );
};

// SECURITY SETTINGS COMPONENT
const SecuritySettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Security settings saved!");
  };

  return (
    <div className="p-4 bg-soft-white dark:bg-gray-800 rounded-lg shadow-xl transition">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Security Settings
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handleChange}
          className="input text-gray-700 dark:text-gray-300 input-bordered w-full dark:bg-gray-700 transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
          className="input text-gray-700 dark:text-gray-300 input-bordered w-full dark:bg-gray-700 transition"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          className="input text-gray-700 dark:text-gray-300 input-bordered w-full dark:bg-gray-700 transition"
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save Security Settings
      </button>
    </div>
  );
};

// NOTIFICATION SETTINGS COMPONENT
const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    alert("Notification settings saved!");
  };

  return (
    <div className="p-4 bg-soft-white dark:bg-gray-800 rounded-lg shadow-xl transition">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Notification Preferences
      </h2>
      <div className="mb-4">
        <label className="flex items-center text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="email"
            checked={notifications.email}
            onChange={handleToggle}
            className="checkbox border  dark:border-gray-700 mr-2"
          />
          Email Notifications
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="sms"
            checked={notifications.sms}
            onChange={handleToggle}
            className="checkbox dark:border-gray-700 mr-2"
          />
          SMS Notifications
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="push"
            checked={notifications.push}
            onChange={handleToggle}
            className="checkbox dark:border-gray-700 mr-2"
          />
          Push Notifications
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save Notification Settings
      </button>
    </div>
  );
};

// THEME SETTINGS COMPONENT
const ThemeSettings = () => {
  const [theme, setTheme] = useState("light");

  const handleChange = (e) => {
    setTheme(e.target.value);
    // Optionally, update global theme (e.g., add a class to the body)
  };

  const handleSave = () => {
    alert(`Theme set to ${theme}`);
  };

  return (
    <div className="p-4 bg-soft-white dark:bg-gray-800 rounded-lg shadow-xl transition">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Theme Options
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Select Theme
        </label>
        <select
          value={theme}
          onChange={handleChange}
          className="select select-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save Theme Settings
      </button>
    </div>
  );
};

// PARENT SETTINGS PAGE COMPONENT
const AdminSettingsPageWrapper = () => {
  return (
    <div className="pt-24 pb-5 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6 transition">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-header mb-6">
        Admin Settings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AccountSettings />
        <SecuritySettings />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <NotificationSettings />
        <ThemeSettings />
      </div>
    </div>
  );
};

const AdminSettingsPage = ()=>{
    return(
        <div className="">
            <AdminDashboardLayout content={AdminSettingsPageWrapper()} />
        </div>
    )
};


export default AdminSettingsPage;
