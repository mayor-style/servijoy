import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaClipboardList, 
  FaShoppingCart, 
  FaExclamationTriangle, 
  FaChartLine, 
  FaCog, 
  FaSignOutAlt, 
  FaTimes 
} from 'react-icons/fa';

const AdminSidebar = ({ isOpen, onClose, onLogout }) => {
  const navItems = [
    { 
      label: 'Dashboard', 
      icon: <FaTachometerAlt />, 
      to: '/admin/dashboard',
      description: 'Overview'
    },
    { 
      label: 'Users/Vendors', 
      icon: <FaUsers />, 
      to: '/admin/users',
      description: 'Manage accounts'
    },
    { 
      label: 'Services', 
      icon: <FaClipboardList />, 
      to: '/admin/services',
      description: 'View all services'
    },
    { 
      label: 'Orders', 
      icon: <FaShoppingCart />, 
      to: '/admin/orders',
      description: 'Track transactions'
    },
    { 
      label: 'Disputes', 
      icon: <FaExclamationTriangle />, 
      to: '/admin/disputes',
      description: 'Resolve issues'
    },
    { 
      label: 'Analytics', 
      icon: <FaChartLine />, 
      to: '/admin/analytics',
      description: 'View statistics'
    },
    { 
      label: 'Settings', 
      icon: <FaCog />, 
      to: '/admin/settings',
      description: 'System preferences'
    },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full z-50 pt-16 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out w-72 lg:w-64 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="h-full flex flex-col overflow-hidden">
        {/* Mobile close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          aria-label="Close sidebar"
        >
          <FaTimes size={16} />
        </button>
        
        {/* Brand/logo area */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-white">Admin Portal</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manage your platform</p>
            </div>
          </div>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-grow overflow-y-auto px-4 py-6 space-y-1">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`
              }
              onClick={onClose}
            >
              <div className={`text-lg ${
                  NavLink.isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
              </div>
            </NavLink>
          ))}
        </nav>
        
        {/* Footer with logout option */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;