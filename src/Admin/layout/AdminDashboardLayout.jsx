// components/admin/AdminDashboardLayout.jsx
import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardLayout = ({content}) => {
  // Sidebar toggle state for mobile responsiveness
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col  min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader  toggleSidebar={handleToggleSidebar} />
        <main className="py-5 ml-0 lg:ml-64 px-3 lg:px-4 flex-1 overflow-hidden">
         {content}
          {/* Future sections like recent activity, notifications, etc. can be added here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
