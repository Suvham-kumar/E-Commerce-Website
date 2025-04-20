document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Checkout Page Loaded!");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderSummary = document.getElementById("order-summary-items");
    let totalAmount = 0;

    let placeOrderBtn = document.getElementById("placeOrderBtn");
    if (!placeOrderBtn) {
        console.error("❌ ERROR: Place Order button NOT found!");
        return;
    }

    console.log("✅ Place Order Button FOUND!");

    placeOrderBtn.addEventListener("click", async function() {
        console.log("📡 Fetching API...");

        let token = localStorage.getItem("token");
        if (!token) {
            alert("⚠️ User not authenticated. Please login again.");
            return;
        }

        // ✅ Decode JWT Token to Get `user_id`
        let decodedToken = JSON.parse(atob(token.split(".")[1])); // JWT Decode
        let user_id = decodedToken.id; 

        let orderData = {
            user_id, 
            customer: {
                name: document.getElementById("fullName")?.value.trim(),
                email: document.getElementById("email")?.value.trim(),
                phone: document.getElementById("phone")?.value.trim(),
                address: document.getElementById("address")?.value.trim(),
            },
            payment_method: document.querySelector('input[name="payment"]:checked')?.value,
            items: cart, // ✅ Pure cart ko items me bhej rahe hain
            totalAmount: totalAmount.toFixed(2) // ✅ Total Amount add kar diya
        };

        console.log("🛒 Sending Order Data:", orderData); // ✅ Debugging ke liye

        try {
            let response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token, 
                },
                body: JSON.stringify(orderData),
            });

            let result = await response.json();
            console.log("✅ API Response:", result);

            if (!response.ok) {
                throw new Error(result.error || "Failed to place order");
            }

            // ✅ SUCCESS: Order LocalStorage me Save Karo
            localStorage.setItem("lastOrder", JSON.stringify(orderData));  

            alert("🎉 Order placed successfully!");
            localStorage.removeItem("cart");
            window.location.href = "orderConfirmation.html";
        } catch (error) {
            console.error("❌ ERROR:", error);
            alert("❌ Failed to place order: " + error.message);
        }
    });

    // ✅ Cart Items Render in Table
    orderSummary.innerHTML = "";
    cart.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderSummary.appendChild(row);
        totalAmount += item.price * item.quantity;
    });

    document.getElementById("order-total").innerText = `$${totalAmount.toFixed(2)}`;
});
