document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function updateCart() {
        cartItemsContainer.innerHTML = ""; // Clear cart display
        let totalPrice = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="quantity-input" min="1" value="${item.quantity}" data-index="${index}">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">X</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.textContent = totalPrice.toFixed(2);

        // Add event listeners for quantity change and remove buttons
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", updateQuantity);
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", removeItem);
        });
    }

    function updateQuantity(event) {
        let index = event.target.getAttribute("data-index");
        cart[index].quantity = parseInt(event.target.value);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }

    function removeItem(event) {
        let index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }

    document.getElementById("checkout-btn").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout...");
            localStorage.removeItem("cart"); // Clear cart after checkout
            window.location.href = "checkout.html"; // Redirect to checkout page
        }
    });

    updateCart();
});
