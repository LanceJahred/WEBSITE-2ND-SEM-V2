document.addEventListener("DOMContentLoaded", function () {
    function showToast(message) {
        let toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 50);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 200);
        }, 2000);
    }

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    function checkLoginStatus() {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            let usernameDisplay = document.getElementById("usernameDisplay");
            if (usernameDisplay) usernameDisplay.innerText = loggedInUser.username;
        }
    }
    checkLoginStatus();

    // ✅ SIGNUP FUNCTION (Fixed)
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();

            if (!username || !email || !password) {
                showToast("⚠️ Please fill in all fields.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(user => user.email === email)) {
                showToast("❌ Email already registered.");
                return;
            }

            let newUser = { username, email, password, orders: [] };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            showToast("✅ Signup successful! Redirecting...");

            setTimeout(() => {
                console.log("Redirecting to login.html...");
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // ✅ LOGIN FUNCTION (Fixed)
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("loginEmail").value.trim();
            let password = document.getElementById("loginPassword").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                showToast("✅ Login successful! Redirecting...");

                setTimeout(() => {
                    console.log("Redirecting to website.html...");
                    window.location.href = "website.html";
                }, 1500);
            } else {
                showToast("❌ Invalid email or password.");
            }
        });
    }

    // ✅ Load Dashboard Data (Fixed)
    function loadDashboard() {
        console.log("✅ loadDashboard() function is running");

        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            console.log("❌ No logged-in user found. Redirecting to login.");
            window.location.href = "login.html";
            return;
        }

        let usernameElement = document.getElementById("dashboardUsername");
        let emailElement = document.getElementById("dashboardEmail");

        if (usernameElement && emailElement) {
            usernameElement.innerText = loggedInUser.username || "Unknown";
            emailElement.innerText = loggedInUser.email || "Unknown";
            console.log("✅ Username and email updated:", loggedInUser.username, loggedInUser.email);
        } else {
            console.error("❌ Dashboard elements not found.");
        }

        let orderList = document.getElementById("orderList");
        if (orderList) {
            let orders = loggedInUser.orders || [];
            orderList.innerHTML = orders.length > 0 
                ? orders.map(order => `<li>${order}</li>`).join("") 
                : "<li>No orders yet.</li>";
        }
    }

    // ✅ Update User Info (Fixed)
    document.getElementById("updateForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        let newUsername = document.getElementById("newUsername").value.trim();
        let newEmail = document.getElementById("newEmail").value.trim();
        let newPassword = document.getElementById("newPassword").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        let userIndex = users.findIndex(user => user.email === loggedInUser.email);
        if (userIndex !== -1) {
            if (newUsername) users[userIndex].username = newUsername;
            if (newEmail) users[userIndex].email = newEmail;
            if (newPassword) users[userIndex].password = newPassword;

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));

            alert("Account updated successfully!");
            window.location.reload();
        }
    });

    // ✅ LOGOUT FUNCTION (Fixed)
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            showToast("👋 Logged out successfully!");
            setTimeout(() => {
                console.log("Redirecting to login.html...");
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // ✅ Section Navigation in Dashboard (Fixed)
    function showSection(sectionId) {
        console.log("Attempting to show section:", sectionId);

        document.querySelectorAll('.dashboard-box').forEach(section => {
            section.style.display = 'none';
        });

        let targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            console.log("Section displayed:", sectionId);
        } else {
            console.error("Section not found:", sectionId);
            return;
        }

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        let activeBtn = document.querySelector(`.tab-btn[data-section="${sectionId}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        history.pushState(null, null, `#${sectionId}`);
    }

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            let section = this.getAttribute("href").split("#")[1];
            if (section) {
                event.preventDefault();
                showSection(section);
            }
        });
    });

    // ✅ Load Dashboard Sections Correctly on Page Load (Fixed)
    loadDashboard();
    let section = window.location.hash.substring(1);
    if (!section || !document.getElementById(section)) {
        section = "settings";
    }
    showSection(section);

    document.querySelectorAll(".tab-btn").forEach(button => {
        button.addEventListener("click", function () {
            let sectionId = this.getAttribute("data-section");
            showSection(sectionId);
        });
    });
});

// ✅ Order History Load Fix
function loadDashboard() {
    console.log("loadDashboard() function executed");

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("dashboardUsername").innerText = loggedInUser.username;
    document.getElementById("dashboardEmail").innerText = loggedInUser.email;

    let orderList = document.getElementById("orderList");
    if (orderList) {
        let orders = loggedInUser.orders || [];
        orderList.innerHTML = orders.length > 0 
            ? orders.map(order => `<li>${order}</li>`).join("") 
            : "<li>No orders yet.</li>";
    }
}

window.onload = function () {
    loadDashboard();
    let section = window.location.hash.substring(1) || 'settings';
    showSection(section && document.getElementById(section) ? section : 'settings');
};

function closeReceipt() {
    document.getElementById("receiptModal").style.display = "none";
}
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("touchstart", function() {
        this.classList.add("active");
    });
    btn.addEventListener("touchend", function() {
        this.classList.remove("active");
    });
});
