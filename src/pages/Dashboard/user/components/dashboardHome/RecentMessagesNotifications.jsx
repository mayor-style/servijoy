import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Tab } from '@headlessui/react';
import { format, isToday, isYesterday } from 'date-fns';

// Icons
import {
  BellIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  EyeIcon,
  InboxIcon,
  BellSlashIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationCircleIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const RecentMessagesNotifications = () => {
  const { user } = useAuth();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [data, setData] = useState({
    messages: [],
    notifications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  
  const tabs = ['All', 'Messages', 'Notifications'];
  
  const fetchMessagesAndNotifications = async () => {
    try {
      setRefreshing(true);
      
      // Fetch conversations and notifications concurrently
      const [conversationsRes, notificationsRes] = await Promise.all([
        axios.get(`${baseUrl}/api/conversations`, { withCredentials: true }),
        axios.get(`${baseUrl}/api/notifications`, { withCredentials: true })
      ]);
      
      // Process messages with more detailed information
      const mappedMessages = conversationsRes.data.success
        ? conversationsRes.data.data.map(conv => ({
            id: conv._id,
            sender: conv.title,
            text: conv.lastMessage,
            timestamp: new Date(conv.timestamp),
            unread: conv.unreadCount > 0,
            type: 'message',
            category: conv.category || 'General',
            priority: conv.unreadCount > 0 ? 'high' : 'normal',
            avatar: conv.avatar || null,
            serviceId: conv.serviceId || null,
            bookingId: conv.bookingId || null
          }))
        : [];
      
      // Process notifications with more detailed information
      const mappedNotifications = notificationsRes.data.success
        ? notificationsRes.data.data.map(notif => ({
            id: notif._id,
            title: notif.title,
            text: notif.message,
            timestamp: new Date(notif.createdAt),
            unread: !notif.read,
            type: 'notification',
            category: notif.category || 'System',
            priority: notif.priority || 'normal',
            actionable: notif.actionable || false,
            actionUrl: notif.actionUrl || null,
            icon: notif.icon || null,
            serviceId: notif.serviceId || null,
            bookingId: notif.bookingId || null
          }))
        : [];
      
      setData({
        messages: mappedMessages,
        notifications: mappedNotifications
      });
      
      // Check if there are no messages or notifications
      const noItems = mappedMessages.length === 0 && mappedNotifications.length === 0;
      setShowEmptyState(noItems);
      
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load messages and notifications");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchMessagesAndNotifications();
    
    // Set up polling for real-time updates (every 60 seconds)
    const intervalId = setInterval(() => {
      fetchMessagesAndNotifications();
    }, 60000);
    
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Format date for better readability
  const formatTimestamp = (timestamp) => {
    if (isToday(timestamp)) {
      return `Today, ${format(timestamp, 'h:mm a')}`;
    } else if (isYesterday(timestamp)) {
      return `Yesterday, ${format(timestamp, 'h:mm a')}`;
    } else {
      return format(timestamp, 'MMM d, h:mm a');
    }
  };
  
  // Get category badge style based on category type
  const getCategoryStyle = (category, type) => {
    const baseStyle = "inline-block px-2 py-0.5 text-xs rounded-full";
    
    // Message categories
    if (type === 'message') {
      switch (category?.toLowerCase()) {
        case 'booking':
          return `${baseStyle} bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400`;
        case 'service':
          return `${baseStyle} bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400`;
        case 'payment':
          return `${baseStyle} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400`;
        case 'support':
          return `${baseStyle} bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400`;
        default:
          return `${baseStyle} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
      }
    }
    // Notification categories
    else {
      switch (category?.toLowerCase()) {
        case 'system':
          return `${baseStyle} bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400`;
        case 'booking':
          return `${baseStyle} bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400`;
        case 'payment':
          return `${baseStyle} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400`;
        case 'alert':
          return `${baseStyle} bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400`;
        default:
          return `${baseStyle} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
      }
    }
  };
  
  // Get priority indicator style
  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return "bg-red-500";
      case 'medium':
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };
  
  // Get notification icon based on category
  const getNotificationIcon = (category, customIcon) => {
    if (customIcon) {
      return customIcon;
    }
    
    switch (category?.toLowerCase()) {
      case 'system':
        return <BellIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'booking':
        return <CalendarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'payment':
        return <CurrencyDollarIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case 'alert':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />;
      default:
        return <BellIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };
  
  // Get message icon based on category
  const getMessageIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'booking':
        return <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'service':
        return <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'payment':
        return <CurrencyDollarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'support':
        return <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };
  
  // Get all items based on active tab
  const getItems = () => {
    const allItems = [
      ...data.messages.map(msg => ({ ...msg, type: 'message' })),
      ...data.notifications.map(notif => ({ ...notif, type: 'notification' }))
    ];
    
    // Sort by timestamp (newest first) and unread status
    allItems.sort((a, b) => {
      // Unread items first
      if (a.unread !== b.unread) {
        return a.unread ? -1 : 1;
      }
      // Then by priority
      if (a.priority !== b.priority) {
        const priorityOrder = { high: 0, medium: 1, normal: 2, low: 3 };
        return priorityOrder[a.priority || 'normal'] - priorityOrder[b.priority || 'normal'];
      }
      // Then by timestamp
      return b.timestamp - a.timestamp;
    });
    
    switch (activeTab) {
      case 0: // All
        return allItems;
      case 1: // Messages
        return data.messages;
      case 2: // Notifications
        return data.notifications;
      default:
        return allItems;
    }
  };
  
  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await Promise.all([
        axios.post(`${baseUrl}/api/conversations/markAllRead`, {}, { withCredentials: true }),
        axios.post(`${baseUrl}/api/notifications/markAllRead`, {}, { withCredentials: true })
      ]);
      
      // Update local state
      setData({
        messages: data.messages.map(msg => ({ ...msg, unread: false })),
        notifications: data.notifications.map(notif => ({ ...notif, unread: false }))
      });
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };
  
  // Handle item click
  const handleItemClick = (item) => {
    if (item.type === 'message') {
      // Navigate to conversation
      window.location.href = `/dashboard/messages/${item.id}`;
    } else if (item.actionable && item.actionUrl) {
      // Navigate to action URL if notification is actionable
      window.location.href = item.actionUrl;
    } else if (item.bookingId) {
      // Navigate to booking details
      window.location.href = `/dashboard/bookings/${item.bookingId}`;
    } else if (item.serviceId) {
      // Navigate to service details
      window.location.href = `/dashboard/services/${item.serviceId}`;
    }
    
    // Mark item as read
    markItemAsRead(item);
  };
  
  // Mark a single item as read
  const markItemAsRead = async (item) => {
    try {
      if (item.type === 'message') {
        await axios.post(`${baseUrl}/api/conversations/${item.id}/markAsRead`, {}, { withCredentials: true });
      } else {
        await axios.post(`${baseUrl}/api/notifications/${item.id}/markAsRead`, {}, { withCredentials: true });
      }
      
      // Update local state
      if (item.type === 'message') {
        setData({
          ...data,
          messages: data.messages.map(msg => 
            msg.id === item.id ? { ...msg, unread: false } : msg
          )
        });
      } else {
        setData({
          ...data,
          notifications: data.notifications.map(notif => 
            notif.id === item.id ? { ...notif, unread: false } : notif
          )
        });
      }
    } catch (err) {
      console.error(`Failed to mark ${item.type} as read:`, err);
    }
  };
  
  // Calculate unread counts
  const unreadMessages = data.messages.filter(msg => msg.unread).length;
  const unreadNotifications = data.notifications.filter(notif => notif.unread).length;
  const totalUnread = unreadMessages + unreadNotifications;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Empty state content
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      {activeTab === 0 ? (
        <>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-3 mb-4">
            <InboxIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Activity Yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
            Your messages and notifications will appear here when you receive them.
          </p>
        </>
      ) : activeTab === 1 ? (
        <>
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 mb-4">
            <EnvelopeIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Messages</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
            You don't have any messages yet. When service providers or our support team message you, they'll appear here.
          </p>
        </>
      ) : (
        <>
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-3 mb-4">
              <BellSlashIcon className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Notifications</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
              You don't have any notifications yet. System updates and booking alerts will appear here.
            </p>
          </>
        )}
    </div>
  );
  
  // Loading skeleton
  const renderSkeleton = () => (
    <div className="p-4 space-y-3">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
          <div className="flex-shrink-0 rounded-full p-2 bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
  
  // Custom CurrencyDollarIcon as it's not included in the original import
  const CurrencyDollarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  
  if (loading && !refreshing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header Section - Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90 z-0" />
          <div className="relative z-10 p-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">Activity Center</h3>
              </div>
              <div className="flex space-x-2"></div>
            </div>
          </div>
          <div className="relative z-10 px-4 -mb-px">
            <div className="flex space-x-4 border-b border-white/20">
              {tabs.map((tab) => (
                <div key={tab} className="px-3 py-2 text-sm font-medium text-white/70">{tab}</div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Loading skeleton */}
        {renderSkeleton()}
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header Section */}
      <div className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90 z-0">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
        </div>
        
        <div className="relative z-10 p-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white">
                Activity Center
              </h3>
              {totalUnread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {totalUnread}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={markAllAsRead}
                disabled={totalUnread === 0}
                className={`text-xs text-white px-2 py-1 rounded-md flex items-center ${
                  totalUnread > 0 
                    ? "bg-white/20 hover:bg-white/30" 
                    : "bg-white/10 cursor-not-allowed"
                } transition-all`}
              >
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                <span>Mark all read</span>
              </button>
              
              <button
                onClick={() => {
                  setRefreshing(true);
                  fetchMessagesAndNotifications();
                }}
                disabled={refreshing}
                className={`rounded-md p-1 ${
                  refreshing 
                    ? "bg-white/10 cursor-not-allowed" 
                    : "bg-white/20 hover:bg-white/30"
                } transition-all`}
                aria-label="Refresh"
              >
                <ArrowPathIcon 
                  className={`h-4 w-4 text-white ${refreshing ? "animate-spin" : ""}`} 
                />
              </button>
            </div>
          </div>
        </div>
          
        {/* Tabs */}
        <div className="relative z-10 px-4 -mb-px">
          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex space-x-4">
              {tabs.map((tab, index) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `px-3 py-2 text-sm font-medium outline-none transition-all ${
                      selected
                        ? "text-white border-b-2 border-white"
                        : "text-white/70 hover:text-white border-b-2 border-transparent"
                    }`
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{tab}</span>
                    {index === 0 && totalUnread > 0 && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                        {totalUnread}
                      </span>
                    )}
                    {index === 1 && unreadMessages > 0 && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                        {unreadMessages}
                      </span>
                    )}
                    {index === 2 && unreadNotifications > 0 && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                        {unreadNotifications}
                      </span>
                    )}
                  </div>
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
      
      {/* Items Section */}
      <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {error && (
          <div className="flex flex-col items-center justify-center p-6 text-red-500 space-y-2">
            <ExclamationCircleIcon className="h-6 w-6" />
            <p>{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchMessagesAndNotifications();
              }}
              className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
            >
              Retry
            </button>
          </div>
        )}
        
        <AnimatePresence>
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 space-y-2"
          >
            {showEmptyState ? (
              renderEmptyState()
            ) : refreshing ? (
              renderSkeleton()
            ) : getItems().length > 0 ? (
              getItems().map((item) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  variants={itemVariants}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    item.unread 
                      ? item.type === 'message'
                        ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500"
                        : "bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  {/* Icon or Avatar */}
                  {item.avatar ? (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={item.avatar} 
                        alt={item.type === 'message' ? item.sender : item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`flex-shrink-0 rounded-full p-2 ${
                      item.type === 'message'
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-indigo-100 dark:bg-indigo-900"
                    }`}>
                      {item.type === 'message' 
                        ? getMessageIcon(item.category)
                        : getNotificationIcon(item.category, item.icon)
                      }
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className={`text-sm font-semibold truncate ${
                        item.unread 
                          ? "text-gray-900 dark:text-white" 
                          : "text-gray-700 dark:text-gray-300"
                      }`}>
                        {item.type === 'message' ? item.sender : item.title}
                      </p>
                      <div className="flex items-center ml-2">
                        {item.unread && (
                          <span className={`h-2 w-2 rounded-full mr-2 ${
                            getPriorityStyle(item.priority)
                          }`} />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {formatTimestamp(item.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                      {item.text}
                    </p>
                    
                    {/* Tags/categories & Action */}
                    <div className="flex items-center justify-between mt-1">
                      <span className={getCategoryStyle(item.category, item.type)}>
                        {item.category}
                      </span>
                      
                      {/* Action button or indication */}
                      <div className="flex items-center">
                        {item.actionable && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                            <span className="mr-1">View</span>
                            <ArrowRightIcon className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              renderEmptyState()
            )}
            
            {/* View all link */}
            {getItems().length > 0 && (
              <motion.div
                variants={itemVariants}
                className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700"
              >
                <a 
                  href={activeTab === 1 ? "/dashboard/messages" : (activeTab === 2 ? "/dashboard/notifications" : "/dashboard/activity")}
                  className="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors py-2"
                >
                  <span>View all {activeTab === 0 ? "activity" : (activeTab === 1 ? "messages" : "notifications")}</span>
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </a>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Footer with statistics (only show when there are items) */}
      {!showEmptyState && getItems().length > 0 && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
            <div className="flex items-center">
                <EnvelopeIcon className="h-3 w-3 mr-1" />
                <span>{data.messages.length} messages</span>
              </div>
              <div className="flex items-center">
                <BellIcon className="h-3 w-3 mr-1" />
                <span>{data.notifications.length} notifications</span>
              </div>
            </div>
            <div className="flex items-center">
              {unreadMessages > 0 && (
                <span className="mr-2">{unreadMessages} unread messages</span>
              )}
              {unreadNotifications > 0 && (
                <span>{unreadNotifications} unread notifications</span>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RecentMessagesNotifications;