// App.js
import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
// import Chatbot from "./Chatbot";
import { FaPencil } from "react-icons/fa6";
import "./App.css";
import "./styles/header.css";
// import ModelSelector from "./components/ModelSelector";
import LandingPage from "./pages/LandingPage";
import ChatBoxPage from "./pages/ChatBoxPage";
import AboutPage from "./pages/AboutPage";
import robot2 from "../src/illustrations/robot2.png";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import PromptsPage from "./pages/PromptsPage";
import { useMediaQuery } from "react-responsive";

function App() {
  // const isMobile = useMediaQuery({maxWidth: "600px"});
  const isTab = useMediaQuery({maxWidth: "992px"});

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
      if (isTab && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
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
    navigate('/chatbox')
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
            <img src={robot2} alt="Bot" width={30} height={30} style={{marginRight: '4px'}}/> AKASH AI
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
          <Sidebar sidebarRef={sidebarRef} savedChats={savedChats} selectedModel={selectedModel} setSelectedModel={setSelectedModel} toggleSidebar={toggleSidebar} loadChat={loadChat} deleteChat={deleteChat}/>
        ) : (
          <></>
        )}
        {/* SideBar Menu Ends */}
      </div>

      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
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
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/prompts" element={<PromptsPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
