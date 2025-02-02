import React from "react";
import { Link } from "react-router-dom";

const relatedServices = [
  {
    id: 1,
    name: "Move-in / Move-out Cleaning",
    description: "Perfect for tenants or homeowners moving in or out.",
    image: "/images/move-out-cleaning.webp",
    link: "/services/move-out-cleaning",
  },
  {
    id: 2,
    name: "Office Cleaning",
    description: "Professional office cleaning to keep your workspace fresh.",
    image: "/images/office-cleaning.webp",
    link: "/services/office-cleaning",
  },
  {
    id: 3,
    name: "Carpet & Upholstery Cleaning",
    description: "Deep cleaning for carpets, sofas, and upholstery.",
    image: "/images/carpet-cleaning.webp",
    link: "/services/carpet-cleaning",
  },
];

const RelatedServices = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Title */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          You May Also Like
        </h3>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
              
              {/* Service Image */}
              <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
              
              {/* Service Details */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">{service.name}</h4>
                <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                
                {/* CTA */}
                <Link to={service.link} className="mt-3 inline-block text-green-600 font-medium hover:underline">
                  View Details →
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedServices;
