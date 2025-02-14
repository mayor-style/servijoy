// File: components/dashboard/VendorDashboardHome.jsx
import React from "react";
import VendorWelcome from "./components/dashboardHome/VendorWelcome";
import VendorBookingRequests from "./components/dashboardHome/VendorBookingRequests";
import VendorQuickAccess from "./components/dashboardHome/VendorQuickAccess";
import VendorEarnings from "./components/dashboardHome/VendorEarnings";
import VendorTrustScore from "./components/dashboardHome/VendorTrustScore";
import VendorMessages from "./components/dashboardHome/VendorRecentMessages";

const VendorDashboardHome = () => {
  return (
    <div className="max-w-7xl mx-auto px-0 py-6 space-y-8">
      {/* Welcome Section */}
      <VendorWelcome />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <VendorBookingRequests />
          <VendorEarnings />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <VendorTrustScore />
          <VendorMessages />
        </div>
      </div>

      {/* Quick Actions */}
      <VendorQuickAccess />
    </div>
  );
};

export default VendorDashboardHome;
