// File: components/messages/ConversationList.jsx
import React from "react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations, activeConversationId, onSelectConversation }) => {
  return (
    <div className="overflow-y-auto h-full p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      {conversations.length === 0 ? (
        <p className="p-4 text-center text-gray-500 dark:text-gray-300">No conversations found.</p>
      ) : (
        conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            isActive={conv.id === activeConversationId}
            onSelect={onSelectConversation}
          />
        ))
      )}
    </div>
  );
};

export default ConversationList;
