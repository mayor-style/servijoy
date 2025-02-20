import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaShoppingCart, FaExclamationTriangle, FaChartLine, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const AdminSidebar = ({ isOpen, onClose, onLogout }) => {


  const navItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, to: '/admin/dashboard' },
    { label: 'Users/Vendors', icon: <FaUsers />, to: '/admin/users' },
    { label: 'Services', icon: <FaClipboardList />, to: '/admin/services' },
    { label: 'Orders', icon: <FaShoppingCart />, to: '/admin/orders' },
    { label: 'Disputes', icon: <FaExclamationTriangle />, to: '/admin/disputes' },
    { label: 'Analytics', icon: <FaChartLine />, to: '/admin/analytics' },
    { label: 'Settings', icon: <FaCog />, to: '/admin/settings' },
  ];

  return (
    <aside className={`bg-white top-20 left-0 bottom-0 z-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 dark:bg-gray-800 shadow-xl p-4 lg:p-6 w-64 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed z-50 flex flex-col h-screen`}>
      <nav className="flex-grow space-y-4  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'}`
            }
            onClick={() => { onClose && onClose(); }}
          >
            {item.icon}
            <span className="text-base lg:text-lg">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
    </aside>
  );
};

export default AdminSidebar;
