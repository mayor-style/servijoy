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
    <aside className={`bg-white dark:bg-gray-800 shadow-xl p-4 md:p-6 w-64 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-50 flex flex-col h-screen`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
       
      </div>
      <nav className="flex-grow space-y-4 overflow-y-auto">
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
            <span className="text-base md:text-lg">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t dark:border-gray-700 pt-4">
        <button onClick={onLogout} className="flex items-center p-3 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-700 rounded-lg transition w-full">
          <FaSignOutAlt className="text-xl mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
