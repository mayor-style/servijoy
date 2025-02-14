// File: components/explore/ExploreServices.jsx 
import React, { useState, useEffect } from "react";
import SearchFilter from "./components/ExploreServicesSections/SearchFilter";
import TrendingServices from "./components/ExploreServicesSections/TrendingServices"; // Accepts a `services` prop
import ServiceCategories from "./components/ExploreServicesSections/ServiceCategories"; // Accepts an `onSelectCategory` prop
import ServiceListings from "./components/ExploreServicesSections/ServiceListings";

// MOCK DATA for services (simulate database data)
const mockServices = [
  {
    id: 1,
    title: "Home Cleaning",
    shortDescription: "Keep your home spotless with our professional cleaning service.",
    description:
      "Enjoy a thorough, eco-friendly cleaning service that ensures every corner of your home is spotless. Our experienced staff provides flexible scheduling to suit your needs.",
    image: "../../../assets/imgs/home_repair.webp",
    pricing: "$50 - $150",
    minPrice: 50,
    maxPrice: 150,
    rating: 4.8,
    reviews: 120,
    features: ["Eco-friendly cleaning", "Experienced staff", "Flexible scheduling"],
    category: "Cleaning",
    location: "New York",
    available: true,
  },
  {
    id: 2,
    title: "Plumbing Services",
    shortDescription: "Fix leaks and clogs with expert plumbing services.",
    description:
      "Our plumbing experts provide fast and reliable repair services, from fixing leaks to unclogging drains. We guarantee quality workmanship and quick response times.",
    image: "../../../assets/imgs/plumbing (2).webp",
    pricing: "$70 - $200",
    minPrice: 70,
    maxPrice: 200,
    rating: 4.7,
    reviews: 95,
    features: ["Fast response", "Quality workmanship"],
    category: "Repairs",
    location: "Los Angeles",
    available: true,
  },
  {
    id: 3,
    title: "Electrical Repairs",
    shortDescription:
      "Professional electrical repair services for your home or office.",
    description:
      "Our certified electricians are available 24/7 to handle all your electrical repair needs. Safety and precision are our top priorities.",
    image: "../../../assets/imgs/electrical.webp",
    pricing: "$80 - $250",
    minPrice: 80,
    maxPrice: 250,
    rating: 4.9,
    reviews: 110,
    features: ["Certified electricians", "24/7 service"],
    category: "Electrical",
    location: "Chicago",
    available: false,
  },
  {
    id: 4,
    title: "Painting Services",
    shortDescription:
      "High-quality painting services for interiors and exteriors.",
    description:
      "Transform your space with our professional painting services. We provide a flawless finish with long-lasting results for both interior and exterior projects.",
    image: "../../../assets/imgs/painting.webp",
    pricing: "$100 - $300",
    minPrice: 100,
    maxPrice: 300,
    rating: 4.6,
    reviews: 80,
    features: ["Professional finish", "Long-lasting paint"],
    category: "Painting",
    location: "San Francisco",
    available: true,
  },
];

const ExploreServices = () => {
  // State to capture filter settings from SearchFilter
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: [0, 1000],
    rating: "all",
    availability: false,
    location: "",
  });

  // State to capture the selected category from ServiceCategories
  const [selectedCategory, setSelectedCategory] = useState("");

  // State for the list of services to display (after filtering)
  const [filteredServices, setFilteredServices] = useState(mockServices);

  // Handle changes from the SearchFilter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle category selection from the ServiceCategories component
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Determine trending services (for this demo, trending are those with rating >= 4.8)
  const trendingServices = mockServices.filter(
    (service) => service.rating >= 4.8
  );

  // Update filtered services whenever filters or selected category change
  useEffect(() => {
    const filtered = mockServices.filter((service) => {
      // Search Query: check in title and short description (case-insensitive)
      const searchMatch =
        service.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Price Range: ensure service falls within selected price range
      const priceMatch =
        service.minPrice >= filters.priceRange[0] &&
        service.maxPrice <= filters.priceRange[1];

      // Ratings: if filter is not "all", ensure service rating meets the threshold
      const ratingMatch =
        filters.rating === "all" || service.rating >= parseInt(filters.rating);

      // Availability: if true, ensure the service is available
      const availabilityMatch =
        !filters.availability || service.available === true;

      // Location: if provided, check if the service location contains the filter text
      const locationMatch =
        filters.location === "" ||
        service.location.toLowerCase().includes(filters.location.toLowerCase());

      // Category: if a category is selected, check if the service matches it
      const categoryMatch =
        selectedCategory === "" || service.category === selectedCategory;

      return (
        searchMatch &&
        priceMatch &&
        ratingMatch &&
        availabilityMatch &&
        locationMatch &&
        categoryMatch
      );
    });
    setFilteredServices(filtered);
  }, [filters, selectedCategory]);

  return (
    <div className="min-h-screen transition-colors duration-300  px-0 dark:bg-gray-900">
      {/* Search & Filter Section */}
      <SearchFilter onFilterChange={handleFilterChange} />

      {/* Trending Services Section */}
      <TrendingServices services={trendingServices} />

      {/* Service Categories Section */}
      <ServiceCategories onSelectCategory={handleCategorySelect} />

      {/* Service Listings Section */}
      <ServiceListings services={filteredServices} />
    </div>
  );
};

export default ExploreServices;
