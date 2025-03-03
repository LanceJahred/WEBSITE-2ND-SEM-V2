document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".cart-items");
    const cartCount = document.querySelector(".cart-count");
    const cartTotal = document.querySelector(".cart-total");

    function updateCartUI() {
        const cartContainer = document.querySelector(".cart-items");
        const cartTotal = document.querySelector(".cart-total");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
        if (!cartContainer || !cartTotal) return;
    
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
            cartTotal.innerText = "$0.00";
            return;
        }
    
        let total = 0;
        cartContainer.innerHTML = ""; // Clear current items
    
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x <span class="item-quantity">${item.quantity}</span></p>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease" data-index="${index}">-</button>
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                        </div>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        });
    
        cartTotal.innerText = `$${total.toFixed(2)}`;
    
        // **Reattach event listeners**
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart[index].quantity++;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    
        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1); // Remove item if quantity reaches 0
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    }
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".product-card");
            const productName = productCard.querySelector("h3").innerText;
            const productPrice = parseFloat(this.getAttribute("data-price")); // FIX: Ensure price is read from data attribute
            const productImage = productCard.querySelector("img").src;

            if (isNaN(productPrice)) {
                console.error(`Invalid price for ${productName}`);
                return;
            }

            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        });
    });

    document.querySelector(".cart-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        }
    });

    document.querySelector(".my-cart").addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".cart-container").classList.toggle("show-cart");
    });

    updateCartUI();
});

// CART SIDEBAR FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
    const cartBtn = document.querySelector(".my-cart");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const closeCart = document.querySelector(".close-cart");
    const cartOverlay = document.querySelector(".cart-overlay");

    cartBtn.addEventListener("click", function (e) {
        e.preventDefault();
        cartSidebar.classList.add("show");
        cartOverlay.classList.add("show");
    });

    closeCart.addEventListener("click", function () {
        cartSidebar.classList.remove("show");
        cartOverlay.classList.remove("show");
    });

    cartOverlay.addEventListener("click", function () {
        cartSidebar.classList.remove("show");
        cartOverlay.classList.remove("show");
    });
});

// CHECKOUT FUNCTION FIX
document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.querySelector(".checkout-btn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            alert("Thank you for your purchase! Your order is being processed.");

            // Clear cart in localStorage
            localStorage.removeItem("cart");

            // Reset the cart array
            cart = [];

            // Update UI immediately
            updateCartUI();
        });
    }
});

// Ensure updateCartUI() properly clears the UI
function updateCartUI() {
    const cartContainer = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    const cartCount = document.querySelector(".cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cartContainer || !cartTotal || !cartCount) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
        cartTotal.innerText = "$0.00";
        cartCount.innerText = "0";
        return;
    }

    let total = 0;
    cartContainer.innerHTML = ""; // Clear current items

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
    });

    cartTotal.innerText = `$${total.toFixed(2)}`;
    cartCount.innerText = cart.length;
}

// Run updateCartUI() when the page loads to ensure proper display
document.addEventListener("DOMContentLoaded", updateCartUI);

// clicking add minus button
document.addEventListener("click", function (e) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (e.target.classList.contains("increase")) {
        const index = e.target.getAttribute("data-index");
        cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }

    if (e.target.classList.contains("decrease")) {
        const index = e.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1); // Remove item if quantity reaches 0
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.querySelector(".checkout-btn");
    const checkoutModal = document.getElementById("checkout-modal");
    const closeModal = document.querySelector(".close-modal");
    const checkoutForm = document.getElementById("checkout-form");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // Show the checkout modal
            checkoutModal.style.display = "block";
        });
    }

    // Close modal when clicking "X"
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            checkoutModal.style.display = "none";
        });
    }

    // Handle order submission
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;
            const email = document.getElementById("email").value;
            const contact = document.getElementById("contact").value;
            const payment = document.getElementById("payment").value;

            alert(`Thank you, ${name}! Your order has been placed.`);

            // Clear cart and localStorage
            localStorage.removeItem("cart");
            updateCartUI();

            // Close modal and redirect to homepage
            checkoutModal.style.display = "none";
            window.location.href = "index.html"; // Change this if your homepage is a different file
        });
    }
});
