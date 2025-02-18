// File: components/vendors/RequestNewService.jsx
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import NewServiceForm from "./NewServiceForm";

const RequestNewService = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full  flex justify-end mb-6">
      {/* Request New Service Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green text-white font-semibold px-6 py-3 rounded-2xl btn-green flex items-center gap-2 shadow-xl hover:shadow-2xl transition-transform duration-300"
      >
        <IoMdAdd size={22} />
        <span className="text-sm sm:text-base">Request New Service</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center px-3 justify-center z-50 transition-opacity duration-300">
          <div className="bg-white h-[90%] overflow-auto dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-transform duration-300 transform">
            {/* Modal Header */}
            <div className="flex font-header justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">
              <h2 className="text-2xl font-header font-bold text-gray-900 dark:text-white truncate">
                Request a New Service
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl font-bold transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            {/* New Service Form Component */}
            <NewServiceForm closeModal={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestNewService;
