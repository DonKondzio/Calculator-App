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

class Toggler {
  toggleState = 1;
  constructor() {
    toggleBtn.addEventListener("click", this.toggle.bind(this));
  }

  toggle() {
    toggleBtn.classList.remove("second-state", "third-state");
    this.toggleState++;
    if (this.toggleState === 2) {
      toggleBtn.classList.add("second-state");
    }
    if (this.toggleState === 3) {
      toggleBtn.classList.add("third-state");
    }
    if (this.toggleState === 4) this.toggleState = 1;

    document.documentElement.setAttribute(
      "data-theme",
      `theme-${this.toggleState}`
    );
  }
}
class Calculator {
  currentNumber = "";
  previousNumber = 0;
  lastOperationNum = 0;
  currentOperand;
  isLastOperationEqual = false;
  constructor() {
    const toggler = new Toggler();
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

  displayNum() {
    if (this.currentNumber === "") {
      displayEl.textContent = 0;
      return;
    }
    displayEl.textContent = this.currentNumber;
  }

  addNum(e) {
    const num = e.target.textContent;
    if (this.currentNumber.length >= 13) return; // preventing too long input
    if (num === "." && this.currentNumber.includes(".")) return; // preventing multiple dots
    if (+num === 0 && +this.currentNumber === 0) return; // preventing multiple zeros in front
    this.currentNumber += num;
    this.displayNum();
  }

  delete() {
    this.currentNumber = String(this.currentNumber).slice(0, -1);
    this.displayNum();
  }

  doOperation(e) {
    if (this.previousNumber && this.currentNumber) this.equals();
    if (
      this.currentOperand === e.target.textContent &&
      !this.isLastOperationEqual
    )
      return;
    if (!this.currentNumber) {
      return;
    }

    this.isLastOperationEqual = false;
    this.currentOperand = e.target.textContent;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
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
    if (!+this.currentNumber) return;
    if (!this.isLastOperationEqual)
      if (!this.isLastOperationEqual) {
        this.lastOperationNum = this.currentNumber;
        this.handleOperations(this.previousNumber, this.currentNumber);
      }
    this.previousNumber = 0;

    if (this.isLastOperationEqual) {
      console.log(this.lastOperationNum);
      this.handleOperations(this.currentNumber, this.lastOperationNum);
    }

    this.displayNum();
    this.isLastOperationEqual = true;
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
