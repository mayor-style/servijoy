import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  FaClock, 
  FaCheckCircle, 
  FaSpinner, 
  FaCalendarPlus, 
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaPhoneAlt,
  FaRegClock,
  FaRegCalendarCheck
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BookingSummary = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch upcoming and past bookings from the backend
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const config = { withCredentials: true };
      const [upcomingRes, pastRes] = await Promise.all([
        axios.get(`${baseUrl}/api/orders/user?type=upcoming`, config),
        axios.get(`${baseUrl}/api/orders/user?type=past`, config),
      ]);

      if (upcomingRes.data.data && upcomingRes.data.data.length > 0) {
        setUpcomingBookings(upcomingRes.data.data.slice(0, 3)); // Show top 3 upcoming
      } else {
        setUpcomingBookings([]);
      }

      if (pastRes.data.data && pastRes.data.data.length > 0) {
        setPastBookings(pastRes.data.data.slice(0, 3)); // Show top 3 past
      } else {
        setPastBookings([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Format date for better readability
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until booking
  const getDaysRemaining = (dateString) => {
    const bookingDate = new Date(dateString);
    const today = new Date();
    const diffTime = bookingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color based on booking status or days remaining
  const getStatusColor = (booking) => {
    if (activeTab === "upcoming") {
      const daysRemaining = getDaysRemaining(booking.date);
      if (daysRemaining <= 1) return "text-red-500 bg-red-100 dark:bg-red-900/30";
      if (daysRemaining <= 3) return "text-amber-500 bg-amber-100 dark:bg-amber-900/30";
      return "text-green-500 bg-green-100 dark:bg-green-900/30";
    } else {
      if (booking.status === "Completed") return "text-green-500 bg-green-100 dark:bg-green-900/30";
      if (booking.status === "Cancelled") return "text-red-500 bg-red-100 dark:bg-red-900/30";
      return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative w-10 h-10">
            <FaSpinner className="animate-spin text-3xl text-blue-500 absolute" />
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <FaExclamationCircle className="text-4xl text-red-500" />
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
          </div>
          <p className="font-medium text-lg text-red-500">{error}</p>
          <button
            onClick={fetchBookings}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2"
            aria-label="Retry loading bookings"
          >
            <FaRegCalendarCheck className="text-white" />
            <span>Retry Loading</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-header">Your Bookings</h2>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "upcoming"
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "past"
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Past
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "upcoming" ? (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => {
                  const daysRemaining = getDaysRemaining(booking.date);
                  const statusColor = getStatusColor(booking);
                  
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Left side with service info */}
                        <div className="p-5 md:p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
                                <FaClock className="text-blue-600 dark:text-blue-400 text-xl" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {booking.serviceName}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {booking.vendorName}
                                </p>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                              {daysRemaining === 0 ? "Today" : daysRemaining === 1 ? "Tomorrow" : `In ${daysRemaining} days`}
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2 text-sm">
                              <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <FaRegClock className="text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{booking.time}</span>
                            </div>
                            {booking.location && (
                              <div className="flex items-center space-x-2 text-sm">
                                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">{booking.location}</span>
                              </div>
                            )}
                            {booking.price && (
                              <div className="flex items-center space-x-2 text-sm">
                                <FaCreditCard className="text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300">${booking.price}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Right side with actions */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 md:p-6 flex flex-col justify-center space-y-2 md:w-52">
                          <Link
                            to={`/dashboard/booking/${booking.id}`}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center flex items-center justify-center space-x-1"
                          >
                            <span>View Details</span>
                          </Link>
                          <Link
                            to={`/dashboard/reschedule/${booking.id}`}
                            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center flex items-center justify-center space-x-1"
                          >
                            <span>Reschedule</span>
                          </Link>
                          <Link
                            to={`tel:${booking.vendorPhone || '123-456-7890'}`}
                            className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-center flex items-center justify-center space-x-1"
                          >
                            <FaPhoneAlt className="text-xs" />
                            <span>Contact</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                
                <div className="text-center mt-6">
                  <Link
                    to="/dashboard/my-bookings"
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <span>View All Bookings</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="relative inline-block mb-6">
                  <FaCalendarPlus className="text-6xl text-blue-500 opacity-50" />
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Upcoming Bookings</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  You don't have any upcoming bookings scheduled. Why not book a service and experience great service?
                </p>
                <Link
                 to="/book-service"
                 className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
               >
                 <FaCalendarPlus className="mr-2" />
                 <span>Book a Service Now</span>
               </Link>
             </motion.div>
           )}
         </motion.div>
       ) : (
         <motion.div
           key="past"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.3 }}
         >
           {pastBookings.length > 0 ? (
             <div className="space-y-4">
               {pastBookings.map((booking, index) => {
                 const statusColor = getStatusColor(booking);
                 
                 return (
                   <motion.div
                     key={booking.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.3, delay: index * 0.1 }}
                     className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                   >
                     <div className="flex flex-col md:flex-row">
                       {/* Left side with service info */}
                       <div className="p-5 md:p-6 flex-1">
                         <div className="flex items-start justify-between">
                           <div className="flex items-start space-x-4">
                             <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-xl">
                               <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
                             </div>
                             <div>
                               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                 {booking.serviceName}
                               </h3>
                               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                 {booking.vendorName}
                               </p>
                             </div>
                           </div>
                           <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                             {booking.status}
                           </div>
                         </div>
                         
                         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                           <div className="flex items-center space-x-2 text-sm">
                             <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                             <span className="text-gray-700 dark:text-gray-300">{formatDate(booking.date)}</span>
                           </div>
                           <div className="flex items-center space-x-2 text-sm">
                             <FaRegClock className="text-gray-500 dark:text-gray-400" />
                             <span className="text-gray-700 dark:text-gray-300">{booking.time || "N/A"}</span>
                           </div>
                           {booking.location && (
                             <div className="flex items-center space-x-2 text-sm">
                               <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                               <span className="text-gray-700 dark:text-gray-300">{booking.location}</span>
                             </div>
                           )}
                           {booking.price && (
                             <div className="flex items-center space-x-2 text-sm">
                               <FaCreditCard className="text-gray-500 dark:text-gray-400" />
                               <span className="text-gray-700 dark:text-gray-300">${booking.price}</span>
                             </div>
                           )}
                         </div>
                       </div>
                       
                       {/* Right side with actions */}
                       <div className="bg-gray-50 dark:bg-gray-700/50 p-4 md:p-6 flex flex-col justify-center space-y-2 md:w-52">
                         <Link
                           to={`/dashboard/booking/${booking.id}`}
                           className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center flex items-center justify-center space-x-1"
                         >
                           <span>View Details</span>
                         </Link>
                         <Link
                           to={`/dashboard/review/${booking.id}`}
                           className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-center flex items-center justify-center space-x-1"
                         >
                           <span>Leave Review</span>
                         </Link>
                         <Link
                           to="/book-service"
                           className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-center flex items-center justify-center space-x-1"
                         >
                           <span>Book Again</span>
                         </Link>
                       </div>
                     </div>
                   </motion.div>
                 );
               })}
               
               <div className="text-center mt-6">
                 <Link
                   to="/dashboard/my-bookings"
                   className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-md hover:shadow-lg"
                 >
                   <span>View All Bookings</span>
                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                   </svg>
                 </Link>
               </div>
             </div>
           ) : (
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center"
             >
               <div className="relative inline-block mb-6">
                 <FaCheckCircle className="text-6xl text-gray-300 dark:text-gray-600" />
               </div>
               <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Past Bookings</h3>
               <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                 You haven't completed any bookings yet. Your booking history will appear here after services are completed.
               </p>
               <Link
                 to="/book-service"
                 className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
               >
                 <FaCalendarPlus className="mr-2" />
                 <span>Book a Service Now</span>
               </Link>
             </motion.div>
           )}
         </motion.div>
       )}
     </AnimatePresence>
   </div>
 );
};

export default BookingSummary;