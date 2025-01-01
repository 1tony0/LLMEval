import React from "react";
import PromptComparison from "./components/PromptComparison";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <h1>LLM Evaluator</h1>
      <PromptComparison />
      <Dashboard />
    </div>
  );
}

export default App;
