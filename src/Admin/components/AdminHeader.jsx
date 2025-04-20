import { useState, useEffect, useRef } from "react";
import { MdNotifications, MdMessage, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const AdminHeader = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Theme handling
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
    <header className="fixed right-0 left-0 top-0 z-50 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 py-3 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          aria-label="Toggle sidebar"
        >
          <MdMenu className="text-2xl text-gray-700 dark:text-gray-200" />
        </button>

        <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors">
          <span className="hidden xs:inline">Admin </span>Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <MdLightMode className="text-xl text-yellow-400" />
          ) : (
            <MdDarkMode className="text-xl text-gray-700" />
          )}
        </button>

        <div className="hidden sm:flex gap-2 md:gap-4">
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="Notifications"
          >
            <MdNotifications className="text-xl text-gray-700 dark:text-gray-200" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
              3
            </span>
          </button>
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="Messages"
          >
            <MdMessage className="text-xl text-gray-700 dark:text-gray-200" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
              5
            </span>
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            aria-label="User menu"
            aria-expanded={dropdownOpen}
          >
            <FaUserCircle className="text-2xl text-gray-700 dark:text-gray-200" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 z-50 border border-gray-200 dark:border-gray-700 transition-all">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@example.com</p>
              </div>
              <button className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Profile
              </button>
              <button className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Settings
              </button>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-1"></div>
              <button className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;