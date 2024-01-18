"use strict";

const body = document.body;
const toggleBtn = document.querySelector(".calc__upper-right-toggle-btn");
const toggleCircle = document.querySelector(
  ".calc__upper-right-toggle-btn::before"
);
const displayEl = document.querySelector(".calc__screen-display");
const numberKeys = document.querySelectorAll("[data-number]");
const operandKeys = document.querySelectorAll("[data-operand]");
const equalsKey = document.querySelector("[data-equals]");
const resetKey = document.querySelector("[data-reset]");
const deleteKey = document.querySelector("[data-delete]");

class Calculator {
  toggleState = 1;
  currentNumber = "";
  previousNumber = 0;
  lastOperationNum = 0;
  currentOperand;
  isLastOperationEqual = false;
  constructor() {
    toggleBtn.addEventListener("click", this.toggle.bind(this));
    numberKeys.forEach((key) =>
      key.addEventListener("click", this.addNum.bind(this))
    );
    operandKeys.forEach((key) =>
      key.addEventListener("click", this.doOperation.bind(this))
    );
    deleteKey.addEventListener("click", this.delete.bind(this));
    equalsKey.addEventListener("click", this.equals.bind(this));
    resetKey.addEventListener("click", this.reset.bind(this));
  }

  toggle() {
    toggleBtn.classList.remove("second-state", "third-state");
    this.toggleState++;
    if (this.toggleState === 4) this.toggleState = 1;
    if (this.toggleState === 2) {
      toggleBtn.classList.add("second-state");
    }
    if (this.toggleState === 3) {
      toggleBtn.classList.add("third-state");
    }

    document.documentElement.setAttribute(
      "data-theme",
      `theme-${this.toggleState}`
    );
  }

  displayNum() {
    if (this.currentNumber === "") {
      displayEl.textContent = 0;
      return;
    }
    displayEl.textContent = this.currentNumber;
  }

  addNum(e) {
    const num = e.target.textContent;
    if (this.currentNumber.length >= 13) return;
    if (num === "." && this.currentNumber.includes(".")) return;
    if (+num === 0 && +this.currentNumber === 0) return;
    this.currentNumber += num;
    // this.currentOperand = null;
    this.displayNum();
    console.log("addNum");
    console.log(
      `Previous: ${this.previousNumber} ${typeof this.previousNumber}`
    );
    console.log(`Current: ${this.currentNumber} ${typeof this.currentNumber}`);
    console.log("");
  }

  delete() {
    this.currentNumber = String(this.currentNumber).slice(0, -1);
    this.displayNum();
  }

  doOperation(e) {
    if (this.previousNumber && this.currentNumber) this.equals();
    if (
      this.currentOperand === e.target.textContent &&
      !this.LastOperationIsEqual
    )
      return;
    this.LastOperationIsEqual = false;
    this.currentOperand = e.target.textContent;
    if (!this.currentNumber) {
      return;
    }
    if (this.previousNumber === 0) {
      this.previousNumber = this.currentNumber;
      this.currentNumber = "";
    } else {
      // this.equals();
      this.previousNumber = this.currentNumber;
      this.currentNumber = "";
    }
    console.log("doOperation");
    console.log(
      `Previous: ${this.previousNumber} ${typeof this.previousNumber}`
    );
    console.log(`Current: ${this.currentNumber} ${typeof this.currentNumber}`);
    console.log("");
  }

  handleOperations(previousOperationNumber, operationNumber) {
    if (this.currentOperand === "+") {
      this.currentNumber = +previousOperationNumber + +operationNumber;
    }
    if (this.currentOperand === "-") {
      this.currentNumber = +previousOperationNumber - +operationNumber;
    }
    if (this.currentOperand === "x") {
      this.currentNumber = +previousOperationNumber * +operationNumber;
    }
    if (this.currentOperand === "/") {
      this.currentNumber = +previousOperationNumber / +operationNumber;
    }
    this.currentNumber = String(this.currentNumber);
  }

  equals() {
    if (!this.LastOperationIsEqual)
      if (!this.LastOperationIsEqual) {
        this.lastOperationNum = this.currentNumber;
        this.handleOperations(this.previousNumber, this.currentNumber);
      }
    this.previousNumber = 0;

    if (this.LastOperationIsEqual) {
      console.log(this.lastOperationNum);
      this.handleOperations(this.currentNumber, this.lastOperationNum);
    }

    this.displayNum();
    console.log("equals");
    console.log(
      `Previous: ${this.previousNumber} ${typeof this.previousNumber}`
    );
    console.log(`Current: ${this.currentNumber} ${typeof this.currentNumber}`);
    this.LastOperationIsEqual = true;
    console.log("");
  }

  reset() {
    this.toggleState = 1;
    this.currentNumber = "";
    this.previousNumber = 0;
    this.lastOperationNum = 0;
    this.currentOperand;
    this.isLastOperationEqual = false;
    displayEl.textContent = 0;
  }
}

const calculator = new Calculator();
