import { useState, useEffect } from "react";

const KeyMetricsSummary = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setMetrics({
          totalUsers: 1534,
          activeVendors: 245,
          ongoingDisputes: 12,
          totalTransactions: 12450,
        });
        setLoading(false);
      }, 2000);
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 animate-pulse">
        {Array(4)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="bg-light-gray dark:bg-gray-700 h-24 rounded-md"
            ></div>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {[
        { label: "Total Users", value: metrics.totalUsers, textColor: "text-blue-500" },
        { label: "Active Vendors", value: metrics.activeVendors, textColor: "text-green" },
        { label: "Ongoing Disputes", value: metrics.ongoingDisputes, textColor: "text-red-500" },
        { label: "Total Transactions", value: metrics.totalTransactions, textColor: "text-purple-500" },
      ].map((metric, idx) => (
        <div
          key={idx}
          className="bg-soft-white dark:bg-gray-800 p-4 rounded-md shadow-lg text-center transition"
        >
          <h2 className="text-gray-700 dark:text-gray-300 text-lg">
            {metric.label}
          </h2>
          <p className={`text-2xl font-bold ${metric.textColor}`}>
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KeyMetricsSummary;
