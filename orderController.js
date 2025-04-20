const db = require("../db");

// ✅ Order Place Karna
exports.placeOrder = (req, res) => {
    console.log("🛒 Order Request Received:", req.body);  

    const { user_id, customer_name, email, phone, address, payment_method, items, totalAmount } = req.body;
    
    if (!user_id || !items || items.length === 0) {
        console.error("❌ Invalid Order Data!");
        return res.status(400).json({ error: "Invalid order data" });
    }

    const insertOrderQuery = `INSERT INTO orders (user_id, customer_name, email, phone, address, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(insertOrderQuery, [user_id, customer_name, email, phone, address, payment_method, "Pending"], (err, result) => {
        if (err) {
            console.error("❌ Order Insert Error:", err);  // 🔴 ERROR KO PRINT KARO
            return res.status(500).json({ error: "Database error while inserting order" });
        }

        const orderId = result.insertId;
        console.log("✅ Order ID Generated:", orderId);

        // Insert order items
        const orderItemsQuery = `INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ?`;
        const orderItemsData = items.map(item => [orderId, item.name, item.price, item.quantity]);

        db.query(orderItemsQuery, [orderItemsData], (err, result) => {
            if (err) {
                console.error("❌ Order Items Insert Error:", err);  // 🔴 ERROR KO PRINT KARO
                return res.status(500).json({ error: "Database error while inserting order items" });
            }

            console.log("✅ Order Placed Successfully!");
            res.status(201).json({ message: "Order placed successfully!" });
        });
    });
};
