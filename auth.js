document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ auth.js loaded successfully!");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");  // ✅ Check for signup form too

    if (loginForm) {
        console.log("🔹 Login Form Found!");
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    alert("🎉 Login Successful!");
                    window.location.href = "index.html";
                } else {
                    alert("❌ Login Failed: " + data.error);
                }
            } catch (error) {
                console.error("❌ Login error:", error);
                alert("⚠️ Something went wrong! Please try again.");
            }
        });
    } document.addEventListener("DOMContentLoaded", function () {
        console.log("✅ auth.js loaded successfully!");
    
        const loginForm = document.getElementById("loginForm");
        const signupForm = document.getElementById("signupForm");  // ✅ Check for signup form too
    
        if (loginForm) {
            console.log("🔹 Login Form Found!");
            loginForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;
    
                try {
                    const response = await fetch("http://localhost:3000/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password })
                    });
    
                    const data = await response.json();
    
                    if (response.ok) {
                        localStorage.setItem("token", data.token);
                        alert("🎉 Login Successful!");
                        window.location.href = "index.html";
                    } else {
                        alert("❌ Login Failed: " + data.error);
                    }
                } catch (error) {
                    console.error("❌ Login error:", error);
                    alert("⚠️ Something went wrong! Please try again.");
                }
            });
        } else if (signupForm) {
            console.log("🔹 Signup Form Found!");
            signupForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const fullname = document.getElementById("fullName").value;
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;
    
                try {
                    const response = await fetch("http://localhost:3000/auth/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ fullName, email, password })
                    });
    
                    const data = await response.json();
    
                    if (response.ok) {
                        alert("🎉 Signup Successful! Please login.");
                        window.location.href = "login.html";
                    } else {
                        alert("❌ Signup Failed: " + data.error);
                    }
                } catch (error) {
                    console.error("❌ Signup error:", error);
                    alert("⚠️ Something went wrong! Please try again.");
                }
            });
        } else {
            console.error("❌ Form element not found!");
            alert("Form element not found!");
        }
    });    

});