import React from "react";
import { Link } from "react-router-dom";
import sampleImg from '../../assets/imgs/flooring.webp';
import OptimizedImage from "../OptimizedImage";
import { ArrowRight, Star } from "lucide-react";

const relatedServices = [
  {
    id: 1,
    name: "Move-in / Move-out Cleaning",
    description: "Perfect for tenants or homeowners moving in or out.",
    image: "/images/move-out-cleaning.webp",
    link: "/services/move-out-cleaning",
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: 2,
    name: "Office Cleaning",
    description: "Professional office cleaning to keep your workspace fresh.",
    image: "/images/office-cleaning.webp",
    link: "/services/office-cleaning",
    rating: 4.8,
    reviewCount: 97,
  },
  {
    id: 3,
    name: "Carpet & Upholstery Cleaning",
    description: "Deep cleaning for carpets, sofas, and upholstery.",
    image: "/images/carpet-cleaning.webp",
    link: "/services/carpet-cleaning",
    rating: 4.7,
    reviewCount: 86,
  },
];

const RelatedServices = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-green/10 text-green/80 rounded-full text-sm font-medium mb-3">
            DISCOVER MORE
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services You May Also Like
          </h3>
          <div className="w-24 h-1 bg-green/50 mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              
              {/* Service Image with Overlay */}
              <div className="relative overflow-hidden">
                <OptimizedImage 
                  alt={service.name} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  src={sampleImg}
                  rounded="rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Service Details */}
              <div className="p-6">
                {/* Ratings */}
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-800">{service.rating}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{service.reviewCount} reviews</span>
                </div>
                
                <h4 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green/60 transition-colors duration-300">
                  {service.name}
                </h4>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                {/* CTA Button */}
                <Link 
                  to={service.link} 
                  className="mt-2 inline-flex items-center px-4 py-2 bg-white text-green/60 border border-green/60 rounded-lg font-medium transition-all duration-300 hover:bg-green/60 hover:text-white group-hover:shadow-md"
                >
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="inline-flex items-center px-6 py-3 bg-green/60 text-white rounded-lg font-medium transition-all duration-300 hover:bg-green/70 hover:shadow-lg"
          >
            View All Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;