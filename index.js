document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const toggleBtn = document.querySelector(".toggle-light");
  const toggleInner = toggleBtn?.querySelector(".toggle-inner");
  const toggleIcon = toggleInner?.querySelector(".icon");
  const toggleLabel = toggleInner?.querySelector(".label");
  const deleteArrow = document.querySelector(".delete-arrow");
  const displayInput = document.querySelector(".display-input");
  const equalsBtn = document.querySelector(".buttons-equal");
  const displayOperator = document.querySelector(".display-operator");

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

  // Calculator state
  let firstValue = null;
  let operator = null;
  let waitingForSecondValue = false;
  let displayValue = "0";
  let hasDecimal = false;
  let errorOccurred = false;
  function displayedCurrentOperator(newStrValue) {
    displayOperator.textContent = newStrValue;
    if (newStrValue === "*") displayOperator.classList.add("multiplying");
    else displayOperator.classList.remove("multiplying");
  }
  displayedCurrentOperator("");

  // Helper functions
  function updateDisplay() {
    if (displayInput) {
      displayInput.value = displayValue;
    }
  }

  function resetCalculator() {
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    displayValue = "0";
    hasDecimal = false;
    errorOccurred = false;
    displayedCurrentOperator("");
  }

  function formatResult(value) {
    if (typeof value === "string") return value;

    // Round to 10 decimal places if needed<
    const rounded = Math.round(value * 1e10) / 1e10;
    return rounded.toString();
  }

  // Arithmetic operations
  function add(a, b) {
    return a + b;
  }
  function subtract(a, b) {
    return a - b;
  }
  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) return "Nice try! 😏";
    return a / b;
  }

  function operate(op, a, b) {
    a = Number(a);
    b = Number(b);
    switch (op) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "*":
        return multiply(a, b);
      case "/":
        return divide(a, b);
      default:
        return "Error";
    }
  }

  // Handle number input
  function inputNumber(num) {
    if (errorOccurred) resetCalculator();

    if (waitingForSecondValue) {
      displayValue = num === "." ? "0." : num;
      waitingForSecondValue = false;
      hasDecimal = num === ".";
    } else {
      if (displayValue === "0" && num !== ".") {
        displayValue = num;
      } else {
        displayValue += num;
      }

      if (num === ".") {
        hasDecimal = true;
      }
    }

    updateDisplay();
  }

  // Handle operators
  function handleOperator(op) {
    if (errorOccurred) return;

    displayedCurrentOperator(op);

    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      firstValue = inputValue;
    } else if (operator && !waitingForSecondValue) {
      const result = operate(operator, firstValue, inputValue);

      if (typeof result === "string") {
        displayValue = result;
        errorOccurred = true;
      } else {
        firstValue = result;
        displayValue = formatResult(result);
      }
    }

    operator = op;
    waitingForSecondValue = true;
    hasDecimal = false;
    updateDisplay();
  }

  // Button event listeners
  const calcButtons = document.querySelectorAll(
    ".buttons button:not(.toggle-light):not(.buttons-backspace):not(.buttons-erase):not(.buttons-equal)"
  );

  calcButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const value = e.target.textContent;

      if (value >= "0" && value <= "9") {
        inputNumber(value);
      } else if (value === ".") {
        if (!hasDecimal && !errorOccurred) {
          inputNumber(value);
        }
      } else if (["+", "-", "*", "/"].includes(value)) {
        handleOperator(value);
      }
    });
  });

  // Clear button
  const eraseBtn = document.querySelector(".buttons-erase");
  eraseBtn?.addEventListener("click", () => {
    resetCalculator();
    updateDisplay();
  });

  // Backspace button
  const backspaceBtn = document.querySelector(".buttons-backspace");
  backspaceBtn?.addEventListener("click", () => {
    if (errorOccurred) return;

    if (displayValue.length === 1) {
      displayValue = "0";
      hasDecimal = false;
    } else {
      // Remove last character and check if decimal is still present
      const lastChar = displayValue.slice(-1);
      if (lastChar === ".") hasDecimal = false;
      displayValue = displayValue.slice(0, -1);
    }

    updateDisplay();
  });

  // Equals button
  equalsBtn?.addEventListener("click", () => {
    if (errorOccurred || operator === null || waitingForSecondValue) return;

    displayedCurrentOperator("");

    const inputValue = parseFloat(displayValue);
    const result = operate(operator, firstValue, inputValue);

    if (typeof result === "string") {
      displayValue = result;
      errorOccurred = true;
    } else {
      displayValue = formatResult(result);
      firstValue = result;
    }

    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key >= "0" && key <= "9") {
      inputNumber(key);
    } else if (key === ".") {
      if (!hasDecimal && !errorOccurred) {
        inputNumber(key);
      }
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleOperator(key);
    } else if (key === "Enter" || key === "=") {
      equalsBtn.click();
    } else if (key === "Backspace") {
      backspaceBtn.click();
    } else if (key === "Escape" || key.toLowerCase() === "c") {
      eraseBtn.click();
    }
  });

  // Initialize display
  updateDisplay();
});
