import { useState, useEffect } from "react";

const SystemHealthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState(null);

  useEffect(() => {
    const fetchSystemHealth = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setSystemHealth({
          serverStatus: "Online",
          apiResponseTime: "120ms",
          databaseStatus: "Operational",
          uptime: "99.98%",
        });
        setLoading(false);
      }, 2000);
    };
    fetchSystemHealth();
  }, []);

  if (loading) {
    return (
      <div className="p-4 animate-pulse">
        <div className="h-24 bg-light-gray dark:bg-gray-700 rounded-md mb-4"></div>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="bg-soft-white dark:bg-gray-800 p-4 rounded-md shadow-lg transition">
        <h2 className="header text-gray-800 dark:text-gray-300 mb-4">
          System Health Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Server Status", value: systemHealth.serverStatus, valueColor: "text-green" },
            { label: "API Response Time", value: systemHealth.apiResponseTime, valueColor: "text-yellow-500" },
            { label: "Database Status", value: systemHealth.databaseStatus, valueColor: "text-green" },
            { label: "Uptime", value: systemHealth.uptime, valueColor: "text-blue-500" },
          ].map((item, idx) => (
            <div key={idx} className="bg-light-gray dark:bg-gray-700 p-4 rounded-md transition">
              <p className="text-gray-600 dark:text-gray-300">{item.label}:</p>
              <p className={`text-lg font-semibold ${item.valueColor}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealthStatus;
