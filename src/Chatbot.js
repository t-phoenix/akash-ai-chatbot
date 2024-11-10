// Chatbot.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatMessage from "./components/ChatMessage";
import "./loader.css";
import "./styles/sidebar.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    "Meta-Llama-3-1-8B-Instruct-FP8"
  );
  const [savedChats, setSavedChats] = useState([]);
  const [chatName, setChatName] = useState("");
  // References for loader and the latest bot message
  const loaderRef = useRef(null);
  const botMessageStartRef = useRef(null);

  // URL AND API KEY
  const API_KEY = "sk-TADQ3qUJSc_ZgGywE4x2Tg"; // Replace with your API key
  const BASE_URL = "https://chatapi.akash.network/api/v1";

  useEffect(() => {
    // Load saved chats from localStorage on component mount
    const storedChats = JSON.parse(localStorage.getItem("savedChats")) || [];
    setSavedChats(storedChats);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToLoader = () => {
    loaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Reference for the end of the messages list
  const scrollToBotMessageStart = () => {
    botMessageStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the bot's latest message when loading completes
    if (loading) scrollToLoader();
    if (!loading) scrollToBotMessageStart();
  }, [messages, loading]);

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

  //   // SAVE the Chat
  //   const saveChat = () => {
  //     localStorage.setItem("savedChat", JSON.stringify(messages));
  //     alert("Chat history saved!");
  //   };

  // Save current chat to localStorage
  const saveChat = () => {
    if (!chatName) {
      alert("Please provide a name for the chat.");
      return;
    }
    const newChat = { name: chatName, messages };
    const updatedChats = [...savedChats, newChat];
    localStorage.setItem("savedChats", JSON.stringify(updatedChats));
    setSavedChats(updatedChats);
    setChatName("");
  };

  //   // Load a saved chat session
    const loadChat = (chat) => {
      setMessages(chat.messages);
    };

  // Delete a saved chat
  const deleteChat = (name) => {
    const updatedChats = savedChats.filter((chat) => chat.name !== name);
    localStorage.setItem("savedChats", JSON.stringify(updatedChats));
    setSavedChats(updatedChats);
  };

  // LOAD the Chat
//   const loadChat = () => {
//     const savedChat = JSON.parse(localStorage.getItem("savedChat"));
//     if (savedChat) {
//       setMessages(savedChat);
//     } else {
//       alert("No chat history found.");
//     }
//   };

  // Start New Chat
  const startNewChat = () => {
    setMessages([{ role: "system", content: "Hello! Ask me anything." }]);
  };

  return (
    <div className="chatbot">
      <div className="model-selector">
        <div className="hamburger" onClick={toggleSidebar}>
          &#9776; {/* Hamburger Icon (Unicode character) */}
        </div>
        <label htmlFor="model-select">Choose Model: </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="model-selection"
        >
          <option
            className="model-selection"
            value="Meta-Llama-3-1-8B-Instruct-FP8"
          >
            Meta-Llama-3-1-8B-Instruct-FP8
          </option>
          <option
            className="model-selection"
            value="Meta-Llama-3-1-405B-Instruct-FP8"
          >
            Meta-Llama-3-1-405B-Instruct-FP8
          </option>
          <option
            className="model-selection"
            value="Meta-Llama-3-2-3B-Instruct"
          >
            Meta-Llama-3-2-3B-Instruct
          </option>
          <option
            className="model-selection"
            value="nvidia-Llama-3-1-Nemotron-70B-Instruct-HF"
          >
            nvidia-Llama-3-1-Nemotron-70B-Instruct-HF
          </option>
        </select>
        <button onClick={startNewChat}>Start New Chat</button>
      </div>
      {/* Sidebar Menu */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div>
        <h3>Saved Chats</h3>
        <br/>
        <ul>
          {savedChats.map((chat, index) => (
            <li key={index}>
              <span>{chat.name}</span>
              <div>
              <button onClick={() => loadChat(chat)}>Load</button>
              <button onClick={() => deleteChat(chat.name)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        </div>
        <div className="close-button-box">
            <button className="close-sidebar" onClick={toggleSidebar}>Close</button>
        </div>
      </div>
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

      <div className="chat-actions">
        <input
          type="text"
          placeholder="Enter chat name"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <button onClick={saveChat}>Save Chat</button>
      </div>

      <div className="input-bar">
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
};

export default Chatbot;
