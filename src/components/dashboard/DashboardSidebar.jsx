import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { 
  MdDashboard, MdMessage, MdNotifications, MdSettings, MdFavorite, MdSearch,
  MdCalendarToday, MdCreditCard, MdGavel, MdWork, MdAttachMoney, MdRateReview,
  MdMenu
} from "react-icons/md";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Menu Button - Visible on small screens */}
      <button
        onClick={toggleMenu}
        className=" fixed top-5 left-4 z-50  
        md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
        "
      >
      <MdMenu className="text-2xl text-gray-700 dark:text-white" />
      </button>
      
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white h-screen p-4 flex flex-col transition-all overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 duration-300 
        fixed bottom-0 md:relative top-0 left-0 z-40 
        ${isCollapsed ? "w-16" : "w-64"} 
        ${isOpen ? "translate-x-0 max-md:pt-10" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="mb-6 p-2 rounded-md hover:bg-gray-800 transition-colors text-xl self-center"
        >
          <FaBars />
        </button>

        {/* Common Pages */}
        <nav className="flex flex-col gap-2">
          <SidebarItem to="/dashboard" icon={<MdDashboard />} text="Dashboard" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/messages" icon={<MdMessage />} text="Messages" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/notifications" icon={<MdNotifications />} text="Notifications" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/settings" icon={<MdSettings />} text="Settings" isCollapsed={isCollapsed} />
        </nav>

        {/* User-Specific Pages */}
        {user.role === "user" && (
          <nav className="flex flex-col gap-2 mt-4 border-t border-gray-700 pt-4">
            <SidebarItem to="/dashboard/explore-services" icon={<MdSearch />} text="Explore Services" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/bookings" icon={<MdCalendarToday />} text="My Bookings" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/favorites" icon={<MdFavorite />} text="Favorites" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/wallet" icon={<MdCreditCard />} text="Payments & Wallet" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/disputes" icon={<MdGavel />} text="Dispute Management" isCollapsed={isCollapsed} />
          </nav>
        )}

        {/* Vendor-Specific Pages */}
        {user.role === "vendor" && (
          <nav className="flex flex-col gap-2 mt-4 border-t border-gray-700 pt-4">
            <SidebarItem to="/dashboard/manage-services" icon={<MdWork />} text="Manage Services" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/booking-requests" icon={<MdCalendarToday />} text="Booking Requests" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/calendar" icon={<MdCalendarToday />} text="Booking Calendar" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/earnings" icon={<MdAttachMoney />} text="Earnings & Payouts" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/vendor-disputes" icon={<MdGavel />} text="Dispute Management" isCollapsed={isCollapsed} />
          </nav>
        )}
      </aside>
    </>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, text, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center ${isCollapsed? 'justify-center': ''} gap-3 p-3 rounded-lg transition-colors duration-200 
        ${isActive ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700 text-white"}`
      }
    >
     <span className="flex size-4 font-medium justify-center items-center"> {icon}</span>
      {!isCollapsed && <span className="text-base font-medium">{text}</span>}
    </NavLink>
  );
};

export default Sidebar;
