import { useState, useEffect } from "react";
import { FaSearch, FaSlidersH, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Slider from "../../../../../components/custom/Slider";
import Switch from "../../../../../components/custom/Switch";
import Select, {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../../components/custom/Select";
import { motion, AnimatePresence } from "framer-motion";

const SearchFilter = ({ onFilterChange, initialFilters }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState("all");
  const [availability, setAvailability] = useState(false);
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Initialize filters with props if provided
  useEffect(() => {
    if (initialFilters) {
      setSearchQuery(initialFilters.searchQuery || "");
      setPriceRange(initialFilters.priceRange || [0, 500]);
      setRating(initialFilters.rating || "all");
      setAvailability(initialFilters.availability || false);
      setLocation(initialFilters.location || "");
    }
  }, [initialFilters]);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (searchQuery) count++;
    if (priceRange[0] > 0 || priceRange[1] < 500) count++;
    if (rating !== "all") count++;
    if (availability) count++;
    if (location) count++;
    setActiveFilters(count);
  }, [searchQuery, priceRange, rating, availability, location]);

  const handleApplyFilters = () => {
    onFilterChange({ searchQuery, priceRange, rating, availability, location });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 500]);
    setRating("all");
    setAvailability(false);
    setLocation("");
    onFilterChange({ searchQuery: "", priceRange: [0, 500], rating: "all", availability: false, location: "" });
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ searchQuery, priceRange, rating, availability, location });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
      {/* Search Bar (Always Visible) */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Search services"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {/* Toggle Button */}
      <div
        role="button"
        aria-expanded={showFilters}
        aria-controls="filters-section"
        className="flex items-center justify-between p-4 cursor-pointer border-t border-gray-100 dark:border-gray-700"
        onClick={() => setShowFilters(!showFilters)}
      >
        <div className="flex items-center">
          <FaSlidersH className="text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Advanced Filters
          </h3>
          {activeFilters > 0 && (
            <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-0.5 rounded-full">
              {activeFilters}
            </span>
          )}
        </div>
        {showFilters ? (
          <FaChevronUp className="text-gray-500 dark:text-gray-400" />
        ) : (
          <FaChevronDown className="text-gray-500 dark:text-gray-400" />
        )}
      </div>

      {/* Collapsible Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            id="filters-section"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-100 dark:border-gray-700"
          >
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between">
                      <span>Price Range</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </label>
                    <Slider
                      value={priceRange}
                      onChange={setPriceRange}
                      min={0}
                      max={1000}
                      step={10}
                    />
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Minimum Rating
                    </label>
                    <Select onValueChange={setRating} value={rating}>
                      <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="4">4 Stars & Above</SelectItem>
                        <SelectItem value="3">3 Stars & Above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Availability */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Availability
                    </label>
                    <div className="flex items-center">
                      <Switch
                        checked={availability}
                        onCheckedChange={setAvailability}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Only show available services
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city or zip code..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Reset filters
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-all hover:shadow-md text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchFilter;