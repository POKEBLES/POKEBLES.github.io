document.addEventListener("DOMContentLoaded", function() {
    // Function to generate a random Player ID for registration
    function generatePlayerID() {
        let id = "";
        for (let i = 0; i < 3; i++) {
            id += Math.floor(1000 + Math.random() * 9000) + " ";
        }
        return id.trim();
    }

    // Check if it's the registration page and generate Player ID
    let playerIdField = document.getElementById("player-id");
    if (playerIdField) {
        playerIdField.value = generatePlayerID();
        console.log("Player ID generated:", playerIdField.value); // Add console log
    } else {
        console.error("Player ID input field not found!");
    }

    // Registration form logic
    if (document.getElementById("register-form")) {
        document.getElementById("register-form").addEventListener("submit", function(e) {
            e.preventDefault(); // Prevent default form submission
            console.log("Form submission triggered.");

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirm-password").value;
            let ign = document.getElementById("ign").value;

            console.log("Email:", email);
            console.log("Password:", password);
            console.log("Confirm Password:", confirmPassword);
            console.log("IGN:", ign);

            // Validation flag
            let isValid = true;

            // Check if all fields are filled
            if (!email || !password || !confirmPassword || !ign) {
                alert("Please fill in all fields.");
                isValid = false;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                isValid = false;
            } else if (!email.includes("@") || !email.includes(".")) {
                alert("Enter a valid email address.");
                isValid = false;
            } else if (ign.trim() === "") {
                alert("IGN cannot be empty.");
                isValid = false;
            }

            console.log("isValid:", isValid);

            // Redirect only if all validations pass
            if (isValid) {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "https://pokebles.github.io/"; // Redirect to homepage
                console.log("Redirecting to homepage.");
            } else {
                console.log("Validation failed. Redirect prevented.");
            }
        });
    }

    // Login buttons logic
    if (document.querySelectorAll(".btn").length > 0) {
        document.querySelectorAll(".btn").forEach(button => {
            button.addEventListener("click", function() {
                // Simulate successful login and set loggedIn flag
                localStorage.setItem("loggedIn", "true");
                window.location.href = "https://pokebles.github.io/"; // Redirect to homepage
            });
        });
    }

    // Navbar visibility based on login status
    const loginLinks = document.querySelectorAll('.login-link');
    const accountLinks = document.querySelectorAll('.account-link');

    if (localStorage.getItem("loggedIn") === "true") {
        accountLinks.forEach(link => link.style.display = 'block');
        loginLinks.forEach(link => link.style.display = 'none');
    } else {
        accountLinks.forEach(link => link.style.display = 'none');
        loginLinks.forEach(link => link.style.display = 'block');
    }
});
