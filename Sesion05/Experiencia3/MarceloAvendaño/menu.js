document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");

  dropdown.addEventListener("mouseenter", () => {
    dropdownMenu.classList.add("show-animated");
  });

  dropdown.addEventListener("mouseleave", () => {
    dropdownMenu.classList.remove("show-animated");
  });
});