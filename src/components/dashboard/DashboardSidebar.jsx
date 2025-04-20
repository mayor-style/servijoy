import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import {
  MdDashboard, MdMessage, MdNotifications, MdSettings, MdFavorite, MdSearch,
  MdCalendarToday, MdCreditCard, MdGavel, MdWork, MdAttachMoney, MdChevronLeft,
  MdChevronRight, MdClose, MdHelpOutline, MdOutlineAnalytics, MdPerson,
  MdExpandMore, MdExpandLess, MdInfo
} from "react-icons/md";

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  // Reset collapse state when viewport changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Navigation structure for better organization
  const mainNav = [
    { to: "/dashboard", icon: <MdDashboard />, text: "Dashboard", end: true },
    { to: "/dashboard/messages", icon: <MdMessage />, text: "Messages", badge: "3" },
    { to: "/dashboard/notifications", icon: <MdNotifications />, text: "Notifications", badge: "5" },
    { to: "/dashboard/analytics", icon: <MdOutlineAnalytics />, text: "Analytics" },
  ];
  
  const userNav = [
    { to: "/dashboard/explore-services", icon: <MdSearch />, text: "Explore Services" },
    { to: "/dashboard/bookings", icon: <MdCalendarToday />, text: "My Bookings", badge: "2" },
    { to: "/dashboard/favorites", icon: <MdFavorite />, text: "Favorites" },
    { to: "/dashboard/wallet", icon: <MdCreditCard />, text: "Payments & Wallet" },
    { to: "/dashboard/disputes", icon: <MdGavel />, text: "Dispute Management" },
  ];
  
  const vendorNav = [
    { to: "/dashboard/manage-services", icon: <MdWork />, text: "Manage Services" },
    { to: "/dashboard/booking-requests", icon: <MdCalendarToday />, text: "Booking Requests", badge: "4" },
    { to: "/dashboard/calendar", icon: <MdCalendarToday />, text: "Booking Calendar" },
    { to: "/dashboard/earnings", icon: <MdAttachMoney />, text: "Earnings & Payouts" },
    { to: "/dashboard/vendor-disputes", icon: <MdGavel />, text: "Dispute Management" },
  ];
  
  const supportNav = [
    { to: "/dashboard/profile", icon: <MdPerson />, text: "Profile" },
    { to: "/dashboard/settings", icon: <MdSettings />, text: "Settings" },
    { to: "/dashboard/help", icon: <MdHelpOutline />, text: "Help Center" },
  ];

  // Render a navigation section
  const renderNavSection = (sectionTitle, items, sectionKey) => {
    const isExpanded = expandedSection === sectionKey || expandedSection === null;
    
    return (
      <div className="py-2">
        <div 
          className={`px-4 mb-2 flex items-center justify-between cursor-pointer ${!isCollapsed && 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'}`}
          onClick={() => !isCollapsed && toggleSection(sectionKey)}
        >
          <h4 className={`text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider ${isCollapsed ? "text-center w-full" : ""}`}>
            {isCollapsed ? sectionTitle.substring(0, 4) : sectionTitle}
          </h4>
          {!isCollapsed && (
            <span className="text-gray-500 dark:text-gray-400">
              {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </span>
          )}
        </div>
        {(isExpanded || isCollapsed) && (
          <nav className={`space-y-1 px-3 transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'} ${isCollapsed ? 'opacity-100 max-h-96' : ''}`}>
            {items.map((item, index) => (
              <SidebarItem 
                key={`${sectionKey}-${index}`}
                to={item.to}
                icon={item.icon}
                text={item.text}
                isCollapsed={isCollapsed}
                end={item.end}
                badge={item.badge}
              />
            ))}
          </nav>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg fixed top-0 left-0 bottom-0 z-40 pt-16 transition-all duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Mobile Close Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Close sidebar"
      >
        <MdClose className="text-xl" />
      </button>
      
      {/* Collapse Toggle for Desktop */}
      <div className="hidden lg:flex justify-end px-4 py-2">
        <button 
          onClick={toggleCollapse} 
          className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
        </button>
      </div>

      {/* User Profile Section */}
      <div className={`flex flex-col items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'py-2' : ''}`}>
        <div className={`rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-full w-full h-full flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
            ) : (
              <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 ${isCollapsed ? 'text-xl' : 'text-4xl'}`}>
                {user?.profile?.firstName?.[0] || "U"}
              </span>
            )}
          </div>
        </div>
        
        {!isCollapsed && (
          <>
            <h3 className="text-sm font-medium mt-3">{user?.profile?.firstName || "User"}</h3>
            <div className="flex items-center mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || "Member"}</p>
            </div>
            {user?.verifiedProvider && (
              <div className="flex items-center mt-2 text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                <MdInfo className="mr-1" /> Verified Provider
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation Sections */}
      {renderNavSection("Main Menu", mainNav, "main")}
      
      {/* Conditional Navigation based on user role */}
      {user?.role === "user" && renderNavSection("User Menu", userNav, "user")}
      {user?.role === "vendor" && renderNavSection("Vendor Menu", vendorNav, "vendor")}
      
      {/* Support section always visible */}
      {renderNavSection("Support", supportNav, "support")}
      
      {/* App version at bottom */}
      {!isCollapsed && (
        <div className="mt-auto px-4 py-3 text-xs text-gray-500 dark:text-gray-400 text-center border-t border-gray-200 dark:border-gray-700">
          ServiJoy v1.2.5
        </div>
      )}
    </aside>
  );
};

const SidebarItem = ({ to, icon, text, isCollapsed, end, badge }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-lg transition-all duration-200 relative ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`
      }
    >
      <div className="flex items-center gap-3">
        <span className={`text-lg ${isCollapsed ? 'mx-auto' : ''}`}>{icon}</span>
        {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{text}</span>}
      </div>
      
      {!isCollapsed && badge && (
        <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          {badge}
        </span>
      )}
      
      {isCollapsed && badge && (
        <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center translate-x-1 -translate-y-1">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default DashboardSidebar;