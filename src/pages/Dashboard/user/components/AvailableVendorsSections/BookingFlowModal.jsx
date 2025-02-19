import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SuccessAnimation from "./SuccessAnimation"; // The success animation component

const BookingFlowModal = ({ vendor, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bookingDate: null, // Date object from react-datepicker
    instructions: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!isOpen || !vendor) return <div className="hidden" />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setBookingData((prev) => ({ ...prev, bookingDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !bookingData.fullName ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.address ||
      !bookingData.bookingDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      setStep(2);
    }, 1500);
  };

  const handleClose = () => {
    setStep(1);
    setBookingData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      bookingDate: null,
      instructions: "",
    });
    onClose();
  };

  const handleProceed = () => {
    // Navigate to the messages page with a query parameter
    navigate(`/dashboard/messages?conversationId=${vendor.id}`, { replace: true });
  };
  

  return (
    <div className="fixed inset-0 px-3 bg-black bg-opacity-60 flex items-center justify-center z-50 transition">
      <div className="bg-soft-white overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 max-h-[95%] dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-lg relative transition-transform duration-300 transform">
        {/* Cancel Icon */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FaTimes size={20} />
        </button>
        {step === 1 && (
          <>
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-800 dark:text-white font-header mb-4">
              Book Service with {vendor.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={bookingData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="input input-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="input input-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                  className="input input-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={bookingData.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  required
                  className="textarea textarea-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Booking Date *
                </label>
                <DatePicker
                  selected={bookingData.bookingDate}
                  onChange={handleDateChange}
                  placeholderText="Select booking date"
                  className="input input-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Additional Instructions
                </label>
                <textarea
                  name="instructions"
                  value={bookingData.instructions}
                  onChange={handleChange}
                  placeholder="Any special requests or instructions"
                  className="textarea textarea-bordered w-full dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="btn btn-ghost text-gray-800 dark:text-gray-200 transition"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className={`btn btn-primary ${submitting ? "text-gray-800 dark:text-gray-300":"" } `} disabled={submitting}>
                  {submitting ? "Submitting..." : "Book Now"}
                </button>
              </div>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <SuccessAnimation />
            <div className="mt-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
                Thank you, {bookingData.fullName}! Your booking with {vendor.name} has been successfully submitted.
                We are now connecting you to {vendor.name}'s team via live chat.
                When you're ready, click "Proceed to Live Chat" to start chatting.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="btn btn-ghost text-gray-800 dark:text-gray-200 transition"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleProceed}>
                  Proceed to Live Chat
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingFlowModal;
