// MessagesSections/ConversationItem.jsx
import React, { memo } from "react";
import { motion } from "framer-motion";

const ConversationItem = memo(({ conversation, isActive, onSelect }) => {
  const { id, title, lastMessage, timestamp, unreadCount, avatar } = conversation;
  
  // Format timestamp to relative time (e.g., "2h ago" or "Yesterday")
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const msgDate = new Date(timestamp);
    const diffMs = now - msgDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 2) return "Yesterday";
    
    // For older messages, show date
    return msgDate.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const relativeTime = getRelativeTime(timestamp);
  
  // Truncate long messages
  const truncateMessage = (text, maxLength = 40) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <motion.div
      onClick={() => onSelect(id)}
      className={`p-4 mb-2 rounded-xl cursor-pointer transition-all ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500"
          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      layout
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onSelect(id)}
    >
      <div className="flex items-center space-x-3">
        <div className="relative flex-shrink-0">
          <img
            src={avatar || "/default-avatar.png"}
            alt={`${title}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className={`text-base font-semibold truncate ${unreadCount > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {title}
            </h3>
            <span className={`text-xs ${unreadCount > 0 ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              {relativeTime}
            </span>
          </div>
          
          <p className={`text-sm truncate ${
            unreadCount > 0 
              ? 'text-gray-900 dark:text-gray-100 font-medium' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {truncateMessage(lastMessage)}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default ConversationItem;