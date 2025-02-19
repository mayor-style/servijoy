import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <DashboardHeader toggleSidebar={() => {}} />

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content and Footer */}
        <div className="flex flex-col flex-1 min-w-0 ml-0 md:ml-64 transition-colors duration-300">
          <main className="flex-1 overflow-auto p-5 min-w-0 transition-colors duration-300">
            <Outlet />
          </main>
          <DashboardFooter className="ml-0 md:ml-64" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
