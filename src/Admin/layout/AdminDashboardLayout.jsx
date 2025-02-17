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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <AdminHeader  toggleSidebar={handleToggleSidebar} />
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
         {content}
          {/* Future sections like recent activity, notifications, etc. can be added here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
