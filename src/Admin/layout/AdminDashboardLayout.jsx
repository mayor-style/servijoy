import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardLayout = ({ content }) => {
  // Sidebar toggle state for mobile responsiveness
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      const sidebar = document.getElementById('admin-sidebar');
      const toggleButton = document.getElementById('sidebar-toggle');
      
      if (
        sidebarOpen && 
        sidebar && 
        !sidebar.contains(e.target) && 
        toggleButton && 
        !toggleButton.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <AdminHeader 
        toggleSidebar={handleToggleSidebar} 
        id="sidebar-toggle"
      />
      
      <div className="flex flex-1 pt-0">
        <AdminSidebar 
          id="admin-sidebar"
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onLogout={handleLogout}
        />
        
        <main className="pt-0 pb-5 ml-0 lg:ml-64 px-3 lg:px-4 flex-1 overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            {content}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;