import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaUserTimes, FaUserCheck } from "react-icons/fa";

const AlertsNotificationsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAlerts([
        { id: 1, type: "warning", message: "5 vendors are currently suspended." },
        { id: 2, type: "pending", message: "10 user accounts pending verification." },
        { id: 3, type: "suspension", message: "2 users have been suspended this week." },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "pending":
        return <FaUserCheck className="text-blue-500" />;
      case "suspension":
        return <FaUserTimes className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-4 rounded-lg shadow-xl transition mt-6">
      <h2 className="subheading text-gray-800 dark:text-white mb-4">Alerts & Notifications</h2>
      {loading ? (
        <div className="text-center dark:text-gray-300 py-10">
          <span className="loader">Loading Alerts...</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="flex items-start gap-4 p-4 bg-light-gray dark:bg-gray-700 rounded-lg shadow hover:shadow-xl transition"
            >
              <div className="text-2xl">{getIcon(alert.type)}</div>
              <div>
                <p className="sm:text-lg text-gray-800 dark:text-white">{alert.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsNotificationsPanel;
