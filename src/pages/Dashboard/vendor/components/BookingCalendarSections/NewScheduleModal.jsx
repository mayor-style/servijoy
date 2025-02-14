import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NewScheduleModal = ({ isOpen, onClose, onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventDateTime = new Date(`${date}T${time}`);
    const newEvent = {
      id: Date.now(),
      title,
      client,
      service,
      date: eventDateTime.toISOString(),
      details,
    };
    onAddEvent(newEvent);
    onClose();
    setTitle("");
    setService("");
    setClient("");
    setDate("");
    setTime("");
    setDetails("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 sm:p-7 md:p-10 max-w-lg w-full relative max-h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <FaTimes size={22} />
          </button>

          {/* Modal Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white mb-5 sm:mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
            Add New Schedule
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {[
              { label: "Title", value: title, setter: setTitle, placeholder: "e.g., Home Cleaning - John" },
              { label: "Service", value: service, setter: setService, placeholder: "Type of service" },
              { label: "Client", value: client, setter: setClient, placeholder: "Client name (optional)" },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label}>
                <label className="block text-sm sm:text-base font-semibold dark:text-white mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  required={label !== "Client"}
                  className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* Date & Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Date", value: date, setter: setDate, type: "date" },
                { label: "Time", value: time, setter: setTime, type: "time" },
              ].map(({ label, value, setter, type }) => (
                <div key={label}>
                  <label className="block text-sm sm:text-base font-semibold dark:text-white mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required
                    className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Details Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold dark:text-white mb-2">
                Details
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Additional details..."
                rows={3}
                className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              Add Schedule
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewScheduleModal;
