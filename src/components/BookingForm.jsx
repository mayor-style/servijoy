import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SuccessAnimation from "../pages/Dashboard/user/components/AvailableVendorsSections/SuccessAnimation"; // Premium success animation

const BookingForm = ({ vendor, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Added email field
    phone: "",
    bookingDateTime: null, // Combined date & time as a Date object
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateTimeChange = (date) => {
    setFormData((prev) => ({ ...prev, bookingDateTime: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation including email
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.bookingDateTime ||
      !formData.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setSuccess(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      bookingDateTime: null,
      location: "",
    });
    onClose();
  };

  const handleProceed = () => {
    // Navigate to auth page, passing bookingData (which now includes email) and vendor details via state
    navigate("/login-signup", { state: { bookingData: formData, vendor } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition">
      <div className="bg-white p-6 rounded-xl w-96 relative transition-colors">
        {/* Cancel Icon */}
        <div
          onClick={onClose}
          className="absolute top-0 right-0 cursor-pointer p-2 text-gray-600 hover:bg-gray-200 transition"
        >
          <FaTimes size={20} />
        </div>
        {success ? (
          <div className="text-center p-2">
            <SuccessAnimation />
            <div className="mt-6">
              <p className="text-gray-700 mb-6 text-center leading-relaxed">
                Thank you, {formData.name}! Your booking with {vendor.name} has been successfully submitted.
                To finalize your booking and connect with {vendor.name}, please log in or sign up.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="btn btn-ghost text-gray-700 transition"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleProceed}>
                  Proceed to Login / Sign Up
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Book {vendor.name}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md text-gray-700 transition"
            />
            {/* New Email Field */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md text-gray-700 transition"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md text-gray-700 transition"
            />
            {/* Combined Date & Time Picker */}
            <DatePicker
              selected={formData.bookingDateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Select booking date & time"
              className="w-full border p-2 rounded-md text-gray-700 transition"
            />
            <input
              type="text"
              name="location"
              placeholder="Service Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md text-gray-700 transition"
            />
            <button type="submit" className="btn-green w-full" disabled={loading}>
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
