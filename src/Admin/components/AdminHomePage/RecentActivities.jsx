import { useState, useEffect } from "react";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setActivities([
          { id: 1, message: "John Doe signed up as a user", time: "2 mins ago" },
          { id: 2, message: "Vendor application approved for 'FixIt Services'", time: "15 mins ago" },
          { id: 3, message: "Transaction #12345 completed successfully", time: "30 mins ago" },
          { id: 4, message: "New dispute raised by Sarah Connor", time: "45 mins ago" },
        ]);
        setLoading(false);
      }, 1500);
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="bg-soft-white dark:bg-gray-800 shadow-lg rounded-lg p-6 h-80 flex items-center justify-center transition">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading recent activities...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-soft-white dark:bg-gray-800 shadow-lg rounded-lg overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 p-6 h-80 overflow-y-auto transition">
      <h2 className="header text-gray-800 dark:text-white mb-4">
        Recent Activities
      </h2>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center justify-between bg-light-gray dark:bg-gray-700 p-3 rounded-lg transition hover:shadow-md"
          >
            <p className="text-gray-800 dark:text-gray-300">{activity.message}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
