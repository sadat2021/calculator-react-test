import React, { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import DigitKeys from "./DigitKeys";
import Operators from "./Operators";
import CalculatorTopKeys from "./CalculatorTopKeys";
import CalculatorDisplay from "./CalculatorDisplay";
import ScientificKeys from "./ScientificKeys";

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["/", "*", "-", "+", "="];

const maxPrecision = 16;

function Calculator() {
  const [state, setState] = useState({
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
    firstOperand: "0",
    clearAll: true,
    operationKey: "",
  });
  const [histories, setHistories] = useState(
    localStorage.getItem("histories") &&
      localStorage.getItem("histories").length > 0
      ? JSON.parse(localStorage.getItem("histories"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("histories", JSON.stringify(histories));
  }, [histories]);

  const processDigit = (newKeyValue) => {
    const { displayValue, waitingForOperand } = state;

    if (waitingForOperand) {
      setState({
        ...state,
        operationKey: "",
        displayValue: `${newKeyValue}`,
        waitingForOperand: false,
        clearAll: false,
      });
    } else {
      let newDisplayValue =
        displayValue === "0"
          ? `${newKeyValue}`
          : `${displayValue}${newKeyValue}`; //no leading zero
      setState({
        ...state,
        operationKey: "",
        displayValue: `${newDisplayValue}`,
        waitingForOperand: false,
        clearAll: false,
      });
    }
  };

  const processOperator = (newKeyValue) => {
    const { displayValue, operator, waitingForOperand, firstOperand } = state;
    let newDisplayValue = null;
    let newOperator = null;
    let stringToEvaluate = null;

    if (firstOperand === "0" || operator == null || waitingForOperand) {
      // if not ready to do calculation
      setState({
        ...state,
        operationKey: newKeyValue,
        waitingForOperand: true,
        firstOperand: displayValue,
        operator: newKeyValue,
        clearAll: false,
      });
      return;
    } else {
      stringToEvaluate = `${firstOperand}${operator}${displayValue}`;
      setHistories([...histories, stringToEvaluate]);
      try {
        newDisplayValue = `${evaluate(stringToEvaluate)}`;
      } catch (e) {
        newDisplayValue = "Error";
      }
      if (newDisplayValue === "Infinity") {
        //math.js evaluates division by 0 to be "Infinity"
        newDisplayValue = "Error";
      }
      newOperator = newKeyValue === "=" ? null : newKeyValue;
      setState({
        operationKey: newKeyValue,
        displayValue: `${newDisplayValue}`,
        waitingForOperand: true,
        firstOperand: `${newDisplayValue}`,
        operator: newOperator,
        clearAll: false,
      });
    }
  };

  const processPoint = (newKeyValue) => {
    const { displayValue, waitingForOperand } = state;
    const needPoint = `${displayValue}`.indexOf(".") === -1 ? true : false;
    let newDisplayValue = null;

    if (waitingForOperand) {
      // allow point if starting on a new operand
      setState({
        ...state,
        operationKey: "",
        displayValue: "0.",
        waitingForOperand: false,
        clearAll: false,
      });
    } else {
      if (needPoint) {
        //if not inputting new operand, only allow point if it's not already present
        newDisplayValue = `${displayValue}${newKeyValue}`;
        setState({
          ...state,
          operationKey: "",
          displayValue: `${newDisplayValue}`,
          waitingForOperand: false,
          clearAll: false,
        });
      }
    }
  };

  const processPercentage = (newKeyValue) => {
    const { displayValue } = state;
    const newDisplayValue =
      parseFloat(displayValue).toPrecision(maxPrecision) / 100;
    setState({
      ...state,
      operationKey: "",
      displayValue: `${newDisplayValue}`,
      waitingForOperand: false,
      clearAll: false,
    });
  };

  const processPlusMinusToggle = (newKeyValue) => {
    const { displayValue } = state;
    const newDisplayValue =
      parseFloat(displayValue).toPrecision(maxPrecision) * -1;
    setState({
      ...state,
      operationKey: "",
      displayValue: `${newDisplayValue}`,
      waitingForOperand: false,
      clearAll: false,
    });
  };

  const processClear = () => {
    const { clearAll } = state;
    if (clearAll) {
      setState({
        operationKey: "",
        displayValue: "0",
        firstOperand: "0",
        operator: null,
        waitingForOperand: false,
        clearAll: true,
      });
    } else {
      setState({
        ...state,
        operationKey: "",
        displayValue: "0",
        clearAll: true,
      });
    }
  };

  const processFunctionKey = (newKeyValue) => {
    switch (newKeyValue) {
      case "C":
        processClear(newKeyValue);
        break;
      case "+/-":
        processPlusMinusToggle(newKeyValue);
        break;
      case ".":
        processPoint(newKeyValue);
        break;
      case "%":
        processPercentage(newKeyValue);
        break;
      default:
    }
  };

  const handleClick = (e) => {
    processNewKey(`${e.target.value}`);
  };

  const processNewKey = (newKeyValue) => {
    const isDigit = digits.includes(newKeyValue);
    const isOperator = operators.includes(newKeyValue);

    if (isDigit) {
      processDigit(newKeyValue);
    } else {
      if (isOperator) {
        processOperator(newKeyValue);
      } else {
        processFunctionKey(newKeyValue);
      }
    }
  };

  return (
    <>
      <div className="calculator">
        <CalculatorDisplay value={state.displayValue} />

        <div className="calculator-keypad">
          <ScientificKeys />
          <div className="input-keys">
            <CalculatorTopKeys
              handleClick={handleClick}
              clearAll={state.clearAll}
            />
            <DigitKeys handleClick={handleClick} />
          </div>
          <Operators
            operationKey={state.operationKey}
            handleClick={handleClick}
          />
        </div>
      </div>
      <h1>History</h1>
      {histories.map((history) => {
        return (
          <h3 key={history}>
            {history} = {evaluate(history)}
          </h3>
        );
      })}
    </>
  );
}

export default Calculator;
