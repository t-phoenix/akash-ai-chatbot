// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
// import Chatbot from "./Chatbot";
import { FaPencil } from "react-icons/fa6";
import "./App.css";
import "./styles/header.css";
import ModelSelector from "./components/ModelSelector";
import LandingPage from "./pages/LandingPage";
import ChatBoxPage from "./pages/ChatBoxPage";


function App() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [savedChats, setSavedChats] = useState([]);

  const [selectedModel, setSelectedModel] = useState(
    "Meta-Llama-3-1-8B-Instruct-FP8"
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Start New Chat
  const startNewChat = () => {
    // setMessages([{ role: "system", content: "Hello! Ask me anything." }]);
    navigate('/chatbox')
  };

  // Load a saved chat session
  const loadChat = (chat) => {
    // setChatName(chat.name);
    // setMessages(chat.messages);
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
          <div className="hamburger" onClick={toggleSidebar}>
            &#9776; {/* Hamburger Icon (Unicode character) */}
          </div>
          <h2 style={{}}>
            🤖 - AKASH AI
          </h2>
          
          <div className="pencil" onClick={startNewChat}>
            <FaPencil/>
          </div>
        </div>
        {/* Sidebar Menu */}
        {isSidebarOpen ? 
        <div className={`sidebar open`}>
          <div>
          <div style={{marginBlock: '8%'}}>
            <h3>Navigation</h3>
            <div className="nav-link-box">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/chatbox">ChatBot</Link>
            </div>
          </div>
          <div style={{marginBlock: '16%'}}>
            <h3>Saved Chats</h3>
            <br />
            <ul>
              {savedChats.map((chat, index) => (
                <li key={index}>
                  <span>{chat.name}</span>
                  <div>
                    <button onClick={() => loadChat(chat)}>Load</button>
                    <button onClick={() => deleteChat(chat.name)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          </div>
          
          <div className="close-button-box">
            <ModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
            <div className="close-sidebar-button" onClick={toggleSidebar}>
              Close
            </div>
          </div>
        </div>: <></>}
      </div>
      
       <div>       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatbox" element={<ChatBoxPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
