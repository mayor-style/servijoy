import React, { useState, useEffect } from "react";
import { 
  FaBell, 
  FaEnvelopeOpenText, 
  FaRegEnvelope, 
  FaUserCircle, 
  FaArrowRight, 
  FaCircle,
  FaReply,
  FaCheck,
  FaEllipsisH,
  FaInbox,
  FaSpinner,
  FaToggleOn,
  FaToggleOff,
  FaEye
} from "react-icons/fa";
import { Link } from "react-router-dom";

const VendorRecentMessages = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);
  const [showDevelopmentControls, setShowDevelopmentControls] = useState(true);
  
  // Mock data for messages and notifications
  const mockMessages = [
    {
      id: 1,
      sender: "John Doe",
      avatar: null, // Could be a URL in real data
      content: "Hey, can you confirm my booking for Friday? I need to know if it's available.",
      time: "10:23 AM",
      date: "Today",
      read: false,
      booking: "BK-2023-03-12",
    },
    {
      id: 2,
      sender: "Jane Smith",
      avatar: null,
      content: "Thanks for the service! Great work! Will definitely book again soon.",
      time: "Yesterday",
      date: "Mar 17",
      read: true,
      booking: "BK-2023-03-05",
    },
    {
      id: 3,
      sender: "Alex Johnson",
      avatar: null,
      content: "Do you have any availability next week? Looking to book your services.",
      time: "2 days ago",
      date: "Mar 16",
      read: true,
      booking: null,
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: "booking",
      title: "New Booking Request",
      content: "You have received a new booking request from Michael Brown",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 2,
      type: "payout",
      title: "Payout Processed",
      content: "Your payout of ₦1,200 has been processed and will arrive in 2-3 business days",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      type: "system",
      title: "System Maintenance",
      content: "The system will undergo maintenance on March 20th from 2-4 AM",
      time: "3 days ago",
      read: true,
    }
  ];

  // State for actual data
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Simulate API call and data loading
  useEffect(() => {
    if (isDevMode) {
      const loadData = async () => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (hasData) {
          setMessages(mockMessages);
          setNotifications(mockNotifications);
        } else {
          setMessages([]);
          setNotifications([]);
        }
        
        setIsLoading(false);
      };
      
      loadData();
    } else {
      // In production, this would be a real API call.
      setIsLoading(true);
      setTimeout(() => {
        setMessages(mockMessages);
        setNotifications(mockNotifications);
        setIsLoading(false);
      }, 1000);
    }
  }, [hasData, isDevMode]);

  const getNotificationIcon = (type) => {
    switch(type) {
      case "booking":
        return <FaRegEnvelope className="text-blue-400" />;
      case "payout":
        return <FaBell className="text-green-400" />;
      case "system":
        return <FaBell className="text-purple-400" />;
      default:
        return <FaBell className="text-yellow-400" />;
    }
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Mark message as read
  const markMessageAsRead = (id) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id ? { ...message, read: true } : message
      )
    );
  };

  // Mark notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Developer Controls Panel (inline in container)
  const DeveloperControlsPanel = () => (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 border-b border-yellow-100 dark:border-yellow-800 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-yellow-800 dark:text-yellow-400">
          Developer Controls
        </span>
        <button 
          onClick={() => setShowDevelopmentControls(false)}
          className="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
        >
          Hide
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => setIsDevMode(!isDevMode)}
          className="flex items-center justify-between text-xs bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
        >
          <span>Dev Mode</span>
          {isDevMode ? 
            <FaToggleOn className="text-green-400 text-lg" /> : 
            <FaToggleOff className="text-gray-400 text-lg" />
          }
        </button>
        {isDevMode && (
          <>
            <button 
              onClick={() => setHasData(!hasData)}
              className="flex items-center justify-between text-xs bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            >
              <span>Toggle Data</span>
              {hasData ? 
                <FaToggleOn className="text-green-400 text-lg" /> : 
                <FaToggleOff className="text-gray-400 text-lg" />
              }
            </button>
            <button 
              onClick={() => setIsLoading(!isLoading)}
              className="flex items-center justify-between text-xs bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors"
            >
              <span>Toggle Loading</span>
              {isLoading ? 
                <FaToggleOn className="text-green-400 text-lg" /> : 
                <FaToggleOff className="text-gray-400 text-lg" />
              }
            </button>
          </>
        )}
      </div>
    </div>
  );

  // Developer Mode Toggle Button (appears when the panel is hidden)
  const DeveloperModeToggleButton = () => (
    <button 
      onClick={() => setShowDevelopmentControls(true)}
      className="absolute top-2 right-2 p-1 bg-blue-600/30 rounded hover:bg-blue-600/40 transition"
      title="Show Developer Controls"
    >
      <FaEye className="h-4 w-4 text-blue-100" />
    </button>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner className="text-4xl animate-spin text-indigo-300 mb-4" />
      <p className="text-indigo-200 text-sm font-medium">Loading your communications...</p>
    </div>
  );

  // Empty state for messages
  const EmptyMessagesState = () => (
    <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-xl">
      <div className="p-4 bg-indigo-500/20 rounded-full mb-3">
        <FaInbox className="text-3xl text-indigo-300" />
      </div>
      <h3 className="text-lg font-medium mb-1">No messages yet</h3>
      <p className="text-indigo-200 text-sm mb-4 text-center max-w-xs">
        When clients message you about bookings, they'll appear here.
      </p>
      <Link to="/dashboard/profile" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors">
        Complete your profile to attract clients
      </Link>
    </div>
  );

  // Empty state for notifications
  const EmptyNotificationsState = () => (
    <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-xl">
      <div className="p-4 bg-indigo-500/20 rounded-full mb-3">
        <FaBell className="text-3xl text-indigo-300" />
      </div>
      <h3 className="text-lg font-medium mb-1">No notifications</h3>
      <p className="text-indigo-200 text-sm mb-4 text-center max-w-xs">
        System alerts and booking notifications will appear here.
      </p>
      <Link to="/dashboard/settings/notifications" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors">
        Manage notification settings
      </Link>
    </div>
  );

  return (
    <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-950 text-white p-6 rounded-2xl shadow-xl border border-indigo-400/30 dark:border-indigo-700/30 overflow-hidden">
      {showDevelopmentControls ? <DeveloperControlsPanel /> : <DeveloperModeToggleButton />}
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl -ml-10 -mb-10"></div>
      
      {/* Header section with tabs */}
      <div className="flex justify-between items-center mb-6 relative">
        <h2 className="text-2xl font-bold">
          <span className="mr-2">💬</span> Communication Center
        </h2>
        <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab("messages")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all relative ${
              activeTab === "messages" 
                ? "bg-white/20 text-white" 
                : "hover:bg-white/10 text-white/80"
            }`}
          >
            Messages
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative rounded-full h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all relative ${
              activeTab === "notifications" 
                ? "bg-white/20 text-white" 
                : "hover:bg-white/10 text-white/80"
            }`}
          >
            Notifications
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative rounded-full h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Messages Tab Content */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          {isLoading ? (
            <LoadingState />
          ) : messages.length > 0 ? (
            <>
              {/* Summary card */}
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/30 rounded-lg">
                    <FaEnvelopeOpenText className="text-xl text-indigo-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Inbox Status</p>
                    <p className="text-xs text-indigo-200">
                      {unreadMessagesCount} unread • {messages.length} total
                    </p>
                  </div>
                </div>
                <Link to="/dashboard/messages" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                  View All <FaArrowRight className="text-xs" />
                </Link>
              </div>
              {/* Messages List */}
              <div className="space-y-3">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`group flex items-start gap-3 p-4 rounded-xl transition-all ${
                      message.read 
                        ? "bg-white/10 hover:bg-white/15" 
                        : "bg-white/20 hover:bg-white/25 border-l-4 border-yellow-400"
                    }`}
                    onClick={() => markMessageAsRead(message.id)}
                  >
                    <div className="flex-shrink-0">
                      {message.avatar ? (
                        <img 
                          src={message.avatar} 
                          alt={message.sender} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                          {message.sender.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm flex items-center gap-1">
                          {message.sender}
                          {!message.read && (
                            <FaCircle className="text-yellow-400 text-xs" />
                          )}
                        </h4>
                        <span className="text-xs text-indigo-200">{message.time}</span>
                      </div>
                      <p className="text-sm text-white/90 truncate">{message.content}</p>
                      {message.booking && (
                        <span className="text-xs bg-indigo-600/50 px-2 py-0.5 rounded inline-block mt-2">
                          Booking: {message.booking}
                        </span>
                      )}
                      <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-2">
                          <button className="text-xs bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors">
                            <FaReply className="text-xs" />
                          </button>
                          <button className="text-xs bg-white/20 hover:bg-white/30 p-1.5 rounded-lg transition-colors">
                            <FaCheck className="text-xs" />
                          </button>
                        </div>
                        <button className="text-xs text-white/70 hover:text-white">
                          <FaEllipsisH />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyMessagesState />
          )}
        </div>
      )}
      
      {/* Notifications Tab Content */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          {isLoading ? (
            <LoadingState />
          ) : notifications.length > 0 ? (
            <>
              {/* Summary card */}
              <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/30 rounded-lg">
                    <FaBell className="text-xl text-indigo-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Notification Center</p>
                    <p className="text-xs text-indigo-200">
                      {unreadNotificationsCount} unread • {notifications.length} total
                    </p>
                  </div>
                </div>
                <Link to="/dashboard/notifications" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                  View All <FaArrowRight className="text-xs" />
                </Link>
              </div>
              {/* Notifications List */}
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`group flex items-start gap-3 p-4 rounded-xl transition-all ${
                      notification.read 
                        ? "bg-white/10 hover:bg-white/15" 
                        : "bg-white/20 hover:bg-white/25 border-l-4 border-blue-400"
                    }`}
                  >
                    <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm flex items-center gap-1">
                          {notification.title}
                          {!notification.read && (
                            <FaCircle className="text-blue-400 text-xs" />
                          )}
                        </h4>
                        <span className="text-xs text-indigo-200">{notification.time}</span>
                      </div>
                      <p className="text-sm text-white/90">{notification.content}</p>
                      <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg transition-colors"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          Mark as read
                        </button>
                        <button className="text-xs text-white/70 hover:text-white">
                          <FaEllipsisH />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyNotificationsState />
          )}
        </div>
      )}
      
      {/* Quick Action Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
        <div className="text-xs text-white/70">
          Response time: <span className="text-green-400 font-medium">~2 hours</span>
        </div>
        <div className="flex space-x-2">
          <Link to="/dashboard/messages/create" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
            New Message
          </Link>
          <Link to="/dashboard/settings/notifications" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorRecentMessages;
