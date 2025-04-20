import React, { useState, useEffect } from "react";
import { SmileIcon, PaperclipIcon, SendIcon, ImageIcon, MicIcon } from "lucide-react";

const ChatWindow = ({ conversation, onSendMessage, messageEndRef }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Message status icons
  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <div className="text-gray-400">✓</div>;
      case "delivered":
        return <div className="text-blue-500">✓✓</div>;
      case "read":
        return <div className="text-blue-500">✓✓</div>;
      default:
        return null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  // Simulate typing indicator
  useEffect(() => {
    if (conversation && conversation.messages.length > 0) {
      const lastMessage = conversation.messages[conversation.messages.length - 1];
      if (lastMessage.isOwn) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [conversation?.messages]);

  // Group messages by date
  const groupedMessages = conversation?.messages.reduce((groups, message) => {
    const date = message.timestamp.split(" ")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {conversation && groupedMessages && Object.keys(groupedMessages).map((date) => (
          <div key={date} className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                {date}
              </div>
            </div>
            
            {groupedMessages[date].map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                {!message.isOwn && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1">
                    <img
                      src={conversation.avatar}
                      alt={conversation.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/avatars/default.jpg";
                      }}
                    />
                  </div>
                )}
                <div className={`max-w-[70%]`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.isOwn
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  </div>
                  <div
                    className={`text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center ${
                      message.isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.time}
                    {message.isOwn && (
                      <span className="ml-2">{getStatusIcon(message.status)}</span>
                    )}
                  </div>
                </div>
                {message.isOwn && (
                  <div className="w-8 h-8 rounded-full overflow-hidden ml-2 mt-1">
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold">YS</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex mb-4 justify-start">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <img
                src={conversation.avatar}
                alt={conversation.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avatars/default.jpg";
                }}
              />
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none inline-block">
              <div className="flex space-x-1">
                <div className="bg-gray-500 dark:bg-gray-400 rounded-full w-2 h-2 animate-bounce"></div>
                <div className="bg-gray-500 dark:bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-100"></div>
                <div className="bg-gray-500 dark:bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* For auto-scrolling to bottom */}
        <div ref={messageEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t dark:border-gray-700 p-4">
        <div className="flex items-end bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button className="p-3 text-gray-500 hover:text-blue-500">
            <SmileIcon size={20} />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow min-h-[50px] max-h-[150px] py-3 px-3 bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 resize-none"
            style={{ height: Math.min(150, Math.max(50, newMessage.split('\n').length * 22)) + 'px' }}
          />
          <div className="flex items-center p-2 space-x-1">
            <button className="p-2 rounded-full text-gray-500 hover:text-blue-500">
              <PaperclipIcon size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-blue-500">
              <ImageIcon size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-500 hover:text-blue-500">
              <MicIcon size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              className={`p-2 rounded-full ${
                newMessage.trim() === ""
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <SendIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;