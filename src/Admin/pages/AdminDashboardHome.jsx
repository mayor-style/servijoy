import React from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import PlatformOverview from "../components/AdminHomePage/PlatformOverview";
import RecentActivities from "../components/AdminHomePage/RecentActivities";
import PlatformActivityOverview from "../components/AdminHomePage/PlatformActivityOverview";
import RecentTransactions from "../components/AdminHomePage/RecentTransactions";
import KeyMetricsSummary from "../components/AdminHomePage/KeyMetricsSummary";
import SystemHealthStatus from "../components/AdminHomePage/SystemHealthStatus";
import UpcomingEvents from "../components/AdminHomePage/UpcomingEvents";

const AdminHomePage = () => {
  return (
    <div className="py-4 mt-24 space-y-6 w-full bg-soft-white dark:bg-gray-900 min-h-screen transition">
      <h1 className="header px-4 text-gray-800 dark:text-white mb-4">
        Admin Dashboard
      </h1>

      <PlatformOverview />
      <RecentActivities />
      <PlatformActivityOverview />
      <RecentTransactions />
      {/*<KeyMetricsSummary />*/}
      <SystemHealthStatus />
      <UpcomingEvents />
    </div>
  );
};

const AdminDashboardHome = () => {
  return (
    <div>
      <AdminDashboardLayout content={<AdminHomePage />} />
    </div>
  );
};

export default AdminDashboardHome;
