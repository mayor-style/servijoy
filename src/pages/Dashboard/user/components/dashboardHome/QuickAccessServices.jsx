import { useContext } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { FaBroom, FaTools, FaBolt, FaPaintRoller, FaUtensils } from "react-icons/fa";

const QuickAccessServices = () => {
  const { user } = useAuth();

  // Mock Data for Services (Replace with API Data)
  const services = [
    { id: 1, name: "Home Cleaning", icon: <FaBroom />, color: "bg-blue-500" },
    { id: 2, name: "Plumbing", icon: <FaTools />, color: "gradient" },
    { id: 3, name: "Electrician", icon: <FaBolt />, color: "bg-yellow-500" },
    { id: 4, name: "Painting", icon: <FaPaintRoller />, color: "bg-red-500" },
    { id: 5, name: "Cooking", icon: <FaUtensils />, color: "bg-purple-500" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Quick Access to Services
        </h3>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`flex flex-col items-center justify-center gap-2 p-5 rounded-lg text-white ${service.color} shadow-md cursor-pointer transition-transform hover:scale-110`}
          >
            <span className="text-3xl">{service.icon}</span>
            <p className="text-sm font-medium text-center">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessServices;
