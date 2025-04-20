import React, { useState, useEffect } from "react";
import { Search, Sliders, Star, Clock, DollarSign, Scaling } from "lucide-react";
import VendorFilters from "./components/AvailableVendorsSections/VendorFilters";
import axios from "axios";
import VendorDetailsModal from "./components/AvailableVendorsSections/VendorDetailsModal";
import BookingFlowModal from "./components/AvailableVendorsSections/BookingFlowModal";
import { useParams } from "react-router-dom";

const AvailableVendors = () => {
  const [loading, setLoading] = useState(true);
  let service = useParams();
  
  // Extract only the first word before the hyphen
  const serviceName = service.serviceName ? service.serviceName.split('-')[0] : "";

  // Initial mockup vendors data (keeping as fallback)
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
      categories: ["Plumbing", "Emergency", "Residential"],
      availability: "Same day",
      reviewsList: [
        { reviewer: "Alice", rating: 5, comment: "Great service!" },
        { reviewer: "Bob", rating: 4, comment: "Highly recommended." },
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
      categories: ["Cleaning", "Residential", "Commercial"],
      availability: "Next day",
      reviewsList: [
        { reviewer: "Charlie", rating: 5, comment: "Very thorough and friendly." }
      ],
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
      categories: ["Electrical", "Emergency", "Residential"],
      availability: "Same day",
      reviewsList: [
        { reviewer: "David", rating: 5, comment: "Efficient and professional." },
        { reviewer: "Eva", rating: 4, comment: "Excellent work." },
      ],
    },
  ];

  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [activeVendor, setActiveVendor] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filters, setFilters] = useState({
    categories: [],
    minRating: 0,
    availability: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [error, setError] = useState(null);

  // Booking state
  const [bookingVendor, setBookingVendor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Recently viewed vendors
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Fetch vendors from API
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        // Use serviceName from params or hardcoded service if needed
        const serviceTypeParam = serviceName || "emergency";
        console.log(serviceTypeParam)
        const response = await axios.get(`http://localhost:5000/api/vendors/service?serviceType=${serviceTypeParam}`);
        
        if (response.data.success && response.data.vendors && response.data.vendors.length > 0) {
          // Transform the API response to match our expected format
          const transformedVendors = response.data.vendors.map(vendor => ({
            id: vendor.id,
            name: vendor.name || vendor.businessName || "Unnamed Vendor", // Fallback if name is missing
            profileImage: vendor.profileImage || "../../../assets/imgs/hero.webp",
            experience: vendor.experience || 0,
            rating: vendor.rating || 0,
            reviews: vendor.reviews || 0,
            pricing: vendor.pricing || "Not specified",
            description: vendor.description || "",
            categories: vendor.categories || [],
            availability: vendor.availability || "Not specified",
            reviewsList: vendor.reviewsList || [],
            vendorVerified: vendor.vendorVerified
          }));
          
          setVendors(transformedVendors);
          setFilteredVendors(transformedVendors);
          console.log("API vendors loaded:", transformedVendors);
        } else {
          console.log("No vendors found, using mockup data");
          setVendors(initialVendors);
          setFilteredVendors(initialVendors);
        }
      } catch (err) {
        console.error("Error fetching vendors:", err);
        setError("Failed to load vendors. Using default data instead.");
        // Fallback to mockup data on error
        setVendors(initialVendors);
        setFilteredVendors(initialVendors);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [serviceName]);

  useEffect(() => {
    let result = vendors;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((vendor) =>
        vendor.categories.some(cat => filters.categories.includes(cat))
      );
    }
    
    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter((vendor) => vendor.rating >= filters.minRating);
    }
    
    // Apply availability filter
    if (filters.availability !== "all") {
      result = result.filter((vendor) => vendor.availability === filters.availability);
    }
    
    // Apply sorting
    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      result = [...result].sort((a, b) => {
        const aPrice = a.pricing ? parseInt(a.pricing.split(" ")[0].replace("$", ""), 10) : 0;
        const bPrice = b.pricing ? parseInt(b.pricing.split(" ")[0].replace("$", ""), 10) : 0;
        return aPrice - bPrice;
      });
    } else if (sortBy === "experience") {
      result = [...result].sort((a, b) => b.experience - a.experience);
    } else if (sortBy === "reviews") {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    }
    
    setFilteredVendors(result);
  }, [searchQuery, sortBy, vendors, filters]);

  const handleFilterChange = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handleFilterUpdate = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleViewDetails = (vendor) => {
    setActiveVendor(vendor);
    setIsDetailsModalOpen(true);
    
    // Add to recently viewed if not already there
    if (!recentlyViewed.some(v => v.id === vendor.id)) {
      setRecentlyViewed(prev => [vendor, ...prev].slice(0, 3));
    }
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

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      {loading && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-50">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 animate-pulse">Finding available vendors...</p>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl text-gray-800 md:text-4xl font-bold font-header dark:text-gray-200 mb-3">
            Find the Perfect {serviceName || "Service"} Professional
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse our vetted vendors and book services tailored to your needs
          </p>
          {error && (
            <div className="mt-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
              {error}
            </div>
          )}
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="relative mb-6">
          <div className={`flex items-center p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-primary shadow-md' : ''}`}>
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name, service, or keyword..."
              className="flex-grow bg-transparent focus:outline-none text-gray-700 dark:text-gray-200"
              value={searchQuery}
              onChange={(e) => handleFilterChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button 
              onClick={handleToggleFilters}
              className="flex items-center px-3 py-1 ml-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Sliders className="h-4 w-4 mr-1" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Enhanced Filter Section */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fadeIn">
            <VendorFilters 
              onFilterChange={handleFilterChange} 
              onSortChange={handleSortChange} 
              onFilterUpdate={handleFilterUpdate}
              filters={filters}
            />
          </div>
        )}
        
        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredVendors.length} vendors found
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="rating">Top Rated</option>
              <option value="price">Price: Low to High</option>
              <option value="experience">Experience</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>
        
        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Recently Viewed</h2>
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {recentlyViewed.map((vendor) => (
                <div 
                  key={`recent-${vendor.id}`} 
                  className="flex-shrink-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => handleViewDetails(vendor)}
                >
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">{vendor.name}</h3>
                  <div className="flex items-center text-sm mt-1">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                    <span className="text-gray-700 dark:text-gray-300">{vendor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Vendor Cards */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-3">
              No vendors found matching your criteria
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setFilters({categories: [], minRating: 0, availability: "all"});
              }}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <div 
                key={vendor.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-3">
                      <img 
                        src={vendor.profileImage} 
                        alt={vendor.name} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/100?text=Vendor";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{vendor.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-gray-700 dark:text-gray-300">{vendor.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{vendor.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm line-clamp-2">
                    {vendor.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {vendor.categories && vendor.categories.map((category, i) => (
                      <span 
                        key={`${vendor.id}-cat-${i}`}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{vendor.experience} years</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{vendor.pricing}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {vendor.availability} availability
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleViewDetails(vendor)}
                        className="px-3 py-1.5 text-sm border border-gray-300 text-gray-500 dark:text-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleBookNow(vendor)}
                        className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination - Simple version */}
        {filteredVendors.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
              <button className="px-3 py-1 border rounded-md text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                Previous
              </button>
              <span className="px-3 py-1 border rounded-md bg-primary text-white border-primary">1</span>
              <button className="px-3 py-1 border rounded-md text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
      
      <VendorDetailsModal 
        vendor={activeVendor} 
        isOpen={isDetailsModalOpen} 
        onClose={handleCloseDetailsModal} 
        onBookNow={handleBookNow}
      />
      
      <BookingFlowModal 
        vendor={bookingVendor} 
        isOpen={isBookingModalOpen} 
        onClose={handleCloseBookingModal} 
      />
    </div>
  );
};

export default AvailableVendors;