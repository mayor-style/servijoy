import React, { useState, useEffect, useRef } from "react";
import SearchFilter from "./components/ExploreServicesSections/SearchFilter";
import axios from "axios";
import TrendingServices from "./components/ExploreServicesSections/TrendingServices";
import ServiceCategories from "./components/ExploreServicesSections/ServiceCategories";
import ServiceListings from "./components/ExploreServicesSections/ServiceListings";
import { motion } from "framer-motion";
import { FaSpinner, FaSearch, FaFilter } from "react-icons/fa";

// MOCK DATA (unchanged)
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
    shortDescription: "Professional electrical repair services for your home or office.",
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
    shortDescription: "High-quality painting services for interiors and exteriors.",
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
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: [0, 50000000],
    rating: "all",
    availability: false,
    location: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [trendingServices, setTrendingServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("all");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const serviceListingsRef = useRef(null);

  // Fetch services, trending services, and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/services`, {
          params: {
            searchQuery: filters.searchQuery,
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
            rating: filters.rating,
            availability: filters.availability ? 'true' : '',
            location: filters.location,
            category: selectedCategory
          }
        });

        // Fetch trending services
        const trendingResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/services/trending`);

        // Fetch categories
        const categoriesResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);

        setFilteredServices(servicesResponse.data);
        setTrendingServices(trendingResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load services. Please try again.");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [filters, selectedCategory]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (serviceListingsRef.current) {
      serviceListingsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveSection("listings");
    if (serviceListingsRef.current) {
      serviceListingsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800">
        <div className="text-center">
          <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto" aria-label="Loading services" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800">
        <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              setTimeout(() => {
                setFilteredServices(mockServices);
                setLoading(false);
              }, 800);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-gray-50 dark:bg-gray-800 transition-colors duration-300 overflow-y-auto"
    >
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-gray-700 shadow-sm border-b border-gray-200 dark:border-gray-600">
        <div className="px-4 py-4 sm:px-6 flex justify-between items-center flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Services Explorer</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Find and book the services you need
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex items-center gap-2">
            <div className="relative max-w-xs">
              <input
                type="text"
                placeholder="Search services..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                className="w-full py-2 px-4 pl-10 rounded-md border border-gray-200 dark:border-gray-600 text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`p-2 rounded-md ${showFilterPanel ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'} hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-300`}
            >
              <FaFilter />
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-2 py-2">
            <button
              onClick={() => handleSectionChange("all")}
              className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-md transition ${
                activeSection === "all"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => handleSectionChange("listings")}
              className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-md transition ${
                activeSection === "listings"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
              }`}
            >
              Available Services
            </button>
            <button
              onClick={() => handleSectionChange("trending")}
              className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-md transition ${
                activeSection === "trending"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => handleSectionChange("categories")}
              className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-md transition ${
                activeSection === "categories"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
              }`}
            >
              Categories
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4">
        {/* Filters Panel (Collapsible) */}
        {showFilterPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
              <SearchFilter onFilterChange={handleFilterChange} />
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Main Content */}
          <main className="space-y-6">
            {/* Service Listings Section */}
            {(activeSection === "all" || activeSection === "listings") && (
              <motion.section
                ref={serviceListingsRef}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedCategory ? `${selectedCategory} Services` : "Available Services"}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredServices.length} results
                  </span>
                </div>
                {filteredServices.length === 0 ? (
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No services found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => {
                        setFilters({
                          searchQuery: "",
                          priceRange: [0, 1000],
                          rating: "all",
                          availability: false,
                          location: "",
                        });
                        setSelectedCategory("");
                      }}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                    >
                      Reset all filters
                    </button>
                  </div>
                ) : (
                  <ServiceListings services={filteredServices} />
                )}
              </motion.section>
            )}

            {/* Trending Services Section */}
            {(activeSection === "all" || activeSection === "trending") && (
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Trending Services
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Top Rated
                  </span>
                </div>
                <TrendingServices services={trendingServices} />
              </motion.section>
            )}

            {/* Service Categories Section */}
            {(activeSection === "all" || activeSection === "categories") && (
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Browse by Category
                </h2>
                <ServiceCategories onSelectCategory={handleCategorySelect} />
              </motion.section>
            )}
          </main>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-100 dark:bg-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Didn't find what you're looking for?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're constantly adding new services to our platform. Let us know what you're looking for.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Request a Service
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExploreServices; 
