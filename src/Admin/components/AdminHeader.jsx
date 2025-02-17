import { useState, useEffect } from "react";
import { MdNotifications, MdMessage, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const AdminHeader = ({ toggleSidebar }) => {
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
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4 flex justify-between items-center transition-colors duration-300 ">
      <button onClick={toggleSidebar} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <MdMenu className="text-2xl text-gray-700 dark:text-white" />
      </button>

      <h1 className="text-lg xs:text-xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4 md:gap-6">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          {theme === "dark" ? <MdLightMode className="text-2xl text-yellow-500" /> : <MdDarkMode className="text-2xl text-gray-700" />}
        </button>

        <div className="hidden md:flex gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <MdNotifications className="text-2xl text-gray-700 dark:text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-black text-xs font-bold px-1 rounded-full">3</span>
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <MdMessage className="text-2xl text-gray-700 dark:text-white" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs font-bold px-1 rounded-full">5</span>
          </button>
        </div>

        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <FaUserCircle className="text-3xl text-gray-700 dark:text-white" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
              <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">Profile</button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">Settings</button>
              <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
