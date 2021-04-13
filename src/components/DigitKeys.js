import React from "react";

const digits = ["0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function DigitKeys({ handleClick }) {
  return (
    <div className="digit-keys">
      {digits.map((digit) => {
        return (
          <button
            data-testid={`key${digit}`}
            key={digit}
            id={`key-${digit}`}
            value={digit}
            className={`calculator-key key-${digit === "." ? "dot" : digit}`}
            onClick={handleClick}
          >
            {digit}
          </button>
        );
      })}
    </div>
  );
}
