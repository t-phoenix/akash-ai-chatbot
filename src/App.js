// App.js
import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
// import Chatbot from "./Chatbot";
import { FaPencil } from "react-icons/fa6";
import "./App.css";
import "./styles/header.css";
import ModelSelector from "./components/ModelSelector";
import LandingPage from "./pages/LandingPage";
import ChatBoxPage from "./pages/ChatBoxPage";
import robot2 from "../src/illustrations/robot2.png";
import { motion } from "framer-motion";

function App() {
  const sidebarRef = useRef();

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar

  const [savedChats, setSavedChats] = useState([]);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello! Ask me anything." },
  ]);

  const [selectedModel, setSelectedModel] = useState(
    "Meta-Llama-3-1-8B-Instruct-FP8"
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close the sidebar
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on unmount or when sidebar closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    // Load saved chats from localStorage on component mount
    const storedChats = JSON.parse(localStorage.getItem("savedChats")) || [];
    setSavedChats(storedChats);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Start New Chat
  const startNewChat = () => {
    navigate("/chatbox");
    setMessages([{ role: "system", content: "Hello! Ask me anything." }]);
  };

  // Load a saved chat session
  const loadChat = (chat) => {
    setChatName(chat.name);
    setMessages(chat.messages);
  };

  // Delete a saved chat
  const deleteChat = (name) => {
    const updatedChats = savedChats.filter((chat) => chat.name !== name);
    localStorage.setItem("savedChats", JSON.stringify(updatedChats));
    setSavedChats(updatedChats);
  };

  return (
    <div className="App">
      <div className="header">
        {/* Title - Header */}
        <div className="header-bar">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="hamburger"
            onClick={toggleSidebar}
          >
            &#9776; {/* Hamburger Icon (Unicode character) */}
          </motion.div>
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={robot2} alt="Bot" width={30} height={30} /> AKASH AI
          </h2>

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="pencil"
            onClick={startNewChat}
          >
            <FaPencil />
          </motion.div>
        </div>
        {/* Sidebar Menu */}
        {isSidebarOpen ? (
          <div ref={sidebarRef} className={`sidebar open`}>
            
            <div style={{width:'100%'}}>
              {/* NAVIGATION */}
              <div style={{ marginBlock: "8%" }}>
                <h3>Navigation</h3>
                <div className="nav-link-box">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/chatbox">
                    ChatBot
                  </Link>
                </div>
              </div>
              {/* CHATS */}
              <div style={{ marginBlock: "16%", width: '100%' }}>
                <h3>Saved Chats</h3>
                <br />
                <ul>
                  {savedChats.map((chat, index) => (
                    <li key={index} className="">
                      <span>{chat.name}</span>
                      <div>
                        <motion.button whileHover={{scale: 1.1}} whileTap={{scale:0.9}} onClick={() => loadChat(chat)}>Load</motion.button>
                        <motion.button whileHover={{scale: 1.1}} whileTap={{scale:0.9}} onClick={() => deleteChat(chat.name)}>
                          Delete
                        </motion.button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* NAV AND CHAT ENDS */}
            </div>

            {/* SIDEBAR FOOTER */}
            <div className="close-button-box">
              <ModelSelector
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
              <div className="close-sidebar-button" onClick={toggleSidebar}>
                Close
              </div>
            </div>
            {/* SIDEBAR FOOTER ENDS*/}
          </div>
        ) : (
          <></>
        )}
        {/* SideBar Menu Ends */}
      </div>

      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/chatbox"
            element={
              <ChatBoxPage
                selectedModel={selectedModel}
                chatName={chatName}
                setChatName={setChatName}
                savedChats={savedChats}
                setSavedChats={setSavedChats}
                messages={messages}
                setMessages={setMessages}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
