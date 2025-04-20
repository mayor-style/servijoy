import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash, FaPlus, FaSearch, FaFilter, FaSort, FaChevronLeft, FaChevronRight, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";

const ServiceCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active"
  });

  // For demo purposes, we simulate fetching data
  const fetchCategories = async () => {
    setLoading(true);
    try {
      // Simulated data fetch
      const data = [
        { id: 1, name: "Cleaning", description: "Home and office cleaning services including deep cleaning, regular maintenance, and specialized cleaning for different surfaces and areas.", status: "Active", services_count: 10, last_updated: "2025-02-15" },
        { id: 2, name: "Plumbing", description: "Professional plumbing services including pipe repair, installation, drain cleaning, and emergency response for residential and commercial properties.", status: "Pending", services_count: 5, last_updated: "2025-03-01" },
        { id: 3, name: "Electrical", description: "Electrical repairs and installations with licensed professionals for all your electrical needs, from simple fixture replacements to complex wiring projects.", status: "Unavailable", services_count: 8, last_updated: "2025-02-28" },
        { id: 4, name: "Gardening", description: "Professional gardening and landscaping services for maintaining beautiful outdoor spaces, including lawn care, plant maintenance, and design.", status: "Active", services_count: 12, last_updated: "2025-03-10" },
        { id: 5, name: "Home Repair", description: "General home repair services covering everything from minor fixes to major renovations for maintaining and improving your living space.", status: "Active", services_count: 15, last_updated: "2025-03-05" },
        { id: 6, name: "Pest Control", description: "Effective pest management solutions to keep your home or office free from unwanted insects and rodents using safe and humane methods.", status: "Pending", services_count: 3, last_updated: "2025-03-12" },
      ];
      setCategories(data);
      setFilteredCategories(data);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterAndSortCategories();
  }, [searchTerm, filterStatus, sortField, sortDirection, categories]);

  // Filter and sort categories
  const filterAndSortCategories = () => {
    let filtered = [...categories];
    
    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(cat => cat.status === filterStatus);
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
    
    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset to first page whenever filters change
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleCreate = () => {
    setModalType("create");
    setFormData({
      name: "",
      description: "",
      status: "Active"
    });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setModalType("edit");
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status
    });
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setModalType("delete");
    setSelectedCategory(categories.find(cat => cat.id === id));
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      // Simulate deletion
      setCategories((prev) => prev.filter((cat) => cat.id !== selectedCategory.id));
      showNotification("Category successfully deleted", "success");
      setShowModal(false);
    } catch (err) {
      setError("Failed to delete category");
      showNotification("Failed to delete category", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (category) => {
    setModalType("view");
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalType === "create") {
      // Simulate creation of new category
      const newCategory = {
        id: categories.length + 1,
        ...formData,
        services_count: 0,
        last_updated: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
      showNotification("Category successfully created", "success");
    } else if (modalType === "edit") {
      // Simulate updating category
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory.id ? { ...cat, ...formData, last_updated: new Date().toISOString().split('T')[0] } : cat
      ));
      showNotification("Category successfully updated", "success");
    }
    setShowModal(false);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Status badge style helper
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Unavailable":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg min-h-screen">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 ${
          notification.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : 
          notification.type === "error" ? "bg-red-100 text-red-800 border border-red-300" : 
          "bg-blue-100 text-blue-800 border border-blue-300"
        }`}>
          {notification.type === "success" ? <FaCheck className="text-green-600" /> : 
           notification.type === "error" ? <FaExclamationTriangle className="text-red-600" /> : 
           null}
          <p>{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-2 text-gray-500 hover:text-gray-700">
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Service Category Management</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your service categories to organize offerings effectively</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500 transition-all hover:shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Categories</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{categories.length}</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <FaFilter className="text-blue-500 dark:text-blue-300" />
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500 transition-all hover:shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Categories</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{categories.filter(c => c.status === "Active").length}</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <FaCheck className="text-green-500 dark:text-green-300" />
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            {Math.round((categories.filter(c => c.status === "Active").length / categories.length) * 100)}% of total
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500 transition-all hover:shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Categories</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{categories.filter(c => c.status === "Pending").length}</h3>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
              <FaExclamationTriangle className="text-yellow-500 dark:text-yellow-300" />
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            Requires review
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-red-500 transition-all hover:shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Unavailable Categories</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{categories.filter(c => c.status === "Unavailable").length}</h3>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
              <FaTimes className="text-red-500 dark:text-red-300" />
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            Not currently available
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Unavailable">Unavailable</option>
            </select>
            
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
            </select>
            
            <button 
              onClick={handleCreate} 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus size={14} />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-300 flex items-center gap-2">
          <FaExclamationTriangle />
          <p>{error}</p>
        </div>
      )}

      {/* Table Section */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No categories found.</p>
          <button 
            onClick={handleCreate} 
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors mx-auto"
          >
            <FaPlus size={14} />
            <span>Add New Category</span>
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                    <button 
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSortChange("name")}
                    >
                      Name
                      {sortField === "name" && (
                        <FaSort className={`text-xs ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Description</th>
                  <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                    <button 
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSortChange("status")}
                    >
                      Status
                      {sortField === "status" && (
                        <FaSort className={`text-xs ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                    <button 
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSortChange("services_count")}
                    >
                      Services
                      {sortField === "services_count" && (
                        <FaSort className={`text-xs ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                    <button 
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleSortChange("last_updated")}
                    >
                      Last Updated
                      {sortField === "last_updated" && (
                        <FaSort className={`text-xs ${sortDirection === "asc" ? "transform rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="p-4 font-semibold text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((cat) => (
                  <tr 
                    key={cat.id} 
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300 max-w-md truncate">{cat.description}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(cat.status)}`}>
                        {cat.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{cat.services_count}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{cat.last_updated}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(cat)} 
                          className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(cat)} 
                          className="p-2 bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)} 
                          className="p-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 rounded-lg transition-colors"
                          title="Delete Category"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(1)} 
                className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700'}`}
                title="First Page"
              >
                <FaChevronLeft size={14} /> <FaChevronLeft size={14} className="-ml-3" />
              </button>
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700'}`}
                title="Previous Page"
              >
                <FaChevronLeft size={14} />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pagination numbers centered around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    // If 5 or fewer pages, show all
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    // If near the start
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // If near the end
                    pageNum = totalPages - 4 + i;
                  } else {
                    // In the middle
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button 
                disabled={currentPage === totalPages || totalPages === 0} 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                className={`p-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700'}`}
                title="Next Page"
              >
                <FaChevronRight size={14} />
              </button>
              <button 
                disabled={currentPage === totalPages || totalPages === 0} 
                onClick={() => setCurrentPage(totalPages)} 
                className={`p-2 rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700'}`}
                title="Last Page"
              >
                <FaChevronRight size={14} /> <FaChevronRight size={14} className="-ml-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {modalType === "create"
                  ? "Add New Category"
                  : modalType === "edit"
                  ? "Edit Category"
                  : modalType === "delete"
                  ? "Confirm Delete"
                  : "Category Details"}
              </h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {modalType === "view" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedCategory.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(selectedCategory.status)}`}>
                        {selectedCategory.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</p>
                    <p className="text-gray-700 dark:text-gray-300">{selectedCategory.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Number of Services</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedCategory.services_count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Updated</p>
                      <p className="text-gray-700 dark:text-gray-300">{selectedCategory.last_updated}</p>
                    </div>
                    </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Performance Analytics</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overall Utilization</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${(selectedCategory.services_count / 20) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>0</span>
                          <span>20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : modalType === "delete" ? (
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                    <FaExclamationTriangle size={24} className="text-red-600 dark:text-red-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Category</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Are you sure you want to delete <span className="font-semibold">{selectedCategory?.name}</span>? 
                    This action cannot be undone and will remove all associated data.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Enter category name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleFormChange}
                        placeholder="Enter category description"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>
                    
                    {formData.status === "Unavailable" && (
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                        <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                          Setting a category to unavailable will hide it from users but keep all data intact.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {modalType === "create" ? "Create Category" : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCategoryManagement;