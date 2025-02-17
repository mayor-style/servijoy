import React, { useEffect, useState } from "react";
import EditUserVendorModal from "./EditUserVendorModal";
import UserDetailsModal from "./UserDetailsModal";
import VendorDetailsModal from "./VendorsDetailsModal";
import BulkActionsPanel from "./BulkActionsPanel";

const UsersVendorsTable = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    // Simulate API call with mock data
    setTimeout(() => {
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
        },
      ];
      setData(mockData);
      setLoading(false);
    }, 1500);
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const handleSave = (updatedData) => {
    console.log("Updated Data:", updatedData);
    // Update state or re-fetch data as needed
  };

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

  const handleBulkAction = async (action, items) => {
    console.log(`Performing ${action} on items:`, items);
    if (action === "delete") {
      // Remove the items from state
      setData((prevData) => prevData.filter((user) => !items.includes(user.id)));
    }
    setSelectedItems([]);
  };

  return (
    <div className="overflow-x-auto bg-soft-white dark:bg-gray-800 rounded-lg shadow-xl p-4 transition">
      {loading ? (
        <div className="text-center py-10">
          <span className="loader">Loading Data...</span>
        </div>
      ) : (
        <>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-light-gray dark:bg-gray-700 text-left text-gray-800 dark:text-gray-200">
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((user) => selectedItems.includes(user.id))
                    }
                  />
                </th>
                <th className="p-3">Profile</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Registered</th>
                <th className="p-3">Last Login</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.id} className="border-b dark:border-gray-700">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(user.id)}
                      onChange={() => toggleSelectItem(user.id)}
                    />
                  </td>
                  <td className="p-3">
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.name}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.email}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.role}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.status}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.registrationDate}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{user.lastLogin}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => openModal("details", user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openModal("edit", user)}
                      className="btn-green px-3 py-1 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleBulkAction("delete", [user.id])}
                      className="bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing {itemsPerPage} of {data.length} results
            </p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-light-gray dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-light-gray dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
          <BulkActionsPanel selectedItems={selectedItems} onBulkAction={handleBulkAction} />
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
        </>
      )}
    </div>
  );
};

export default UsersVendorsTable;
