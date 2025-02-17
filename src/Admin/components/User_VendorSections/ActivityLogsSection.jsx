import React, { useState, useEffect } from "react";

const ActivityLogsSection = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching logs from an API
    setLoading(true);
    setTimeout(() => {
      setLogs([
        { id: 1, action: "User John Doe created an account", timestamp: "2025-02-16 14:32:00" },
        { id: 2, action: "Vendor Jane Smith updated profile", timestamp: "2025-02-16 13:15:00" },
        { id: 3, action: "Admin Mike Johnson changed status of User #452", timestamp: "2025-02-15 10:45:00" },
        { id: 4, action: "Password reset for Vendor #782", timestamp: "2025-02-14 18:20:00" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl mt-6 transition">
      <h2 className="header text-gray-800 dark:text-white mb-4">Activity Logs</h2>
      {loading ? (
        <div className="text-center dark:text-gray-300 py-10">
          <span className="loader">Loading Activity Logs...</span>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          <table className="min-w-full table-auto border border-light-gray dark:border-gray-700">
            <thead className="bg-light-gray dark:bg-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Action</th>
                <th className="px-4 py-2 text-gray-600 dark:text-gray-300">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-light-gray dark:hover:bg-gray-600 transition">
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{log.action}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityLogsSection;
