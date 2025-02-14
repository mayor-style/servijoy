
// File: components/explore/ServiceDetailsModal.jsx
import React from "react";
import { FaTimes, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ServiceDetailsModal = ({ service, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !service) return null;

  const serviceRouteName = service.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative transition-all transform">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <FaTimes size={22} />
        </button>

        {service.image && (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-56 md:h-64 object-cover rounded-xl mb-6"
          />
        )}

        <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">{service.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-base">{service.description}</p>

        {service.features && service.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold dark:text-white mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 max-h-40 overflow-y-auto overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-600">
              {service.features.map((feature, index) => (
                <li key={index} className="text-base">{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {service.rating && (
          <div className="flex items-center mb-6">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(service.rating) ? "text-yellow-500" : "text-gray-300"}
                  size={20}
                />
              ))}
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300 text-base">
              {service.rating} ({service.reviews} reviews)
            </span>
          </div>
        )}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95 text-lg font-semibold"
          onClick={() => navigate(`/dashboard/book/${serviceRouteName}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;
