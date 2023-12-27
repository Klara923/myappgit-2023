document.addEventListener("DOMContentLoaded", function () {
  const barIcon = document.querySelector(".fa-bars");
  const navMenu = document.querySelector(".nav-menu");
  const xIcon = document.querySelector(".x-icon");
  const contactForm = document.querySelector(".contact-form");

  const formName = document.getElementById("formName");
  const formEmail = document.getElementById("formEmail");
  const formSubject = document.getElementById("formSubject");
  const formMessage = document.getElementById("formMessage");

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
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit clicked");
    let formData = {
      formName: formName.value,
      formEmail: formEmail.value,
      formSubject: formSubject.value,
      formMessage: formMessage.value,
    };

    let xhr = new XMLHttpRequest();
    xhr.onerror = function () {
      console.error("An error occurred during the XMLHttpRequest.");
    };
    xhr.open("POST", "/contact");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
      if (xhr.responseText.includes("Email sent, thank you!")) {
        alert("Success");
        formName.value = "";
        formEmail.value = "";
        formSubject.value = "";
        formMessage.value = "";
      } else {
        alert("Something went wrong!");
      }
    };

    xhr.send(JSON.stringify(formData));
  });
});
