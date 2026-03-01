document.addEventListener('DOMContentLoaded', function() {
    const selectAll = document.getElementById('select-all');
    const selectItems = document.querySelectorAll('.select-item');
    const removeButtons = document.querySelectorAll('.remove-item');
    const cartItemsContainer = document.querySelector('.cart-items');

    // Function to update the total price
    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            if (item.querySelector('.select-item').checked) {
                const price = parseFloat(item.querySelector('p:last-of-type').textContent.replace('Price: $', '').replace(' each', ''));
                const quantity = parseInt(item.querySelector('.quantity-input').value);
                total += price * quantity;
            }
        });
        document.querySelector('.cart-total p').textContent = `Total: $${total.toFixed(2)}`;
    }

    // Select All functionality
    selectAll.addEventListener('change', function() {
        selectItems.forEach(item => item.checked = this.checked);
        updateTotal();
    });

    // Select Item functionality
    selectItems.forEach(item => {
        item.addEventListener('change', function() {
            selectAll.checked = Array.from(selectItems).every(item => item.checked);
            updateTotal();
        });
    });

    // Quantity Control functionality (Corrected)
    const quantityButtons = document.querySelectorAll('.quantity-button');
    quantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            if (this.textContent === '-') {
                if (value > 1) {
                    input.value = value - 1;
                }
            } else {
                input.value = value + 1;
            }
            updateTotal();
        });
    });

    // Remove Item functionality
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItemsContainer.removeChild(cartItem);
            updateTotal();
        });
    });

    // Initial total update
    updateTotal();
});
