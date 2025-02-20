import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { MdNotifications, MdMessage, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const DashboardHeader = ({ toggleSidebar }) => {
  const { user, logout } = useAuth(); // Get user details
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4 flex justify-between items-center transition-colors duration-300">
      {/* Menu button for small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 mr-2 rounded-full  transition-colors"
      >
        <MdMenu className="text-2xl opacity-0 text-gray-700 dark:text-white" />
      </button>

      {/* Welcome Message */}
      <h1 className="text-lg xs:text-xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Welcome, {user?.name || "User"} 👋
      </h1>

      {/* Right-Side Actions */}
      <div className="flex items-center gap-4 md:gap-6 relative">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === "dark" ? (
            <MdLightMode className="text-2xl text-yellow-500" />
          ) : (
            <MdDarkMode className="text-2xl text-gray-700" />
          )}
        </button>

        {/* Notifications & Messages (hidden on small screens) */}
        <div className="hidden lg:flex gap-4 relative">
          <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <MdNotifications className="text-2xl text-gray-700 dark:text-white" />
            {/* Animated dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <MdMessage className="text-2xl text-gray-700 dark:text-white" />
            {/* Animated dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FaUserCircle className="text-3xl text-gray-700 dark:text-white" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
              <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                Settings
              </button>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
