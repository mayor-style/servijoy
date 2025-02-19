import React from "react";

const ChatMessage = ({ message, isOwn }) => {
  return (
    <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} mb-4`}>
      <div 
        className={`px-4 py-2 max-w-lg break-words rounded-2xl shadow-md ${
          isOwn 
            ? "bg-blue-500 text-white rounded-bl-none dark:bg-blue-700 dark:text-white"
            : "bg-gray-100 text-gray-800 rounded-tr-none dark:bg-gray-700 dark:text-white"
        }`}
      >
        {message.text}
      </div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {message.time}
      </div>
    </div>
  );
};

export default ChatMessage;
