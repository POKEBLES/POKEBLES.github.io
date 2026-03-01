document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".store-card");
    const leftButton = document.querySelector(".left-btn");
    const rightButton = document.querySelector(".right-btn");

    function updateCarousel() {
        cards.forEach((card) => {
            const position = card.getAttribute("data-position");

            card.querySelector(".card-overlay").classList.add("hidden");

            if (position === "middle") {
                card.style.transform = "translateX(0) scale(1)";
                card.style.opacity = "1";
                card.querySelector(".card-overlay").classList.remove("hidden");
            } else if (position === "left") {
                card.style.transform = "translateX(-120%) scale(0.80) rotate(-10deg)";
                card.style.opacity = "0.4";
            } else if (position === "right") {
                card.style.transform = "translateX(120%) scale(0.80) rotate(10deg)";
                card.style.opacity = "0.4";
            }
        });
    }

    function shiftLeft() {
        const leftCard = document.querySelector('[data-position="left"]');
        const middleCard = document.querySelector('[data-position="middle"]');
        const rightCard = document.querySelector('[data-position="right"]');

        leftCard.setAttribute("data-position", "right");
        middleCard.setAttribute("data-position", "left");
        rightCard.setAttribute("data-position", "middle");

        updateCarousel();
    }

    function shiftRight() {
        const leftCard = document.querySelector('[data-position="left"]');
        const middleCard = document.querySelector('[data-position="middle"]');
        const rightCard = document.querySelector('[data-position="right"]');

        leftCard.setAttribute("data-position", "middle");
        middleCard.setAttribute("data-position", "right");
        rightCard.setAttribute("data-position", "left");

        updateCarousel();
    }

    leftButton.addEventListener("click", shiftLeft);
    rightButton.addEventListener("click", shiftRight);

    updateCarousel();

    const loginSignupLinks = document.querySelector(".login-signup-links");
    const accountLinks = document.querySelector(".account-links");
    const logoutButton = document.getElementById("logoutButton");

    function updateNavbar() {
        if (localStorage.getItem("loggedIn") === "true") {
            accountLinks.style.display = "flex";
            loginSignupLinks.style.display = "none";
        } else {
            accountLinks.style.display = "none";
            loginSignupLinks.style.display = "flex";
        }
    }

    updateNavbar();

    if (logoutButton) {
        logoutButton.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("loggedIn");
            window.location.href = window.location.pathname;
        });
    }

    const loginButtons = document.querySelectorAll(".login-button, .signup-button");
    loginButtons.forEach(button => {
        button.addEventListener("click", function () {
            localStorage.setItem("loggedIn", "true");
            window.location.href = window.location.pathname;
        });
    });

    const paymentButtons = document.querySelectorAll(".price-btn");
    paymentButtons.forEach(button => {
        button.addEventListener("click", function () {
            const paymentLink = this.getAttribute("data-payment-link");
            if (paymentLink) {
                window.location.href = paymentLink;
            }
        });
    });
});