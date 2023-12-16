// src/App.js
import React, { useState } from 'react';
import './App.css';
import PolarGraph from './PolarGraph';
import PolarEquationGenerator, { generatePolarEquation } from './PolarEquationGenerator';

function App() {
  const [equation, setEquation] = useState(generatePolarEquation());

  const handleNewEquation = () => {
    setEquation(generatePolarEquation());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Polar Graph Matching Game</h1>
        <button onClick={handleNewEquation}>Generate New Equation</button>
        <PolarEquationGenerator equation={equation} />
        <PolarGraph equation={equation} />
      </header>
    </div>
  );
}

export default App;
