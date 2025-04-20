import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const PreferencesSettings = () => {
  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      updates: true,
    },
    fontSize: 'medium',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handlePreferenceChange = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleNestedPreferenceChange = (parent, key, value) => {
    setPreferences({
      ...preferences,
      [parent]: {
        ...preferences[parent],
        [key]: value,
      },
    });
  };

  const savePreferences = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Preferences saved:', preferences);
      setIsSaving(false);
      setSaveStatus('success');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    }, 800);
  };

  // Theme options with better labels and icons
  const themeOptions = [
    { value: 'light', label: 'Light Mode', icon: '☀️' },
    { value: 'dark', label: 'Dark Mode', icon: '🌙' },
    { value: 'system', label: 'System Default', icon: '💻' },
  ];

  // Language options with flags and native names
  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' },
  ];

  // Font size options
  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold dark:text-white font-header">Preferences</h3>
        {saveStatus === 'success' && (
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle size={16} className="mr-1" />
            <span>Saved successfully</span>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Theme Selection with Radio Cards */}
        <div className="space-y-3">
          <label className="block text-base font-semibold dark:text-white">Theme</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handlePreferenceChange('theme', option.value)}
                className={`flex items-center p-4 rounded-lg cursor-pointer border transition-colors ${
                  preferences.theme === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/70'
                }`}
              >
                <span className="text-xl mr-3">{option.icon}</span>
                <div>
                  <span className={`font-medium ${preferences.theme === option.value ? 'text-blue-600 dark:text-blue-400' : 'dark:text-white'}`}>
                    {option.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-3">
          <label htmlFor="language" className="block text-base font-semibold dark:text-white">Language</label>
          <select
            id="language"
            value={preferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.flag} {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <label className="block text-base font-semibold dark:text-white">Font Size</label>
          <div className="flex items-center space-x-3">
            {fontSizeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handlePreferenceChange('fontSize', option.value)}
                className={`py-2 px-4 rounded ${
                  preferences.fontSize === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Preferences 
        <div className="space-y-3">
          <label className="block text-base font-semibold dark:text-white">Notifications</label>
          <div className="space-y-2">
            {Object.entries(preferences.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleNestedPreferenceChange('notifications', key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">
                    {key === 'push' ? 'Push notifications' :
                     key === 'email' ? 'Email updates' :
                     key === 'updates' ? 'Product updates' : key}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
*/}
        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={savePreferences}
            disabled={isSaving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;