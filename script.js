document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartButtons = document.querySelectorAll(".product button");

    cartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            let productCard = e.target.parentElement;
            let productName = productCard.querySelector("h3").innerText;
            let productPrice = productCard.querySelector("p").innerText;

            let productObj = {
                name: productName,
                price: productPrice
            };

            cart.push(productObj);
            console.log(cart);
            alert(productName + " added to cart!");
        });
    });

    // Shop Now Button
    const shopNowBtn = document.querySelector(".hero button");
    shopNowBtn.addEventListener("click", () => {
        window.location.href = "shop.html"; // Redirect to shop page
    });
});
document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Page reload hone se rokta hai

    var email = document.getElementById("emailInput").value;
    var message = document.getElementById("message");

    // Email validation check
    if (email.includes("@") && email.includes(".")) {
        message.style.color = "green";
        message.innerText = "✅ Thank you for subscribing!";
        document.getElementById("emailInput").value = ""; // Input clear karega
    } else {
        message.style.color = "red";
        message.innerText = "❌ Please enter a valid email address!";
    }
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}

// Example Usage: 
document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function() {
        let name = this.getAttribute("data-name");
        let price = parseFloat(this.getAttribute("data-price"));
        addToCart(name, price);
    });
});
document.getElementById("shopNowBtn").addEventListener("click", function () {
    window.location.href = "shop.html"; // ✅ Redirect to shop page
});
