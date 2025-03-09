document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JavaScript Loaded!"); // Debugging

    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const showLogin = document.getElementById("show-login");
    const showSignup = document.getElementById("show-signup");
    const signupDiv = document.getElementById("signup");
    const loginDiv = document.getElementById("login");

    // ✅ Toggle between forms
    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        signupDiv.style.display = "none";
        loginDiv.style.display = "block";
    });

    showSignup.addEventListener("click", (e) => {
        e.preventDefault();
        loginDiv.style.display = "none";
        signupDiv.style.display = "block";
    });

    // ✅ Signup Function (Save user data in localStorage)
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("🛠 Signup Button Clicked!");

        const fName = document.getElementById("fName").value.trim();
        const lName = document.getElementById("lName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (!fName || !lName || !email || !password) {
            alert("⚠️ All fields are required!");
            return;
        }

        if (password.length < 8) {
            alert("⚠️ Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("⚠️ Passwords do not match.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.email === email)) {
            alert("⚠️ Email already registered.");
            return;
        }

        // Save full name as username
        const username = `${fName} ${lName}`;

        users.push({ username, email, password, orders: [] });
        localStorage.setItem("users", JSON.stringify(users));

        console.log("✅ User Registered:", { username, email });
        alert("🎉 Account created successfully! Please log in.");
        signupForm.reset();

        // Show login form after signup
        signupDiv.style.display = "none";
        loginDiv.style.display = "block";
    });

    // ✅ Login Function (Check credentials from localStorage)
    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        console.log("🛠 Login Button Clicked!");
    
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
    
        let users = JSON.parse(localStorage.getItem("users")) || [];
    
        let validUser = users.find(user => user.email === email && user.password === password);
    
        if (validUser) {
            alert(`🎉 Welcome, ${validUser.username}!`);
            localStorage.setItem("loggedInUser", JSON.stringify(validUser)); // Store logged-in user
            window.location.href = "website.html"; // ✅ Redirect to website
        } else {
            alert("⚠️ Invalid email or password.");
        }
    });
});

// ✅ Function to display logged-in user's name in `website.html`
function displayUserName() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("usernameDisplay").textContent = user.username;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // ✅ Display the logged-in username
    displayUserName();

    // ✅ Logout Button Click Event
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser"); // Clear user session
            alert("👋 Logged out successfully!");
            window.location.href = "log.html"; // Redirect to login page
        });
    }
});

function displayUserName() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("usernameDisplay").textContent = user.username;
    }
}

