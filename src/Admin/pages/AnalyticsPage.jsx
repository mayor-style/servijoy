import React from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AnalyticsHeader from "../components/AnalyticsSections/AnalyticsHeader";
import AnalyticsOverviewCards from "../components/AnalyticsSections/AnalyticsOverviewCards";
import TrendChart from "../components/AnalyticsSections/TrendChart";

const AnalyticsPageWrapper = () => {
  // Mock chart data (e.g. revenue trend over months)
  const chartData = [
    { label: "Jan", revenue: 20000 },
    { label: "Feb", revenue: 25000 },
    { label: "Mar", revenue: 30000 },
    { label: "Apr", revenue: 28000 },
    { label: "May", revenue: 32000 },
    { label: "Jun", revenue: 35000 },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6 transition">
      <AnalyticsHeader />
      <AnalyticsOverviewCards />
      <TrendChart data={chartData} />
      {/* Additional analytics components (e.g., tables, charts) can be added here */}
    </div>
  );
};

const AnalyticsPage = () => {
  return (
    <AdminDashboardLayout content={<AnalyticsPageWrapper />} />
  );
};

export default AnalyticsPage;
