document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const loggedIn = localStorage.getItem("loggedIn");

  const currentPage = window.location.pathname.split("/").pop();

  if (navLinks) {
    
    if (currentPage === "login.html" || currentPage === "register.html") {
      navLinks.innerHTML = "";
    } else {
      
      navLinks.innerHTML = `
       <li><a class="nav-link custom-link" href="index.html">PRODUCTS</a></li>
        <li><a class="nav-link custom-link" href="#">SHOP</a></li>
        <li><a class="nav-link custom-link" href="#">WEDDINGS</a></li>
       <li><a class="nav-link custom-link" href="#">SERVICES</a></li>
      <li><a class="nav-link custom-link" href="#">CONTACT</a></li>
      `;
    }
  }

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username && password.length >= 4) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid login. Password must be at least 4 characters.");
      }
    });
  }

  // Register form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newUsername = document.getElementById("newUsername").value;
      const newPassword = document.getElementById("newPassword").value;

      if (newUsername && newPassword.length >= 4) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } else {
        alert("Password must be at least 4 characters.");
      }
    });
  }

 });