// This DOM allows to switch between Dark and Light themes
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-light");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "Night";
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    toggleBtn.textContent = isDark ? "Night" : "Day";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
