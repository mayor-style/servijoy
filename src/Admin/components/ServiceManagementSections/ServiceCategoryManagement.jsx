import React, { useState, useEffect } from "react";

const ServiceCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // For demo purposes, we simulate fetching data
  const fetchCategories = async () => {
    setLoading(true);
    try {
      // Simulated data fetch
      const data = [
        { id: 1, name: "Cleaning", description: "Home and office cleaning", status: "Active", services_count: 10 },
        { id: 2, name: "Plumbing", description: "Plumbing services", status: "Pending", services_count: 5 },
        { id: 3, name: "Electrical", description: "Electrical repairs and installations", status: "Unavailable", services_count: 8 },
      ];
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handleCreate = () => {
    setModalType("create");
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setModalType("edit");
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    setLoading(true);
    try {
      // Simulate deletion
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      setError("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (category) => {
    setModalType("view");
    setSelectedCategory(category);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-primary text-primary-content shadow-xl transition">
          <div className="card-body">
            <h2 className="card-title">Total Categories</h2>
            <p>{categories.length}</p>
          </div>
        </div>
        <div className="card bg-warning text-warning-content shadow-xl transition">
          <div className="card-body">
            <h2 className="card-title">Pending Categories</h2>
            <p>{categories.filter(c => c.status === "Pending").length}</p>
          </div>
        </div>
        <div className="card bg-error text-error-content shadow-xl transition">
          <div className="card-body">
            <h2 className="card-title">Unavailable Categories</h2>
            <p>{categories.filter(c => c.status === "Unavailable").length}</p>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <div className="skeleton w-full h-64"></div>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No categories found.</p>
      ) : (
        <div className="overflow-x-auto overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          <table className="table w-full min-w-[600px]">
            <thead>
              <tr className="text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-700">
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Services</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="text-gray-700 dark:text-gray-300 ">
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>
                    <span className={`badge ${cat.status === "Active" ? "badge-success" : "badge-warning"}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td>{cat.services_count}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEdit(cat)} className="btn btn-sm btn-primary transition">Edit</button>
                    <button onClick={() => handleDelete(cat.id)} className="btn btn-sm btn-error transition">Delete</button>
                    <button onClick={() => handleViewDetails(cat)} className="btn btn-sm btn-info transition">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage((prev) => prev - 1)} 
              className="btn btn-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage((prev) => prev + 1)} 
              className="btn btn-sm transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <button onClick={handleCreate} className="btn btn-success mt-4 transition">+ Add New Category</button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition">
          <div className="bg-soft-white dark:bg-gray-800 p-6 rounded-lg w-1/2">
            <h2 className="text-xl mb-4">
              {modalType === "create"
                ? "Add New Category"
                : modalType === "edit"
                ? "Edit Category"
                : "Category Details"}
            </h2>
            {modalType !== "view" ? (
              <form>
                <input type="text" placeholder="Category Name" className="input input-bordered w-full mb-4" />
                <textarea placeholder="Description" className="textarea textarea-bordered w-full mb-4"></textarea>
                <select className="select select-bordered w-full mb-4">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <div className="flex gap-4">
                  <button className="btn btn-primary">Save</button>
                  <button onClick={() => setShowModal(false)} className="btn btn-ghost" type="button">Cancel</button>
                </div>
              </form>
            ) : (
              <div>
                <p><strong>Name:</strong> {selectedCategory.name}</p>
                <p><strong>Description:</strong> {selectedCategory.description}</p>
                <p><strong>Status:</strong> {selectedCategory.status}</p>
                <p><strong>Number of Services:</strong> {selectedCategory.services_count}</p>
                <button onClick={() => setShowModal(false)} className="btn btn-ghost mt-4">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCategoryManagement;
