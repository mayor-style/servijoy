import React, { useState, useEffect } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import { Save, Lock, Bell, PaintBucket, User, ChevronRight, EyeOff, Eye } from "lucide-react";

// Tab interface for better organization
const TabItem = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      active 
        ? "bg-primary text-white shadow-md" 
        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
    }`}
  >
    {icon}
    <span>{label}</span>
    {active && <ChevronRight size={16} />}
  </button>
);

// Form field component for consistency
const FormField = ({ label, id, children, helpText }) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    {children}
    {helpText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</p>}
  </div>
);

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white flex items-center justify-between z-50 min-w-72 animate-slide-up`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-200">
        &times;
      </button>
    </div>
  );
};

// ACCOUNT SETTINGS COMPONENT
const AccountSettings = ({ onSave }) => {
  const [account, setAccount] = useState({
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/api/placeholder/100/100"
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!account.name.trim()) newErrors.name = "Name is required";
    if (!account.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(account.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave("Account settings saved successfully!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition">
      <div className="flex items-center mb-6">
        <User className="text-primary" size={24} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white ml-2">
          Account Settings
        </h2>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
          <img src={account.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Profile Picture</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">JPG, GIF or PNG. Max size 800KB</p>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md transition">
            Change Avatar
          </button>
        </div>
      </div>
      
      <FormField label="Full Name" id="name" helpText="Your name as displayed to other users">
        <input
          type="text"
          id="name"
          name="name"
          value={account.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition`}
          placeholder="Enter your name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </FormField>
      
      <FormField label="Email Address" id="email" helpText="Used for notifications and account recovery">
        <input
          type="email"
          id="email"
          name="email"
          value={account.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </FormField>
      
      <div className="flex justify-end mt-6">
        <button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md"
          onClick={handleSave}
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

// SECURITY SETTINGS COMPONENT
const SecuritySettings = ({ onSave }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Update password strength when new password changes
    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };
  
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const calculatePasswordStrength = (password) => {
    // Simple password strength calculator
    let strength = 0;
    if (password.length > 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };
  
  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-orange-500";
    if (passwordStrength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordStrength(0);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition">
      <div className="flex items-center mb-6">
        <Lock className="text-primary" size={24} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white ml-2">
          Security Settings
        </h2>
      </div>
      
      <FormField label="Current Password" id="currentPassword">
        <div className="relative">
          <input
            type={showPasswords.currentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.currentPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition pr-10`}
            placeholder="Enter current password"
          />
          <button 
            type="button"
            onClick={() => togglePasswordVisibility('currentPassword')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {showPasswords.currentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.currentPassword && <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>}
      </FormField>
      
      <FormField label="New Password" id="newPassword" helpText="Password must be at least 8 characters long">
        <div className="relative">
          <input
            type={showPasswords.newPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition pr-10`}
            placeholder="Enter new password"
          />
          <button 
            type="button"
            onClick={() => togglePasswordVisibility('newPassword')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {showPasswords.newPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {passwordData.newPassword && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">{getStrengthLabel()} Password</span>
              <span className="text-xs">{passwordStrength}%</span>
            </div>
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
          </div>
        )}
        {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>}
      </FormField>
      
      <FormField label="Confirm New Password" id="confirmPassword">
        <div className="relative">
          <input
            type={showPasswords.confirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition pr-10`}
            placeholder="Confirm new password"
          />
          <button 
            type="button"
            onClick={() => togglePasswordVisibility('confirmPassword')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {showPasswords.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
      </FormField>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-6">
        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Two-Factor Authentication</h4>
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        <button className="text-sm text-blue-700 dark:text-blue-300 hover:underline font-medium">
          Enable Two-Factor Authentication →
        </button>
      </div>
      
      <div className="flex justify-end">
        <button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md"
          onClick={handleSave}
        >
          <Save size={16} />
          Update Password
        </button>
      </div>
    </div>
  );
};

// NOTIFICATION SETTINGS COMPONENT
const NotificationSettings = ({ onSave }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    email_types: {
      security: true,
      updates: true,
      marketing: false,
    },
    sms: false,
    push: true,
    push_types: {
      login_alerts: true,
      system_alerts: true,
      task_reminders: false,
    }
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    
    if (name.includes(".")) {
      // Handle nested properties (e.g., email_types.security)
      const [parent, child] = name.split(".");
      setNotifications(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: checked
        }
      }));
    } else {
      setNotifications(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleSave = () => {
    onSave("Notification preferences updated!");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition">
      <div className="flex items-center mb-6">
        <Bell className="text-primary" size={24} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white ml-2">
          Notification Preferences
        </h2>
      </div>
      
      <div className="space-y-6">
        {/* Email notifications */}
        <div className="border-b pb-4 dark:border-gray-700">
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-200">Email Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          
          {notifications.email && (
            <div className="pl-6 space-y-3 mt-3">
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                <input
                  type="checkbox"
                  name="email_types.security"
                  checked={notifications.email_types.security}
                  onChange={handleToggle}
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 mr-2"
                />
                Security alerts and password changes
              </label>
              
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                <input
                  type="checkbox"
                  name="email_types.updates"
                  checked={notifications.email_types.updates}
                  onChange={handleToggle}
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 mr-2"
                />
                Product updates and announcements
              </label>
              
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                <input
                  type="checkbox"
                  name="email_types.marketing"
                  checked={notifications.email_types.marketing}
                  onChange={handleToggle}
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 mr-2"
                />
                Marketing communications
              </label>
            </div>
          )}
        </div>
        
        {/* SMS notifications */}
        <div className="border-b pb-4 dark:border-gray-700">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-200">SMS Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive time-sensitive alerts by text message</p>
            </div>
            <label className="relative inline-flex items-center">
              <input
                type="checkbox"
                name="sms"
                checked={notifications.sms}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        
        {/* Push notifications */}
        <div>
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-200">Push Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications in your browser</p>
            </div>
            <label className="relative inline-flex items-center">
              <input
                type="checkbox"
                name="push"
                checked={notifications.push}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          
          {notifications.push && (
            <div className="pl-6 space-y-3 mt-3">
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                <input
                  type="checkbox"
                  name="push_types.login_alerts"
                  checked={notifications.push_types.login_alerts}
                  onChange={handleToggle}
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 mr-2"
                />
                Login alerts and security events
              </label>
              
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                <input
                  type="checkbox"
                  name="push_types.system_alerts"
                  checked={notifications.push_types.system_alerts}
                  onChange={handleToggle}
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 mr-2"
                />
                System alerts and critical updates
              </label>
              
              <label className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                <input
                  type="checkbox"
                  name="push_types.task_reminders"
                  checked={notifications.push_types.task_reminders}
                  onChange={handleToggle}
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 mr-2"
                />
                Task reminders and due dates
              </label>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md"
          onClick={handleSave}
        >
          <Save size={16} />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

// THEME SETTINGS COMPONENT
const ThemeSettings = ({ onSave }) => {
  const [theme, setTheme] = useState("light");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [colorScheme, setColorScheme] = useState("blue");

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };
  
  const handleColorChange = (color) => {
    setColorScheme(color);
  };

  const handleSave = () => {
    onSave(`Theme set to ${theme} with ${colorScheme} accent color`);
  };
  
  const colorOptions = [
    { name: "blue", color: "#3b82f6", label: "Blue" },
    { name: "indigo", color: "#6366f1", label: "Indigo" },
    { name: "purple", color: "#8b5cf6", label: "Purple" },
    { name: "pink", color: "#ec4899", label: "Pink" },
    { name: "green", color: "#10b981", label: "Green" },
    { name: "amber", color: "#f59e0b", label: "Amber" }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition">
      <div className="flex items-center mb-6">
        <PaintBucket className="text-primary" size={24} />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white ml-2">
          Theme Settings
        </h2>
      </div>
      
      <FormField label="Color Mode" id="theme">
        <div className="grid grid-cols-3 gap-3">
          <label className={`relative cursor-pointer ${theme === 'light' ? 'ring-2 ring-primary' : ''} rounded-lg overflow-hidden`}>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === "light"}
              onChange={handleThemeChange}
              className="sr-only"
            />
            <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200">
              <div className="w-2/3 bg-white border border-gray-200 h-4 rounded"></div>
            </div>
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300 text-center">Light</p>
          </label>
          
          <label className={`relative cursor-pointer ${theme === 'dark' ? 'ring-2 ring-primary' : ''} rounded-lg overflow-hidden`}>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === "dark"}
              onChange={handleThemeChange}
              className="sr-only"
            />
            <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-lg border border-gray-700">
              <div className="w-2/3 bg-gray-700 border border-gray-600 h-4 rounded"></div>
            </div>
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300 text-center">Dark</p>
          </label>
          
          <label className={`relative cursor-pointer ${theme === 'system' ? 'ring-2 ring-primary' : ''} rounded-lg overflow-hidden`}>
            <input
              type="radio"
              name="theme"
              value="system"
              checked={theme === "system"}
              onChange={handleThemeChange}
              className="sr-only"
            />
            <div className="aspect-video bg-gradient-to-r from-gray-100 to-gray-800 flex items-center justify-center rounded-lg border border-gray-200">
              <div className="w-2/3 bg-gradient-to-r from-white to-gray-700 border border-gray-300 h-4 rounded"></div>
            </div>
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300 text-center">System</p>
          </label>
        </div>
      </FormField>
      
      <div className="my-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Advanced Color Options</label>
          <label className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={advancedMode}
              onChange={() => setAdvancedMode(!advancedMode)}
              className="sr-only peer"
            />
           <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        
        {advancedMode && (
          <div className="mt-3">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Accent Color</label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {colorOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleColorChange(option.name)}
                  className={`aspect-square rounded-full ${colorScheme === option.name ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}
                  style={{ backgroundColor: option.color }}
                  title={option.label}
                  aria-label={`Select ${option.label} theme color`}
                />
              ))}
            </div>
          </div>
        )}
      
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Interface Settings</h4>
        
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm text-gray-600 dark:text-gray-400">Reduced Motion</label>
          <label className="relative inline-flex items-center">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600 dark:text-gray-400">Compact View</label>
          <label className="relative inline-flex items-center">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md"
          onClick={handleSave}
        >
          <Save size={16} />
          Save Theme Settings
        </button>
      </div>
    </div>
  );
};

// PARENT SETTINGS PAGE COMPONENT
const AdminSettingsPageWrapper = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [toast, setToast] = useState(null);
  
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };
  
  const clearToast = () => {
    setToast(null);
  };
  
  const tabs = [
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "theme", label: "Appearance", icon: <PaintBucket size={18} /> },
  ];

  return (
    <div className="pt-16 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0 space-y-2">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Admin Settings
            </h1>
            
            {tabs.map((tab) => (
              <TabItem
                key={tab.id}
                active={activeTab === tab.id}
                icon={tab.icon}
                label={tab.label}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {activeTab === "account" && <AccountSettings onSave={showToast} />}
            {activeTab === "security" && <SecuritySettings onSave={showToast} />}
            {activeTab === "notifications" && <NotificationSettings onSave={showToast} />}
            {activeTab === "theme" && <ThemeSettings onSave={showToast} />}
          </div>
        </div>
      </div>
      
      {/* Toast notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={clearToast} 
        />
      )}
    </div>
  );
};

const AdminSettingsPage = () => {
  return (
    <AdminDashboardLayout content={AdminSettingsPageWrapper ()}>
      
    </AdminDashboardLayout>
  );
};

export default AdminSettingsPage;