import React from "react";
import ServicePageHeader from "../components/ServiceManagementSections/ServicePageHeader";
import FiltersSortingPanel from "../components/ServiceManagementSections/FiltersSortingPanel";
import ServiceRequestsOverview from "../components/ServiceManagementSections/ServiceRequestsOverview";
import ServiceRequestsTable from "../components/ServiceManagementSections/ServiceRequestsTable";
import ServiceCategoryManagement from "../components/ServiceManagementSections/ServiceCategoryManagement";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import ServiceModals from "../components/ServiceManagementSections/ServiceModals";

const ServiceManagementWrapper = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6 transition">
      <ServicePageHeader />
      <ServiceRequestsOverview />
      <FiltersSortingPanel onFilterChange={(filters) => console.log("Filters applied:", filters)} />
      <ServiceRequestsTable />
      <ServiceCategoryManagement />
      <ServiceModals />
    </div>
  );
};

const ServiceManagementPage = () => {
  return (
    <div>
      <AdminDashboardLayout content={<ServiceManagementWrapper />} />
    </div>
  );
};

export default ServiceManagementPage;
