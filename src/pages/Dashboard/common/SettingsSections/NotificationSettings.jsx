import React, { useState, useEffect } from 'react';
import { FaBell, FaEnvelope, FaMobile, FaInfoCircle, FaRegBell } from 'react-icons/fa';
import  Switch  from '../../../../components/custom/Switch'; // Assuming you have a Switch component
import { motion } from 'framer-motion';

const NotificationSettings = ({ notifications = {}, onChange }) => {
  // Default state with incoming props or fallbacks
  const [settings, setSettings] = useState({
    email: notifications.email ?? true,
    sms: notifications.sms ?? false,
    push: notifications.push ?? true,
    marketing: notifications.marketing ?? false,
    weeklyDigest: notifications.weeklyDigest ?? true,
    mentions: notifications.mentions ?? true,
    teamUpdates: notifications.teamUpdates ?? true,
  });

  // Categories for better organization
  const notificationCategories = [
    {
      id: 'channels',
      title: 'Notification Channels',
      description: 'Choose how you want to receive notifications',
      items: [
        {
          key: 'email',
          icon: <FaEnvelope />,
          label: 'Email Notifications',
          description: 'Receive updates and alerts via email',
        },
        {
          key: 'sms',
          icon: <FaMobile />,
          label: 'SMS Notifications',
          description: 'Receive time-sensitive updates via text message',
        },
        {
          key: 'push',
          icon: <FaBell />,
          label: 'Push Notifications',
          description: 'Receive alerts on your browser or mobile app',
        },
      ],
    },
    {
      id: 'types',
      title: 'Notification Types',
      description: 'Choose which types of notifications you want to receive',
      items: [
        {
          key: 'mentions',
          icon: <FaRegBell />,
          label: 'Mentions & Tags',
          description: 'Get notified when someone mentions or tags you',
        },
        {
          key: 'teamUpdates',
          icon: <FaRegBell />,
          label: 'Team Updates',
          description: 'Receive updates about team activities and changes',
        },
        {
          key: 'weeklyDigest',
          icon: <FaRegBell />,
          label: 'Weekly Digest',
          description: 'Get a summary of activity once a week',
        },
        {
          key: 'marketing',
          icon: <FaRegBell />,
          label: 'Marketing & Promotions',
          description: 'Receive updates about new features and special offers',
        },
      ],
    },
  ];

  // Update parent component when settings change
  useEffect(() => {
    onChange(settings);
  }, [settings, onChange]);

  // Handle toggle switch change
  const handleToggle = (key) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] };
      return newSettings;
    });
  };

  // Toggle all settings in a category
  const toggleCategory = (categoryId, value) => {
    const category = notificationCategories.find(cat => cat.id === categoryId);
    if (!category) return;
    
    const updates = {};
    category.items.forEach(item => {
      updates[item.key] = value;
    });
    
    setSettings(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Check if all items in a category are enabled/disabled
  const getCategoryStatus = (categoryId) => {
    const category = notificationCategories.find(cat => cat.id === categoryId);
    if (!category) return { all: false, some: false };
    
    const enabled = category.items.filter(item => settings[item.key]);
    return {
      all: enabled.length === category.items.length,
      some: enabled.length > 0 && enabled.length < category.items.length
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
          <FaBell className="text-blue-600 dark:text-blue-300 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Notification Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage how and when you receive notifications</p>
        </div>
      </div>

      {notificationCategories.map((category) => (
        <div key={category.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{category.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleCategory(category.id, true)}
                  className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  Enable All
                </button>
                <button
                  onClick={() => toggleCategory(category.id, false)}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  Disable All
                </button>
              </div>
            </div>
            
            {getCategoryStatus(category.id).some && !getCategoryStatus(category.id).all && (
              <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <FaInfoCircle />
                <span>Some notifications in this category are disabled</span>
              </div>
            )}
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {category.items.map((item) => (
              <div
                key={item.key}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-0">
                  <div className="mt-1 text-gray-500 dark:text-gray-400">{item.icon}</div>
                  <div>
                    <h4 className="font-medium dark:text-white">{item.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
                
                <Switch
                  checked={settings[item.key]}
                  onChange={() => handleToggle(item.key)}
                  aria-label={`Toggle ${item.label}`}
                  size="lg"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <h4 className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium">
          <FaInfoCircle />
          <span>Additional Settings</span>
        </h4>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
          You can set quiet hours and notification schedules in the mobile app settings.
        </p>
      </div>
    </motion.div>
  );
};

export default NotificationSettings;