// File: components/explore/ServiceListings.jsx
import React, { useState } from "react";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { FaStar } from "react-icons/fa";

const ServiceListings = ({ services = [] }) => {
  const fallbackService = [
    {
      id: 1,
      title: "Home Cleaning",
      shortDescription: "Keep your home spotless with our professional cleaning service.",
      description: "Detailed description of the service...",
      image: "/images/home-cleaning.jpg",
      pricing: "$50 - $150",
      rating: 4.7,
      reviews: 120,
      features: ["Eco-friendly cleaning", "Experienced staff", "Flexible scheduling"],
    },
  ];

  const validServices = Array.isArray(services) && services.length > 0 ? services : fallbackService;
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  return (
    <section className="py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validServices.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {service.image && (
                <img src={service.image} alt={service.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{service.shortDescription}</p>
                {service.pricing && (
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{service.pricing}</p>
                )}
                {service.rating && (
                  <div className="flex items-center space-x-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(service.rating) ? "text-yellow-500" : "text-gray-300"}
                        size={20}
                      />
                    ))}
                  </div>
                )}
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 text-base font-semibold"
                  onClick={() => handleViewDetails(service)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ServiceDetailsModal service={selectedService} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default ServiceListings;

