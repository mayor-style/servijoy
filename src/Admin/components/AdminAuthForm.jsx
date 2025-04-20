import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/AuthSections/InputField";
import Button from "../../components/AuthSections/Button";
import { FaUserShield, FaEnvelope, FaExclamationCircle, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaKey } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminAuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminKey: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.password || !formData.adminKey) {
      setError("Please fill in all fields.");
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await adminLogin(formData.email, formData.password, formData.adminKey);
      if (result.success) {
        setSuccess("Authentication successful! Redirecting...");
        setTimeout(() => {
          const from = location.state?.from || "/admin/dashboard";
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setError(result.message || "Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred during authentication. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 w-full p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white mt-24 mb-10 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Top decorative bar - different color for admin */}
          <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
          
          <div className="p-8">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-gray-700 flex items-center justify-center"
            >
              <FaUserShield className="text-2xl text-purple-500 dark:text-purple-400" />
            </motion.div>
            
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Secure access for administrators only.
            </p>
            
            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 flex items-start"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FaCheckCircle className="text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="font-medium text-green-800 dark:text-green-300">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 flex items-start"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FaExclamationCircle className="text-red-500 dark:text-red-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-red-800 dark:text-red-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <InputField
                type="email"
                placeholder="Admin Email"
                icon={<FaEnvelope />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="relative">
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  icon={<FaLock />}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <InputField
                type="password"
                placeholder="Admin Access Key"
                icon={<FaKey />}
                value={formData.adminKey}
                onChange={(e) => setFormData({ ...formData, adminKey: e.target.value })}
              />
              <Button
                label={isLoading ? "Authenticating..." : "Admin Login"}
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              />
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuthForm;