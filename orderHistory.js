document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ orderHistory.js loaded!");

    const token = localStorage.getItem("token");

    if (!token) {
        alert("⚠️ Please login first to view your orders!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/orders/history", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token 
            }
        });

        const result = await response.json();
        console.log("📦 Fetched Orders:", result);

        if (!response.ok) {
            throw new Error(result.error || "Failed to load orders");
        }

        const orderList = document.getElementById("order-list");

        if (result.length === 0) {
            orderList.innerHTML = `<tr><td colspan="5">🚫 No past orders found.</td></tr>`;
            return;
        }

        result.forEach(order => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer_name}</td>
                <td>${order.payment_method}</td>
                <td>${order.status}</td>
                <td>${new Date(order.created_at).toLocaleDateString()}</td>
            `;
            orderList.appendChild(row);
        });

    } catch (error) {
        console.error("❌ ERROR fetching orders:", error);
        alert("⚠️ Error fetching orders. Please try again.");
    }
});
