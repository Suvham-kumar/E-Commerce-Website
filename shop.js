document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ shop.js loaded!");

    function addToCart(name, price, image) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // ✅ Check if product already exists
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1; // Agar same item hai to quantity badhao
        } else {
            cart.push({ name, price, image, quantity: 1 }); // Naya item add karo
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Update localStorage
        alert("🛒 Item added to cart!");
        console.log("📦 Cart:", cart);
    }

    // ✅ Attach "Add to Cart" function to buttons
    let buttons = document.querySelectorAll(".product button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let product = this.parentElement;
            let name = product.querySelector("h3").innerText;
            let price = parseFloat(product.querySelector("p").innerText.replace("$", ""));
            let image = product.querySelector("img").src;

            addToCart(name, price, image);
        });
    });
});
