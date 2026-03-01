  // Navbar Login/Logout Logic
  const loginSignupLinks = document.querySelector(".login-signup-links");
  const accountLinks = document.querySelector(".account-links");
  const logoutButton = document.getElementById("logoutButton");

  function updateNavbar() {
      if (localStorage.getItem("loggedIn") === "true") {
          accountLinks.style.display = "flex"; // Show account-related links
          loginSignupLinks.style.display = "none"; // Hide login/sign up
      } else {
          accountLinks.style.display = "none"; // Hide account-related links
          loginSignupLinks.style.display = "flex"; // Show login/sign up
      }
  }

  updateNavbar();

  if (logoutButton) {
      logoutButton.addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.removeItem("loggedIn");
          window.location.href = window.location.pathname; // Redirect to the current page
      });
  }

  // Ensure login redirects back to the current page
  const loginButtons = document.querySelectorAll(".login-button, .signup-button");
  loginButtons.forEach(button => {
      button.addEventListener("click", function () {
          localStorage.setItem("loggedIn", "true");
          window.location.href = window.location.pathname; // Redirect to the current page after login
      });
  });
