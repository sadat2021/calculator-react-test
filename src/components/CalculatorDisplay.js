import React from "react";
import { evaluate } from "mathjs"; // eval is a reserved word!

const maxCharsAtFullSize = 6;
const scaleFactor = "scale(0.36)";
const maxPrecision = 16;

export default function CalculatorDisplay({ value }) {
  const pointAt = `${value}`.indexOf(".");
  const decimalValue = value.substring(pointAt, evaluate(value.length));
  const precisionWithFraction =
    pointAt === -1 ? 0 : evaluate(decimalValue.length - 1);
  let formattedValue = null;
  let scientificNotation = null;
  let scaleDown = null;

  formattedValue = parseFloat(value).toLocaleString(undefined, {
    minimumFractionDigits: precisionWithFraction,
  }); // take the default locale formatting
  if (formattedValue === "NaN") {
    //account for errors
    formattedValue = "Error";
  } else {
    if (formattedValue.length > maxPrecision - 1) {
      scientificNotation = parseFloat(value).toExponential(maxPrecision - 4); // Allow at least 4 characters (for scientific notation e.g. e+14) in the output string
      if (
        scientificNotation.substring(
          scientificNotation.length - 3,
          scientificNotation.length
        ) === "e+0"
      ) {
        // if exponent part is not needed
        scientificNotation = parseFloat(value).toExponential(maxPrecision - 1);
        scientificNotation = scientificNotation.substring(
          0,
          scientificNotation.length - 3
        );
      }
      formattedValue = scientificNotation;
      if (formattedValue === "NaN") {
        //account for overflow
        formattedValue = "Overflow\xA0Error";
      }
    }
  }
  scaleDown =
    `${formattedValue}`.length > maxCharsAtFullSize ? scaleFactor : "scale(1)";
  return (
    <div className="calculator-display">
      <div
        data-testid="display"
        className="auto-scaling-text"
        style={{ transform: scaleDown }}
      >
        {formattedValue}
      </div>
    </div>
  );
}
