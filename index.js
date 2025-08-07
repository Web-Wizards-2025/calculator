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
  }

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
