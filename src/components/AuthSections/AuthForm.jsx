import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import InputField from "./InputField";
import Button from "./Button";
import { FaUser, FaPhone, FaCheckCircle, FaEnvelope,FaExclamationCircle, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AuthForm = ({ isLogin, setIsLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const prepopulatedData = location.state?.bookingData || {};

  const [formData, setFormData] = useState({
    name: prepopulatedData.name || "",
    email: prepopulatedData.email || "",
    phone: prepopulatedData.phone || "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return;
      }
      setIsLoading(true);
      const result = await login(formData.email, formData.password);
      setIsLoading(false);
      if (result.success) {
        const from = location.state?.from || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all fields.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      setIsLoading(true);
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setIsLoading(false);
      if (result.success) {
        setSuccess(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setIsLogin(true);
      } else {
        setError(result.message);
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 w-full dark:to-indigo-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white mt-24 mb-10  dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Top decorative bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="p-8">
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center"
            >
              {isLogin ? (
                <FaLock className="text-2xl text-blue-500 dark:text-blue-400" />
              ) : (
                <FaUser className="text-2xl text-blue-500 dark:text-blue-400" />
              )}
            </motion.div>
            
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-2">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              {isLogin
                ? "Enter your credentials to log in."
                : "Fill in the details to create a new account."}
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
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">{success}</p>
                    <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                      Please check your inbox.
                    </p>
                  </div>
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
              {!isLogin && (
                <>
                  <InputField
                    type="text"
                    placeholder="Full Name"
                    icon={<FaUser />}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <InputField
                    type="tel"
                    placeholder="Phone Number"
                    icon={<FaPhone />}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </>
              )}
              <InputField
                type="email"
                placeholder="Email Address"
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
              {!isLogin && (
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  icon={<FaLock />}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              )}
              <Button
                label={isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                type="submit"
                isLoading={isLoading}
              />
            </form>
            
            {isLogin && (
              <p className="text-center mt-4 text-sm">
                <Link to="/forgot-password" className="text-blue-500 dark:text-blue-400 hover:underline">
                  Forgot Password?
                </Link>
              </p>
            )}
            
            <p className="text-center mt-4 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={toggleForm} className="text-blue-500 ml-1">
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
