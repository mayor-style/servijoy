import React, { useState, useRef } from "react";
import { FaTimes, FaPaperclip, FaPaperPlane } from "react-icons/fa";

const DisputeDetailsModal = ({ dispute, isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Early return if modal is not open or no dispute data
  if (!isOpen || !dispute) return null;
  
  const handleSendMessage = () => {
    if (message.trim()) {
      dispute.messages.push({ sender: "User", message, timestamp: new Date().toLocaleString() });
      setMessage("");
      
      // Scroll to bottom of messages after sending
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dispute-modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col h-[90vh] overflow-hidden transition-transform transform">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h2 
            id="dispute-modal-title"
            className="text-2xl font-bold dark:text-white font-header line-clamp-1"
          >
            {dispute.subject}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Dispute Info */}
          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">{dispute.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4">
              <div className="flex items-center">
                <span className="font-medium text-gray-500 dark:text-gray-400 w-24">Reference:</span>
                <span className="dark:text-gray-300">{dispute.reference}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-500 dark:text-gray-400 w-24">Date:</span>
                <span className="dark:text-gray-300">{dispute.date}</span>
              </div>
              <div className="flex items-center sm:col-span-2">
                <span className="font-medium text-gray-500 dark:text-gray-400 w-24">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  dispute.status === "open" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                  dispute.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}>
                  {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold dark:text-white mb-3">
              Messages
            </h3>
            {dispute.messages?.length > 0 ? (
              <div className="space-y-3">
                {dispute.messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg max-w-[85%] ${
                      msg.sender === "User" 
                        ? "ml-auto bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {msg.sender} {msg.timestamp && `• ${msg.timestamp}`}
                    </div>
                    <p>{msg.message}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No messages yet. Start the conversation.
              </div>
            )}
          </div>
        </div>
        
        {/* Files Preview */}
        {files.length > 0 && (
          <div className="px-5 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Attachments ({files.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button 
                    onClick={() => removeFile(index)} 
                    className="ml-2 text-gray-500 hover:text-red-500 dark:text-gray-400"
                    aria-label={`Remove ${file.name}`}
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-5 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none min-h-[100px]"
                rows={3}
              />
              <button
                onClick={triggerFileInput}
                className="absolute right-3 bottom-3 text-gray-500 hover:text-blue-500 dark:text-gray-400"
                aria-label="Attach files"
              >
                <FaPaperclip size={18} />
              </button>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
                aria-label="Upload files"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                message.trim() 
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
              aria-label="Send message"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetailsModal;