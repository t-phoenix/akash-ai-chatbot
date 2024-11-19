import React from "react";
import "../styles/landing.css";
import { MdCopyright, MdMessage } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import { MdWallpaper } from "react-icons/md";
import { MdVideocam } from "react-icons/md";
import { motion } from "framer-motion";

import art1 from "../illustrations/art1.png";
import art2 from "../illustrations/art2.png";
import art3 from "../illustrations/art3.jpeg";
import art4 from "../illustrations/art4.jpeg";
import art5 from "../illustrations/art5.jpeg";
import art6 from "../illustrations/art6.jpeg";
import { useNavigate } from "react-router-dom";
const cardData = [
  {
    id: 1,
    color: "#f1f751",
    icon: "👨‍💻",
    text: "What is the best business to start in...",
    link: "/business",
  },
  {
    id: 2,
    color: "#e27b62",
    icon: "💌",
    text: "I need some wedding card inspiration...",
    link: "/wedding",
  },
  {
    id: 3,
    color: "#d4aaff",
    icon: "🎥",
    text: "Create me a short presentation on Li...",
    link: "/presentation",
  },
];

export default function LandingPage() {
    const navigate = useNavigate();
    // Start New Chat
  const startNewChat = () => {
    // setMessages([{ role: "system", content: "Hello! Ask me anything." }]);
    navigate('/chatbox')
  };

  const newPromptChat = (card) => {
    console.log("NEW PROMT CHAT: ", card)
    navigate('/chatbox', {state: card.text})
  }

  return (
    <div className="landing-page">
      <div className="landing-title">
        <h1>How may I help you today?</h1>
      </div>

      <div className="landing-cards-box">
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card1"
            onClick={startNewChat}
        >
          <div className="card-icons">
            <MdMessage style={{ fontSize: "30px" }} />
            <MdArrowOutward style={{ fontSize: "30px" }} />
          </div>

          <h1 style={{ width: "90%", paddingInline: "4%", fontSize: '40px' }}>Chat with AI</h1>
        </motion.div>

        <div className="card2-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="card2 color-bg1">
            <div className="card-icons">
              <MdWallpaper style={{ fontSize: "30px" }} />
              <MdArrowOutward style={{ fontSize: "30px" }} />
            </div>
            <div className="coming-soon-box">
              <h3 style={{ marginBottom: "0px" }}>Create AI Image</h3>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "10px",
                  alignSelf: "end",
                }}
              >
                Coming Soon
              </p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="card2 color-bg2">
            <div className="card-icons">
              <MdVideocam style={{ fontSize: "30px" }} />
              <MdArrowOutward style={{ fontSize: "30px" }} />
            </div>
            <div className="coming-soon-box">
              <h3 style={{ marginBottom: "0px" }}>Create AI Video</h3>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "10px",
                  alignSelf: "end",
                }}
              >
                Coming Soon
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="prompt-box">
        <div
          style={{
            width: "94%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "10px",
            paddingInline: "10px",
            marginLeft: '10px'
          }}
        >
          <h2>Quick Prompts</h2>
          <motion.p onClick={()=>navigate("/prompts")} whileHover={{scale: 1.2, color: '#b2ff59'}}>See All</motion.p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="prompt-card"
              onClick={()=>newPromptChat(card)}
            >
              <div
                className="icon-container"
                style={{ backgroundColor: card.color }}
              >
                <span>{card.icon}</span>
              </div>

              <span>{card.text}</span>
              <MdArrowOutward style={{ fontSize: "24px" }} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="art-container">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Explore AI Art</h2>
          <p>Coming Soon</p>
        </div>

        <div className="art-box">
          <motion.div
            whileHover={{ scale: 0.95 }}
            className="gallery-item item-1"
          >
            <img src={art1} alt={`Art-1`} />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.95 }}
            className="gallery-item item-2"
          >
            <img src={art2} alt={`Art-1`} />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.95 }}
            className="gallery-item item-3"
          >
            <img src={art3} alt={`Art-1`} />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.95 }}
            className="gallery-item item-4"
          >
            <img src={art4} alt={`Art-1`} height={100} width={100} />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.95 }}
            className="gallery-item item-5"
          >
            <img src={art5} alt={`Art-1`} />
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.95 }}
            className="gallery-item item-6"
          >
            <img src={art6} alt={`Art-1`} />
          </motion.div>
        </div>
      </div>

      <div className="landing-footer">
          <p style={{margin: '2px', display:'flex', flexDirection: 'row', alignItems:'center'}}>Copyright<MdCopyright size={16} style={{marginRight:'6px'}}/> 2024 Akash AI Chatbot</p>
      </div>
    </div>
  );
}
