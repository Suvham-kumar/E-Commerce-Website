const express = require("express");
const db = require("../db");  
const authenticate = require("../middleware/authMiddleware"); 

const router = express.Router();
const orderController = require("../controllers/orderController");

// ✅ Order Place Route
router.post("/", authenticate, orderController.placeOrder);

// ✅ User Order History Route (Orders + Order Items)
router.get("/history", authenticate, (req, res) => {
    const userId = req.user.id;  

    const sql = `
        SELECT o.*, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'product_name', oi.product_name, 
                    'price', oi.price, 
                    'quantity', oi.quantity
                )
            ) AS items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = ?
        GROUP BY o.id;
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.json({ message: "No past orders found." });
        }

        res.json(results);
    });
});

module.exports = router;
