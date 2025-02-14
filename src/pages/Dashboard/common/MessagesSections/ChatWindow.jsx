// File: components/messages/ChatWindow.jsx
import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatWindow = ({ messages, onSendMessage }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No messages yet.
          </p>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} isOwn={msg.isOwn} />
          ))
        )}
      </div>
      {/* Input Area */}
      <div className="border-t dark:border-gray-700">
        <ChatInput onSend={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
