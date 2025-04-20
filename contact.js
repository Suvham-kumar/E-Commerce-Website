document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // Form reload hone se roko

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let responseMessage = document.getElementById("responseMessage");

        if (!name || !email || !message) {
            responseMessage.innerHTML = "⚠️ Please fill all fields!";
            responseMessage.style.color = "red";
            return;
        }

        try {
            // **📩 Backend API ko call karne ka dummy example (Baad me API add kar sakta hai)**
            // let response = await fetch("http://localhost:3000/api/contact", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ name, email, message })
            // });

            // let result = await response.json();
            
            // **Yeh backend API ke bina local save karega**
            localStorage.setItem("contactMessage", JSON.stringify({ name, email, message }));
            
            responseMessage.innerHTML = "✅ Message sent successfully!";
            responseMessage.style.color = "green";

            contactForm.reset(); // Form ko clear karo
        } catch (error) {
            console.error("❌ ERROR:", error);
            responseMessage.innerHTML = "⚠️ Failed to send message!";
            responseMessage.style.color = "red";
        }
    });
});
