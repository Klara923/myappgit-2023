const barIcon = document.querySelector(".bar-icon");
const navMenu = document.querySelector(".nav-menu");
const xIcon = document.querySelector(".x-icon");

function handleNavMenu() {
  if (navMenu.classList.contains("closed")) {
    navMenu.classList.remove("closed");
    navMenu.classList.add("open");
  } else if (navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    navMenu.classList.add("closed");
  }
}

barIcon.addEventListener("click", handleNavMenu);
xIcon.addEventListener("click", handleNavMenu);
