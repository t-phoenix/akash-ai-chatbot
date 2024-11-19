import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/prompts.css";
import { MdArrowOutward } from "react-icons/md";
import {
  ContentData,
  CreativeData,
  GeneralData,
  LearnData,
  TechData,
  TriviaData,
} from "../helper/promptData";
import { useNavigate } from "react-router-dom";
import { API_KEY, BASE_URL } from "../helper/api";
import axios from "axios";

export default function PromptsPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello! Ask me anything." },
  ]);
  const [subNav, setSubNav] = useState("General");
  const [selectedData, setSelectedData] = useState(GeneralData);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const data = [
    { index: 0, title: "General", cardData: GeneralData },
    { index: 1, title: "Tech", cardData: TechData },
    { index: 2, title: "Content", cardData: ContentData },
    { index: 3, title: "Creative", cardData: CreativeData },
    { index: 4, title: "Learn", cardData: LearnData },
    { index: 5, title: "Trivia", cardData: TriviaData },
  ];

  function handleSubNav(option) {
    setSubNav(option.title);
    setSelectedData(option.cardData);
  }

  const newPromptChat = (card) => {
    console.log("NEW PROMT CHAT: ", card);
    navigate("/chatbox", { state: card.text });
  };

  async function handleGeneratePrompt() {
    setIsLoading(true);
    const userMessage = {
      role: "user",
      content:
        "Generate only 1 new random prompt to ask an AI chatbot with reply not more than 8 words.",
    };
    setMessages([...messages, userMessage]);
    const payload = {
      model: "Meta-Llama-3-1-8B-Instruct-FP8",
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
      setGeneratedPrompt(botReply);
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
    setIsLoading(false);
  }
  return (
    <div className="prompt-page">
      <h1>Prompts Page</h1>
      <div className="navbar-container">
        <div class="scrollmenu">
          {data.map((option) => (
            <>
              {subNav === option.title ? (
                <button className="selected-button">{option.title}</button>
              ) : (
                <button
                  className="option-button"
                  onClick={() => handleSubNav(option)}
                >
                  {option.title}
                </button>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="content-box">
        {selectedData.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="prompt-card"
            onClick={() => newPromptChat(card)}
          >
            <div className="prompt-card-header">
              <div
                className="icon-container"
                style={{ backgroundColor: card.color }}
              >
                <span>{card.icon}</span>
              </div>
              <span
                style={{ textAlign: "start", marginLeft: "4%", width: "90%" }}
              >
                {card.text}
              </span>
            </div>

            <MdArrowOutward style={{ fontSize: "24px" }} />
          </motion.div>
        ))}
      </div>

      <div className="generate-box">
        <h1>Generate Random Prompt</h1>
        <div className="generate-button-box">
          <button className="generate-button" onClick={handleGeneratePrompt}>
            Generate Prompt
          </button>
        </div>
        {generatedPrompt !== "" ? (
          <>
            {isLoading ? (
              <div class="loader"></div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="prompt-card"
                onClick={() => newPromptChat({ text: generatedPrompt })}
              >
                <div className="prompt-card-header">
                  <div
                    className="icon-container"
                    style={{ backgroundColor: "#b2ff59" }}
                  >
                    <span>{"🧬"}</span>
                  </div>
                  <span
                    style={{
                      textAlign: "start",
                      marginLeft: "4%",
                      width: "90%",
                    }}
                  >
                    {generatedPrompt}
                  </span>
                </div>

                <MdArrowOutward style={{ fontSize: "24px" }} />
              </motion.div>
            )}
          </>
        ) : (
          <>{isLoading ? <div class="loader"></div> : <></>}</>
        )}
      </div>
    </div>
  );
}
