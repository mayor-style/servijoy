import React from "react";
import WelcomeSection from "./components/dashboardHome/WelcomeSection";
import BookingSummary from "./components/dashboardHome/BookingSummary";
import WalletOverview from "./components/dashboardHome/WalletOverview";
import TrustScoreOverview from "./components/dashboardHome/TrustScoreOverview";
import RecentMessagesNotifications from "./components/dashboardHome/RecentMessagesNotifications";
import QuickAccessServices from "./components/dashboardHome/QuickAccessServices";

const UserDashboardHome = () => {
  return (
    <div className="max-w-7xl mx-auto px-0 py-6 pt-0 space-y-6">
      <WelcomeSection />
      <BookingSummary />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <WalletOverview />
        <div className="space-y-8">
          <TrustScoreOverview />
          <RecentMessagesNotifications />
        </div>
      </div>
      <QuickAccessServices />
    </div>
  );
};

export default UserDashboardHome;