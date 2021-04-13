import React from "react";

const digits = [
  "(",
  ")",
  "mc",
  "m+",
  "m-",
  "mr",
  <span>
    2<sup>x</sup>
  </span>,
  <span>
    x<sup>2</sup>
  </span>,
  <span>
    x<sup>3</sup>
  </span>,
  <span>
    x<sup>y</sup>
  </span>,
  <span>
    e<sup>x</sup>
  </span>,
  <span>
    10<sup>x</sup>
  </span>,
  "1/x",
  <span>
    <sup>2</sup>
    &radic;x
  </span>,
  <span>
    <sup>3</sup>
    &radic;x
  </span>,
  <span>
    <sup>y</sup>
    &radic;x
  </span>,
  "ln",
  ".",
  "x!",
  "sin",
  "cos",
  "tan",
  "e",
  "EE",
  "Rad",
  "sinh",
  "cosh",
  "tanh",
  <span>&pi;</span>,
  "Rand",
];

export default function ScientificKeys() {
  return (
    <div className="scientific-keys">
      {digits.map((digit,index) => {
        return (
          <button key={index} className={`calculator-key key-scientific`}>
            {digit}
          </button>
        );
      })}
    </div>
  );
}
