import React from "react";

const operators = [
  { value: "/", name: "divide" },
  { value: "*", name: "multiply" },
  { value: "-", name: "subtact" },
  { value: "+", name: "add" },
  { value: "=", name: "equals" },
];

export default function Operators({ handleClick, operationKey }) {
  return (
    <div className="operator-keys">
      {operators.map((operator) => (
        <button
          data-testid={operator.name}
          key={operator.name}
          id={`key-${operator.name}`}
          value={operator.value}
          className={`${
            operationKey === operator.value ? "active-key" : "inactive-key"
          } calculator-key key-${operator.name} `}
          onClick={handleClick}
        >
          {operator.value}
        </button>
      ))}
    </div>
  );
}
