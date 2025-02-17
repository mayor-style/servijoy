import React from "react";
import { MdClose, MdMenuOpen } from "react-icons/md";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const defaultUser = {
    name: "Default User",
    email: "user@example.com",
    role: "User",
    status: "Active",
    registrationDate: "2024-01-01",
    lastLogin: "2024-02-15",
    activityHistory: ["Logged in", "Updated profile"],
    assignedServices: ["Service A", "Service B"],
  };

  const u = user || defaultUser;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition">
      <div className="bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl relative transition">
        <h2 className="header text-gray-800 dark:text-white mb-4">User Details</h2>
        <button
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 text-2xl font-bold dark:hover:text-white transition"
          onClick={onClose}
        >
          <MdClose />
        </button>

        <div className="mb-4 space-y-2">
          <p><strong>Name:</strong> {u.name}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Role:</strong> {u.role}</p>
          <p><strong>Status:</strong> {u.status}</p>
          <p><strong>Registration Date:</strong> {u.registrationDate}</p>
          <p><strong>Last Login:</strong> {u.lastLogin}</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Activity History</h3>
        <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
          {u.activityHistory && u.activityHistory.length > 0 ? (
            u.activityHistory.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))
          ) : (
            <li>No activity history available.</li>
          )}
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Assigned Services</h3>
        <ul className="list-disc ml-5 mb-4 text-gray-600 dark:text-gray-300">
          {u.assignedServices && u.assignedServices.length > 0 ? (
            u.assignedServices.map((service, index) => (
              <li key={index}>{service}</li>
            ))
          ) : (
            <li>No services assigned.</li>
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

export default UserDetailsModal;
