import React, { useState, useEffect } from 'react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    avatar: '/api/placeholder/150/150',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [saveStatus, setSaveStatus] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setIsDirty(true);
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      }
      case 'phone': {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(value) ? '' : 'Please enter a valid phone number (e.g., 123-456-7890)';
      }
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSave = () => {
    // Validate all fields
    const newErrors = {
      name: validateField('name', profile.name),
      email: validateField('email', profile.email),
      phone: validateField('phone', profile.phone)
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      setSaveStatus('error');
      return;
    }
    
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success');
      console.log('Profile saved:', profile);
      setIsDirty(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  // Confirmation before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl mx-auto">
      <h3 className="text-xl md:text-2xl font-bold mb-6 dark:text-white font-header">Profile Settings</h3>
      
      <div className="mb-8 flex justify-center">
        <div className="relative group">
          <img 
            src={profile.avatar} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </label>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-gray-300">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-300">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1 dark:text-gray-300">Phone Number</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            placeholder="123-456-7890"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Format: 123-456-7890</p>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          {isDirty && saveStatus !== 'success' && (
            <p className="text-sm text-amber-600 dark:text-amber-400">You have unsaved changes</p>
          )}
          {!isDirty && <div></div>}
          
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving' || (!isDirty && saveStatus !== 'error')}
            className={`px-6 py-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              saveStatus === 'saving' ? 'bg-gray-400 cursor-not-allowed' : 
              !isDirty && saveStatus !== 'error' ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 
              'bg-blue-600 hover:bg-blue-700 text-white transform active:scale-95'
            }`}
          >
            {saveStatus === 'saving' ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </div>
        
        {saveStatus === 'success' && (
          <div className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg flex items-center justify-center gap-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Profile updated successfully!
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg flex items-center justify-center gap-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Please fix the errors above
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;