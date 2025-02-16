import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatWindow = ({ messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom whenever new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Messages Area */}
      <div className="flex-grow scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300  overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No messages yet.
          </p>
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} isOwn={msg.isOwn} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <ChatInput onSend={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
