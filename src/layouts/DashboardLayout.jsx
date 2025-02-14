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
      <DashboardHeader />

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0">
          <main className="flex-1 overflow-auto p-5  min-w-0 transition-colors duration-300">
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Footer (scrolls naturally) */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
