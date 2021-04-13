import React from "react";

export default function CalculatorTopKeys({ handleClick, clearAll }) {
  return (
    <div className="function-keys">
      <button
        id="key-clear"
        value="C"
        className="calculator-key key-clear"
        onClick={handleClick}
      >
        {clearAll ? "AC" : "C"}
      </button>
      <button
        id="key-sign"
        value="+/-"
        className="calculator-key key-sign"
        onClick={handleClick}
      >
        +/-
      </button>
      <button
        id="key-percent"
        value="%"
        className="calculator-key key-percent"
        onClick={handleClick}
      >
        %
      </button>
    </div>
  );
}
