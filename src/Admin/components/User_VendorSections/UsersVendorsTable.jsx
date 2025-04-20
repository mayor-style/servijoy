import React, { useEffect, useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import EditUserVendorModal from "./EditUserVendorModal";
import UserDetailsModal from "./UserDetailsModal";
import VendorDetailsModal from "./VendorsDetailsModal";
import BulkActionsPanel from "./BulkActionsPanel";
import { FaEdit, FaEye, FaTrash, FaSearch, FaFilter, FaSort, FaSortUp, FaSortDown, FaFileExport } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const UsersVendorsTable = () => {
  // State management
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, itemId: null });

  // Fetch data with loading state
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = [
          {
            id: 1,
            profilePic: "https://via.placeholder.com/40",
            name: "John Doe",
            email: "johndoe@example.com",
            role: "User",
            status: "Active",
            registrationDate: "2024-01-01",
            lastLogin: "2024-02-15",
            location: "New York, USA",
            transactions: 24,
            notes: "Premium customer",
          },
          {
            id: 2,
            profilePic: "https://via.placeholder.com/40",
            name: "Jane Smith",
            email: "janesmith@example.com",
            role: "Vendor",
            status: "Suspended",
            registrationDate: "2024-01-10",
            lastLogin: "2024-02-10",
            location: "London, UK",
            transactions: 45,
            notes: "Needs verification",
          },
          {
            id: 3,
            profilePic: "https://via.placeholder.com/40",
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "Vendor",
            status: "Active",
            registrationDate: "2024-02-05",
            lastLogin: "2024-02-20",
            location: "Toronto, Canada",
            transactions: 18,
            notes: "",
          },
          {
            id: 4,
            profilePic: "https://via.placeholder.com/40",
            name: "Bob Brown",
            email: "bob@example.com",
            role: "User",
            status: "Inactive",
            registrationDate: "2024-01-15",
            lastLogin: "2024-02-12",
            location: "Sydney, Australia",
            transactions: 6,
            notes: "Account needs review",
          },
          {
            id: 5,
            profilePic: "https://via.placeholder.com/40",
            name: "Charlie Davis",
            email: "charlie@example.com",
            role: "Vendor",
            status: "Active",
            registrationDate: "2024-02-01",
            lastLogin: "2024-02-18",
            location: "Berlin, Germany",
            transactions: 32,
            notes: "Featured vendor",
          },
          {
            id: 6,
            profilePic: "https://via.placeholder.com/40",
            name: "Diana Evans",
            email: "diana@example.com",
            role: "User",
            status: "Active",
            registrationDate: "2024-01-20",
            lastLogin: "2024-02-16",
            location: "Paris, France",
            transactions: 15,
            notes: "",
          },
          {
            id: 7,
            profilePic: "https://via.placeholder.com/40",
            name: "Frank Miller",
            email: "frank@example.com",
            role: "Vendor",
            status: "Pending",
            registrationDate: "2024-01-25",
            lastLogin: "2024-02-15",
            location: "Tokyo, Japan",
            transactions: 9,
            notes: "Waiting for documents",
          },
          {
            id: 8,
            profilePic: "https://via.placeholder.com/40",
            name: "Grace Wilson",
            email: "grace@example.com",
            role: "User",
            status: "Active",
            registrationDate: "2024-02-10",
            lastLogin: "2024-02-19",
            location: "Chicago, USA",
            transactions: 21,
            notes: "",
          },
        ];
        setData(mockData);
        setFilteredData(mockData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter and sort data
  useEffect(() => {
    let result = [...data];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }
    
    // Apply role filter
    if (roleFilter !== "All") {
      result = result.filter((item) => item.role === roleFilter);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [data, searchTerm, statusFilter, roleFilter, sortConfig]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredData, currentPage, itemsPerPage]);

  // Modal handlers
  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  // Sort handler
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === "ascending" ? (
      <FaSortUp className="text-blue-500" />
    ) : (
      <FaSortDown className="text-blue-500" />
    );
  };

  // Selection handlers
  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      const currentIds = paginatedData.map((user) => user.id);
      setSelectedItems(currentIds);
    } else {
      setSelectedItems([]);
    }
  };

  // Bulk action handler
  const handleBulkAction = async (action, items) => {
    console.log(`Performing ${action} on items:`, items);
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (action === "delete") {
        // Remove the items from state
        setData((prevData) => prevData.filter((user) => !items.includes(user.id)));
        setSelectedItems([]);
      } else if (action === "activate") {
        // Update status to Active
        setData((prevData) =>
          prevData.map((user) =>
            items.includes(user.id) ? { ...user, status: "Active" } : user
          )
        );
      } else if (action === "deactivate") {
        // Update status to Inactive
        setData((prevData) =>
          prevData.map((user) =>
            items.includes(user.id) ? { ...user, status: "Inactive" } : user
          )
        );
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      // Handle error state
    } finally {
      setLoading(false);
    }
  };

  // Handle data save from edit modal
  const handleSave = (updatedData) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );
    closeModal();
  };

  // Export data to CSV
  const exportToCSV = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const headers = ["ID", "Name", "Email", "Role", "Status", "Registration Date", "Last Login"];
      const dataToExport = filteredData.map(user => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.registrationDate,
        user.lastLogin
      ]);
      
      const csvContent = [
        headers.join(","),
        ...dataToExport.map(row => row.join(","))
      ].join("\n");
      
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "users_vendors_export.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Delete confirmation
  const confirmDelete = (id) => {
    setDeleteConfirmation({ show: true, itemId: id });
  };

  const executeDelete = async () => {
    const itemId = deleteConfirmation.itemId;
    setDeleteConfirmation({ show: false, itemId: null });
    await handleBulkAction("delete", [itemId]);
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, itemId: null });
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Active":
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100`;
      case "Inactive":
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
      case "Suspended":
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100`;
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 transition">
      {/* Table Header with Search and Filters */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <FaFilter size={14} />
            <span>Filters</span>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={exportToCSV}
            disabled={isExporting || filteredData.length === 0}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 dark:disabled:bg-green-800 disabled:cursor-not-allowed transition"
          >
            <FaFileExport size={14} />
            <span>{isExporting ? "Exporting..." : "Export CSV"}</span>
          </button>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Filters Panel (Collapsible) */}
      {showFilters && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="All">All Roles</option>
              <option value="User">User</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>
          <div className="self-end">
            <button
              onClick={() => {
                setStatusFilter("All");
                setRoleFilter("All");
                setSearchTerm("");
                document.querySelector('input[type="text"]').value = "";
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <p className="text-blue-800 dark:text-blue-300 text-sm">Total</p>
          <p className="text-xl font-semibold text-blue-900 dark:text-blue-200">{data.length}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
          <p className="text-green-800 dark:text-green-300 text-sm">Active</p>
          <p className="text-xl font-semibold text-green-900 dark:text-green-200">
            {data.filter(u => u.status === "Active").length}
          </p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-300 text-sm">Users</p>
          <p className="text-xl font-semibold text-yellow-900 dark:text-yellow-200">
            {data.filter(u => u.role === "User").length}
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
          <p className="text-purple-800 dark:text-purple-300 text-sm">Vendors</p>
          <p className="text-xl font-semibold text-purple-900 dark:text-purple-200">
            {data.filter(u => u.role === "Vendor").length}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center dark:text-gray-300 py-16 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-lg">Loading Data...</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center dark:text-gray-300 py-16 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-lg mb-2">No matching records found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setStatusFilter("All");
              setRoleFilter("All");
              setSearchTerm("");
              document.querySelector('input[type="text"]').value = "";
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 rounded-lg border dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-3 py-3.5">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={
                          paginatedData.length > 0 &&
                          paginatedData.every((user) => selectedItems.includes(user.id))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-md:hidden">
                    Profile
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("name")}>
                    <div className="flex items-center gap-1">
                      <span>Name</span>
                      {getSortIcon("name")}
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("email")}>
                    <div className="flex items-center gap-1">
                      <span>Email</span>
                      {getSortIcon("email")}
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("role")}>
                    <div className="flex items-center gap-1">
                      <span>Role</span>
                      {getSortIcon("role")}
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort("status")}>
                    <div className="flex items-center gap-1">
                      <span>Status</span>
                      {getSortIcon("status")}
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer max-sm:hidden" onClick={() => requestSort("registrationDate")}>
                    <div className="flex items-center gap-1">
                      <span>Registered</span>
                      {getSortIcon("registrationDate")}
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-md:hidden cursor-pointer" onClick={() => requestSort("lastLogin")}>
                    <div className="flex items-center gap-1">
                      <span>Last Login</span>
                      {getSortIcon("lastLogin")}
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {paginatedData.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/70 transition-colors duration-150"
                  >
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(user.id)}
                        onChange={() => toggleSelectItem(user.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap max-md:hidden">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          src={user.profilePic}
                          alt="Profile"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{user.name}</div>
                      {user.location && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 max-md:hidden">{user.location}</div>
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">{user.email}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className={`text-sm ${user.role === "Vendor" ? "text-purple-600 dark:text-purple-400" : "text-blue-600 dark:text-blue-400"}`}>
                        {user.role}
                        {user.transactions > 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user.transactions} transactions
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-sm:hidden">
                      {user.registrationDate}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-md:hidden">
                      {user.lastLogin}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          data-tooltip-id={`view-${user.id}`}
                          data-tooltip-content="View Details"
                          onClick={() => openModal("details", user)}
                          className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 text-green-600 hover:bg-green-100 dark:bg-gray-700 dark:text-green-400 dark:hover:bg-green-900/30 transition-colors duration-200"
                        >
                          <FaEye size={16} />
                        </button>
                        <Tooltip id={`view-${user.id}`} place="top" />

                        <button
                          data-tooltip-id={`edit-${user.id}`}
                          data-tooltip-content="Edit User"
                          onClick={() => openModal("edit", user)}
                          className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors duration-200"
                        >
                          <FaEdit size={16} />
                        </button>
                        <Tooltip id={`edit-${user.id}`} place="top" />

                        <button
                          data-tooltip-id={`delete-${user.id}`}
                          data-tooltip-content="Delete User"
                          onClick={() => confirmDelete(user.id)}
                          className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 text-red-600 hover:bg-red-100 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors duration-200"
                        >
                          <FaTrash size={16} />
                        </button>
                        <Tooltip id={`delete-${user.id}`} place="top" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage)+ 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{" "}
              <span className="font-medium">{filteredData.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                &laquo; First
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                &lsaquo; Prev
              </button>
              <div className="flex items-center">
                {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                  // Logic to display page numbers centered around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = currentPage - 2 + idx;
                  }
                  
                  // Only render if pageNum is valid
                  if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Next &rsaquo;
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Last &raquo;
              </button>
            </div>
          </div>

          {/* Bulk Actions Panel */}
          {selectedItems.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-sm text-blue-800 dark:text-blue-300 mb-2 sm:mb-0">
                  <span className="font-semibold">{selectedItems.length}</span> item(s) selected
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleBulkAction("activate", selectedItems)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleBulkAction("deactivate", selectedItems)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleBulkAction("delete", selectedItems)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full m-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this user/vendor? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {modalType === "edit" && (
        <EditUserVendorModal
          isOpen={true}
          onClose={closeModal}
          userVendor={selectedUser}
          onSave={handleSave}
        />
      )}
      {modalType === "details" && selectedUser && selectedUser.role === "Vendor" && (
        <VendorDetailsModal
          isOpen={true}
          onClose={closeModal}
          vendor={selectedUser}
        />
      )}
      {modalType === "details" && selectedUser && selectedUser.role !== "Vendor" && (
        <UserDetailsModal
          isOpen={true}
          onClose={closeModal}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UsersVendorsTable;