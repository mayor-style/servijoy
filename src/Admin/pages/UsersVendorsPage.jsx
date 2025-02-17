import React from "react";
import UsersVendorsHeader from "../components/User_VendorSections/UsersVendorsHeader";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import FiltersSortingPanel from "../components/User_VendorSections/FiltersSortingPanels";
import UsersVendorsTable from "../components/User_VendorSections/UsersVendorsTable";
import ActivityLogsSection from "../components/User_VendorSections/ActivityLogsSection";
import StatisticsSummaryCards from "../components/User_VendorSections/StatisticsSummaryCards";
import AlertsNotificationsPanel from "../components/User_VendorSections/AlertsNotificationsPanel";

const UserVendorWrapper = () => {
  return (
    <div className="p-4 space-y-6 bg-light-gray dark:bg-gray-900 min-h-screen transition">
      <UsersVendorsHeader />
      <FiltersSortingPanel />
      <UsersVendorsTable />
      <ActivityLogsSection />
      <StatisticsSummaryCards />
      <AlertsNotificationsPanel />
    </div>
  );
};

const UsersVendorsPage = () => {
  return (
    <div>
      <AdminDashboardLayout content={<UserVendorWrapper />} />
    </div>
  );
};

export default UsersVendorsPage;
