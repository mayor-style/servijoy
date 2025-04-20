import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchIcon, PlusCircleIcon, BellIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import ConversationList from "./MessagesSections/ConversationList";
import ChatWindow from "./MessagesSections/ChatWindow";
import { fetchConversations, sendMessage } from "../../../api/messageApi";

// MOCK DATA for conversation list (same as original)
const mockConversations = [
  {
    id: 1,
    title: "John Doe",
    avatar: "/avatars/john-doe.jpg",
    lastMessage: "Hey, are you available for the job tomorrow?",
    timestamp: "Feb 10, 2025 3:45 PM",
    unreadCount: 2,
    status: "online",
    messages: [
      { id: 1, text: "Hello, how can I help you?", time: "3:40 PM", isOwn: false, status: "read", timestamp: "Feb 10, 2025 3:40 PM" },
      { id: 2, text: "I need some plumbing work done.", time: "3:41 PM", isOwn: true, status: "read", timestamp: "Feb 10, 2025 3:41 PM" },
      { id: 3, text: "Sure, let's schedule a visit.", time: "3:42 PM", isOwn: false, status: "delivered", timestamp: "Feb 10, 2025 3:42 PM" },
    ],
  },
  {
    id: 2,
    title: "Acme Corp Support",
    avatar: "/avatars/acme-corp.jpg",
    lastMessage: "Your issue has been resolved.",
    timestamp: "Feb 09, 2025 11:20 AM",
    unreadCount: 0,
    status: "offline",
    messages: [
      { id: 4, text: "We are looking into your request.", time: "10:00 AM", isOwn: false, status: "read", timestamp: "Feb 09, 2025 10:00 AM" },
      { id: 5, text: "Thank you for the update.", time: "10:05 AM", isOwn: true, status: "read", timestamp: "Feb 09, 2025 10:05 AM" },
      { id: 6, text: "Your issue has been resolved.", time: "11:15 AM", isOwn: false, status: "read", timestamp: "Feb 09, 2025 11:15 AM" },
    ],
  },
  // Additional mock conversations
  {
    id: 3,
    title: "Sarah Wilson",
    avatar: "/avatars/sarah-wilson.jpg",
    lastMessage: "The design looks great! I'll review it tomorrow.",
    timestamp: "Feb 08, 2025 5:30 PM",
    unreadCount: 1,
    status: "away",
    messages: [
      { id: 7, text: "How's the project coming along?", time: "4:20 PM", isOwn: false, status: "read", timestamp: "Feb 08, 2025 4:20 PM" },
      { id: 8, text: "I've finished the initial design.", time: "5:15 PM", isOwn: true, status: "read", timestamp: "Feb 08, 2025 5:15 PM" },
      { id: 9, text: "The design looks great! I'll review it tomorrow.", time: "5:30 PM", isOwn: false, status: "delivered", timestamp: "Feb 08, 2025 5:30 PM" },
    ],
  },
];

const Messages = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState(mockConversations[0]?.id || null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showConversationList, setShowConversationList] = useState(true);
  const messageEndRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) setShowConversationList(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically set active conversation if query parameter is provided
  useEffect(() => {
    const convId = searchParams.get("conversationId");
    if (convId) {
      setActiveConversationId(Number(convId));
      if (isMobileView) setShowConversationList(false);
    }

    // Simulating API fetch with loading state
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);

    // Commented out API fetch for real data
    /*
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchConversations();
        setConversations(response);
        setActiveConversationId(response[0]?.id || null);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    */
  }, [searchParams, isMobileView]);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversations]);

  // Get active conversation messages
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) => 
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for selecting a conversation
  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    
    // Mark conversation as read when selected
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === id
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    // Hide conversation list on mobile
    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  // Handler for sending a new message in the active conversation
  const handleSendMessage = (text) => {
    if (!activeConversation) return;
    
    const newMessage = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: new Date().toLocaleString(),
      isOwn: true,
      status: "sent",
    };

    // Update conversations state with the new message
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: text,
              timestamp: new Date().toLocaleString(),
            }
          : conv
      )
    );

    // Simulate message being delivered after a short delay
    setTimeout(() => {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: conv.messages.map((msg) =>
                  msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
                ),
              }
            : conv
        )
      );
    }, 1000);

    // Simulate a reply for demo purposes
    setTimeout(() => {
      const replyText = "Thanks for your message. I'll get back to you shortly!";
      const replyMessage = {
        id: Date.now() + 1,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        timestamp: new Date().toLocaleString(),
        isOwn: false,
        status: "delivered",
      };
      
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, replyMessage],
                lastMessage: replyText,
                timestamp: new Date().toLocaleString(),
              }
            : conv
        )
      );
    }, 2000);
  };

  // Handler for creating a new conversation
  const handleNewConversation = () => {
    // Placeholder for new conversation functionality
    alert("New conversation feature would be implemented here");
  };

  // Toggle between conversation list and chat on mobile
  const toggleConversationList = () => {
    setShowConversationList(!showConversationList);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-[80vh]">
          {/* Sidebar: Conversation List */}
          {(!isMobileView || showConversationList) && (
            <div className="md:w-1/3 lg:w-1/4 border-r dark:border-gray-700 h-full flex flex-col">
              <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Messages</h1>
                <button 
                  onClick={handleNewConversation}
                  className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <PlusCircleIcon size={20} />
                </button>
              </div>
             

              {loading ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    <ConversationList
                      conversations={filteredConversations}
                      activeConversationId={activeConversationId}
                      onSelectConversation={handleSelectConversation}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-6">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-4 mb-3">
                        <SearchIcon size={24} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-center">No conversations found</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* User profile section */}
              <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">YS</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Your Name</h3>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Online</span>
                  </div>
                </div>
                <button className="relative p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <BellIcon size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          )}
          
          {/* Chat Window */}
          <div className={`${isMobileView ? 'w-full' : 'md:w-2/3 lg:w-3/4'} h-full flex flex-col`}>
            {loading ? (
              <div className="flex-grow flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : activeConversation && (!isMobileView || !showConversationList) ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center">
                  {isMobileView && (
                    <button 
                      onClick={toggleConversationList}
                      className="mr-3 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 relative">
                    <img 
                      src={activeConversation.avatar} 
                      alt={activeConversation.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/avatars/default.jpg";
                      }}
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      activeConversation.status === 'online' ? 'bg-green-500' : 
                      activeConversation.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-semibold text-gray-800 dark:text-white">{activeConversation.title}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activeConversation.status === 'online' ? 'Online' : 
                       activeConversation.status === 'away' ? 'Away' : 'Offline'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Enhanced ChatWindow with reference to scroll */}
                <ChatWindow
                  conversation={activeConversation}
                  onSendMessage={handleSendMessage}
                  messageEndRef={messageEndRef}
                />
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-xl text-gray-500 dark:text-gray-300 text-center mb-4">
                  Select a conversation to start chatting
                </p>
                <button 
                  onClick={handleNewConversation}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
                >
                  <PlusCircleIcon size={18} className="mr-2" />
                  New Conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;