import React from "react";
import { MdClose } from "react-icons/md";

const VendorDetailsModal = ({ isOpen, onClose, vendor }) => {
  if (!isOpen) return null;

  // Default mock vendor data if none is provided
  const defaultVendor = {
    name: "Default Vendor",
    email: "vendor@example.com",
    role: "Vendor",
    status: "Active",
    registrationDate: "2024-01-01",
    lastLogin: "2024-02-15",
    servicesOffered: ["Service A", "Service B"],
    reviews: ["Excellent service!", "Very professional."],
  };

  const v = vendor || defaultVendor;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition">
      <div className="bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl relative transition">
        <h2 className="header text-gray-800 dark:text-white mb-4">Vendor Details</h2>
       <button
                 className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 text-2xl font-bold dark:hover:text-white transition"
                 onClick={onClose}
               >
                 <MdClose />
               </button>

        <div className="mb-4 space-y-2">
          <p><strong>Name:</strong> {v.name}</p>
          <p><strong>Email:</strong> {v.email}</p>
          <p><strong>Role:</strong> {v.role}</p>
          <p><strong>Status:</strong> {v.status}</p>
          <p><strong>Registration Date:</strong> {v.registrationDate}</p>
          <p><strong>Last Login:</strong> {v.lastLogin}</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Services Offered</h3>
        <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
          {v.servicesOffered && v.servicesOffered.length > 0 ? (
            v.servicesOffered.map((service, index) => (
              <li key={index}>{service}</li>
            ))
          ) : (
            <li>No services listed.</li>
          )}
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Reviews & Ratings</h3>
        <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
          {v.reviews && v.reviews.length > 0 ? (
            v.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))
          ) : (
            <li>No reviews available.</li>
          )}
        </ul>

        <div className="flex justify-end gap-2">
          <button className="btn-blue" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsModal;
