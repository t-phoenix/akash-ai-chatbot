import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatMessage from "../components/ChatMessage";
import "../styles/message.css";
import "../styles/loader.css";
import { useLocation } from "react-router-dom";
import { API_KEY, BASE_URL } from "../helper/api";

export default function ChatBoxPage({
  selectedModel,
  chatName,
  setChatName,
  savedChats,
  setSavedChats,
  messages,
  setMessages,
}) {
  const location = useLocation();
  const data = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const botMessageStartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const [input, setInput] = useState(data);

  // URL AND API KEY
  // const API_KEY = "sk-TADQ3qUJSc_ZgGywE4x2Tg"; // Replace with your API key
  // const BASE_URL = "https://chatapi.akash.network/api/v1";

  //   if (data) {
  //     setInput(data);
  //   }
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Clear the input after closing
  };

  const saveChat = () => {
    if (!chatName) {
      alert("Please provide a name for the chat.");
      return;
    }
    const newChat = { name: chatName, messages };

    const existingChatIndex = savedChats.findIndex(
      (chat) => chat.name === chatName
    );

    let updatedChats;
    if (existingChatIndex !== -1) {
      // Update the existing chat by replacing it
      updatedChats = [...savedChats];
      updatedChats[existingChatIndex] = newChat;
    } else {
      // Add the new chat if it doesn't exist
      updatedChats = [...savedChats, newChat];
    }

    localStorage.setItem("savedChats", JSON.stringify(updatedChats));
    setSavedChats(updatedChats);
    setChatName("");
    closeModal();
  };

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim()) return;
    setInput(""); // Clear input
    setLoading(true);
    // Add user message to chat
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    // Prepare API call payload
    const payload = {
      model: selectedModel,
      messages: [...messages, userMessage],
    };

    try {
      // Send request to Akash Chat API
      const response = await axios.post(
        `${BASE_URL}/chat/completions`,
        payload,
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );

      const botReply = response.data.choices[0].message.content;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: botReply },
      ]);
    } catch (error) {
      console.error("Error with API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Error: Could not reach the server." },
      ]);
    }
    setLoading(false);
  };

  const scrollToLoader = () => {
    loaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBotMessageStart = () => {
    botMessageStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the bot's latest message when loading completes
    if (loading) scrollToLoader();
    if (!loading) scrollToBotMessageStart();
  }, [messages, loading]);

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={
              msg.role === "bot" && index === messages.length - 1
                ? botMessageStartRef
                : null
            } // Set ref only on latest bot message
          >
            <ChatMessage role={msg.role} content={msg.content} />
          </div>
        ))}
        {loading ? (
          <div ref={loaderRef} className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* Floating Save Button */}

      {isModalOpen ? (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h3>Save Chat</h3>
            <input
              type="text"
              placeholder="Enter chat name"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              style={{
                width: "90%",
                padding: "8px",
                marginTop: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#333",
                color: "#fff",
              }}
            />
            <button onClick={saveChat} style={{ padding: "8px 16px" }}>
              Save
            </button>
            <button onClick={closeModal} style={{ padding: "8px 16px" }}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* <div className="chat-actions">
        <input
          type="text"
          placeholder="Enter chat name"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <button onClick={saveChat}>Save Chat</button>
      </div> */}

      <div className="input-bar">
        <button className="floating-save-button" onClick={openModal}>
          💾
        </button>
        <textarea
          rows={3}
          width="100%"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
