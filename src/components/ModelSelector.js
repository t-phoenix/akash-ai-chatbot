import React from "react";
import { motion } from "framer-motion";
import "../styles/sidebar.css";

export default function ModelSelector({ selectedModel, setSelectedModel }) {
  const aimodels = [
    {
      index: 0,
      name: "Meta-Llama-8B",
      value: "Meta-Llama-3-1-8B-Instruct-FP8",
    },
    {
      index: 1,
      name: "Meta-Llama-405B",
      value: "Meta-Llama-3-1-405B-Instruct-FP8",
    },
    { index: 2, name: "Meta-Llama-3B", value: "Meta-Llama-3-2-3B-Instruct" },
    {
      index: 3,
      name: "nvidia-Llama-Nemotron-70B",
      value: "nvidia-Llama-3-1-Nemotron-70B-Instruct-HF",
    },
  ];
  console.log("Selected Model:", selectedModel);

  return (
    <div className="model-selector-box">
      <h3> AI Model </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "4px",
        }}
      >
        {aimodels.map((model, index) => (
          <>
            {model.value === selectedModel ? (
              <div
                key={index}
                className="model-selection-selected"
                onClick={() => setSelectedModel(model.value)}
              >
                <p style={{color: '#000'}}>{model.name}</p>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={index}
                className="model-selection"
                onClick={() => setSelectedModel(model.value)}
              >
                <p>{model.name}</p>
              </motion.div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
