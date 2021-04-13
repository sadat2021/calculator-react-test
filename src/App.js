import React from "react";
import Calculator from "./components/Calculator";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <div id="calculator-wrapper">
          <Calculator />
        </div>
      </div>
    </div>
  );
}

export default App;
