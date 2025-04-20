import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({ 
    current: false, 
    new: false, 
    confirm: false 
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
  });
  const [touchedFields, setTouchedFields] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  // Calculate password strength when newPassword changes
  useEffect(() => {
    if (passwords.newPassword) {
      const strength = calculatePasswordStrength(passwords.newPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
    }
  }, [passwords.newPassword]);

  const calculatePasswordStrength = (password) => {
    // Basic password strength calculation
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        feedback = 'Weak - Consider a stronger password';
        break;
      case 2:
      case 3:
        feedback = 'Medium - Getting better';
        break;
      case 4:
        feedback = 'Strong - Good job';
        break;
      case 5:
        feedback = 'Very strong - Excellent!';
        break;
      default:
        feedback = '';
    }

    return { score, feedback };
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-400';
      case 5:
        return 'bg-green-600';
      default:
        return 'bg-gray-300';
    }
  };

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleBlur = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!passwords.currentPassword) {
      errors.currentPassword = 'Please enter your current password';
    }
    
    if (passwords.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleUpdatePassword = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      // Mark all fields as touched to show errors
      setTouchedFields({
        currentPassword: true,
        newPassword: true,
        confirmNewPassword: true,
      });
      
      setSaveStatus('error');
      return;
    }
    
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success');
      console.log('Password updated:', passwords);
      
      // Reset form after successful update
      setTimeout(() => {
        setSaveStatus(null);
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        setTouchedFields({
          currentPassword: false,
          newPassword: false,
          confirmNewPassword: false,
        });
      }, 3000);
    }, 1500);
  };

  const errors = validateForm();

  const PasswordInput = ({ id, label, name, value, showPassword, toggleVisibility, error }) => (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="block text-sm font-medium dark:text-white">
          {label}
        </label>
        {name === 'newPassword' && passwords.newPassword && (
          <span className={`text-xs ${passwordStrength.score >= 4 ? 'text-green-500' : passwordStrength.score >= 2 ? 'text-yellow-500' : 'text-red-500'}`}>
            {passwordStrength.feedback}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={() => handleBlur(name)}
          className={`w-full p-3 pr-10 border rounded-lg bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white focus:outline-none focus:ring-2 
                    transition duration-200 ${
                      touchedFields[name] && errors[name]
                        ? 'border-red-500 focus:ring-red-200'
                        : touchedFields[name] && !errors[name]
                        ? 'border-green-500 focus:ring-green-200'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200'
                    }`}
          placeholder={`Enter ${label.toLowerCase()}`}
          aria-invalid={touchedFields[name] && errors[name] ? 'true' : 'false'}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        
        {name === 'newPassword' && passwords.newPassword && (
          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getPasswordStrengthColor()}`} 
              style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
            />
          </div>
        )}
      </div>
      
      {touchedFields[name] && errors[name] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mt-1.5 text-red-500 text-xs"
        >
          <FaTimes className="mr-1" /> {errors[name]}
        </motion.div>
      )}
      
      {touchedFields[name] && !errors[name] && name !== 'currentPassword' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mt-1.5 text-green-500 text-xs"
        >
          <FaCheck className="mr-1" /> {name === 'newPassword' ? 'Valid password' : 'Passwords match'}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full mx-auto max-w-lg">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 dark:text-white text-center font-header">
        Security Settings
      </h3>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6 flex items-start">
        <FaInfoCircle className="text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Choose a strong, unique password that you don't use for other accounts. We recommend using a password manager.
        </p>
      </div>
      
      <div className="space-y-5">
        <PasswordInput
          id="currentPassword"
          label="Current Password"
          name="currentPassword"
          value={passwords.currentPassword}
          showPassword={showPasswords.current}
          toggleVisibility={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
          error={touchedFields.currentPassword && errors.currentPassword}
        />
        
        <PasswordInput
          id="newPassword"
          label="New Password"
          name="newPassword" 
          value={passwords.newPassword}
          showPassword={showPasswords.new}
          toggleVisibility={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
          error={touchedFields.newPassword && errors.newPassword}
        />
        
        <PasswordInput
          id="confirmNewPassword"
          label="Confirm New Password"
          name="confirmNewPassword"
          value={passwords.confirmNewPassword}
          showPassword={showPasswords.confirm}
          toggleVisibility={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
          error={touchedFields.confirmNewPassword && errors.confirmNewPassword}
        />
        
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleUpdatePassword}
          disabled={saveStatus === 'saving'}
          className={`mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg font-medium transition focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ${
            saveStatus === 'saving' ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {saveStatus === 'saving' ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </div>
          ) : (
            'Update Password'
          )}
        </motion.button>
        
        {saveStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center justify-center"
          >
            <FaCheck className="mr-2" /> Password updated successfully!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;