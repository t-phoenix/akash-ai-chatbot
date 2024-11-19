import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/about.css";
import CardComponent from "../components/CardComponent";
import {
  MdAlternateEmail,
  MdFingerprint,
  MdKey,
  MdRemoveRedEye,
} from "react-icons/md";

const AboutPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (cardNumber) => {
    setExpandedCard(cardNumber);
  };

  return (
    <div className="main-page">
      <h1>About Akash AI Chatbot</h1>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="card"
        onClick={() => toggleExpand(1)}
      >
        <div className="card-content">
          <h1>Our Vision</h1>
          <MdRemoveRedEye size={48} />
        </div>
        {expandedCard === 1 && (
          <div className="more-info">
            <p>
              Akash AI aims to make Decentralised Opensource AI-driven
              conversations accessible and enjoyable for everyone. By
              integrating intelligent features and an intuitive design, we want
              to bridge the gap between technology and human interaction.
            </p>
          </div>
        )}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="card-upper"
        onClick={() => toggleExpand(2)}
      >
        <div className="card-content">
          <h1>Key Features</h1>
          <MdFingerprint size={48} />
        </div>
        {expandedCard === 2 && (
          <div className="more-info">
            <ul>
               <li>Seamless Chat Experience</li>
               <li>Personalized AI Assistance</li>
               <li>Responsive Mobile-First Design</li>
               <li>Easy Navigation and Chat History Management</li>
             </ul>
          </div>
        )}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="card-upper"
        onClick={() => toggleExpand(3)}
        style={{
          backgroundColor: "#b6f526",
          boxShadow: "1px 1px 8px 4px #b6f526",
        }}
      >
        <div className="card-content">
          <h1>ContactUs</h1>
          <MdAlternateEmail size={48} />
        </div>
        {expandedCard === 3 && (
          <div className="more-info">
            <p>Have questions or feedback? Reach out to us at:</p>
            <p><strong>Email:</strong> support@akash.network</p>
          </div>
        )}
      </motion.div>
    </div>
    // <div className="about-page">
    //   <h2>About Akash AI</h2>
    //   <p>Welcome to Akash AI! This application is designed to provide users with an interactive and engaging chatbot experience.</p>

    //   <section>
    //     <h3>Our Vision</h3>
    //     <p>
    //       Akash AI aims to make Decentralised Opensource AI-driven conversations accessible and enjoyable for everyone.
    //       By integrating intelligent features and an intuitive design, we want to bridge the gap between
    //       technology and human interaction.
    //     </p>
    //   </section>

    //   <section>
    //     <h3>Key Features</h3>
    //     <ul>
    //       <li>Seamless Chat Experience</li>
    //       <li>Personalized AI Assistance</li>
    //       <li>Responsive Mobile-First Design</li>
    //       <li>Easy Navigation and Chat History Management</li>
    //     </ul>
    //   </section>

    //   <section>
    //     <h3>Contact Us</h3>
    //     <p>Have questions or feedback? Reach out to us at:</p>
    //     <p><strong>Email:</strong> support@akashai.com</p>
    //   </section>
    // </div>
  );
};

export default AboutPage;
