document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ orderConfirmation.js loaded!");

    // ✅ Local Storage se Data Retrieve Karo
    let orderData = localStorage.getItem("lastOrder");

    if (!orderData) {
        console.warn("⚠️ No order data found in localStorage!");
        document.getElementById("orderSummary").innerHTML += "<tr><td colspan='4'>No order found!</td></tr>";
        document.getElementById("totalPrice").innerText = "Total Amount: $0.00";
        return;
    }

    try {
        orderData = JSON.parse(orderData);
        console.log("📦 Order Data Found:", orderData);
    } catch (error) {
        console.error("❌ Error Parsing Order Data:", error);
        return;
    }

    if (!orderData.items || orderData.items.length === 0) {
        document.getElementById("orderSummary").innerHTML += "<tr><td colspan='4'>No items found in order!</td></tr>";
        document.getElementById("totalPrice").innerText = "Total Amount: $0.00";
        return;
    }

    let totalPrice = 0;
    let orderSummaryTable = document.getElementById("orderSummary");
    let totalPriceElement = document.getElementById("totalPrice");
    let customerDetailsDiv = document.getElementById("customerDetails");

    // ✅ Order Summary Table Fill Karo
    orderData.items.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name || item.product_name}</td>
            <td>${item.quantity}</td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderSummaryTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    // ✅ Total Price Show Karo
    totalPriceElement.innerText = `Total Amount: $${totalPrice.toFixed(2)}`;

    // ✅ Customer Details Show Karo
    if (orderData.customer) {
        customerDetailsDiv.innerHTML = `
            <h3>Shipping Details</h3>
            <p><strong>Name:</strong> ${orderData.customer.name || orderData.customer.fullName}</p> 
            <p><strong>Address:</strong> ${orderData.customer.address}</p>
            <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
            <p><strong>Email:</strong> ${orderData.customer.email}</p>
        `;
    } else {
        customerDetailsDiv.innerHTML = "<p>No customer details available.</p>";
    }

    // ✅ 10 Sec Baad LocalStorage Clear Karo
    setTimeout(() => {
        console.log("🗑 Removing order data from localStorage...");
        localStorage.removeItem("lastOrder");
    }, 10000);
});
