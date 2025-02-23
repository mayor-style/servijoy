import { useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { FaSun, FaMoon, FaCloudSun, FaSearch, FaCalendarAlt } from "react-icons/fa";

const services = [
  "Plumbing", "Electrician", "House Cleaning", "Car Repair", "Gardening", "Painting",
  "Tutoring", "Personal Trainer", "Delivery Service", "IT Support", "Home Moving"
];

const WelcomeSection = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Determine greeting based on the current hour
  const currentHour = new Date().getHours();
  let greeting = "";
  let Icon = null;

  if (currentHour < 12) {
    greeting = "Good Morning";
    Icon = FaSun;
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
    Icon = FaCloudSun;
  } else {
    greeting = "Good Evening";
    Icon = FaMoon;
  }

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length > 0) {
      const matches = services.filter((service) =>
        service.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(matches);
    } else {
      setFilteredServices([]);
    }
    setSelectedIndex(-1);
  };

  const handleClick = () => {
    setSearch(filteredServices[selectedIndex]);
      setFilteredServices([]);
  }

  // Handle key navigation in dropdown
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && selectedIndex < filteredServices.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setSearch(filteredServices[selectedIndex]);
      setFilteredServices([]);
    }
  };

  return (
    <div className="gradient-reverse dark:border dark:border-gray-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 
      text-white p-5 md:p-6 rounded-xl shadow-md flex flex-col  items-start justify-between gap-5 w-full max-w-5xl mx-auto">
      
      {/* Greeting & Icon Section */}
      <div className="flex items-center text-left gap-3">
        <div className="p-2 sm:p-3 bg-white bg-opacity-30 rounded-full shadow">
          <Icon className="text-lg sm:text-xl md:text-2xl text-yellow-300 dark:text-yellow-500" />
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-header md:text-xl font-semibold">
            {greeting}, {user?.firstName || "Slick"}! 👋
          </h2>
          <p className="mt-1 text-xs sm:text-sm md:text-base opacity-90">
            What do you need help with today?
          </p>
        </div>
      </div>

      {/* Search & Book Section */}
      <div className="relative w-full  flex flex-col sm:flex-row items-center gap-3">
        
        {/* Search Bar with Dropdown */}
        <div className="relative w-full">
          <input
            type="text"
            className="w-full bg-white bg-opacity-90 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 
              rounded-lg py-2.5 px-4 pl-10 shadow-sm outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-600 text-sm md:text-base"
            placeholder="Search for a service..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm" />

          {/* Dropdown Suggestion List */}
          {filteredServices.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              shadow-lg rounded-lg overflow-hidden mt-1 z-10 max-h-52 overflow-y-auto text-sm">
              {filteredServices.map((service, index) => (
                <li
                  key={service}
                  className={`px-4 py-2 cursor-pointer transition ${
                    selectedIndex === index? "bg-blue-500 text-white dark:bg-gray-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onMouseDown={() => setSearch(service)}
                onClick={handleClick}
              >
                {service}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Book a Service Button */}
      <button className="w-full  flex items-center justify-center gap-2 btn-green text-white 
        font-medium py-2.5 px-5 rounded-lg shadow-md transition-all text-sm md:text-base">
        Book Service
      </button>

    </div>
  </div>
);
};

export default WelcomeSection;