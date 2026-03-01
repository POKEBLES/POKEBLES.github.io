
document.addEventListener("DOMContentLoaded", function() {
    // Payment method selection
    document.querySelectorAll('.pay-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.pay-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update selected payment method
            document.getElementById("selected-payment").textContent = button.getAttribute("data-method");
        });
    });

    // Continue button functionality
    document.getElementById("continue-btn").addEventListener("click", function() {
        let email = document.getElementById("email").value;
        let selectedPayment = document.querySelector('.pay-btn.active').getAttribute("data-method");

        if (!email) {
            alert("Please enter your email for receipt.");
            return;
        }

        alert(`Processing payment via ${selectedPayment}...`);
    });
});

