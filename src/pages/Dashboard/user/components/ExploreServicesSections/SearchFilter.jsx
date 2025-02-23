import { useState } from "react";
import { FaSearch, FaSlidersH, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Slider from "../../../../../components/custom/Slider";
import Switch from "../../../../../components/custom/Switch";
import Select, {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../../components/custom/Select";

const SearchFilter = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState("all");
  const [availability, setAvailability] = useState(false);
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Toggle state

  // Handle applying filters
  const handleApplyFilters = () => {
    onFilterChange({ searchQuery, priceRange, rating, availability, location });
    setShowFilters(false)
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Toggle Button */}
      <div
        className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md cursor-pointer transition-all hover:shadow-lg"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <FaSlidersH className="text-blue-500 dark:text-gray-300" /> Filters
        </h3>
        {showFilters ? (
          <FaChevronUp className="text-gray-500 dark:text-gray-400 transition-transform transform rotate-180" />
        ) : (
          <FaChevronDown className="text-gray-500 dark:text-gray-400 transition-transform transform rotate-0" />
        )}
      </div>

      {/* Filters Section (Collapsible with Blur & Fade-in) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showFilters ? "max-h-[600px] opacity-100 mt-4 blur-0" : "max-h-0 opacity-0 blur-sm pointer-events-none"
        }`}
      >
        <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          {/* Search Bar */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search for a service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Price Range
              </label>
              <Slider
                value={priceRange}
                onChange={(val) => setPriceRange(val)}
                min={0}
                max={1000}
                step={10}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>

            {/* Ratings Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Ratings
              </label>
              <Select onValueChange={(value) => setRating(value)} value={rating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4">4 Stars & Above</SelectItem><SelectItem value="3">3 Stars & Above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability Switch */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Availability
              </label>
              <div className="flex items-center gap-3">
                <Switch
                  checked={availability}
                  onCheckedChange={(val) => setAvailability(val)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Only Available Now
                </span>
              </div>
            </div>

            {/* Location Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="mt-6 text-right">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md shadow-md transition-all text-sm md:text-base"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;