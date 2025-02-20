import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const EditUserVendorModal = ({ isOpen, onClose, userVendor, onSave }) => {
  const [formData, setFormData] = useState({
    name: userVendor.name,
    email: userVendor.email,
    role: userVendor.role,
    status: userVendor.status,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  px-3 bg-black bg-opacity-50 flex items-center justify-center z-50 transition">
      <div className="bg-soft-white scroll max-h-[95%] dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg relative transition">
        <h2 className="header text-gray-800 dark:text-white mb-4">
          Edit {userVendor.role === "Vendor" ? "Vendor" : "User"}
        </h2>
       <button
                 className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 text-2xl font-bold dark:hover:text-white transition"
                 onClick={onClose}
               >
                 <MdClose />
               </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border dark:border-none rounded dark:bg-gray-700 dark:text-white transition"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border dark:border-none rounded dark:bg-gray-700 dark:text-white transition"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border dark:border-none rounded dark:bg-gray-700 dark:text-white transition"
            >
              <option value="User">User</option>
              <option value="Vendor">Vendor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border dark:border-none rounded dark:bg-gray-700 dark:text-white transition"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">Reset Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border dark:border-none rounded dark:bg-gray-700 dark:text-white transition"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn-blue" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-green">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserVendorModal;
