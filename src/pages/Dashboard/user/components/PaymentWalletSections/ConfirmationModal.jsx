import React from 'react';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 className="text-lg font-bold dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 text-gray-600 dark:text-gray-300 rounded-md">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;