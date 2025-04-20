// MessagesSections/ChatMessage.jsx
import React from "react";

const ChatMessage = ({ message, isLast }) => {
  const { text, time, isOwn, status } = message;
  
  // Status indicator mappings
  const statusIndicators = {
    sent: <span className="text-gray-400">✓</span>,
    delivered: <span className="text-gray-400">✓✓</span>,
    read: <span className="text-blue-500">✓✓</span>,
  };

  return (
    <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-4`}>
      <div
        className={`px-4 py-3 max-w-md break-words rounded-2xl shadow-sm ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-700 dark:text-white"
        }`}
      >
        {text}
      </div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
        {time}
        {isOwn && status && (
          <span className="ml-2">
            {statusIndicators[status] || statusIndicators.sent}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;