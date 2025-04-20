import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaBell, FaShieldAlt, FaCog, FaSave, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProfileSettings from './SettingsSections/ProfileSettings';
import SecuritySettings from './SettingsSections/SecuritySettings';
import NotificationSettings from './SettingsSections/NotificationSettings';
import PrivacySettings from './SettingsSections/PrivacySettings';
import PreferencesSettings from './SettingsSections/PreferencesSettings';
import { Toaster } from 'react-hot-toast';

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab');
    return tab && ['profile', 'security', 'notifications', 'privacy', 'preferences'].includes(tab)
      ? tab
      : 'profile';
  });
  
  // Aggregate all settings from the backend into one state object.
  const [settings, setSettings] = useState({
    profile: { firstName: '', lastName: '', phone: '', avatarUrl: '' },
    notifications: { email: true, push: true },
    preferences: { theme: 'light', language: 'en' },
    privacy: { profileVisibility: 'public', showEmail: false },
    security: { twoFactorEnabled: false },
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Memoize the API client to prevent re-creation on every render.
  const api = useMemo(() => axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
    withCredentials: true,
    timeout: 10000, // 10 seconds timeout
    headers: { 'Content-Type': 'application/json' },
  }), []);

  // Update URL query param when active tab changes.
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  // Fetch current settings from backend on mount.
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/settings');
      
      if (response.data.success) {
        setSettings(response.data.data);
        setOriginalSettings(JSON.parse(JSON.stringify(response.data.data))); // Deep clone for comparison
        setError('');
      } else {
        setError(response.data.message || "Failed to load settings.");
      }
    } catch (err) {
      console.error("Settings fetch error:", err);
      setError(err.response?.data?.message || "Failed to load settings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Check if settings have changed compared to original
  useEffect(() => {
    if (originalSettings) {
      const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);
      setHasChanges(changed);
    }
  }, [settings, originalSettings]);

  // Update a specific section of the settings.
  const handleSettingsChange = (section, newData) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newData }
    }));
  };

  // Send updated settings to the backend.
  const handleSave = async () => {
    if (!hasChanges) return;
    
    try {
      setSaveStatus('saving');
      const response = await api.put('/api/settings', settings);
      
      if (response.data.success) {
        setSaveStatus('success');
        setOriginalSettings(JSON.parse(JSON.stringify(settings))); // Update original after successful save
        setHasChanges(false);
      } else {
        setSaveStatus('error');
        setError(response.data.message || "Failed to update settings.");
      }
    } catch (err) {
      console.error("Settings update error:", err);
      setSaveStatus('error');
      setError(err.response?.data?.message || "Failed to update settings. Please try again later.");
    } finally {
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Handle form submission with keyboard
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  // Reset form to original values
  const handleReset = () => {
    if (originalSettings) {
      setSettings(JSON.parse(JSON.stringify(originalSettings)));
      setHasChanges(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSettings
            profile={settings.profile}
            onChange={(newProfile) => handleSettingsChange('profile', newProfile)}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            security={settings.security}
            onChange={(newSecurity) => handleSettingsChange('security', newSecurity)}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            notifications={settings.notifications}
            onChange={(newNotifications) => handleSettingsChange('notifications', newNotifications)}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            privacy={settings.privacy}
            onChange={(newPrivacy) => handleSettingsChange('privacy', newPrivacy)}
          />
        );
      case 'preferences':
        return (
          <PreferencesSettings
            preferences={settings.preferences}
            onChange={(newPreferences) => handleSettingsChange('preferences', newPreferences)}
          />
        );
      default:
        return (
          <ProfileSettings
            profile={settings.profile}
            onChange={(newProfile) => handleSettingsChange('profile', newProfile)}
          />
        );
    }
  };

  const tabs = [
    { label: 'Profile', key: 'profile', icon: <FaUser /> },
    { label: 'Security', key: 'security', icon: <FaLock /> },
    { label: 'Notifications', key: 'notifications', icon: <FaBell /> },
    { label: 'Privacy', key: 'privacy', icon: <FaShieldAlt /> },
    { label: 'Preferences', key: 'preferences', icon: <FaCog /> },
  ];

  if (loading && !originalSettings) {
    return (
      <div className="min-h-screen flex justify-center items-center dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-xl dark:text-white">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 py-4 px-4 sm:py-8" onKeyDown={handleKeyDown}>
      {error && (
        <Toaster 
          type="error" 
          message={error} 
          onClose={() => setError('')} 
          className="fixed top-4 right-4 z-50" 
        />
      )}
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-5 relative">
        {/* Sidebar Toggle Button (Mobile) */}
        <button 
          className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg z-20"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>

        {/* Sidebar Navigation */}
        <motion.div
          className={`${
            sidebarCollapsed ? 'md:w-20' : 'md:w-1/4 lg:w-1/5'
          } bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 flex flex-col sticky top-4 max-h-screen`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ height: 'fit-content' }}
        >
          {/* Sidebar Header */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            {!sidebarCollapsed && (
              <h2 className="text-xl sm:text-2xl font-bold dark:text-white font-header">Settings</h2>
            )}
            <button 
              onClick={toggleSidebar}
              className="hidden md:block text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <FaChevronRight size={16} /> : <FaChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-grow p-4 overflow-y-auto">
            <ul className="space-y-3">
              {tabs.map(({ label, key, icon }) => (
                <li key={key}>
                  <button
                    onClick={() => {
                      setActiveTab(key);
                      // On mobile, collapse sidebar after selection
                      if (window.innerWidth < 768) {
                        setSidebarCollapsed(true);
                      }
                    }}
                    className={`flex items-center gap-2 w-full text-left px-3 sm:px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                    }`}
                    aria-label={`Switch to ${label} settings`}
                    title={sidebarCollapsed ? label : undefined}
                  >
                    <span className="text-lg">{icon}</span>
                    {!sidebarCollapsed && <span>{label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!sidebarCollapsed ? (
              <>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    onClick={handleSave} 
                    disabled={!hasChanges || saveStatus === 'saving'}
                    className={`btn flex items-center justify-center ${hasChanges ? 'btn-primary' : 'btn-disabled'} flex-1`}
                  >
                    <FaSave className="mr-2" />
                    {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                  </button>
                  
                  {hasChanges && (
                    <button 
                      onClick={handleReset} 
                      className="btn btn-outline btn-secondary flex-1"
                      aria-label="Reset changes"
                    >
                      Reset
                    </button>
                  )}
                </div>
                
                {saveStatus === 'success' && (
                  <p className="text-center text-green-500 mt-2 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved successfully!
                  </p>
                )}
                
                {saveStatus === 'error' && (
                  <p className="text-center text-red-500 mt-2">Failed to save.</p>
                )}
                
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <p>Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+S</kbd></p>
                </div>
              </>
            ) : (
              <button 
                onClick={handleSave} 
                disabled={!hasChanges || saveStatus === 'saving'}
                className={`w-full flex justify-center items-center p-2 rounded ${
                  hasChanges ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}
                title="Save Changes"
              >
                <FaSave />
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`${
              sidebarCollapsed ? 'md:w-full' : 'md:w-3/4 lg:w-4/5'
            } bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-300`}
          >
            {/* Content Header */}
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3 text-blue-600 dark:text-blue-400">{tabs.find(tab => tab.key === activeTab)?.icon}</span>
                <h2 className="text-xl sm:text-2xl font-bold dark:text-white font-header">
                  {tabs.find(tab => tab.key === activeTab)?.label} Settings
                </h2>
              </div>
              
              {/* Quick Save Button */}
              {hasChanges && (
                <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="btn btn-sm btn-primary"
              >
                <FaSave className="mr-1" />
                {saveStatus === 'saving' ? 'Saving...' : 'Save'}
              </button>
            )}
          </div>
          
          {/* Content Body */}
          {loading && originalSettings ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              {renderContent()}
            </div>
          )}
          
          {/* Bottom Action Bar - Shows on mobile when changes exist */}
          {hasChanges && (
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700 flex gap-2 z-10">
              <button 
                onClick={handleSave} 
                disabled={saveStatus === 'saving'}
                className="btn btn-primary flex-1"
              >
                <FaSave className="mr-2" />
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                onClick={handleReset} 
                className="btn btn-outline btn-secondary flex-1"
              >
                Reset
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
    
    {/* Save Status Toast - Position fixed to avoid layout shifts */}
    <AnimatePresence>
      {saveStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-20 right-4 p-3 rounded-lg shadow-lg z-50 ${
            saveStatus === 'success' ? 'bg-green-500 text-white' : 
            saveStatus === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
          }`}
        >
          {saveStatus === 'success' && 'Settings saved successfully!'}
          {saveStatus === 'error' && 'Failed to save settings.'}
          {saveStatus === 'saving' && 'Saving changes...'}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default Settings;