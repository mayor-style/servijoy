import React, { useState, useEffect } from "react";
import VendorFilters from "./components/AvailableVendorsSections/VendorFilters";
import VendorCard from "./components/AvailableVendorsSections/VendorCard";
import VendorDetailsModal from "./components/AvailableVendorsSections/VendorDetailsModal";

const AvailableVendors = () => {
  // MOCK DATA for vendors (simulate backend API response)
  const initialVendors = [
    {
      id: 1,
      name: "John's Plumbing",
      profileImage: "../../../assets/imgs/hero.webp",
      experience: 5,
      rating: 4.8,
      reviews: 120,
      pricing: "$50 - $100",
      description: "Expert plumbing services with quick response times.",
      reviewsList: [
        { reviewer: "Alice", comment: "Great service!" },
        { reviewer: "Bob", comment: "Highly recommended." },
      ],
    },
    {
      id: 2,
      name: "Elegant Cleaning",
      profileImage: "../../../assets/imgs/hero.webp",
      experience: 7,
      rating: 4.6,
      reviews: 90,
      pricing: "$40 - $80",
      description: "Premium cleaning services for your home or office.",
      reviewsList: [{ reviewer: "Charlie", comment: "Very thorough and friendly." }],
    },
    {
      id: 3,
      name: "Ace Electric",
      profileImage: "../../../assets/imgs/hero.webp",
      experience: 8,
      rating: 4.9,
      reviews: 150,
      pricing: "$60 - $120",
      description: "Reliable electrical repairs and installations.",
      reviewsList: [
        { reviewer: "David", comment: "Efficient and professional." },
        { reviewer: "Eva", comment: "Excellent work." },
      ],
    },
  ];

  const [vendors, setVendors] = useState(initialVendors);
  const [filteredVendors, setFilteredVendors] = useState(initialVendors);
  const [activeVendor, setActiveVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  // Update filtered vendors when search query or sort option changes
  useEffect(() => {
    let result = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortBy === "rating") {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      result = result.sort((a, b) => {
        const aPrice = parseInt(a.pricing.split(" ")[0].replace("$", ""));
        const bPrice = parseInt(b.pricing.split(" ")[0].replace("$", ""));
        return aPrice - bPrice;
      });
    } else if (sortBy === "experience") {
      result = result.sort((a, b) => b.experience - a.experience);
    }
    setFilteredVendors(result);
  }, [searchQuery, sortBy, vendors]);

  const handleFilterChange = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handleViewDetails = (vendor) => {
    setActiveVendor(vendor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setActiveVendor(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-10 px-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center dark:text-white mb-6">
          Available Vendors
        </h1>
        <VendorFilters onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
        
        {filteredVendors.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No vendors found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}
      </div>
      
      <VendorDetailsModal vendor={activeVendor} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default AvailableVendors;
