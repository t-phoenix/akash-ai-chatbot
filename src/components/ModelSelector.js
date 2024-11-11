import React from 'react';

export default function ModelSelector({selectedModel, setSelectedModel}){
    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center',}}>
            <label htmlFor="model-select">AI Model: </label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="model-selection"

            >
              <option
                className="model-selection-option"
                value="Meta-Llama-3-1-8B-Instruct-FP8"
              >
                Meta-Llama-3-1-8B-Instruct-FP8
              </option>
              <option
                className="model-selection-option"
                value="Meta-Llama-3-1-405B-Instruct-FP8"
              >
                Meta-Llama-3-1-405B-Instruct-FP8
              </option>
              <option
                className="model-selection-option"
                value="Meta-Llama-3-2-3B-Instruct"
              >
                Meta-Llama-3-2-3B-Instruct
              </option>
              <option
                className="model-selection-option"
                value="nvidia-Llama-3-1-Nemotron-70B-Instruct-HF"
              >
                nvidia-Llama-3-1-Nemotron-70B-Instruct-HF
              </option>
            </select>
        </div>
    )
}