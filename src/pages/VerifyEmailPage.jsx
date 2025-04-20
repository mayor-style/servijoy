import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying", "success", or "error"
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const hasCalled = useRef(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (hasCalled.current) return; // Prevent duplicate requests
    hasCalled.current = true;

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    
    if (!token) {
      setStatus("error");
      setMessage("Verification token not provided. Please check your email link and try again.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${baseUrl}/api/auth/verify-email?token=${token}`);
        
        if (response.status === 200) {
          setStatus("success");
          setMessage(response.data.message || "Your email has been successfully verified. You can now log in to your account.");
          
          // Start countdown for auto-redirect
          startRedirectCountdown();
        } else {
          setStatus("error");
          setMessage("Email verification failed. Please try again or contact support.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(
          error.response?.data?.message || 
          "We couldn't verify your email. The link may be expired or invalid."
        );
      }
    };

    // Add small delay to show animation
    setTimeout(() => {
      verifyEmail();
    }, 1500);
  }, [location.search, navigate]);

  const startRedirectCountdown = () => {
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          navigate("/login-signup");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const handleManualRedirect = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    navigate("/login-signup");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const spinTransition = { 
    loop: Infinity, 
    ease: "linear", 
    duration: 1
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Top decorative bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="p-8">
          {/* Email icon container */}
          <motion.div 
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-blue-100 dark:bg-gray-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {status === "verifying" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={spinTransition}
                className="text-blue-500 dark:text-blue-400"
              >
                <FaSpinner className="text-3xl" />
              </motion.div>
            )}
            {status === "success" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <FaCheckCircle className="text-3xl text-green-500" />
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <FaTimesCircle className="text-3xl text-red-500" />
              </motion.div>
            )}
          </motion.div>

          {/* Content based on status */}
          {status === "verifying" && (
            <motion.div className="text-center" variants={containerVariants}>
              <motion.h2 
                className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2"
                variants={itemVariants}
              >
                Verifying Your Email
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-400"
                variants={itemVariants}
              >
                Please wait while we confirm your email address...
              </motion.p>
              <motion.div 
                className="mt-6 flex justify-center"
                variants={itemVariants}
              >
                <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div 
              className="text-center"
              variants={containerVariants}
            >
              <motion.h2 
                className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2"
                variants={itemVariants}
              >
                Email Verified!
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 mb-6"
                variants={itemVariants}
              >
                {message}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Redirecting to login in {countdown} seconds...
              </motion.div>
              <motion.button
                variants={itemVariants}
                onClick={handleManualRedirect}
                className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Continue to Login</span>
                <FaArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div 
              className="text-center"
              variants={containerVariants}
            >
              <motion.h2 
                className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2"
                variants={itemVariants}
              >
                Verification Failed
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 mb-6"
                variants={itemVariants}
              >
                {message}
              </motion.p>
              <motion.div className="flex gap-4" variants={itemVariants}>
                <motion.button
                  onClick={() => navigate("/login-signup")}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaLock className="mr-2" />
                  <span>Go to Login</span>
                </motion.button>
                <motion.button
                  onClick={() => navigate("/resend-verification")}
                  className="flex-1 py-3 px-4 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEnvelope className="mr-2" />
                  <span>Resend Email</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Footer */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center"
      >
        Having trouble? <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Support</a>
      </motion.p>
    </div>
  );
};

export default VerifyEmailPage;