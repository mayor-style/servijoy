import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const NewDisputeForm = ({ isOpen, onClose, onSubmit }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
    setFocus
  } = useForm();

  // Focus on first field when modal opens
  useEffect(() => {
    if (isOpen) {
      setFocus("subject");
    }
  }, [isOpen, setFocus]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const onFormSubmit = (data) => {
    const newDispute = {
      id: Date.now(),
      subject: data.subject,
      description: data.description,
      bookingRef: data.bookingRef,
      date: new Date().toLocaleDateString(),
      status: "pending",
      messages: [],
    };
    onSubmit(newDispute);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="dispute-form-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative transition-all transform"
        onClick={handleModalClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
          aria-label="Close form"
        >
          <X size={20} />
        </button>
        
        <h2 
          id="dispute-form-title"
          className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700"
        >
          Raise a New Dispute
        </h2>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              {...register("subject", { 
                required: "Subject is required", 
                minLength: { value: 3, message: "Subject must be at least 3 characters" } 
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                dark:bg-gray-700 dark:text-white`}
              placeholder="Brief description of the issue"
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="bookingRef" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Booking Reference <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="bookingRef"
                {...register("bookingRef", { 
                  required: "Booking reference is required", 
                  pattern: { 
                    value: /^BK-\d{4}$/, 
                    message: "Format must be BK-XXXX (e.g., BK-1234)" 
                  } 
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                  ${errors.bookingRef ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                  dark:bg-gray-700 dark:text-white`}
                placeholder="BK-1234"
                aria-invalid={errors.bookingRef ? "true" : "false"}
                aria-describedby={errors.bookingRef ? "bookingRef-error" : "bookingRef-format"}
              />
              <span id="bookingRef-format" className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                Format: BK-XXXX
              </span>
            </div>
            {errors.bookingRef && (
              <p id="bookingRef-error" className="mt-1 text-sm text-red-500">{errors.bookingRef.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              {...register("description", { 
                required: "Description is required", 
                minLength: { value: 10, message: "Description must be at least 10 characters" } 
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                dark:bg-gray-700 dark:text-white`}
              rows={4}
              placeholder="Please provide details about your issue"
              aria-invalid={errors.description ? "true" : "false"}
              aria-describedby={errors.description ? "description-error" : undefined}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
              Please include relevant details such as dates, services, and specific issues.
            </span>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Dispute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDisputeForm;