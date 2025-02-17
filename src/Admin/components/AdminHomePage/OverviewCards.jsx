import React from "react";
import { FaUsers, FaStore, FaExclamationTriangle, FaDollarSign } from "react-icons/fa";

const cardData = [
  {
    title: "Total Users",
    value: "12,345",
    icon: <FaUsers className="text-blue-500 dark:text-blue-400 text-4xl" />,
    bgColor: "bg-blue-100 dark:bg-blue-800",
  },
  {
    title: "Active Vendors",
    value: "567",
    icon: <FaStore className="text-green dark:text-green text-4xl" />,
    // Use custom green without numeric scale
    bgColor: "bg-green dark:bg-green",
  },
  {
    title: "Pending Disputes",
    value: "23",
    icon: <FaExclamationTriangle className="text-yellow-500 dark:text-yellow-400 text-4xl" />,
    bgColor: "bg-yellow-100 dark:bg-yellow-800",
  },
  {
    title: "Total Revenue",
    value: "$1,234,567",
    icon: <FaDollarSign className="text-purple-500 dark:text-purple-400 text-4xl" />,
    bgColor: "bg-purple-100 dark:bg-purple-800",
  },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} p-6 rounded-lg shadow-xl flex items-center justify-between transition-transform hover:scale-105`}
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              {card.title}
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </p>
          </div>
          <div>{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
