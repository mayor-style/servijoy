import React, { useState } from 'react';

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    dataSharing: false,
    activityStatus: true,
    searchIndexing: true,
  });

  const handleChange = (key, value) => {
    setPrivacy({ ...privacy, [key]: value });
  };

  // Toggle switch component for better UX
  const ToggleSwitch = ({ id, label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
      <div className="space-y-1">
        <label htmlFor={id} className="font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <button
        id={id}
        onClick={onChange}
        className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        role="switch"
        aria-checked={checked}
        type="button"
      >
        <span
          className={`${
            checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
          } inline-block h-6 w-11 rounded-full transition`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition ease-in-out duration-200 mt-1`}
          />
        </span>
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 max-w-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Privacy Settings</h3>
      </div>
      
      <div className="mb-6">
        <label htmlFor="profileVisibility" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
          Profile Visibility
        </label>
        <div className="relative">
          <select
            id="profileVisibility"
            value={privacy.profileVisibility}
            onChange={(e) => handleChange('profileVisibility', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            aria-label="Select profile visibility"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Public: Visible to everyone
          <br />
          Friends Only: Only visible to people you've connected with
          <br />
          Private: Only visible to you
        </p>
      </div>
      
      <div className="space-y-1">
        <ToggleSwitch
          id="dataSharing"
          label="Allow Data Sharing"
          description="Share anonymous usage data to help improve our services"
          checked={privacy.dataSharing}
          onChange={() => handleChange('dataSharing', !privacy.dataSharing)}
        />
        
        <ToggleSwitch
          id="activityStatus"
          label="Show Activity Status"
          description="Let others see when you're online"
          checked={privacy.activityStatus}
          onChange={() => handleChange('activityStatus', !privacy.activityStatus)}
        />
        
        <ToggleSwitch
          id="searchIndexing"
          label="Appear in Search Results"
          description="Allow your profile to be found through search"
          checked={privacy.searchIndexing}
          onChange={() => handleChange('searchIndexing', !privacy.searchIndexing)}
        />
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium focus:outline-none focus:underline"
          onClick={() => console.log('Privacy policy clicked')}
        >
          View Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;