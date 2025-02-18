// File: components/dispute/DisputeDetailsModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";

const DisputeDetailsModal = ({ dispute, isOpen, onClose }) => {
  if (!isOpen || !dispute) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 p-4">
      <div className="bg-white overflow-auto scrollbar-thin scrollbar-thumb-gray-500 max-h-[90vh] scrollbar-track-gray-300 dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative transition-transform transform">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 font-header">
          {dispute.subject}
        </h2>
        <p className="sm:text-lg text-gray-700 dark:text-gray-300 mb-6">{dispute.description}</p>

        <div className="mb-4 dark:text-gray-300"><span className="font-semibold dark:text-white">Reference:</span> {dispute.reference}</div>
        <div className="mb-4 dark:text-gray-300"><span className="font-semibold dark:text-white">Date:</span> {dispute.date}</div>
        <div className="mb-6 dark:text-gray-300"><span className="font-semibold dark:text-white">Status:</span> {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}</div>

        {dispute.messages?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">Messages:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {dispute.messages.map((msg, index) => (
                <li key={index}><span className="font-semibold">{msg.sender}:</span> {msg.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputeDetailsModal;
