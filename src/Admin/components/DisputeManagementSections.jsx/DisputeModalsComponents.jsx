import React, { useState, useEffect } from "react";

// Custom Button component
const Button = ({ 
  children, 
  variant = "default", 
  size = "md", 
  onClick, 
  className = "",
  icon = null 
}) => {
  const baseStyles = "font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
    outline: "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
    default: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
};

// Custom Modal Backdrop & Container
const Modal = ({ isOpen, onClose, children, size = "md" }) => {
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container with animation */}
      <div 
        className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all duration-300 w-full ${sizeClasses[size]} m-4 overflow-hidden`}
        style={{animation: "modalAppear 0.3s ease-out"}}
      >
        {children}
      </div>
      
      {/* Global animation */}
      <style jsx global>{`
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// Custom Form Components
const FormLabel = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
    {children}
  </label>
);

const Select = ({ value, onChange, options, className = "" }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className={`block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 pl-3 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    >
      {options.map(option => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
);

const TextArea = ({ value, onChange, placeholder = "", rows = 4, className = "" }) => (
  <textarea
    value={value}
    onChange={onChange}
    rows={rows}
    placeholder={placeholder}
    className={`block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

// Badge component for status display
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
      {status}
    </span>
  );
};

// Enhanced Dispute Details Modal
const DisputeDetailsModal = ({ dispute, isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="md">
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Dispute Details
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{dispute.id}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Vendor</span>
          <span className="text-sm text-gray-900 dark:text-gray-100">{dispute.vendor}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</span>
          <span className="text-sm text-gray-900 dark:text-gray-100">{dispute.subject}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</span>
          <span className="text-sm text-gray-900 dark:text-gray-100">{dispute.date}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</span>
          <StatusBadge status={dispute.status} />
        </div>
        
        <div className="pt-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">Description</span>
          <div className="text-sm text-gray-900 dark:text-gray-100 p-3 bg-gray-50 dark:bg-gray-750 rounded-md min-h-16">
            {dispute.description || "No description provided"}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} variant="primary">Close</Button>
      </div>
    </div>
  </Modal>
);

// Enhanced Edit Dispute Modal
const EditDisputeModal = ({ dispute, isOpen, onSave, onClose }) => {
  const [status, setStatus] = useState(dispute.status);
  const [notes, setNotes] = useState(dispute.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call with a slight delay
    setTimeout(() => {
      onSave({ status, notes });
      setIsSaving(false);
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Dispute <span className="text-blue-600 dark:text-blue-400">{dispute.id}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={["Pending", "Resolved", "Rejected"]}
            />
          </div>
          
          <div>
            <FormLabel>Notes</FormLabel>
            <TextArea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add detailed notes about this dispute..."
              rows={5}
            />
          </div>
          
          <div className="pt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()} 
            </span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="primary"
            className={isSaving ? "opacity-80 cursor-not-allowed" : ""}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : "Save Changes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Enhanced Delete Dispute Modal
const DeleteDisputeModal = ({ disputeId, isOpen, onConfirm, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Simulate API call with a slight delay
    setTimeout(() => {
      onConfirm(disputeId);
      setIsDeleting(false);
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Delete Dispute
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete dispute <span className="font-semibold">#{disputeId}</span>? This action cannot be undone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              onClick={handleDelete} 
              variant="danger" 
              className="w-full sm:w-auto"
              icon={isDeleting ? (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { DisputeDetailsModal, EditDisputeModal, DeleteDisputeModal };