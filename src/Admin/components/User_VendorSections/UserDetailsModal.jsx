import React, { useEffect, useRef, useState } from "react";
import { 
  MdClose, 
  MdPerson, 
  MdOutlineCalendarMonth, 
  MdLogin, 
  MdEmail,
  MdHistory,
  MdLocalOffer,
  MdEdit,
  MdRefresh
} from "react-icons/md";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Default mock user data if none is provided
  const defaultUser = {
    name: "Default User",
    email: "user@example.com",
    role: "User",
    status: "Active",
    registrationDate: "2024-01-01",
    lastLogin: "2024-02-15",
    activityHistory: [
      { action: "Logged in", date: "2024-02-15", time: "14:32" },
      { action: "Updated profile", date: "2024-02-10", time: "09:15" },
      { action: "Changed password", date: "2024-01-30", time: "16:05" },
      { action: "Added payment method", date: "2024-01-25", time: "11:22" }
    ],
    assignedServices: [
      { name: "Premium Support", status: "Active", startDate: "2024-01-15" },
      { name: "Cloud Storage", status: "Active", startDate: "2024-01-15" }
    ],
    contactInfo: {
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, USA",
      timezone: "GMT-5"
    }
  };
  
  const u = user || defaultUser;
  
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);
  
  // Handle click outside modal to close
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  // Animation mounting
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.classList.add("opacity-100", "translate-y-0");
      modalRef.current.classList.remove("opacity-0", "translate-y-4");
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto px-4 py-6">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out opacity-0 translate-y-4 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 rounded-t-xl z-10">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white flex items-center">
            <MdPerson className="mr-2 text-blue-600 dark:text-blue-400" />
            User Details
          </h2>
          <button
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            onClick={onClose}
            aria-label="Close"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="px-6 pt-4 flex border-b dark:border-gray-700">
          <button
            className={`pb-2 px-4 font-medium text-sm transition-colors relative ${
              activeTab === "profile" 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
            {activeTab === "profile" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></span>
            )}
          </button>
          <button
            className={`pb-2 px-4 font-medium text-sm transition-colors relative ${
              activeTab === "activity" 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
            {activeTab === "activity" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></span>
            )}
          </button>
          <button
            className={`pb-2 px-4 font-medium text-sm transition-colors relative ${
              activeTab === "services" 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("services")}
          >
            Services
            {activeTab === "services" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></span>
            )}
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto flex-grow px-6 py-4">
          {activeTab === "profile" && (
            <>
              {/* User summary card */}
              <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{u.name}</h3>
                    <div className="flex items-center mt-1">
                      <MdEmail className="text-gray-500 dark:text-gray-400 mr-1" />
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{u.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(u.status)}`}>
                    {u.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MdOutlineCalendarMonth className="text-gray-500 dark:text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Registration Date</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{formatDate(u.registrationDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MdLogin className="text-gray-500 dark:text-gray-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last Activity</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{formatDate(u.lastLogin)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              {u.contactInfo && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Contact Information
                  </h3>
                  <div className="bg-white dark:bg-gray-750 shadow rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {u.contactInfo.phone || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Timezone</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {u.contactInfo.timezone || "Not set"}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {u.contactInfo.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Account Actions */}
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Account Management
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 rounded-md text-sm">
                    <MdEdit className="mr-1" /> Edit Profile
                  </button>
                  <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-650 text-gray-700 dark:text-gray-200 rounded-md text-sm">
                    <MdRefresh className="mr-1" /> Reset Password
                  </button>
                </div>
              </div>
            </>
          )}
          
          {activeTab === "activity" && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <MdHistory className="mr-2 text-blue-600 dark:text-blue-400" />
                Activity History
              </h3>
              
              {u.activityHistory && u.activityHistory.length > 0 ? (
                <div className="overflow-hidden border dark:border-gray-700 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-750">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Action
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {u.activityHistory.map((activity, index) => (
                        <tr 
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                            {activity.action || activity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            {activity.date || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            {activity.time || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic text-sm">No activity history available.</p>
              )}
            </>
          )}
          
          {activeTab === "services" && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <MdLocalOffer className="mr-2 text-blue-600 dark:text-blue-400" />
                Assigned Services
              </h3>
              
              {u.assignedServices && u.assignedServices.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {u.assignedServices.map((service, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {service.name || service}
                        </h4>
                        {service.status && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        )}
                      </div>
                      
                      {service.startDate && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Started: </span>
                          <span className="text-gray-700 dark:text-gray-300">{formatDate(service.startDate)}</span>
                        </div>
                      )}
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic text-sm">No services assigned.</p>
              )}
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t dark:border-gray-700 flex justify-end space-x-3 sticky bottom-0 bg-white dark:bg-gray-800 rounded-b-xl">
          <button 
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;