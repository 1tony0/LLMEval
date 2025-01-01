import React, { useState } from "react";
import axios from "axios";

const PromptComparison = () => {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState(null);

  const handleEvaluate = async () => {
    try {
      const response = await axios.post("http://localhost:8000/evaluate", {
        prompt,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error evaluating prompt", error);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
      />
      <button onClick={handleEvaluate}>Evaluate</button>

      {results && (
        <div>
          <h3>LLM Response</h3>
          <p>{results.response}</p>
          <p>Response Time: {results.response_time}s</p>
        </div>
      )}
    </div>
  );
};

export default PromptComparison;
