// MessagesSections/ConversationList.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations, activeConversationId, onSelectConversation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Memoize filtered conversations for performance
  const filteredConversations = useMemo(() => {
    return conversations
      .filter((conv) => 
        conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        // Sort by unread messages first, then by timestamp
        if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
        if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
        
        // Then sort by recency
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
  }, [conversations, searchTerm]);

  // Clear search when conversation changes
  useEffect(() => {
    if (activeConversationId && searchTerm) {
      setSearchTerm("");
    }
  }, [activeConversationId]);

  // Check if search has results
  const hasSearchResults = filteredConversations.length > 0;
  const hasConversations = conversations.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <div className={`relative rounded-lg transition-all ${
          isSearchFocused ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''
        }`}>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white text-sm transition-all"
            aria-label="Search conversations"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 pt-0">
        {!hasConversations ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-center">No conversations yet.</p>
            <p className="text-center text-sm mt-1">Start a new conversation to get going!</p>
          </div>
        ) : !hasSearchResults && searchTerm ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-center">No conversations found for "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div layout className="space-y-1">
              {filteredConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isActive={conv.id === activeConversationId}
                  onSelect={onSelectConversation}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
      {/* Quick action button */}
      <div className="p-4 border-t dark:border-gray-700">
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg shadow-md flex items-center justify-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Conversation
        </button>
      </div>
    </div>
  );
};

export default ConversationList;