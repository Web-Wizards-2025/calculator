document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-light");
  const toggleInner = toggleBtn?.querySelector(".toggle-inner");
  const toggleIcon = toggleInner?.querySelector(".icon");
  const toggleLabel = toggleInner?.querySelector(".label");
  const deleteArrow = document.querySelector(".delete-arrow");
  const displayInput = document.querySelector(".display-input");

  const setTheme = (isDark) => {
    document.body.classList.toggle("dark", isDark);

    if (toggleIcon && toggleLabel) {
      toggleIcon.textContent = isDark ? "🌙" : "☀️";
      toggleLabel.textContent = isDark ? "Dark" : "Light";
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (deleteArrow) {
      deleteArrow.src = isDark
        ? "./assets/icons/delete-arrow-dark.png"
        : "./assets/icons/delete-arrow.png";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const isDarkInitially = savedTheme === "dark";
  setTheme(isDarkInitially);

  toggleBtn?.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    setTheme(isDark);
  });

  let displayValue = "";
  const calcButtons = document.querySelectorAll(
    ".buttons button:not(.toggle-light):not(.buttons-backspace):not(.buttons-erase):not(.buttons-equal)"
  );

  calcButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      displayValue += e.target.textContent;
      updateDisplay();
    });
  });

  const eraseBtn = document.querySelector(".buttons-erase");
  eraseBtn?.addEventListener("click", () => {
    displayValue = "";
    updateDisplay();
  });

  const backspaceBtn = document.querySelector(".buttons-backspace");
  backspaceBtn?.addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
  });

  function updateDisplay() {
    if (displayInput) {
      displayInput.value = displayValue;
    }
  };

});

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}
// Each function first checks if the arguments are numbers and throws an error if not.
// If the arguments are valid, they perform the respective arithmetic operation.
// Add
function add(number1, number2) {
  if (typeof number1 !== "number" || typeof number2 !== "number")
    throw new TypeError("Both arguments must be numbers.");
  return number1 + number2;
}

// Subtract
function subtract(number1, number2) {
  if (typeof number1 !== "number" || typeof number2 !== "number")
    throw new TypeError("Both arguments must be numbers.");
  return number1 - number2;
}

// Multiply
function multiply(number1, number2) {
  if (typeof number1 !== "number" || typeof number2 !== "number")
    throw new TypeError("Both arguments must be numbers.");
  return number1 * number2;
}

// Divide
function divide(number1, number2) {
  if (typeof number1 !== "number" || typeof number2 !== "number")
    throw new TypeError("Both arguments must be numbers.");
  // Prevents dividing by zero
  if (number2 === 0) throw new Error("Division by zero is not allowed.");
  // Returns the quotient/result
  return number1 / number2;
}

let firstValue = null;
  let operator = null;
  let waitingForSecondValue = false;
  let displayValue = "0";

  const displayInput = document.querySelector(".display-input");
  const buttons = document.querySelectorAll(".buttons button");
  const equalButton = document.querySelector(".buttons-equal");
  const clearButton = document.querySelector(".buttons-erase");
  const backspaceButton = document.querySelector(".buttons-backspace");

  function updateDisplay() {
    displayInput.value = displayValue;
  }

  function inputNumber(num) {
    if (waitingForSecondValue) {
      displayValue = num;
      waitingForSecondValue = false;
    } else {
      if (num === "." && displayValue.includes(".")) return;
      displayValue = displayValue === "0" ? num : displayValue + num;
    }
    updateDisplay();
  }

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const value = e.target.textContent.trim();
      if (button.classList.contains("toggle-light") || 
          button.classList.contains("buttons-equal") ||
          button.classList.contains("buttons-erase") ||
          button.classList.contains("buttons-backspace")) {
        return; 
      }
      if (/\d/.test(value) || value === ".") {
        inputNumber(value);
      } else if (["+", "-", "*", "/"].includes(value)) {
        handleOperator(value);
      }
    });
  });

  function handleOperator(op) {
    if (firstValue === null) {
      firstValue = parseFloat(displayValue);
    } else if (!waitingForSecondValue) {
      const result = operate(operator, firstValue, parseFloat(displayValue));
      displayValue = String(result);
      firstValue = result;
      updateDisplay();
    }
    operator = op;
    waitingForSecondValue = true;
  }

  equalButton.addEventListener("click", () => {
    if (firstValue !== null && operator !== null && !waitingForSecondValue) {
      const result = operate(operator, firstValue, parseFloat(displayValue));
      displayValue = String(result);
      firstValue = null;
      operator = null;
      waitingForSecondValue = false;
      updateDisplay();
    }
  });

  clearButton.addEventListener("click", () => {
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    displayValue = "0";
    updateDisplay();
  });

  backspaceButton.addEventListener("click", () => {
    if (displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
    } else {
      displayValue = "0";
    }
    updateDisplay();
  });

  updateDisplay();