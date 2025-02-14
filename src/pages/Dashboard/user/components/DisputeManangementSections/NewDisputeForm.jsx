import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const NewDisputeForm = ({ isOpen, onClose, onSubmit }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDispute = {
      id: Date.now(),
      subject,
      description,
      reference: bookingRef,
      date: new Date().toLocaleDateString(),
      status: "pending",
      messages: []
    };
    onSubmit(newDispute);
    setSubject("");
    setDescription("");
    setBookingRef("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 lg:p-8 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl p-6 sm:p-8 lg:p-10 relative transition-transform transform">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mb-4 sm:mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          Raise a New Dispute
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-semibold mb-2 dark:text-white">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter dispute subject"
              required
              className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold mb-2 dark:text-white">
              Booking Reference
            </label>
            <input
              type="text"
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value)}
              placeholder="Enter booking reference"
              required
              className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold mb-2 dark:text-white">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue in detail"
              rows={4}
              required
              className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg font-semibold transition-colors duration-200 transform active:scale-95"
          >
            Submit Dispute
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDisputeForm;
