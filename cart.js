document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let cartTable = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count"); // ✅ Cart count element

    function updateCart() {
        cartTable.innerHTML = "";
        let totalPrice = 0;

        // ✅ Agar cart count element exist karta hai, tabhi update karo
        if (cartCount) {
            cartCount.innerText = cartItems.length;
        }

        cartItems.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeItem(${index})">❌</button></td>
            `;
            cartTable.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        cartTotal.innerText = totalPrice.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    // ✅ Quantity Update Function
    window.updateQuantity = function (index, newQuantity) {
        cartItems[index].quantity = parseInt(newQuantity);
        updateCart();
    };

    // ✅ Remove Item from Cart
    window.removeItem = function (index) {
        cartItems.splice(index, 1);
        updateCart();
    };

    // ✅ Initial Cart Load
    updateCart();
});

// ✅ Checkout Button Click Event
document.getElementById("checkout-btn").addEventListener("click", function () {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "checkout.html";
});
