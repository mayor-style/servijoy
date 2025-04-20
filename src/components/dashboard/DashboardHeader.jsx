import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { 
  MdNotifications, MdMessage, MdMenu, MdClose, 
  MdKeyboardArrowDown, MdSettings, MdLogout, MdPerson
} from "react-icons/md";
import { Link } from "react-router-dom";

const DashboardHeader = ({ toggleSidebar, isScrolled }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);
  const searchRef = useRef(null);

  // Sample notifications and messages
  const notifications = [
    { id: 1, title: "New booking request", time: "5 minutes ago", read: false },
    { id: 2, title: "Payment received", time: "2 hours ago", read: false },
    { id: 3, title: "System update", time: "Yesterday", read: true },
  ];

  const messages = [
    { id: 1, name: "John Doe", message: "When will you be available?", time: "10 min ago", avatar: null, unread: true },
    { id: 2, name: "Sarah Smith", message: "Thanks for your help!", time: "2 hours ago", avatar: null, unread: true },
  ];

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setMessagesOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && !event.target.closest('#search-input')) {
        setSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setNotificationsOpen(false);
        setMessagesOpen(false);
        setSearchOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
    }
  }, [searchOpen]);

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'bg-white dark:bg-gray-900'
      } border-b border-gray-200 dark:border-gray-700`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side with menu button and logo */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 mr-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              <MdMenu className="text-2xl text-gray-700 dark:text-white" />
            </button>

            <Link to="/dashboard" className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                ServiJoy
              </h1>
            </Link>
          </div>

          {/* Search bar */}
          <div 
            ref={searchRef} 
            className={`absolute left-0 top-0 w-full h-16 bg-white dark:bg-gray-900 z-50 transition-all duration-300 ${
              searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center h-full px-4">
              <div className="flex-1 relative">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search anything..."
                  className="w-full h-10 pl-4 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MdClose onClick={() => setSearchOpen(false)} className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Right-Side Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 dark:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setMessagesOpen(false);
                  setDropdownOpen(false);
                }}
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Notifications"
              >
                <MdNotifications className="text-xl text-gray-700 dark:text-white" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-colors ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex gap-3 items-start">
                            <div className={`mt-1 w-2 h-2 rounded-full ${!notification.read ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        No new notifications
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
                    <Link to="/dashboard/notifications" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="relative" ref={messagesRef}>
              <button
                onClick={() => {
                  setMessagesOpen(!messagesOpen);
                  setNotificationsOpen(false);
                  setDropdownOpen(false);
                }}
                className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Messages"
              >
                <MdMessage className="text-xl text-gray-700 dark:text-white" />
                {messages.some(m => m.unread) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>

              {messagesOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium">Messages</h3>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {messages.length > 0 ? (
                      messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-colors ${
                            message.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex gap-3 items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              {message.avatar ? (
                                <img src={message.avatar} alt={message.name} className="w-full h-full rounded-full object-cover" />
                              ) : (
                                <span className="text-sm font-medium text-blue-500">{message.name.charAt(0)}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {message.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {message.time}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                {message.message}
                              </p>
                            </div>
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        No new messages
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
                    <Link to="/dashboard/messages" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      View all messages
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setNotificationsOpen(false);
                  setMessagesOpen(false);
                }}
                className="flex items-center space-x-1 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-blue-500">{user?.profile?.firstName?.[0] || "U"}</span>
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-white">
                  {user?.profile?.firstName || 'User'}
                </span>
                <MdKeyboardArrowDown className="hidden md:block text-gray-500 dark:text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-1 z-50 border border-gray-200 dark:border-gray-700 transform origin-top-right transition-all duration-200">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-white">
                      {user?.profile?.firstName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <Link to="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MdPerson className="text-gray-500 dark:text-gray-400" />
                      Profile
                    </Link>
                    <Link to="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MdSettings className="text-gray-500 dark:text-gray-400" />
                      Settings
                    </Link>
                  </div>
                  
                  <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <MdLogout className="text-red-500 dark:text-red-400" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;