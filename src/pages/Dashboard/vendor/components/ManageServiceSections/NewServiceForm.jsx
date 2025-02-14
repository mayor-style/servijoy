import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

const NewServiceForm = ({ closeModal }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [justification, setJustification] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const serviceCategories = [
    "Plumbing",
    "Electrical Work",
    "Cleaning",
    "Carpentry",
    "Painting",
    "Appliance Repair",
  ];

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFilePreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory || !file || justification.length < 10) {
      toast.error("Please complete all fields correctly.");
      return;
    }

    setTimeout(() => {
      toast.success("Service request submitted for approval! ✅");
      closeModal();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-6">
      <div>
        <label className="block text-base font-semibold text-gray-800 dark:text-white mb-2">
          Select Service Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Select a category --</option>
          {serviceCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-base font-semibold text-gray-800 dark:text-white mb-2">
          Upload Proof of Expertise
        </label>
        <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800 flex flex-col items-center transition-colors">
          {filePreview ? (
            <img
              src={filePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
          ) : (
            <IoCloudUploadOutline className="text-4xl text-gray-500 dark:text-gray-400" />
          )}
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-blue-600 text-white py-2 px-6 rounded-lg mt-4 hover:bg-blue-700 transition-colors"
          >
            {file ? "Change File" : "Upload Proof"}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-base font-semibold text-gray-800 dark:text-white mb-2">
          Why should we approve you?
        </label>
        <textarea
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          maxLength={200}
          placeholder="Briefly explain your experience..."
          rows={3}
          required
          className="w-full p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {justification.length}/200 characters
        </p>
      </div>

      <button
        type="submit"
        className={`w-full py-4 rounded-lg font-semibold transition-colors transform active:scale-95 ${
          !selectedCategory || !file || justification.length < 10
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green hover:bg-green-600"
        }`}
        disabled={!selectedCategory || !file || justification.length < 10}
      >
        Submit Request
      </button>
    </form>
  );
};

export default NewServiceForm;
