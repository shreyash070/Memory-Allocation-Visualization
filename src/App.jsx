import React, { useState } from "react";
import Memory from "./components/Memory";
import "./App.css";
import Algorithms from "./components/Algorithms";
import Explanation from "./components/Explanation";

function App() {
  const [showExplanation, setShowExplanation] = useState(true);
  const [showMemory, setShowMemory] = useState(false);

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
    setShowMemory(false);
  };

  const toggleMemory = () => {
    setShowMemory(!showMemory);
    setShowExplanation(false);
  };

  return (
    <div>
      <div className="Heading">Memory Allcocation Algorithms</div>
      <div className="Buttonalign">
        <button onClick={toggleExplanation} className="Button2 link">
          {showExplanation ? "Hide Explanation" : "Explanation"}
        </button>
        <button onClick={toggleMemory} className="Button2 link">
          {showMemory ? "Hide Visualization" : "Visualization"}
        </button>
      </div>
      {showExplanation && <Explanation />}
      {showMemory && (
        <div>
          <Memory />
          <Algorithms />
        </div>
      )}
    </div>
  );
}

export default App;
