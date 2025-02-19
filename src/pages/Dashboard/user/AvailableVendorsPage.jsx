import React, { useState, useEffect } from "react";
import VendorFilters from "./components/AvailableVendorsSections/VendorFilters";
import VendorCard from "./components/AvailableVendorsSections/VendorCard";
import VendorDetailsModal from "./components/AvailableVendorsSections/VendorDetailsModal";
import BookingFlowModal from "./components/AvailableVendorsSections/BookingFlowModal"; // New component

const AvailableVendors = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  // Booking state
  const [bookingVendor, setBookingVendor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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
    setIsDetailsModalOpen(true);
  };

  const handleBookNow = (vendor) => {
    setBookingVendor(vendor);
    setIsBookingModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setActiveVendor(null);
    setIsDetailsModalOpen(false);
  };

  const handleCloseBookingModal = () => {
    setBookingVendor(null);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="relative min-h-screen dark:bg-gray-900 py-10 px-0 transition-colors duration-300">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <span className="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
      {!loading && (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-gray-800 md:text-4xl font-bold text-center font-header dark:text-gray-200 mb-6">
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
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onViewDetails={handleViewDetails}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <VendorDetailsModal vendor={activeVendor} isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} />
      <BookingFlowModal vendor={bookingVendor} isOpen={isBookingModalOpen} onClose={handleCloseBookingModal} />
    </div>
  );
};

export default AvailableVendors;
