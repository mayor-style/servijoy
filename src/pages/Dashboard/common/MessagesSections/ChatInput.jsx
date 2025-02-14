import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200"
      />
      <button
        onClick={handleSend}
        className="ml-4 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg shadow transition duration-200"
      >
        <FaPaperPlane className="text-xl" />
      </button>
    </div>
  );
};

export default ChatInput;
