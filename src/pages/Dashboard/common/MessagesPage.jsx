// File: components/messages/Messages.jsx
import React, { useState } from "react";
import ConversationList from "./MessagesSections/ConversationList";
import ChatWindow from "./MessagesSections/ChatWindow";

const Messages = () => {
  // MOCK DATA for conversation list
  const mockConversations = [
    {
      id: 1,
      title: "John Doe",
      lastMessage: "Hey, are you available for the job tomorrow?",
      timestamp: "Feb 10, 2025 3:45 PM",
      unreadCount: 2,
      messages: [
        { id: 1, text: "Hello, how can I help you?", time: "3:40 PM", isOwn: false },
        { id: 2, text: "I need some plumbing work done.", time: "3:41 PM", isOwn: true },
        { id: 3, text: "Sure, let's schedule a visit.", time: "3:42 PM", isOwn: false },
      ],
    },
    {
      id: 2,
      title: "Acme Corp Support",
      lastMessage: "Your issue has been resolved.",
      timestamp: "Feb 09, 2025 11:20 AM",
      unreadCount: 0,
      messages: [
        { id: 4, text: "We are looking into your request.", time: "10:00 AM", isOwn: false },
        { id: 5, text: "Thank you for the update.", time: "10:05 AM", isOwn: true },
        { id: 6, text: "Your issue has been resolved.", time: "11:15 AM", isOwn: false },
      ],
    },
    // Add more conversation objects as needed...
  ];

  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState(
    mockConversations[0]?.id || null
  );

  // Get active conversation messages
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  // Handler for selecting a conversation
  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
  };

  // Handler for sending a new message in the active conversation
  const handleSendMessage = (text) => {
    if (!activeConversation) return;
    const newMessage = {
      id: Date.now(), // Unique id
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: text,
              timestamp: new Date().toLocaleString(),
              unreadCount: 0, // Reset unread count when active
            }
          : conv
      )
    );
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center ">
      <div className="w-full max-w-7xl dark:border-gray-700 bg-white scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300  dark:bg-gray-800 rounded-2xl border shadow overflow-hidden ">
        <div className="flex flex-col md:flex-row h-[80vh]">
          {/* Sidebar: Conversation List */}
          <div className="md:w-1/3 border-r dark:border-gray-700 h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300  overflow-y-auto">
            <div className="p-6 border-b dark:border-gray-700">
              <h1 className="text-3xl font-bold dark:text-white">Messages</h1>
            </div>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
            />
          </div>

          {/* Chat Window */}
          <div className="md:w-2/3 h-full flex flex-col">
            {activeConversation ? (
              <ChatWindow
                messages={activeConversation.messages}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <p className="p-6 text-center text-gray-500 dark:text-gray-300">
                  Select a conversation to start chatting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
