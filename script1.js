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
    
        // Iterate through the cart and render items
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x <span class="item-quantity" data-index="${index}">${item.quantity}</span></p>
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
    
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart[index].quantity++;
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

    document.addEventListener("DOMContentLoaded", function () {
        const cartBtn = document.querySelector(".my-cart");
        if (cartBtn) {
            cartBtn.addEventListener("click", function (e) {
                e.preventDefault();
                const cartContainer = document.querySelector(".cart-container");
                if (cartContainer) {
                    cartContainer.classList.toggle("show-cart");
                }
            });
        }
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

// carousel related
function nextSlide(button) {
    let carousel = button.parentElement.querySelector(".carousel-images");
    let images = carousel.children;
    let index = Array.from(images).findIndex(img => img.style.display !== "none");

    images[index].style.display = "none";
    let nextIndex = (index + 1) % images.length;
    images[nextIndex].style.display = "block";
}

function prevSlide(button) {
    let carousel = button.parentElement.querySelector(".carousel-images");
    let images = carousel.children;
    let index = Array.from(images).findIndex(img => img.style.display !== "none");

    images[index].style.display = "none";
    let prevIndex = (index - 1 + images.length) % images.length;
    images[prevIndex].style.display = "block";
}

// open checkout modal
function openCheckout() {
    document.getElementById("checkoutModal").style.display = "block";
}

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

// Filter and Search Functionality
document.addEventListener("DOMContentLoaded", function () {
    const filterSelect = document.getElementById("brand-filter");
    const searchInput = document.getElementById("search-bar");
    const watchItems = document.querySelectorAll(".product-card"); // Ensure each product has this class
    const noResultsMessage = document.getElementById("noResults");

    if (!filterSelect || !searchInput || !watchItems) return; // Prevent errors if elements are missing

    function filterProducts() {
        const selectedBrand = filterSelect.value.toLowerCase();
        const searchQuery = searchInput.value.toLowerCase();
        let hasResults = false;

        watchItems.forEach(item => {
            const productName = item.querySelector("h3").innerText.toLowerCase(); // Get product name
            const productBrand = item.dataset.brand.toLowerCase(); // Ensure each product has `data-brand` in HTML

            const matchesSearch = productName.includes(searchQuery);
            const matchesFilter = (selectedBrand === "all" || productBrand === selectedBrand);

            if (matchesSearch && matchesFilter) {
                item.style.display = "block";
                hasResults = true;
            } else {
                item.style.display = "none";
            }
        });

        // Show or hide "No products found" message
        noResultsMessage.style.display = hasResults ? "none" : "block";
    }

    // Add Event Listeners for Search & Filter
    filterSelect.addEventListener("change", filterProducts);
    searchInput.addEventListener("keyup", filterProducts);
});

// modal details
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");

            if (!productCard) {
                console.error("Product card not found!");
                return;
            }

            let title = productCard.querySelector("h3")?.innerText || "No Title";
            let price = productCard.querySelector(".price")?.innerText || "No Price";
            let imageSrc = productCard.querySelector(".carousel-images img")?.src || "";
            let details = productCard.querySelector(".product-details")?.innerHTML || "No details available.";

            // Create modal HTML
            let modalHTML = `
                <div class="custom-modal-overlay">
                    <div class="custom-modal">
                        <button class="close-modal">&times;</button>
                        <h2>${title}</h2>
                        <img src="${imageSrc}" class="modal-image">
                        <p class="modal-price"><strong>Price:</strong> ${price}</p>
                        <div class="modal-details">${details}</div>
                    </div>
                </div>
            `;

            // Add modal to the body
            let modal = document.createElement("div");
            modal.innerHTML = modalHTML;
            document.body.appendChild(modal);

            // Close modal on button click
            modal.querySelector(".close-modal").addEventListener("click", function () {
                modal.remove();
            });

            // Close modal when clicking outside
            modal.querySelector(".custom-modal-overlay").addEventListener("click", function (event) {
                if (event.target.classList.contains("custom-modal-overlay")) {
                    modal.remove();
                }
            });
        });
    });
});

// Close modal when clicking the close button
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('productModal').style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");

            if (!productCard) {
                console.error("Product card not found!");
                return;
            }

            let title = productCard.querySelector("h3")?.innerText || "No Title";
            let price = productCard.querySelector(".price")?.innerText || "No Price";
            let imageSrc = productCard.querySelector(".carousel-images img")?.src || "";

           
        });
    });
});
// account related
function updateAccountButton() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let accountBtn = document.getElementById("accountBtn");

    if (user) {
        accountBtn.innerText = "My Account";
        accountBtn.href = "dashboard.html";
    } else {
        accountBtn.innerText = "Login";
        accountBtn.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", updateAccountButton);
