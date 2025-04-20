import React, { useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash, FaFile, FaHistory, FaCalendarAlt, FaUser, FaTags } from "react-icons/fa";

const ServiceModals = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemType, setDeleteItemType] = useState("");
  const [deleteItemName, setDeleteItemName] = useState("");

  // Sample data for demonstration
  const requestDetails = {
    id: "REQ123",
    requester: "John Doe (Vendor)",
    service: "Home Cleaning",
    category: "Cleaning",
    description: "Weekly home cleaning service",
    status: "Pending",
    priority: "Medium",
    attachments: ["invoice.pdf", "contract.docx"],
    history: [
      { date: "2025-02-10", action: "Request Submitted", user: "John Doe" },
      { date: "2025-02-12", action: "Status changed to Pending", user: "Admin User" },
    ],
  };

  const categoryDetails = {
    name: "Cleaning",
    totalServices: 15,
    status: "Active",
    createdAt: "2025-01-01",
    modifiedHistory: [
      { date: "2025-01-05", action: "Category created", user: "Admin User" },
      { date: "2025-02-01", action: "Status changed to Active", user: "System" },
    ],
  };

  const handleDeleteRequest = (type, name) => {
    setDeleteItemType(type);
    setDeleteItemName(name);
    setShowDeleteModal(true);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case 'active':
        case 'completed':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'inactive':
          return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        default:
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
        {status}
      </span>
    );
  };

  // Timeline component for history
  const Timeline = ({ items }) => {
    return (
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              {index < items.length - 1 && <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>}
            </div>
            <div className="pb-4">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">{item.date}</span>
                {item.user && (
                  <>
                    <FaUser className="ml-3 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-500">{item.user}</span>
                  </>
                )}
              </div>
              <p className="mt-1">{item.action}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Modal component for consistent styling
  const Modal = ({ title, children, onClose, size = "md" }) => {
    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl"
    };
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className={`w-full ${sizeClasses[size]} rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-hidden`}>
          <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      {/* Cards for dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
              <h3 className="text-2xl font-bold">128</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <FaEye className="text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-500">+5% from last week</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Categories</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <FaTags className="text-green-600 dark:text-green-300" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-500">+2 new categories</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
              <h3 className="text-2xl font-bold">38</h3>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <FaHistory className="text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
          <div className="mt-2 text-sm text-red-500">+12% from last week</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
              <h3 className="text-2xl font-bold">85</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
              <FaFile className="text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-500">+8% from last week</div>
        </div>
      </div>

      {/* Action buttons with better styling */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-bold mb-4 dark:text-white">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowRequestModal(true)}
          >
            <FaEye className="mr-2" /> View Request
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => setShowCategoryModal(true)}
          >
            <FaTags className="mr-2" /> View Category
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => setShowEditCategoryModal(true)}
          >
            <FaEdit className="mr-2" /> Edit Category
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => handleDeleteRequest("category", categoryDetails.name)}
          >
            <FaTrash className="mr-2" /> Delete Category
          </button>
        </div>
      </div>

      {/* Request Details Modal */}
      {showRequestModal && (
        <Modal 
          title="Service Request Details" 
          onClose={() => setShowRequestModal(false)}
          size="lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Request Information</h4>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-medium w-1/3">ID:</span>
                  <span className="text-gray-800 dark:text-gray-200">{requestDetails.id}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Requester:</span>
                  <span className="text-gray-800 dark:text-gray-200">{requestDetails.requester}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Service:</span>
                  <span className="text-gray-800 dark:text-gray-200">{requestDetails.service}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Category:</span>
                  <span className="text-gray-800 dark:text-gray-200">{requestDetails.category}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Status:</span>
                  <StatusBadge status={requestDetails.status} />
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Priority:</span>
                  <span className="text-gray-800 dark:text-gray-200">{requestDetails.priority}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Description</h4>
              <p className="text-gray-800 dark:text-gray-200">{requestDetails.description}</p>
              
              <h4 className="font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-300">Attachments</h4>
              <div className="flex flex-wrap gap-2">
                {requestDetails.attachments.map((file, index) => (
                  <div key={index} className="flex items-center px-3 py-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
                    <FaFile className="mr-2 text-blue-500" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4">
            <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Request History</h4>
            <Timeline items={requestDetails.history} />
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => { /* Handle approval */ }}
            >
              Approve Request
            </button>
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setShowRequestModal(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Category Details Modal */}
      {showCategoryModal && (
        <Modal 
          title="Service Category Details" 
          onClose={() => setShowCategoryModal(false)}
        >
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">{categoryDetails.name}</h4>
              <StatusBadge status={categoryDetails.status} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Services</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">{categoryDetails.totalServices}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 dark:text-gray-400">Created At</span>
                <span className="text-gray-800 dark:text-white">{categoryDetails.createdAt}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Modification History</h4>
            <Timeline items={categoryDetails.modifiedHistory} />
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={() => {
                setShowCategoryModal(false);
                setShowEditCategoryModal(true);
              }}
            >
              <FaEdit className="inline mr-2" /> Edit
            </button>
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setShowCategoryModal(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Edit Category Modal */}
      {showEditCategoryModal && (
        <Modal 
          title="Edit Service Category" 
          onClose={() => setShowEditCategoryModal(false)}
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                defaultValue={categoryDetails.name} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows="3"
                placeholder="Enter category description..."
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowEditCategoryModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal 
          title={`Confirm Delete ${deleteItemType}`} 
          onClose={() => setShowDeleteModal(false)}
          size="sm"
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
              <FaTrash className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Delete {deleteItemType}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{deleteItemName}"? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => setShowDeleteModal(false)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ServiceModals;