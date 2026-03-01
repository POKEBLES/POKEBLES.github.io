// Get all the nav links
const navLinks = document.querySelectorAll('.nav-link2');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove 'active' class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let viewButtons = document.querySelectorAll(".viewDetails");

    viewButtons.forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let description = this.getAttribute("data-description");
            let price = this.getAttribute("data-price");
            let status = this.getAttribute("data-status") || "Available";
            let quantity = this.getAttribute("data-quantity") || "N/A";

            document.getElementById("modalItemName").textContent = name;
            document.getElementById("modalItemDescription").textContent = description;
            document.getElementById("modalItemPrice").textContent = price;
            document.getElementById("modalItemStatus").textContent = status;
            document.getElementById("modalItemQuantity").textContent = quantity;

            let statusElement = document.getElementById("modalItemStatus");
            statusElement.style.color = status === "Available" ? "green" : "red";
        });
    });
});