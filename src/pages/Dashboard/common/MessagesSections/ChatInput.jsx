// MessagesSections/ChatInput.jsx
import React, { useState, useRef } from "react";
import { FaPaperPlane, FaSmile, FaPaperclip, FaTimes } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import DOMPurify from "dompurify";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message.trim() !== "" || attachments.length > 0) {
      const sanitizedMessage = DOMPurify.sanitize(message);
      onSend(sanitizedMessage, attachments);
      setMessage("");
      setAttachments([]);
      setShowEmojiPicker(false);
      setIsTyping(false);
      
      // Focus back on input after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setIsTyping(true);
    
    // Focus back on input after emoji selection
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      const newAttachments = Array.from(e.target.files).map(file => ({
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        file
      }));
      
      setAttachments(prev => [...prev, ...newAttachments]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map(attachment => (
            <div key={attachment.id} className="relative group">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center">
                <span className="text-xs truncate max-w-xs mr-2 text-gray-700 dark:text-gray-300">
                  {attachment.name}
                </span>
                <button 
                  onClick={() => removeAttachment(attachment.id)}
                  className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          aria-label="Emoji"
        >
          <FaSmile className="text-xl" />
        </button>
        
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 z-10 shadow-lg rounded-lg">
            <div className="relative">
              <button 
                onClick={() => setShowEmojiPicker(false)}
                className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <FaTimes size={14} />
              </button>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          </div>
        )}
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTyping}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow p-3 max-h-32 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none transition-all"
          rows={1}
          style={{ 
            height: isTyping ? 'auto' : '45px',
            minHeight: '45px'
          }}
        />
        
        <div className="flex items-center">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="ml-2 p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Attach files"
          >
            <FaPaperclip className="text-xl" />
          </button>
          
          <button
            onClick={handleSend}
            disabled={message.trim() === "" && attachments.length === 0}
            className={`ml-2 p-3 rounded-lg transition-all ${
              message.trim() === "" && attachments.length === 0
                ? "bg-blue-300 dark:bg-blue-800 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md"
            } text-white`}
            aria-label="Send message"
          >
            <FaPaperPlane className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;