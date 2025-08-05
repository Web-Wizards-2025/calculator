// This DOM allows to switch between Dark and Light themes
// document.addEventListener("DOMContentLoaded", () => {
//   const toggleBtn = document.querySelector(".toggle-light");
//   const deleteArrow = document.querySelector(".delete-arrow");
//   const toggleIcon = toggleBtn.querySelector(".icon");

//   const setThemeIcon = (isDark) => {
//     toggleIcon.textContent = isDark ? "☀️" : "🌙";
//   };

//   const savedTheme = localStorage.getItem("theme");
//   const isDarkInitially = savedTheme === "dark";

//   if (isDarkInitially) {
//     document.body.classList.add("dark");
//     setThemeIcon(true);
//     if (deleteArrow) {
//       deleteArrow.src = "./assets/icons/delete-arrow-dark.png";
//     }
//   }
//   if (savedTheme === "dark") {
//     document.body.classList.add("dark");
//     toggleBtn.textContent = "Night";
//   }

//   toggleBtn.addEventListener("click", () => {
//     const isDark = document.body.classList.toggle("dark");
//     setThemeIcon(isDark);
//     toggleBtn.textContent = isDark ? "Night" : "Day";
//     localStorage.setItem("theme", isDark ? "dark" : "light");

//     if (deleteArrow) {
//       deleteArrow.src = isDark
//         ? "./assets/icons/delete-arrow-dark.png"
//         : "./assets/icons/delete-arrow.png";
//     }
//   });
// });

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
