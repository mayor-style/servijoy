import { useState } from "react";
import { FaSearch } from "react-icons/fa";
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

  // This handler is only called when the "Apply Filters" button is clicked.
  const handleApplyFilters = () => {
    onFilterChange({ searchQuery, priceRange, rating, availability, location });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-all">
      {/* Search Bar */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Search for a service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-4 top-5 text-gray-500 dark:text-gray-400" />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          <Select onValueChange={(value) => setRating(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4">4 Stars & Above</SelectItem>
              <SelectItem value="3">3 Stars & Above</SelectItem>
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
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="mt-6 text-right">
        <button className="btn btn-primary" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
