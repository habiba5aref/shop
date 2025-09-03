document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const currentPage = window.location.pathname.split("/").pop();
  const loggedIn = localStorage.getItem("loggedIn");

  // Navbar Links 
  if (navLinks) {
    if (currentPage === "login.html" || currentPage === "register.html") {
      navLinks.innerHTML = "";
    } else {
      if (loggedIn === "true") {
        navLinks.innerHTML = `
          <li class="nav-item"><a class="nav-link custom-link" href="index.html">PRODUCTS</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">SHOP</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">WEDDINGS</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">SERVICES</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">CONTACT</a></li>
        `;
      } else {
        navLinks.innerHTML = "";
      }
    }
  }

  // Login / Logout buttons 
  if (loggedIn === "true") {
    if (loginBtn) loginBtn.classList.add("d-none");
    if (logoutBtn) {
      logoutBtn.classList.remove("d-none");
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedIn");
        alert("You have logged out!");
        window.location.href = "index.html";
      });
    }
  } else {
    if (loginBtn) loginBtn.classList.remove("d-none");
    if (logoutBtn) logoutBtn.classList.add("d-none");
  }

  // Toggle Password 
  document.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => {
      const targetId = icon.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

  // Login 
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("username").value.trim();
      const passwordInput = document.getElementById("password").value;

      const storedUser = JSON.parse(localStorage.getItem("userData"));
      if (storedUser && emailInput === storedUser.email && passwordInput === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid login. Please check your email and password.");
      }
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newUsername = document.getElementById("newUsername").value.trim();
      const newEmail = document.getElementById("newEmail").value.trim();
      const newPassword = document.getElementById("newPassword").value;

      if (!newUsername || !newEmail || !newPassword) {
        alert("Please fill all fields.");
        return;
      }

      if (newPassword.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
      }

      const userData = { username: newUsername, email: newEmail, password: newPassword };
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    });
  }
  
  // Search Toggle
  const searchIcon = document.querySelector(".search-icon");
  const searchContainer = document.querySelector(".search-container");

  if (searchIcon && searchContainer) {
    searchIcon.addEventListener("click", () => {
      searchContainer.classList.toggle("active");
      const input = searchContainer.querySelector(".search-input");
      if (input) input.focus();
    });
  } 

});