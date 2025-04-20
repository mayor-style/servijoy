// src/api/messageApi.js
export const fetchConversations = async () => {
    const response = await fetch("http://your-backend-url/conversations", {
      headers: { Authorization: "Bearer your-token" },
    });
    return response.json();
  };
  
  export const sendMessage = async (conversationId, text) => {
    const response = await fetch("http://your-backend-url/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token",
      },
      body: JSON.stringify({ conversationId, text }),
    });
    return response.json();
  };