import React, { useState, useEffect } from "react";
import { MdClose, MdPerson, MdEmail, MdVpnKey, MdAdminPanelSettings } from "react-icons/md";
import { FaUserTie, FaUserCheck, FaUserSlash, FaEye, FaEyeSlash } from "react-icons/fa";

const EditUserVendorModal = ({ isOpen, onClose, userVendor, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // Animation states
  const [modalAnimation, setModalAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: userVendor.name || "",
        email: userVendor.email || "",
        role: userVendor.role || "User",
        status: userVendor.status || "Active",
        password: "",
      });
      setTimeout(() => setModalAnimation(true), 10);
    } else {
      setModalAnimation(false);
      setErrors({});
      setTouchedFields({});
    }
  }, [isOpen, userVendor]);

  const handleClose = () => {
    setModalAnimation(false);
    setTimeout(onClose, 300);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (value && value.length < 6) error = "Password must be at least 6 characters";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    // Validate the field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Touch all fields for validation
    const allTouched = {};
    Object.keys(formData).forEach(key => { allTouched[key] = true });
    setTouchedFields(allTouched);
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      onSave(formData);
      handleClose();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin": return <MdAdminPanelSettings className="text-purple-500" />;
      case "Vendor": return <FaUserTie className="text-blue-500" />;
      default: return <MdPerson className="text-green-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active": return <FaUserCheck className="text-green-500" />;
      case "Inactive": return <FaUserSlash className="text-gray-500" />;
      case "Suspended": return <FaUserSlash className="text-red-500" />;
      default: return null;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Vendor": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "Suspended": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "";
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      style={{ opacity: modalAnimation ? 1 : 0 }}
      onClick={handleClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transition-all duration-300 transform ${
          modalAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {getRoleIcon(formData.role)}
              Edit {formData.role === "Vendor" ? "Vendor" : userVendor.role} Profile
            </h2>
            <p className="opacity-80 mt-1">Update user information and permissions</p>
            
            <button
              className="absolute top-5 right-5 text-white hover:text-red-200 transition-colors duration-200"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Status badge */}
          <div className="absolute top-20 right-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${getStatusColor(formData.status)}`}>
              {getStatusIcon(formData.status)} {formData.status}
            </span>
          </div>
          
          {/* Form */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 110px)" }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MdPerson className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.name && touchedFields.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all`}
                    placeholder="Enter full name"
                  />
                </div>
                {errors.name && touchedFields.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MdEmail className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.email && touchedFields.email
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all`}
                    placeholder="Enter email address"
                  />
                </div>
                {errors.email && touchedFields.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">User Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {["User", "Vendor", "Admin"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleChange({ target: { name: "role", value: role } })}
                      className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-all ${
                        formData.role === role
                          ? `${getRoleColor(role)} border-transparent font-medium`
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {getRoleIcon(role)} {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Account Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Active", "Inactive", "Suspended"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleChange({ target: { name: "status", value: status } })}
                      className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-all ${
                        formData.status === status
                          ? `${getStatusColor(status)} border-transparent font-medium`
                          : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {getStatusIcon(status)} {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Reset Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MdVpnKey className="text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-2.5 rounded-lg border ${
                      errors.password && touchedFields.password
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all`}
                    placeholder="Enter new password (optional)"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && touchedFields.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Leave blank to keep current password
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors duration-200 font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 font-medium flex items-center gap-2 ${
                    isLoading ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserVendorModal;