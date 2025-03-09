document.addEventListener("DOMContentLoaded", function () {
    // SIGNUP FUNCTIONALITY
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        // Get input values
        let fName = document.getElementById("fName").value;
        let lName = document.getElementById("lName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Create user object
        let newUser = {
            fName: fName,
            lName: lName,
            email: email,
            password: password
        };

        // Save user data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        alert("Signup successful! Redirecting to the store...");
        window.location.href = "website.html"; // Redirect to the e-commerce website
    });

    // LOGIN FUNCTIONALITY
    document.getElementById("signin-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        let email = document.querySelector("#signIn input[name='email']").value;
        let password = document.querySelector("#signIn input[name='password']").value;
        let storedUser = JSON.parse(localStorage.getItem("currentUser"));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert(`Welcome back, ${storedUser.fName}!`);
            window.location.href = "website.html"; // Redirect to store
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
