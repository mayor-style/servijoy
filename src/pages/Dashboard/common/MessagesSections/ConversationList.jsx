import React from "react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations, activeConversationId, onSelectConversation }) => {
  return (
    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300  h-full p-4 space-y-4">
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
