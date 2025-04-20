import { useState, useEffect } from "react";
import { Activity, Server, Database, Clock, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const SystemHealthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchSystemHealth = async () => {
    setRefreshing(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          serverStatus: "Online",
          apiResponseTime: "120ms",
          databaseStatus: "Operational",
          uptime: "99.98%",
          lastChecked: new Date().toLocaleTimeString(),
          incidents: [
            { id: 1, time: "08:45 AM", status: "Resolved", message: "API latency spike" },
            { id: 2, time: "Yesterday", status: "Resolved", message: "Database connection timeout" }
          ],
          metrics: {
            cpu: 42,
            memory: 58,
            disk: 37,
            network: 29
          }
        });
      }, 1500);
    });
  };

  useEffect(() => {
    const getInitialData = async () => {
      setLoading(true);
      const data = await fetchSystemHealth();
      setSystemHealth(data);
      setLoading(false);
      setRefreshing(false);
    };
    getInitialData();
  }, []);

  const handleRefresh = async () => {
    const data = await fetchSystemHealth();
    setSystemHealth(data);
    setRefreshing(false);
  };

  const getStatusIcon = (status) => {
    if (status === "Online" || status === "Operational") {
      return <CheckCircle className="text-green-500" size={18} />;
    } else if (status === "Degraded") {
      return <AlertTriangle className="text-yellow-500" size={18} />;
    } else {
      return <AlertTriangle className="text-red-500" size={18} />;
    }
  };

  const StatusCard = ({ icon, label, value, valueColor, additionalInfo }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {icon}
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        </div>
        {getStatusIcon(value)}
      </div>
      <div className="flex items-baseline justify-between">
        <p className={`text-lg font-bold ${valueColor}`}>{value}</p>
        {additionalInfo && (
          <span className="text-xs text-gray-400">{additionalInfo}</span>
        )}
      </div>
    </div>
  );

  const ProgressBar = ({ value, label, color }) => (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg transition">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="mr-2 text-blue-500" size={20} />
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            System Health Status
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`text-sm px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition flex items-center ${
              refreshing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className={`mr-1 ${refreshing ? "animate-spin" : ""}`}>↻</span>
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard
          icon={<Server className="text-blue-500" size={18} />}
          label="Server Status"
          value={systemHealth.serverStatus}
          valueColor="text-green-500"
          additionalInfo="Last 24h"
        />
        <StatusCard
          icon={<ExternalLink className="text-yellow-500" size={18} />}
          label="API Response"
          value={systemHealth.apiResponseTime}
          valueColor="text-yellow-500"
          additionalInfo="Avg. response"
        />
        <StatusCard
          icon={<Database className="text-purple-500" size={18} />}
          label="Database"
          value={systemHealth.databaseStatus}
          valueColor="text-green-500"
          additionalInfo="All nodes"
        />
        <StatusCard
          icon={<Clock className="text-blue-500" size={18} />}
          label="System Uptime"
          value={systemHealth.uptime}
          valueColor="text-blue-500"
          additionalInfo="30-day avg."
        />
      </div>

      {showDetails && (
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">System Resources</h3>
            <div className="space-y-3">
              <ProgressBar value={systemHealth.metrics.cpu} label="CPU Usage" color="bg-blue-500" />
              <ProgressBar value={systemHealth.metrics.memory} label="Memory Usage" color="bg-purple-500" />
              <ProgressBar value={systemHealth.metrics.disk} label="Disk Usage" color="bg-green-500" />
              <ProgressBar value={systemHealth.metrics.network} label="Network Load" color="bg-yellow-500" />
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Recent Incidents</h3>
            <div className="overflow-hidden">
              {systemHealth.incidents.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {systemHealth.incidents.map((incident) => (
                    <li key={incident.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{incident.message}</p>
                        <p className="text-xs text-gray-500">{incident.time}</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {incident.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No recent incidents</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {systemHealth.lastChecked}
        </span>
        <span className="flex items-center text-xs text-green-500">
          <CheckCircle size={12} className="mr-1" />
          All systems operational
        </span>
      </div>
    </div>
  );
};

export default SystemHealthStatus;