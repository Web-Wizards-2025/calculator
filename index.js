document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-light");
  const toggleInner = toggleBtn?.querySelector(".toggle-inner");
  const toggleIcon = toggleInner?.querySelector(".icon");
  const toggleLabel = toggleInner?.querySelector(".label");
  const deleteArrow = document.querySelector(".delete-arrow");

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
});

function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        return "Invalid operator";
    }
}