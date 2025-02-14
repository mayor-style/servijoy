// File: components/explore/ServiceCategories.jsx
import React from "react";
import { FaBroom, FaWrench, FaTruckMoving, FaBolt, FaPaintRoller, FaTree } from "react-icons/fa";

const categories = [
  { name: "Cleaning", icon: <FaBroom />, color: "bg-blue-500" },
  { name: "Repairs", icon: <FaWrench />, color: "bg-red-500" },
  { name: "Moving", icon: <FaTruckMoving />, color: "bg-green" },
  { name: "Electrical", icon: <FaBolt />, color: "bg-yellow-500" },
  { name: "Painting", icon: <FaPaintRoller />, color: "bg-purple-500" },
  { name: "Landscaping", icon: <FaTree />, color: "bg-teal-500" },
];

const ServiceCategories = ({ onSelectCategory }) => {
  return (
    <section className="py-10 px-5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">Service Categories</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Browse services by category and find what you need quickly.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => onSelectCategory(category.name)}
              className={`flex flex-col items-center p-6 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800 ${category.color}`}
            >
              <div className="text-white text-4xl mb-4">{category.icon}</div>
              <p className="text-white font-semibold text-lg">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
