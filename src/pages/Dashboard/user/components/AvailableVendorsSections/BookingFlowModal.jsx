import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; 
import SuccessAnimation from "./SuccessAnimation";
import { X, Clock, Calendar, Info, User, Mail, Phone, MapPin, AlertCircle, Star } from "lucide-react";

const BookingFlowModal = ({ vendor, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bookingDate: null,
    timeSlot: "",
    instructions: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookingResponse, setBookingResponse] = useState(null);
  const navigate = useNavigate();

  // Reset form when modal opens with a new vendor
  useEffect(() => {
    if (isOpen && vendor) {
      setStep(1);
      setErrors({});
      // Keep existing data if same vendor, otherwise reset
      setBookingData(prev => 
        prev.vendorId === vendor.id ? 
        prev : 
        {
          fullName: "",
          email: "",
          phone: "",
          address: "",
          bookingDate: null,
          timeSlot: "",
          instructions: "",
          vendorId: vendor.id
        }
      );
    }
  }, [isOpen, vendor]);

  // Fetch available time slots from API when date changes
  useEffect(() => {
    if (bookingData.bookingDate && vendor?.serviceId) {
      fetchAvailableTimeSlots(vendor.serviceId, bookingData.bookingDate);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [bookingData.bookingDate, vendor]);

  // Function to fetch available time slots from API
  const fetchAvailableTimeSlots = async (serviceId, date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      const response = await axios.get('/api/bookings/time-slots', {
        params: {
          serviceId,
          date: formattedDate
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        setAvailableTimeSlots(response.data.data);
      } else {
        setAvailableTimeSlots([]);
        console.error("Failed to fetch time slots:", response.data.message);
      }
    } catch (error) {
      setAvailableTimeSlots([]);
      console.error("Error fetching time slots:", error);
    }
  };

  if (!isOpen || !vendor) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!bookingData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!bookingData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!bookingData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(bookingData.phone.replace(/[- )(]/g, ''))) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!bookingData.address.trim()) newErrors.address = "Address is required";
    if (!bookingData.bookingDate) newErrors.bookingDate = "Date is required";
    if (!bookingData.timeSlot && availableTimeSlots.length > 0) newErrors.timeSlot = "Time slot is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleDateChange = (date) => {
    setBookingData((prev) => ({ 
      ...prev, 
      bookingDate: date,
      timeSlot: "" // Reset time slot when date changes
    }));
    if (errors.bookingDate) {
      setErrors(prev => ({ ...prev, bookingDate: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Format date for API request
      const formattedDate = bookingData.bookingDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Prepare booking data for API
      const bookingRequest = {
        serviceId: vendor.serviceId, // Ensure this is available from vendor data
        fullName: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        address: bookingData.address,
        bookingDate: formattedDate,
        timeSlot: bookingData.timeSlot,
        instructions: bookingData.instructions || ''
      };
      
      // Submit booking to API
      const response = await axios.post('/api/bookings', bookingRequest, {
        withCredentials: true
      });
      
      // Store response for confirmation page
      setBookingResponse(response.data.data);
      
      // Success
      setSubmitting(false);
      setStep(2);
    } catch (error) {
      setSubmitting(false);
      
      // Handle specific error messages from API
      if (error.response && error.response.data) {
        setErrors(prev => ({ 
          ...prev, 
          submit: error.response.data.message || "Something went wrong. Please try again." 
        }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          submit: "Network error. Please check your connection and try again." 
        }));
      }
      
      console.error("Booking submission error:", error);
    }
  };

  const handleClose = () => {
    // Show confirmation if form has data and we're on step 1
    if (
      step === 1 &&
      (bookingData.fullName || bookingData.email || bookingData.phone || bookingData.address)
    ) {
      if (window.confirm("Are you sure you want to cancel? Your booking information will be lost.")) {
        resetAndClose();
      }
    } else {
      resetAndClose();
    }
  };
  
  const resetAndClose = () => {
    setStep(1);
    setErrors({});
    onClose();
  };

  const handleProceed = () => {
    // You might want to navigate to the order details or chat with vendor
    if (bookingResponse && bookingResponse.orderId) {
      navigate(`/dashboard/messages?conversationId=${vendor.id}&orderId=${bookingResponse.orderId}`, { replace: true });
    } else {
      navigate(`/dashboard/messages?conversationId=${vendor.id}`, { replace: true });
    }
  };

  // Get minimum date (today)
  const minDate = new Date();
  
  // Get maximum date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2,
        when: "afterChildren"
      }
    }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            key="modal-content"
            variants={contentVariants}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar relative"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-green/50 to-teal-500 p-5 rounded-t-2xl relative">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-white bg-white bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-white flex items-center">
                {step === 1 ? (
                  <>Book Service with {vendor.name}</>
                ) : (
                  <>Booking Confirmation</>
                )}
              </h2>
              {step === 1 && (
                <p className="text-white text-opacity-90 mt-1">
                  Complete the form below to schedule your service
                </p>
              )}
            </div>
            
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Service summary */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <div className="h-14 w-14 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={vendor.profileImage} 
                            alt={vendor.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/100?text=Vendor";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{vendor.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                            <span className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
                              {vendor.rating}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{vendor.pricing}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Error banner */}
                    {errors.submit && (
                      <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span>{errors.submit}</span>
                      </div>
                    )}
                  
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            value={bookingData.fullName}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className={`w-full pl-10 p-3 border ${
                              errors.fullName ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                              errors.fullName ? 'focus:ring-red-200 dark:focus:ring-red-900' : 'focus:ring-green/20 dark:focus:ring-green/90'
                            } transition`}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400 error-message">{errors.fullName}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={bookingData.email}
                              onChange={handleChange}
                              placeholder="Your email"
                              className={`w-full pl-10 p-3 border ${
                                errors.email ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                              } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                                errors.email ? 'focus:ring-red-200 dark:focus:ring-red-900' : 'focus:ring-green/20 dark:focus:ring-green/90'
                              } transition`}
                            />
                          </div>
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400 error-message">{errors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                             type="tel"
                             name="phone"
                             value={bookingData.phone}
                             onChange={handleChange}
                             placeholder="Your phone number"
                             className={`w-full pl-10 p-3 border ${
                               errors.phone ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                             } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                               errors.phone ? 'focus:ring-red-200 dark:focus:ring-red-900' : 'focus:ring-green/20 dark:focus:ring-green/90'
                             } transition`}
                           />
                         </div>
                         {errors.phone && (
                           <p className="mt-1 text-sm text-red-600 dark:text-red-400 error-message">{errors.phone}</p>
                         )}
                       </div>
                     </div>
                     
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                         Address *
                       </label>
                       <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <MapPin className="h-5 w-5 text-gray-400" />
                         </div>
                         <textarea
                           name="address"
                           value={bookingData.address}
                           onChange={handleChange}
                           placeholder="Your address"
                           rows="3"
                           className={`w-full pl-10 p-3 border ${
                             errors.address ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                           } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                             errors.address ? 'focus:ring-red-200 dark:focus:ring-red-900' : 'focus:ring-green/20 dark:focus:ring-green/90'
                           } transition`}
                         />
                       </div>
                       {errors.address && (
                         <p className="mt-1 text-sm text-red-600 dark:text-red-400 error-message">{errors.address}</p>
                       )}
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                           Booking Date *
                         </label>
                         <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <Calendar className="h-5 w-5 text-gray-400" />
                           </div>
                           <DatePicker
                             selected={bookingData.bookingDate}
                             onChange={handleDateChange}
                             minDate={minDate}
                             maxDate={maxDate}
                             placeholderText="Select date"
                             className={`w-full pl-10 p-3 border ${
                               errors.bookingDate ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                             } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                               errors.bookingDate ? 'focus:ring-red-200 dark:focus:ring-red-900' : 'focus:ring-green/20 dark:focus:ring-green/90'
                             } transition`}
                             dateFormat="MMMM d, yyyy"
                           />
                         </div>
                         {errors.bookingDate && (
                           <p className="mt-1 text-sm text-red-600 dark:text-red-400 error-message">{errors.bookingDate}</p>
                         )}
                       </div>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                           Time Slot *
                         </label>
                         <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <Clock className="h-5 w-5 text-gray-400" />
                           </div>
                           <select
                             name="timeSlot"
                             value={bookingData.timeSlot}
                             onChange={handleChange}
                             disabled={!bookingData.bookingDate || availableTimeSlots.length === 0}
                             className={`w-full pl-10 p-3 border ${
                               errors.timeSlot ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                             } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                               errors.timeSlot ? 'focus:ring-red-200 dark:focus:ring-red-900' : 'focus:ring-green/20 dark:focus:ring-green/90'
                             } transition ${(!bookingData.bookingDate || availableTimeSlots.length === 0) ? 'cursor-not-allowed opacity-60' : ''}`}
                           >
                             <option value="">Select time slot</option>
                             {availableTimeSlots.map((slot) => (
                               <option key={slot} value={slot}>
                                 {slot}
                               </option>
                             ))}
                           </select>
                         </div>
                         {errors.timeSlot && (
                           <p className="mt-1 text-sm text-red-600 dark:text-red-400 error-message">{errors.timeSlot}</p>
                         )}
                         {bookingData.bookingDate && availableTimeSlots.length === 0 && (
                           <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">No time slots available for this date</p>
                         )}
                       </div>
                     </div>
                     
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                         Special Instructions
                       </label>
                       <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                           <Info className="h-5 w-5 text-gray-400" />
                         </div>
                         <textarea
                           name="instructions"
                           value={bookingData.instructions}
                           onChange={handleChange}
                           placeholder="Any special requirements or information the service provider should know"
                           rows="4"
                           className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green/20 dark:focus:ring-green/90 transition"
                         />
                       </div>
                     </div>
                     
                     <div className="mt-8 flex flex-col md:flex-row gap-3 justify-end">
                       <button
                         type="button"
                         onClick={handleClose}
                         className="order-2 md:order-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green/50 dark:focus:ring-offset-gray-900"
                       >
                         Cancel
                       </button>
                       <button
                         type="submit"
                         disabled={submitting}
                         className={`order-1 md:order-2 px-5 py-2 bg-gradient-to-r from-green/50 to-teal-500 text-white rounded-lg shadow-md hover:from-green/60 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green/50 dark:focus:ring-offset-gray-900 transition-all transform hover:scale-105 active:scale-95 ${
                           submitting ? 'opacity-70 cursor-not-allowed' : ''
                         }`}
                       >
                         {submitting ? (
                           <div className="flex items-center justify-center">
                             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             Processing...
                           </div>
                         ) : (
                           'Book Service'
                         )}
                       </button>
                     </div>
                   </form>
                 </motion.div>
               )}
               
               {step === 2 && (
                 <motion.div
                   key="confirmation"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex flex-col items-center"
                 >
                   <SuccessAnimation 
                     message="Booking Confirmed!" 
                     onComplete={() => {
                       // Optional completion callback
                     }}
                   />
                   
                   <div className="w-full mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                     <h3 className="font-medium text-gray-900 dark:text-white mb-3">Booking Details</h3>
                     
                     <div className="space-y-2 text-sm">
                       <div className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">Service:</span>
                         <span className="font-medium text-gray-900 dark:text-white">
                           {bookingResponse?.serviceName || vendor.serviceName || 'Service'}
                         </span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">Provider:</span>
                         <span className="font-medium text-gray-900 dark:text-white">{vendor.name}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">Date:</span>
                         <span className="font-medium text-gray-900 dark:text-white">
                           {bookingResponse?.scheduledDate || 
                            (bookingData.bookingDate ? bookingData.bookingDate.toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : '')}
                         </span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">Time:</span>
                         <span className="font-medium text-gray-900 dark:text-white">
                           {bookingResponse?.scheduledTime || bookingData.timeSlot}
                         </span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">Booking ID:</span>
                         <span className="font-medium text-gray-900 dark:text-white">
                           {bookingResponse?.orderId || 'Processing...'}
                         </span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">Status:</span>
                         <span className="font-medium text-green-600 dark:text-green-400">
                           {bookingResponse?.status || 'Pending'}
                         </span>
                       </div>
                     </div>
                     
                     <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
                       <p>We've sent the confirmation details to <span className="font-medium">{bookingData.email}</span>.</p>
                       <p className="mt-2">You can now connect with {vendor.name} via our chat system to discuss further details.</p>
                     </div>
                   </div>
                   
                   <div className="w-full mt-6 flex flex-col md:flex-row gap-3 justify-end">
                     <button
                       onClick={resetAndClose}
                       className="order-2 md:order-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900"
                     >
                       Close
                     </button>
                     <button
                       onClick={handleProceed}
                       className="order-1 md:order-2 px-5 py-2 bg-gradient-to-r from-green/50 to-teal-500 text-white rounded-lg shadow-md hover:from-green/60 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green/50 dark:focus:ring-offset-gray-900 transition-all transform hover:scale-105 active:scale-95"
                     >
                       Proceed to Chat
                     </button>
                   </div>
                 </motion.div>
               )}
                             </AnimatePresence>
                           </div>
                         </motion.div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 );
               };
               
               export default BookingFlowModal;