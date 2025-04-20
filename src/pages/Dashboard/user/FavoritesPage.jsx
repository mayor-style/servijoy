import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteCard from "./components/FavoriteCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSortAlt2 } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";

const Favorites = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingRemoval, setPendingRemoval] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch favorites from the backend
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/favorites`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setFavorites(response.data.data);
        setFilteredFavorites(response.data.data);
      } else {
        setError("Failed to fetch favorites.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch favorites.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Filter and sort favorites when search term or sort option changes
  useEffect(() => {
    let result = [...favorites];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(fav => 
        fav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (fav.description && fav.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    setFilteredFavorites(result);
  }, [favorites, searchTerm, sortOption]);

  // Initiate removal by setting the favorite to be removed and opening the modal
  const handleInitiateRemoval = (favorite) => {
    setPendingRemoval(favorite);
    setIsModalOpen(true);
  };

  // Confirm removal: delete from backend then update state
  const handleRemoveFavorite = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/favorites/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setFavorites((prev) => prev.filter((item) => item.id !== id));
        setIsModalOpen(false);
      } else {
        setError("Failed to remove favorite.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove favorite.");
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg dark:text-white">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-left dark:text-white font-header mb-4 md:mb-0">
            My Favorites
          </h1>
          
          {favorites.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search favorites..."
                  className="pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white w-full sm:w-auto justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center gap-2">
                    <BiSortAlt2 className="text-gray-500" />
                    <span>
                      {sortOption === "newest" ? "Newest First" : 
                       sortOption === "oldest" ? "Oldest First" : 
                       "Alphabetical"}
                    </span>
                  </div>
                  <MdFilterList className="text-gray-500" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border dark:border-gray-700">
                    <ul>
                      <li 
                        className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${sortOption === "newest" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                        onClick={() => {
                          setSortOption("newest");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Newest First
                      </li>
                      <li 
                        className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${sortOption === "oldest" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                        onClick={() => {
                          setSortOption("oldest");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Oldest First
                      </li>
                      <li 
                        className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${sortOption === "alphabetical" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                        onClick={() => {
                          setSortOption("alphabetical");
                          setIsDropdownOpen(false);
                        }}
                      >
                        Alphabetical
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-center">
            <p>{error}</p>
            <button 
              className="mt-2 text-sm underline"
              onClick={() => {
                setError("");
                fetchFavorites();
              }}
            >
              Try again
            </button>
          </div>
        )}
        
        <AnimatePresence>
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-md"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                }}
              >
                <FaHeart className="text-5xl text-gray-300 dark:text-gray-600 mb-6" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                No Favorites Yet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                Discover and save your favorite services to access them quickly in the future.
              </p>
              <Link 
                to="/services" 
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-1"
              >
                Browse Services
              </Link>
            </motion.div>
          ) : filteredFavorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <FaSearch className="text-4xl text-gray-400 dark:text-gray-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No matching favorites
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filters.
              </p>
              <button 
                className="btn btn-outline btn-primary"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Showing {filteredFavorites.length} of {favorites.length} favorites
              </p>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {filteredFavorites.map((fav) => (
                    <motion.div
                      key={fav.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FavoriteCard
                        favorite={fav}
                        onInitiateRemoval={handleInitiateRemoval}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Remove from Favorites?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Are you sure you want to remove{" "}
                  <span className="font-semibold">{pendingRemoval?.title}</span> from your favorites?
                  You can add it back later if you change your mind.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    onClick={() => handleRemoveFavorite(pendingRemoval.id)}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Favorites;