import React from "react";

const ConversationItem = ({ conversation, isActive, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(conversation.id)}
      className={`p-4 rounded-xl cursor-pointer transition-all transform hover:scale-105 border-b border-gray-200 dark:border-gray-700 ${
        isActive
          ? "bg-blue-100 dark:bg-blue-900"
          : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold dark:text-white">
          {conversation.title}
        </h3>
        {conversation.unreadCount > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            {conversation.unreadCount}
          </span>
        )}
      </div>
      <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
        {conversation.lastMessage}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {conversation.timestamp}
      </p>
    </div>
  );
};

export default ConversationItem;
