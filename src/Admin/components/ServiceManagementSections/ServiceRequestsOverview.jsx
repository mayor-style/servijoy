import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Clock, CheckCircle, XCircle, BarChart3 } from "lucide-react";

// Custom Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

// Custom Card Header Component
const CardHeader = ({ title, action }) => (
  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
    {action && <div>{action}</div>}
  </div>
);

// Custom Card Content Component
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Stat Card Component
const StatCard = ({ title, value, icon, trend, color, percentage }) => (
  <Card>
    <CardContent className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        <div className={`p-2 rounded-full ${color} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h4>
        {percentage && <span className="text-xs text-gray-500 dark:text-gray-400">{percentage}%</span>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          {trend > 0 ? (
            <>
              <ArrowUp className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">{Math.abs(trend)}% increase</span>
            </>
          ) : trend < 0 ? (
            <>
              <ArrowDown className="h-4 w-4 text-rose-500" />
              <span className="text-rose-500">{Math.abs(trend)}% decrease</span>
            </>
          ) : (
            <span className="text-gray-500">No change</span>
          )}
        </div>
      )}
    </CardContent>
  </Card>
);

// Progress Bar Component
const ProgressBar = ({ value, total, color }) => {
  const percentage = Math.round((value / total) * 100);
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Time Frame Selector Component
const TimeFrameSelector = ({ value, onChange }) => (
  <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
    {["daily", "weekly", "monthly"].map((timeframe) => (
      <button
        key={timeframe}
        onClick={() => onChange(timeframe)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md ${
          value === timeframe
            ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        }`}
      >
        {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
      </button>
    ))}
  </div>
);

const ServiceRequestsOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("weekly");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData({
          totalRequests: 150,
          pendingRequests: 25,
          approvedRequests: 100,
          rejectedRequests: 25,
          trends: {
            total: +15,
            pending: -5,
            approved: +20,
            rejected: 0
          }
        });
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeframe]);

  const renderSkeleton = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="p-6">{renderSkeleton()}</div>;
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-center">
        No service requests found.
      </div>
    );
  }

  const calculatePercentage = (value) => {
    return Math.round((value / data.totalRequests) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Requests Overview</h2>
          <p className="text-gray-500 dark:text-gray-400">Monitor your service request metrics</p>
        </div>
        <TimeFrameSelector value={timeframe} onChange={setTimeframe} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Requests"
          value={data.totalRequests}
          icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
          trend={data.trends.total}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending Requests"
          value={data.pendingRequests}
          percentage={calculatePercentage(data.pendingRequests)}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          trend={data.trends.pending}
          color="bg-amber-500"
        />
        <StatCard
          title="Approved Requests"
          value={data.approvedRequests}
          percentage={calculatePercentage(data.approvedRequests)}
          icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
          trend={data.trends.approved}
          color="bg-emerald-500"
        />
        <StatCard
          title="Rejected Requests"
          value={data.rejectedRequests}
          percentage={calculatePercentage(data.rejectedRequests)}
          icon={<XCircle className="h-5 w-5 text-rose-500" />}
          trend={data.trends.rejected}
          color="bg-rose-500"
        />
      </div>

      <Card>
        <CardHeader title="Request Status Breakdown" />
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {data.pendingRequests} ({calculatePercentage(data.pendingRequests)}%)
                </span>
              </div>
              <ProgressBar value={data.pendingRequests} total={data.totalRequests} color="bg-amber-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Approved</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {data.approvedRequests} ({calculatePercentage(data.approvedRequests)}%)
                </span>
              </div>
              <ProgressBar value={data.approvedRequests} total={data.totalRequests} color="bg-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rejected</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {data.rejectedRequests} ({calculatePercentage(data.rejectedRequests)}%)
                </span>
              </div>
              <ProgressBar value={data.rejectedRequests} total={data.totalRequests} color="bg-rose-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequestsOverview;