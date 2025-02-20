import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
  MdDashboard, MdMessage, MdNotifications, MdSettings, MdFavorite, MdSearch,
  MdCalendarToday, MdCreditCard, MdGavel, MdWork, MdAttachMoney
} from "react-icons/md";
import { FaBars } from "react-icons/fa";

const DashboardSidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={toggleMobile}
        className="fixed top-5 left-4 z-50 lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <FaBars className="text-2xl text-gray-700 dark:text-white" />
      </button>

      {/* Sidebar for Desktop and Mobile */}
      <aside
        className={`dark:bg-gray-800 text-theme shadow-2xl bg-white mt-20 text-white fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
          ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Collapse Toggle for Desktop */}
        <div className="justify-end p-2 hidden">
          <button onClick={toggleCollapse} className="p-2 rounded-md hover:bg-gray-800 transition-colors text-xl">
            <FaBars />
          </button>
        </div>
        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 p-4">
          {/* Dashboard link gets the `end` prop to match only on exact path */}
          <SidebarItem to="/dashboard" icon={<MdDashboard />} text="Dashboard" isCollapsed={isCollapsed} end />
          <SidebarItem to="/dashboard/messages" icon={<MdMessage />} text="Messages" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/notifications" icon={<MdNotifications />} text="Notifications" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/settings" icon={<MdSettings />} text="Settings" isCollapsed={isCollapsed} />
        </nav>
        {/* Additional sections based on user role */}
        {user.role === "user" && (
          <nav className="flex flex-col gap-2 p-4 border-t border-gray-300 dark:border-gray-700">
            <SidebarItem to="/dashboard/explore-services" icon={<MdSearch />} text="Explore Services" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/bookings" icon={<MdCalendarToday />} text="My Bookings" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/favorites" icon={<MdFavorite />} text="Favorites" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/wallet" icon={<MdCreditCard />} text="Payments & Wallet" isCollapsed={isCollapsed} />
            <SidebarItem to="/dashboard/disputes" icon={<MdGavel />} text="Dispute Management" isCollapsed={isCollapsed} />
          </nav>
        )}
        {user.role === "vendor" && (
          <nav className="flex flex-col gap-2 p-4 border-t border-gray-300 dark:border-gray-700">
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

const SidebarItem = ({ to, icon, text, isCollapsed, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'
        }`
      }
    >
      <span className="flex text-base items-center">{icon}</span>
      {!isCollapsed && <span className="text-base font-medium">{text}</span>}
    </NavLink>
  );
};

export default DashboardSidebar;
