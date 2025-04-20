import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Handle theme
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
  
  // Close sidebar when screen size changes to larger view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add scroll listener for header effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Page load animation
  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 300);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-500 border-b-blue-300 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Floating Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <MdLightMode className="text-2xl text-yellow-500 group-hover:text-yellow-400 group-hover:rotate-12 transition-all duration-300" />
          ) : (
            <MdDarkMode className="text-2xl text-gray-700 group-hover:text-gray-900 group-hover:rotate-12 transition-all duration-300" />
          )}
        </button>
      </div>

      {/* Header */}
      <DashboardHeader 
        toggleSidebar={toggleSidebar} 
        isScrolled={isScrolled}
      />

      <div className="flex flex-1 w-full relative">
        {/* Sidebar */}
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />

        {/* Main Content and Footer */}
        <div className={`flex flex-col flex-1 ml-0 lg:ml-64 min-w-0 transition-all duration-300 ease-in-out ${sidebarOpen ? 'blur-sm lg:blur-none' : ''}`}>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto min-w-0 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          <DashboardFooter />
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;