document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded");
  try {
    const navLinks = document.getElementById("navLinks");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const currentPage = window.location.pathname.split("/").pop();
    const loggedIn = localStorage.getItem("loggedIn");
    console.log({ currentPage, loggedIn });

    // Navbar links (keep simple)
    if (navLinks) {
      if (currentPage === "login.html" || currentPage === "register.html") {
        navLinks.innerHTML = "";
      } else {
        navLinks.innerHTML = `
          <li class="nav-item"><a class="nav-link custom-link" href="index.html">PRODUCTS</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">SHOP</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">WEDDINGS</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">SERVICES</a></li>
          <li class="nav-item"><a class="nav-link custom-link" href="#">CONTACT</a></li>
        `;
      }
    }

    // Login / Logout 
    if (loggedIn === "true") {
      if (loginBtn) loginBtn.classList.add("d-none");
      if (logoutBtn) logoutBtn.classList.remove("d-none");
    } else {
      if (loginBtn) loginBtn.classList.remove("d-none");
      if (logoutBtn) logoutBtn.classList.add("d-none");
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        alert("You have logged out!");
        window.location.href = "index.html";
      });
    }

    // Search 
    const searchIcon = document.querySelector(".search-icon");
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");
    if (searchIcon && searchContainer && searchInput) {
      searchIcon.addEventListener("click", () => {
        searchContainer.classList.toggle("active");
        if (searchContainer.classList.contains("active")) {
          searchInput.style.display = "block";
          searchInput.focus();
        } else {
          searchInput.style.display = "none";
          searchInput.value = "";
        }
      });
    }

    // Register
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      console.log("registerForm found");
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("register submit fired");

        const newUsername = (document.getElementById("newUsername") || {}).value?.trim() || "";
        const newEmail = (document.getElementById("newEmail") || {}).value?.trim() || "";
        const newPassword = (document.getElementById("newPassword") || {}).value || "";

        if (!newUsername || !newEmail || newPassword.length < 4) {
          alert("Please fill all fields. Password must be at least 4 characters.");
          return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // check 
        if (users.some(u => u.username === newUsername || u.email === newEmail)) {
          alert("Username or email already exists. Choose another.");
          return;
        }

        users.push({ username: newUsername, email: newEmail, password: newPassword });
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Registered users:", users);

        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      });
    } else {
      console.log("No registerForm on this page");
    }

    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      console.log("loginForm found");
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("login submit fired");

        const usernameOrEmail = (document.getElementById("username") || {}).value?.trim() || "";
        const password = (document.getElementById("password") || {}).value || "";

        if (!usernameOrEmail || !password) {
          alert("Please enter credentials.");
          return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u =>
          (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
        );

        if (user) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("currentUser", user.username);
          alert("Login successful!");
          window.location.href = "index.html";
        } else {
          alert("Invalid username/email or password.");
        }
      });
    } else {
      console.log("No loginForm on this page");
    }

  } catch (err) {
    console.error("Error in script.js:", err);
  }
});