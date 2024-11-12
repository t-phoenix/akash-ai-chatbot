import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ModelSelector from "./ModelSelector";
import "../styles/sidebar.css";
import {
  MdClose,
  MdDownload,
  MdDelete,
  MdHouse,
  MdChat,
  MdRecentActors,
} from "react-icons/md";
import robot2 from "../illustrations/robot2.png";

export default function Sidebar({
  sidebarRef,
  savedChats,
  selectedModel,
  setSelectedModel,
  toggleSidebar,
  loadChat,
  deleteChat,
}) {
  return (
    <div ref={sidebarRef} className={`sidebar open`}>
      <div style={{ width: "100%" }}>
        {/* TITLE */}
        <div className="sidebar-title">
          <h2>Main Menu</h2>
          <MdClose size={36} onClick={toggleSidebar} />
        </div>
        {/* NAVIGATION */}
        <div style={{ marginBlock: "8%" }}>
          <h3>Navigation</h3>
          <div className="nav-link-box">
            <Link className="nav-link" style={{ color: "#b2ff59" }} to="/">
              <MdHouse size={28} style={{ marginRight: "6px" }} />
              Home
            </Link>
            <Link
              className="nav-link"
              style={{ color: "#d4aaff" }}
              to="/chatbox"
            >
              <MdChat size={28} style={{ marginRight: "6px" }} />
              ChatBot
            </Link>
            <Link className="nav-link" style={{ color: "#1ecbe1" }} to="/about">
              <MdRecentActors size={28} style={{ marginRight: "6px" }} />
              About
            </Link>
          </div>
        </div>

        <ModelSelector
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        {/* CHATS */}
        <div style={{ marginBlock: "12%", width: "100%" }}>
          <h3>Saved Chats</h3>
          <br />
          <ul>
            {savedChats.map((chat, index) => (
              <li key={index} className="">
                <span>{chat.name}</span>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => loadChat(chat)}
                  >
                    <MdDownload size={24} style={{ color: "#f1f751" }} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteChat(chat.name)}
                  >
                    <MdDelete size={24} style={{ color: "#e27b62" }} />
                  </motion.button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* NAV AND CHAT ENDS */}
      </div>

      {/* SIDEBAR FOOTER */}

      <div className="footer-box">
        <div className="brand-box">
        <img src={robot2} alt="Bot" width={30} height={30} style={{marginRight: '4px'}}/>
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              fontSize: '16px',
              
            }}
          >
             AKASH AI
            CHATBOT
          </h2>
        </div>
        <div className="free-box">
          <p style={{margin: '0'}}>Free</p>
        </div>
      </div>

      {/* SIDEBAR FOOTER ENDS*/}
    </div>
  );
}
