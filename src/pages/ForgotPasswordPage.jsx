import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/AuthSections/InputField";
import Button from "../components/AuthSections/Button";
import { FaEnvelope, FaArrowLeft, FaLock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);

  // Validate email as user types
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(email));
    } else {
      setEmailValid(null);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setSuccess(result.message);
        setEmail(""); // Clear the form
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Top decorative bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <FaLock className="text-2xl text-blue-500 dark:text-blue-400" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Forgot Password?</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Success message */}
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
                      Check your inbox for the reset link. If you don't see it, check your spam folder.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
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
              <div className="mb-6">
                <InputField
                  type="email"
                  placeholder="Email Address"
                  icon={<FaEnvelope />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isValid={emailValid === true}
                  isInvalid={emailValid === false}
                  disabled={isLoading || success}
                  autoFocus
                />
                {emailValid === false && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </div>
              
              <Button
                label={isLoading ? "Sending..." : "Send Reset Link"}
                type="submit"
                isLoading={isLoading}
                disabled={isLoading || !email || emailValid === false || success}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              />

              {/* Back to login link */}
              <div className="mt-6 flex justify-center">
                <Link 
                  to="/login-signup" 
                  className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                >
                  <FaArrowLeft className="mr-2" size={12} />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Additional help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 dark:text-blue-400 hover:underline">
              Sign up here
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/contact" className="text-blue-500 dark:text-blue-400 hover:underline">
              Need help?
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;